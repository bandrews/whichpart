const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./src/data/parts-index.json", "utf8"));

// Find all Zener Diodes entries
const zenerDiodes = Object.entries(data).filter(([id, part]) => part.cat === "Zener Diodes");

const descriptions = {};

zenerDiodes.forEach(([id, part]) => {
  const attrs = part.attrs || {};
  const pkg = part.pkg || "";

  // Get zener voltage - try different possible attribute names
  let zenerVoltage = attrs["Zener Voltage(Nom)"] || attrs["Zener Voltage"] || attrs["VZ"] || "";

  // Get power rating
  let power = attrs["Pd - Power Dissipation"] || attrs["Power"] || attrs["Power Dissipation"] || "";

  // Get tolerance if available
  let tolerance = attrs["Tolerance"] || "";

  // Build the description
  let desc = "";

  if (zenerVoltage) {
    desc += zenerVoltage;
  }

  if (power) {
    desc += " " + power;
  }

  // Add tolerance if notable (like +-2% or similar)
  if (tolerance && tolerance !== "" && !tolerance.includes("5%")) {
    desc += " " + tolerance;
  }

  desc += " Zener (" + pkg + ")";

  // Clean up the description
  desc = desc.trim();

  descriptions[id] = desc;
});

// Output as JSON
console.log(JSON.stringify(descriptions, null, 2));
