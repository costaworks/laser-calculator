const setupFee = 5;
const machineRate = 45; // €/hour
const minimumPrice = 10;

async function calculateQuote() {
  const fileInput = document.getElementById('fileInput').files[0];
  const material = document.getElementById('materialSelect').value;
  const thickness = parseInt(
    document.getElementById('thicknessSelect').value
  );
  const engravingArea = parseFloat(
    document.getElementById('engraveArea').value
  ) || 0;

  let totalCutLength = 0;

  if (!fileInput) {
    alert("Please upload a DXF or SVG file");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const content = e.target.result;

    if (fileInput.name.endsWith('.svg')) {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(content, "image/svg+xml");
      const paths = svgDoc.querySelectorAll("path");
      paths.forEach(path => {
        if (path.getTotalLength) {
          totalCutLength += path.getTotalLength();
        }
      });
    } 
    else if (fileInput.name.endsWith('.dxf')) {
      const parser = new DxfParser();
      const dxf = parser.parseSync(content);
      dxf.entities.forEach(ent => {
        if (ent.type === 'LINE') {
          const dx = ent.vertices[1].x - ent.vertices[0].x;
          const dy = ent.vertices[1].y - ent.vertices[0].y;
          totalCutLength += Math.sqrt(dx * dx + dy * dy);
        }
      });
    } 
    else {
      alert("Unsupported file type");
      return;
    }

    // ---- MATERIAL LOOKUP ----
    const materialData = getMaterialData(material, thickness);

    if (!materialData) {
      alert("Material / thickness combination not found");
      return;
    }

    const cutSpeed = materialData.cutSpeed;
    const engravingSpeed = materialData.engraveSpeed;
    const sheetCost = materialData.sheetCost;

    // ---- PRICING ----
    const cutTimeSec = (totalCutLength / cutSpeed) * 1.15;
    const engravingTimeSec = engravingArea / engravingSpeed;
    const totalTimeHr = (cutTimeSec + engravingTimeSec) / 3600;

    const cutCost = totalTimeHr * machineRate;
    const rawPrice = cutCost + sheetCost + setupFee;
    const totalPrice = Math.max(rawPrice, minimumPrice);

    document.getElementById('output').innerHTML =
      `Material: ${material} ${thickness}mm<br>` +
      `Cut length: ${totalCutLength.toFixed(0)} mm<br>` +
      `Cut time: ${(cutTimeSec / 60).toFixed(1)} min<br>` +
      `Engraving area: ${engravingArea} cm²<br>` +
      `Engraving time: ${(engravingTimeSec / 60).toFixed(1)} min<br>` +
      `Material cost: €${sheetCost}<br>` +
      `Setup fee: €${setupFee}<br>` +
      `<strong>Total: €${totalPrice.toFixed(2)}</strong><br>` +
      `<small>Estimate only. Final price confirmed after review.</small>`;
  };

  reader.readAsText(fileInput);
}
