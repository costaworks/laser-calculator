// Example material data
const materials = {
  acrylic: {
    3: {cutSpeed: 20, sheetCost: 25, engraveSpeed: 2},
    6: {cutSpeed: 12, sheetCost: 40, engraveSpeed: 1.5}
  },
  plywood: {
    3: {cutSpeed: 25, sheetCost: 18, engraveSpeed: 2},
    6: {cutSpeed: 15, sheetCost: 30, engraveSpeed: 1.5}
  }
};

const setupFee = 15;
const machineRate = 45; // €/hour

async function calculateQuote() {
  const fileInput = document.getElementById('fileInput').files[0];
  const material = document.getElementById('materialSelect').value;
  const thickness = document.getElementById('thicknessSelect').value;
  const engravingArea = parseFloat(document.getElementById('engraveArea').value) || 0;

  let totalCutLength = 0;

  if (!fileInput) {
    alert("Please upload a DXF or SVG file");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const content = e.target.result;

    if (fileInput.name.endsWith('.svg')) {
      // SVG parser
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(content, "image/svg+xml");
      const paths = svgDoc.querySelectorAll("path");
      paths.forEach(path => {
        const len = path.getTotalLength ? path.getTotalLength() : 0;
        totalCutLength += len;
      });
    } else if (fileInput.name.endsWith('.dxf')) {
      // DXF parser (example, replace with real parsing)
      const parser = new DxfParser();
      const dxf = parser.parseSync(content);
      dxf.entities.forEach(ent => {
        if(ent.type === 'LINE') {
          const dx = ent.vertices[1].x - ent.vertices[0].x;
          const dy = ent.vertices[1].y - ent.vertices[0].y;
          totalCutLength += Math.sqrt(dx*dx + dy*dy);
        }
        // Add ARC, LWPOLYLINE, etc. here later
      });
    } else {
      alert("Unsupported file type");
      return;
    }

    // Calculate times and price
    const cutSpeed = materials[material][thickness].cutSpeed;
    const engravingSpeed = materials[material][thickness].engraveSpeed;
    const sheetCost = materials[material][thickness].sheetCost;

    const cutTimeSec = totalCutLength / cutSpeed * 1.15; // 15% buffer
    const engravingTimeSec = engravingArea / engravingSpeed;
    const totalTimeHr = (cutTimeSec + engravingTimeSec) / 3600;

    const cutCost = totalTimeHr * machineRate;
    const totalPrice = cutCost + sheetCost + setupFee;

    document.getElementById('output').innerHTML =
      `Material: ${material} ${thickness}mm<br>` +
      `Cut length: ${totalCutLength.toFixed(0)} mm<br>` +
      `Cut time: ${(cutTimeSec/60).toFixed(1)} min<br>` +
      `Engraving area: ${engravingArea} cm²<br>` +
      `Engraving time: ${(engravingTimeSec/60).toFixed(1)} min<br>` +
      `Material cost: €${sheetCost}<br>` +
      `Setup fee: €${setupFee}<br>` +
      `<strong>Total: €${totalPrice.toFixed(2)}</strong>`;
  };
  reader.readAsText(fileInput);
}
