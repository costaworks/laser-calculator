// materials.js

const materialTable = [
  // ----- Cutting Materials -----
  {
    material: "Wood",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 20,
    cutSpeeds: {
      3: { speed: 6, cost: 20 },
      6: { speed: 4, cost: 22 },
      9: { speed: 2, cost: 25 },
      12: { speed: 1.5, cost: 28 },
      15: { speed: 1, cost: 30 },
      20: { speed: 0.8, cost: 35 }
    },
    engraveSpeed: 250
  },
  {
    material: "Acrylic",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 25,
    cutSpeeds: {
      3: { speed: 8, cost: 25 },
      6: { speed: 5, cost: 28 },
      9: { speed: 3, cost: 32 },
      12: { speed: 2, cost: 36 },
      15: { speed: 1.5, cost: 40 }
    },
    engraveSpeed: 300
  },
  {
    material: "MDF",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 18,
    cutSpeeds: {
      3: { speed: 5, cost: 18 },
      6: { speed: 3, cost: 22 },
      9: { speed: 2, cost: 25 }
    },
    engraveSpeed: 200
  },
  {
    material: "Paper",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 5,
    cutSpeeds: {
      1: { speed: 20, cost: 5 },
      2: { speed: 15, cost: 6 },
      5: { speed: 10, cost: 8 },
      10: { speed: 5, cost: 10 }
    },
    engraveSpeed: 400
  },
  {
    material: "Leather",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 18,
    cutSpeeds: {
      1: { speed: 6, cost: 18 },
      2: { speed: 5, cost: 19 },
      3: { speed: 4, cost: 20 },
      6: { speed: 2, cost: 22 },
      13: { speed: 1, cost: 25 }
    },
    engraveSpeed: 120
  },
  {
    material: "Delrin",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 22,
    cutSpeeds: {
      3: { speed: 6, cost: 22 },
      6: { speed: 4, cost: 26 },
      9: { speed: 2.5, cost: 30 },
      14: { speed: 1, cost: 35 }
    },
    engraveSpeed: 100
  },
  {
    material: "Melamine",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 18,
    cutSpeeds: {
      3: { speed: 5, cost: 18 },
      6: { speed: 3, cost: 20 },
      8: { speed: 2, cost: 22 }
    },
    engraveSpeed: 150
  },
  {
    material: "Mylar",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 12,
    cutSpeeds: {
      1: { speed: 15, cost: 12 },
      3: { speed: 10, cost: 14 },
      7: { speed: 5, cost: 16 }
    },
    engraveSpeed: 350
  },
  {
    material: "Rubber",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 20,
    cutSpeeds: {
      3: { speed: 8, cost: 20 },
      5: { speed: 5, cost: 22 },
      8: { speed: 3, cost: 25 }
    },
    engraveSpeed: 180
  },
  {
    material: "Pressboard",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 15,
    cutSpeeds: {
      3: { speed: 6, cost: 15 },
      6: { speed: 4, cost: 18 },
      9: { speed: 3, cost: 20 },
      12: { speed: 2, cost: 22 },
      15: { speed: 1.5, cost: 25 },
      20: { speed: 1, cost: 28 }
    },
    engraveSpeed: 200
  },
  {
    material: "Fabric",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 12,
    cutSpeeds: {
      1: { speed: 15, cost: 12 },
      3: { speed: 10, cost: 14 },
      10: { speed: 5, cost: 18 },
      20: { speed: 3, cost: 22 }
    },
    engraveSpeed: 300
  },
  {
    material: "Cloth",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 12,
    cutSpeeds: {
      1: { speed: 15, cost: 12 },
      3: { speed: 10, cost: 14 },
      10: { speed: 5, cost: 18 },
      20: { speed: 3, cost: 22 }
    },
    engraveSpeed: 300
  },
  {
    material: "Cork",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 18,
    cutSpeeds: {
      3: { speed: 6, cost: 18 },
      6: { speed: 4, cost: 20 },
      9: { speed: 3, cost: 22 },
      12: { speed: 2, cost: 25 },
      15: { speed: 1.5, cost: 28 }
    },
    engraveSpeed: 200
  },
  {
    material: "Matte Board",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 15,
    cutSpeeds: {
      3: { speed: 6, cost: 15 },
      6: { speed: 4, cost: 18 },
      9: { speed: 3, cost: 20 },
      12: { speed: 2, cost: 22 },
      13: { speed: 1.5, cost: 25 }
    },
    engraveSpeed: 200
  },
  {
    material: "Fiberglass",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 25,
    cutSpeeds: {
      3: { speed: 5, cost: 25 },
      6: { speed: 3, cost: 28 },
      9: { speed: 2, cost: 32 },
      12: { speed: 1.5, cost: 36 },
      13: { speed: 1, cost: 40 }
    },
    engraveSpeed: 100
  },

  // ----- Engraving-Only Materials -----
  { material: "Glass", sheetWidth: 500, sheetHeight: 300, sheetCost: 50, cutSpeeds: {}, engraveSpeed: 80 },
  { material: "Coated/Painted Metals", sheetWidth: 500, sheetHeight: 300, sheetCost: 60, cutSpeeds: {}, engraveSpeed: 100 },
  { material: "Anodized Aluminum", sheetWidth: 500, sheetHeight: 300, sheetCost: 60, cutSpeeds: {}, engraveSpeed: 100 },
  { material: "Ceramic", sheetWidth: 500, sheetHeight: 300, sheetCost: 45, cutSpeeds: {}, engraveSpeed: 90 },
  { material: "Marble", sheetWidth: 500, sheetHeight: 300, sheetCost: 55, cutSpeeds: {}, engraveSpeed: 70 },
  { material: "Tile", sheetWidth: 500, sheetHeight: 300, sheetCost: 40, cutSpeeds: {}, engraveSpeed: 75 },
  { material: "Corian", sheetWidth: 500, sheetHeight: 300, sheetCost: 50, cutSpeeds: {}, engraveSpeed: 80 }
];
