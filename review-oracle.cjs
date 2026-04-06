// review-oracle.cjs - Updated for Step 12+ (prefers main output, handles tx skeletons)
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'oracle-output');
const STATE_FILE = path.join(__dirname, 'oracle-state.json');

// Get all files, prefer main oracle json over tx skeletons
let files = fs.readdirSync(OUTPUT_DIR)
  .filter(f => f.startsWith('vft-oracle-') && f.endsWith('.json') && !f.includes('tx-'))
  .map(f => {
    const fullPath = path.join(OUTPUT_DIR, f);
    const stats = fs.statSync(fullPath);
    return { name: f, path: fullPath, mtime: stats.mtime };
  })
  .sort((a, b) => b.mtime - a.mtime);

if (files.length === 0) {
  // fallback to any file if no main output
  files = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.startsWith('vft-oracle-') && f.endsWith('.json'))
    .map(f => {
      const fullPath = path.join(OUTPUT_DIR, f);
      const stats = fs.statSync(fullPath);
      return { name: f, path: fullPath, mtime: stats.mtime };
    })
    .sort((a, b) => b.mtime - a.mtime);
}

const latest = files[0];
const data = JSON.parse(fs.readFileSync(latest.path, 'utf8'));

let state = { lastRunDate: 'None' };
if (fs.existsSync(STATE_FILE)) {
  try { state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch (e) {}
}

console.log('📋 VFT Oracle Review (Updated for Merchant + Energy)');
console.log('==================================================');
console.log(`Latest File: ${latest.name}`);
console.log(`Run Time: ${data.timestamp || 'N/A'}`);
console.log(`BTC Price: $${data.btcPrice || 'N/A'} (fallback)`);
console.log(`Energy Production Score: ${(data.energyProduction || 'N/A')}/100 (${data.energyLevel || 'N/A'})`);
console.log(`Suggested Allowance: ${(data.suggestedAllowance || 0)} VFT`);
console.log(`Action: ${data.action || 'N/A'}`);
console.log(`New Day?: ${data.isNewDay === true ? 'YES → Claim Suggested' : 'NO → Monitor Only'}`);
console.log(`OP_RETURN Message: ${data.message || 'N/A'}`);
if (data.merchantPayload) console.log(`Merchant Payload: ${JSON.stringify(data.merchantPayload)}`);
console.log(`Rune ID: ${data.runeId || '4841932:1'}`);
console.log(`\nState → Last Run Date: ${state.lastRunDate || 'None'}`);
console.log('\n✅ Review complete. Testnet only.');