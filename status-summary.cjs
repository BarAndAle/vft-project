// status-summary.cjs
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'oracle-output';
const STATE_FILE = 'oracle-state.json';

console.log('🔍 VFT Project Status Summary');
console.log('======================================');
console.log('Rune: VFT (ID 4841932:1) on Bitcoin Testnet3');
console.log('Goal: Energy-backed allowances in a closed-loop Vegas fun economy');
console.log('Phase: Finished Oracle Prototype');
console.log('');

try {
  const files = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.startsWith('vft-oracle-') && f.endsWith('.json'))
    .sort((a, b) => b.localeCompare(a));

  // Prefer rich data file over tx skeleton
  let dataFile = files.find(f => !f.includes('-tx-'));
  if (!dataFile) dataFile = files[0]; // fallback

  const latestFile = path.join(OUTPUT_DIR, dataFile);
  const data = JSON.parse(fs.readFileSync(latestFile, 'utf8'));

  console.log(`Latest File: ${dataFile}`);
  console.log(`Run Time: ${data.runTime || 'N/A'}`);
  console.log(`BTC Price: ${data.btcPrice || '$67417 (fallback)'}`);
  console.log(`Energy Production Score: ${data.energyProductionScore || 'N/A'}/100 (${data.energyLevel || 'N/A'})`);
  console.log(`Suggested Allowance: ${data.suggestedAllowance || 0} VFT`);
  console.log(`Action: ${data.action || 'MONITOR'}`);
  console.log(`New Day?: ${data.isNewDay ? 'YES → Claim Suggested' : 'NO → MONITOR'}`);

  let msg = data.opReturnMessage || 'N/A';
  console.log(`OP_RETURN Message: ${msg}`);

  if (data.merchantPayload) {
    const mp = data.merchantPayload;
    console.log(`Merchant Distribution: ${mp.totalDistributed || 0} VFT to ${mp.recipients || 0} recipients`);
    if (mp.perRecipient) console.log(`  (~${mp.perRecipient} VFT per merchant)`);
  }

  console.log(`Rune ID: 4841932:1`);

} catch (err) {
  console.error('❌ Error:', err.message);
}

if (fs.existsSync(STATE_FILE)) {
  const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  console.log(`State → Last Run Date: ${state.lastRunDate || 'N/A'}`);
}

console.log('');
console.log('✅ Testnet only. Manual review. No broadcasting.');