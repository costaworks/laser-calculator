// materials.js

const materialTable = [
  {
    material: "Acrylic",
    sheetWidth: 500,   // mm
    sheetHeight: 300,  // mm
    sheetCost: 20,     // default cost if specific thickness not defined
    cutSpeeds: {       // mm/sec
      3: { speed: 8, cost: 20 },
      6: { speed: 5, cost: 25 },
      9: { speed: 3, cost: 30 },
      12: { speed: 2, cost: 35 },
      15: { speed: 1.5, cost: 40 }
    },
    engraveSpeed: 300   // cm²/min (engraving speed independent of thickness)
  },
  {
    material: "Plywood",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 15,
    cutSpeeds: {
      3: { speed: 6, cost: 15 },
      6: { speed: 4, cost: 18 },
      9: { speed: 2, cost: 22 }
    },
    engraveSpeed: 250
  },
  {
    material: "MDF",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 12,
    cutSpeeds: {
      3: { speed: 5, cost: 12 },
      6: { speed: 3, cost: 15 },
      9: { speed: 2, cost: 18 }
    },
    engraveSpeed: 200
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
    material: "Glass",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 50,
    cutSpeeds: {},        // engraving-only
    engraveSpeed: 80
  },
  {
    material: "Anodized Aluminum",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 60,
    cutSpeeds: {},        // engraving-only
    engraveSpeed: 100
  },
  {
    material: "Ceramic",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 45,
    cutSpeeds: {},        // engraving-only
    engraveSpeed: 90
  },
  {
    material: "Marble",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 55,
    cutSpeeds: {},        // engraving-only
    engraveSpeed: 70
  },
  {
    material: "Tile",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 40,
    cutSpeeds: {},        // engraving-only
    engraveSpeed: 75
  },
  {
    material: "Corian",
    sheetWidth: 500,
    sheetHeight: 300,
    sheetCost: 50,
    cutSpeeds: {},        // engraving-only
    engraveSpeed: 80
  }
  // Add remaining materials similarly...
];
