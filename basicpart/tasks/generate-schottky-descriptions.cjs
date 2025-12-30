const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/parts-index.json', 'utf8'));

const targetCats = ['Schottky Diodes', 'Fast Recovery / High Efficiency Diodes', 'Bridge Rectifiers'];

function getVoltage(attrs) {
    return attrs['Voltage - DC Reverse(Vr)'] || '';
}

function getCurrent(attrs) {
    return attrs['Current - Rectified'] || '';
}

function getTrr(attrs) {
    return attrs['Reverse Recovery Time (trr)'] || '';
}

function getDiodeConfig(attrs) {
    return attrs['Diode Configuration'] || '';
}

function simplifyPackage(pkg) {
    if (!pkg || pkg === '-') return 'Unknown';
    return pkg;
}

function isDualOrArray(config) {
    if (!config) return null;
    const configLower = config.toLowerCase();
    if (configLower.includes('pair') || configLower.includes('common cathode') ||
        configLower.includes('common anode') || configLower.includes('series connection')) {
        return 'Dual';
    }
    if (configLower.includes('3 independent')) {
        return 'Triple';
    }
    return null;
}

function generateSchottkyDescription(partData) {
    const attrs = partData.attrs || {};
    const pkg = simplifyPackage(partData.pkg);

    const voltage = getVoltage(attrs);
    const current = getCurrent(attrs);
    const config = getDiodeConfig(attrs);

    const arrayType = isDualOrArray(config);

    const parts = [];
    if (voltage) parts.push(voltage);
    if (current && current !== '-') parts.push(current);

    if (arrayType) {
        parts.push(arrayType + ' Schottky');
    } else {
        parts.push('Schottky');
    }

    parts.push('(' + pkg + ')');

    return parts.join(' ');
}

function generateFastRecoveryDescription(partData) {
    const attrs = partData.attrs || {};
    const pkg = simplifyPackage(partData.pkg);

    const voltage = getVoltage(attrs);
    const current = getCurrent(attrs);
    const trr = getTrr(attrs);

    const parts = [];
    if (voltage) parts.push(voltage);
    if (current && current !== '-') parts.push(current);

    parts.push('Fast Recovery');

    if (trr) parts.push('trr=' + trr);

    parts.push('(' + pkg + ')');

    return parts.join(' ');
}

function generateBridgeDescription(partData) {
    const attrs = partData.attrs || {};
    const pkg = simplifyPackage(partData.pkg);

    const voltage = getVoltage(attrs);
    const current = getCurrent(attrs);

    const parts = [];
    if (voltage) parts.push(voltage);
    if (current && current !== '-') parts.push(current);

    parts.push('Bridge Rectifier');
    parts.push('(' + pkg + ')');

    return parts.join(' ');
}

const descriptions = {};

for (const [partId, partData] of Object.entries(data)) {
    const cat = partData.cat;
    if (cat === 'Schottky Diodes') {
        descriptions[partId] = generateSchottkyDescription(partData);
    } else if (cat === 'Fast Recovery / High Efficiency Diodes') {
        descriptions[partId] = generateFastRecoveryDescription(partData);
    } else if (cat === 'Bridge Rectifiers') {
        descriptions[partId] = generateBridgeDescription(partData);
    }
}

console.log('Generated ' + Object.keys(descriptions).length + ' descriptions');

// Show sample
let count = 0;
console.log('\n=== Sample Schottky ===');
for (const [pid, desc] of Object.entries(descriptions)) {
    if (desc.includes('Schottky') && !desc.includes('Fast')) {
        console.log(pid + ': ' + desc);
        count++;
        if (count >= 5) break;
    }
}

count = 0;
console.log('\n=== Sample Fast Recovery ===');
for (const [pid, desc] of Object.entries(descriptions)) {
    if (desc.includes('Fast Recovery')) {
        console.log(pid + ': ' + desc);
        count++;
        if (count >= 5) break;
    }
}

count = 0;
console.log('\n=== Sample Bridge Rectifiers ===');
for (const [pid, desc] of Object.entries(descriptions)) {
    if (desc.includes('Bridge Rectifier')) {
        console.log(pid + ': ' + desc);
        count++;
        if (count >= 5) break;
    }
}

fs.writeFileSync('tasks/descriptions-schottky.json', JSON.stringify(descriptions, null, 2));
console.log('\nOutput written to tasks/descriptions-schottky.json');
