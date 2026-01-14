// materials.js
// Cutting speed in mm/s, engraving speed in cm²/min
// Update sheetCost as needed

const materialTable = [
  // ----- CUTTING MATERIALS -----
  { material: "Wood", maxCutThickness: 20, cutSpeeds: {3:25, 6:20, 9:15, 12:12, 15:10, 20:8}, engraveSpeed: 120, sheetCost: 0 },
  { material: "Acrylic", maxCutThickness: 15, cutSpeeds: {3:18, 6:12, 9:8, 12:6, 15:5}, engraveSpeed: 150, sheetCost: 0 },
  { material: "MDF", maxCutThickness: 9, cutSpeeds: {3:20, 6:15, 9:10}, engraveSpeed: 100, sheetCost: 0 },
  { material: "Paper", maxCutThickness: 10, cutSpeeds: {1:50, 3:35, 6:25, 10:15}, engraveSpeed: 300, sheetCost: 0 },
  { material: "Leather", maxCutThickness: 13, cutSpeeds: {3:18, 6:14, 9:10, 13:8}, engraveSpeed: 150, sheetCost: 0 },
  { material: "Delrin", maxCutThickness: 14, cutSpeeds: {3:12, 6:10, 9:8, 12:6, 14:5}, engraveSpeed: 100, sheetCost: 0 },
  { material: "Melamine", maxCutThickness: 8, cutSpeeds: {3:15, 6:10, 8:8}, engraveSpeed: 100, sheetCost: 0 },
  { material: "Mylar", maxCutThickness: 7, cutSpeeds: {1:35, 3:25, 5:15, 7:10}, engraveSpeed: 150, sheetCost: 0 },
  { material: "Rubber", maxCutThickness: 8, cutSpeeds: {3:15, 6:10, 8:8}, engraveSpeed: 120, sheetCost: 0 },
  { material: "Pressboard", maxCutThickness: 20, cutSpeeds: {3:25, 6:20, 9:15, 12:12, 15:10, 20:8}, engraveSpeed: 100, sheetCost: 0 },
  { material: "Fabric", maxCutThickness: 20, cutSpeeds: {1:35, 3:25, 6:15, 10:10, 20:5}, engraveSpeed: 150, sheetCost: 0 },
  { material: "Cloth", maxCutThickness: 20, cutSpeeds: {1:35, 3:25, 6:15, 10:10, 20:5}, engraveSpeed: 150, sheetCost: 0 },
  { material: "Cork", maxCutThickness: 15, cutSpeeds: {3:15, 6:12, 9:10, 12:8, 15:6}, engraveSpeed: 120, sheetCost: 0 },
  { material: "Matte Board", maxCutThickness: 13, cutSpeeds: {3:20, 6:15, 9:12, 13:10}, engraveSpeed: 100, sheetCost: 0 },
  { material: "Fiberglass", maxCutThickness: 13, cutSpeeds: {3:12, 6:10, 9:8, 12:6, 13:5}, engraveSpeed: 60, sheetCost: 0 },

  // ----- ENGRAVING-ONLY MATERIALS -----
  { material: "Glass", cutSpeeds: {}, engraveSpeed: 50, sheetCost: 0 },
  { material: "Coated/Painted Metals", cutSpeeds: {}, engraveSpeed: 40, sheetCost: 0 },
  { material: "Anodized Aluminum", cutSpeeds: {}, engraveSpeed: 50, sheetCost: 0 },
  { material: "Ceramic", cutSpeeds: {}, engraveSpeed: 40, sheetCost: 0 },
  { material: "Marble", cutSpeeds: {}, engraveSpeed: 40, sheetCost: 0 },
  { material: "Tile", cutSpeeds: {}, engraveSpeed: 40, sheetCost: 0 },
  { material: "Corian", cutSpeeds: {}, engraveSpeed: 60, sheetCost: 0 }
];
