// materials.js
// All material / thickness data lives here

const materialTable = [
  {
    material: "Acrylic",
    thickness: 3, // mm
    cutSpeed: 20, // mm/sec
    engraveSpeed: 2.0, // cm^2/sec
    sheetCost: 25 // €
  },
  {
    material: "Acrylic",
    thickness: 6,
    cutSpeed: 12,
    engraveSpeed: 1.5,
    sheetCost: 40
  },
  {
    material: "Plywood",
    thickness: 3,
    cutSpeed: 25,
    engraveSpeed: 2.0,
    sheetCost: 18
  },
  {
    material: "Plywood",
    thickness: 6,
    cutSpeed: 15,
    engraveSpeed: 1.5,
    sheetCost: 30
  }
];

// Helper function to find the correct row
function getMaterialData(material, thickness) {
  return materialTable.find(
    m => m.material === material && m.thickness === thickness
  );
}
