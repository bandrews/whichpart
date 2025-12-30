const fs = require("fs");
const data = JSON.parse(fs.readFileSync("/Users/bandrews/src/whichpart/basicpart/src/data/parts-index.json", "utf8"));

const descriptions = {};

// Helper to extract RDS value (first part before @)
function extractRds(rdsStr) {
  if (!rdsStr || rdsStr === "-") return null;
  // Format like "10Ω@5V,100mA" or "48mΩ@2.5V" - extract the resistance value
  const match = rdsStr.match(/^([\d.]+[mkμ]?Ω)/i);
  if (match) return match[1];
  return rdsStr.split("@")[0];
}

// Helper to determine BJT type from various sources
function getBjtType(part) {
  const type = part.attrs["type"];
  const number = part.attrs["Number"] || "";
  const mpn = part.mpn || "";
  const desc = part.desc || "";

  // Check direct type attribute
  if (type && type !== "-" && type !== "undefined") {
    return type;
  }

  // Check Number field
  if (number.includes("NPN")) return "NPN";
  if (number.includes("PNP")) return "PNP";

  // Check description
  if (desc.includes("NPN+PNP") || desc.includes("NPN/PNP")) return "NPN+PNP";
  if (desc.includes(" NPN ") || desc.startsWith("NPN ") || desc.endsWith(" NPN")) return "NPN";
  if (desc.includes(" PNP ") || desc.startsWith("PNP ") || desc.endsWith(" PNP")) return "PNP";

  // Infer from well-known MPN patterns
  const mpnUpper = mpn.toUpperCase();
  // PNP transistors (2907, 3906, 2906, 5401, etc.)
  if (mpnUpper.includes("2907") || mpnUpper.includes("3906") || mpnUpper.includes("2906") ||
      mpnUpper.includes("5401") || mpnUpper.includes("S9012") || mpnUpper.includes("S9015") ||
      mpnUpper.includes("S8550") || mpnUpper.includes("BC807") || mpnUpper.includes("BC857")) {
    return "PNP";
  }
  // NPN transistors (2222, 3904, 5551, etc.)
  if (mpnUpper.includes("2222") || mpnUpper.includes("3904") || mpnUpper.includes("2N2222") ||
      mpnUpper.includes("5551") || mpnUpper.includes("S9013") || mpnUpper.includes("S9014") ||
      mpnUpper.includes("S8050") || mpnUpper.includes("BC817") || mpnUpper.includes("BC847")) {
    return "NPN";
  }

  return null;
}

// Helper to determine MOSFET type
function getMosfetType(part) {
  const type = part.attrs["Type"];
  const number = part.attrs["Number"] || "";

  if (type && type !== "-" && type !== "undefined") {
    return type;
  }

  // Check Number field
  if (number.toLowerCase().includes("n-channel") || number.toLowerCase().includes("n channel")) {
    return "N-Channel";
  }
  if (number.toLowerCase().includes("p-channel") || number.toLowerCase().includes("p channel")) {
    return "P-Channel";
  }

  // Check description
  if (part.desc.includes("N-Channel") || part.desc.includes("N-channel")) {
    return "N-Channel";
  }
  if (part.desc.includes("P-Channel") || part.desc.includes("P-channel")) {
    return "P-Channel";
  }

  return null;
}

// Process BJTs
for (const [partId, part] of Object.entries(data)) {
  if (part.cat === "Bipolar (BJT)") {
    const type = getBjtType(part);
    const vce = part.attrs["Collector - Emitter Voltage VCEO"] || "";
    const ic = part.attrs["Current - Collector(Ic)"] || "";
    const pkg = part.pkg || "";

    let desc = "";
    if (type) desc += type;
    if (vce) desc += (desc ? " " : "") + vce;
    if (ic) desc += (desc ? " " : "") + ic;
    desc += " BJT (" + pkg + ")";
    descriptions[partId] = desc;
  }
}

// Process MOSFETs
for (const [partId, part] of Object.entries(data)) {
  if (part.cat === "MOSFETs") {
    const type = getMosfetType(part);
    const vds = part.attrs["Drain to Source Voltage"] || "";
    const id = part.attrs["Current - Continuous Drain(Id)"] || "";
    const rdsRaw = part.attrs["RDS(on)"];
    const rds = extractRds(rdsRaw);
    const pkg = part.pkg || "";

    let desc = "";
    if (type) desc += type;
    if (vds) desc += (desc ? " " : "") + vds;
    if (id) desc += (desc ? " " : "") + id;
    if (rds) desc += (desc ? " " : "") + rds;
    desc += " MOSFET (" + pkg + ")";
    descriptions[partId] = desc;
  }
}

// Process Darlington Arrays
for (const [partId, part] of Object.entries(data)) {
  if (part.cat === "Darlington Transistor Arrays") {
    const channels = part.attrs["number of channels"] || "";
    const vce = part.attrs["Collector - Emitter Voltage VCEO"] || "";
    const ic = part.attrs["Current - Collector(Ic)"] || "";
    const pkg = part.pkg || "";

    let desc = "";
    if (channels) desc += channels + "ch";
    if (vce) desc += (desc ? " " : "") + vce;
    if (ic) desc += (desc ? " " : "") + ic;
    desc += " Darlington Array (" + pkg + ")";
    descriptions[partId] = desc;
  }
}

console.log("Total descriptions generated:", Object.keys(descriptions).length);
console.log("\nSample descriptions:");
let count = 0;
for (const [partId, desc] of Object.entries(descriptions)) {
  if (count < 20) {
    console.log(partId + ": " + desc);
    count++;
  }
}

// Write to file
fs.writeFileSync("/Users/bandrews/src/whichpart/basicpart/tasks/descriptions-transistors.json", JSON.stringify(descriptions, null, 2));
console.log("\nWritten to /Users/bandrews/src/whichpart/basicpart/tasks/descriptions-transistors.json");
