// calculator.js

const setupFee = 5;      // € setup fee
const machineRate = 45;  // €/hour
const minimumPrice = 10; // €

async function calculateQuote() {
  const fileInput = document.getElementById('fileInput').files[0];
  const materialName = document.getElementById('materialSelect').value;
  const thickness = parseInt(document.getElementById('thicknessSelect').value) || 0;
  const engravingArea = parseFloat(document.getElementById('engraveArea').value) || 0;

  if (!fileInput) {
    alert("Please upload a DXF or SVG file");
    return;
  }

  // Find material in the table
  const material = materialTable.find(m => m.material === materialName);
  if (!material) {
    alert("Material not found in the database");
    return;
  }

  let cutSpeed = 0;
  let sheetCost = material.sheetCost || 0;

  // Determine cutSpeed for cutting materials
  if (material.cutSpeeds && Object.keys(material.cutSpeeds).length > 0) {
    if (!material.cutSpeeds[thickness]) {
      alert(`Cutting not supported for ${materialName} at ${thickness}mm`);
      return;
    }
    cutSpeed = material.cutSpeeds[thickness];
  }

  const engraveSpeed = material.engraveSpeed || 0;

  // Read the file and calculate cut length
  let totalCutLength = 0;
  const reader = new FileReader();

  reader.onload = function(e) {
    const content = e.target.result;

    if (fileInput.name.endsWith('.svg')) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(content, "image/svg+xml");
      const paths = svgDoc.querySelectorAll("path");
      paths.forEach(path => {
        const len = path.getTotalLength ? path.getTotalLength() : 0;
        totalCutLength += len;
      });
    } else if (fileInput.name.endsWith('.dxf')) {
      if (typeof DxfParser === "undefined") {
        alert("DXF parsing library not loaded");
        return;
      }
      const parser = new DxfParser();
      const dxf = parser.parseSync(content);
      dxf.entities.forEach(ent => {
        if(ent.type === 'LINE') {
          const dx = ent.vertices[1].x - ent.vertices[0].x;
          const dy = ent.vertices[1].y - ent.vertices[0].y;
          totalCutLength += Math.sqrt(dx*dx + dy*dy);
        }
      });
    } else {
      alert("Unsupported file type");
      return;
    }

    // Calculate times
    const cutTimeSec = cutSpeed > 0 ? (totalCutLength / cutSpeed) * 1.15 : 0; // 15% buffer
    const engravingTimeSec = engraveSpeed > 0 ? (engravingArea / engraveSpeed) * 60 : 0; // convert min -> sec
    const totalTimeHr = (cutTimeSec + engravingTimeSec) / 3600;

    // Pricing
    const cutCost = totalTimeHr * machineRate;
    const rawPrice = cutCost + sheetCost + setupFee;
    const totalPrice = Math.max(rawPrice, minimumPrice);

    // Output
    let outputHTML = `<strong>Total: €${totalPrice.toFixed(2)}</strong><br>`;
    if (cutSpeed > 0) {
      outputHTML += `Cut length: ${totalCutLength.toFixed(0)} mm<br>`;
      outputHTML += `Cut time: ${(cutTimeSec/60).toFixed(1)} min<br>`;
    }
    if (engraveSpeed > 0) {
      outputHTML += `Engraving area: ${engravingArea.toFixed(1)} cm²<br>`;
      outputHTML += `Engraving time: ${(engravingTimeSec/60).toFixed(1)} min<br>`;
    }
    outputHTML += `Material: ${materialName} ${thickness > 0 ? thickness + "mm" : ""}<br>`;
    outputHTML += `Material cost: €${sheetCost}<br>`;
    outputHTML += `Setup fee: €${setupFee}`;

    document.getElementById('output').innerHTML = outputHTML;
  };

  reader.readAsText(fileInput);
}
