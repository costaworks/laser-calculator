// calculator.js

const setupFee = 5;      
const machineRate = 45;  
const minimumPrice = 10; 

function updateThicknessSelector() {
  const materialName = document.getElementById('materialSelect').value;
  const material = materialTable.find(m => m.material === materialName);

  const thicknessContainer = document.getElementById('thicknessContainer');
  const thicknessSelect = document.getElementById('thicknessSelect');
  const engravingNote = document.getElementById('engravingNote');

  if (!material) return;

  if (material.cutSpeeds && Object.keys(material.cutSpeeds).length > 0) {
    thicknessSelect.innerHTML = "";
    Object.keys(material.cutSpeeds).forEach(thick => {
      const option = document.createElement("option");
      option.value = thick;
      option.text = thick + " mm";
      thicknessSelect.appendChild(option);
    });
    thicknessContainer.style.display = "block";
    thicknessSelect.style.display = "inline-block";
    engravingNote.style.display = "none";
  } else {
    thicknessContainer.style.display = "block";
    thicknessSelect.style.display = "none";
    engravingNote.style.display = "block";
  }
}

function getPartArea(fileContent, fileName, autoEngrave=false) {
  let totalArea = 0;

  if (fileName.endsWith('.svg')) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(fileContent, "image/svg+xml");

    if (autoEngrave) {
      // Only sum paths with fill="#000000" or some user convention
      const paths = svgDoc.querySelectorAll("path, rect, circle, ellipse, polygon");
      paths.forEach(el => {
        const fill = el.getAttribute("fill") || "";
        if (fill === "#000000" || fill.toLowerCase() === "black") {
          const bbox = el.getBBox();
          totalArea += bbox.width * bbox.height;
        }
      });
    } else {
      // Normal bounding box approximation for manual
      const paths = svgDoc.querySelectorAll("path");
      paths.forEach(path => {
        if (path.getBBox) {
          const bbox = path.getBBox();
          totalArea += bbox.width * bbox.height;
        }
      });
    }
  } else if (fileName.endsWith('.dxf')) {
    if (typeof DxfParser === "undefined") return 0;
    const parser = new DxfParser();
    const dxf = parser.parseSync(fileContent);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    dxf.entities.forEach(ent => {
      if (ent.vertices) {
        ent.vertices.forEach(v => {
          minX = Math.min(minX, v.x);
          minY = Math.min(minY, v.y);
          maxX = Math.max(maxX, v.x);
          maxY = Math.max(maxY, v.y);
        });
      }
    });
    if (minX !== Infinity) totalArea = (maxX - minX) * (maxY - minY);
  }

  return totalArea; 
}

function calculateQuote() {
  const fileInput = document.getElementById('fileInput').files[0];
  const materialName = document.getElementById('materialSelect').value;
  const thickness = parseInt(document.getElementById('thicknessSelect').value) || 0;
  const engravingAreaManual = parseFloat(document.getElementById('engraveArea').value) || 0;
  const autoEngrave = document.getElementById('autoEngrave').checked;

  if (!fileInput) {
    alert("Please upload a DXF or SVG file");
    return;
  }

  const material = materialTable.find(m => m.material === materialName);
  if (!material) {
    alert("Material not found");
    return;
  }

  let cutSpeed = 0;
  let sheetCost = material.sheetCost || 0;

  if (material.cutSpeeds && Object.keys(material.cutSpeeds).length > 0) {
    if (!material.cutSpeeds[thickness]) {
      alert(`Cutting not supported for ${materialName} at ${thickness}mm`);
      return;
    }
    cutSpeed = material.cutSpeeds[thickness].speed;
    sheetCost = material.cutSpeeds[thickness].cost;
  }

  const engraveSpeed = material.engraveSpeed || 0;

  const reader = new FileReader();
  reader.onload = function(e) {
    const content = e.target.result;
    let totalCutLength = 0;

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

    // Material cost scaled by part area
    let partArea = getPartArea(content, fileInput.name, autoEngrave);
    if (!autoEngrave && engravingAreaManual > 0) partArea = 0; // engraving handled manually
    let scaledMaterialCost = sheetCost;
    if (material.sheetWidth && material.sheetHeight && partArea > 0 && cutSpeed > 0) {
      const sheetArea = material.sheetWidth * material.sheetHeight;
      scaledMaterialCost = (partArea / sheetArea) * sheetCost;
    }

    const cutTimeSec = cutSpeed > 0 ? (totalCutLength / cutSpeed) * 1.15 : 0;
    const engravingTimeSec = engraveSpeed > 0 ? (engravingAreaManual / engraveSpeed) * 60 : 0;
    const totalTimeHr = (cutTimeSec + engravingTimeSec) / 3600;

    const cutCost = totalTimeHr * machineRate;
    const rawPrice = cutCost + scaledMaterialCost + setupFee;
    const totalPrice = Math.max(rawPrice, minimumPrice);

    let outputHTML = `<strong>Total: €${totalPrice.toFixed(2)}</strong><br>`;
    if (cutSpeed > 0) {
      outputHTML += `Cut length: ${totalCutLength.toFixed(0)} mm<br>`;
      outputHTML += `Cut time: ${(cutTimeSec/60).toFixed(1)} min<br>`;
    }
    if (engraveSpeed > 0) {
      outputHTML += `Engraving area: ${engravingAreaManual.toFixed(1)} cm²<br>`;
      outputHTML += `Engraving time: ${(engravingTimeSec/60).toFixed(1)} min<br>`;
    }
    outputHTML += `Material: ${materialName} ${cutSpeed>0 ? thickness + "mm" : "(engraving only)"}<br>`;
    outputHTML += `Material cost: €${scaledMaterialCost.toFixed(2)}<br>`;
    outputHTML += `Setup fee: €${setupFee}`;

    document.getElementById('output').innerHTML = outputHTML;
  };

  reader.readAsText(fileInput);
}
