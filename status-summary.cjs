// status-summary.cjs
// Quick project overview + latest oracle data for VFT Rune on Bitcoin Testnet3
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'oracle-output';
const STATE_FILE = 'oracle-state.json';

console.log('🔍 VFT Project Status Summary');
console.log('======================================');
console.log('Rune: VFT (ID 4841932:1) on Bitcoin Testnet3');
console.log('Goal: Energy-backed allowances in a closed-loop Vegas fun economy');
console.log('Phase: Oracle prototype with daily claims + merchant simulation');
console.log('');

try {
  // Find all oracle files, newest first
  const files = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.startsWith('vft-oracle-') && f.endsWith('.json'))
    .sort((a, b) => b.localeCompare(a));

  if (files.length === 0) {
    console.log('⚠️ No oracle output files found yet.');
  } else {
    let data = null;
    let filename = '';

    // Prefer plain data file (contains energy, allowance, merchantPayload) over tx skeleton
    const dataFile = files.find(f => !f.includes('-tx-'));
    if (dataFile) {
      filename = dataFile;
      data = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, dataFile), 'utf8'));
    } else {
      // Fallback to newest file (tx skeleton)
      filename = files[0];
      data = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, filename), 'utf8'));
    }

    console.log(`Latest File: ${filename}`);
    console.log(`Run Time: ${data.runTime || data.timestamp || 'N/A'}`);
    console.log(`BTC Price: ${data.btcPrice || '$N/A (fallback)'}`);

    // Extract from plain data or from embedded message in tx file
    const ep = data.energyProductionScore || data.energyProduction || data.EP || 'N/A';
    const energyLevel = data.energyLevel || (ep !== 'N/A' ? (ep >= 70 ? 'HIGH' : ep >= 40 ? 'MEDIUM' : 'LOW') : 'N/A');
    console.log(`Energy Production Score: ${ep}/100 (${energyLevel})`);

    console.log(`Suggested Allowance: ${data.suggestedAllowance || 0} VFT`);
    console.log(`Action: ${data.action || 'MONITOR'}`);
    console.log(`New Day?: ${data.isNewDay === true || data.isNewDay === 'YES' ? 'YES → Claim Suggested' : 'NO → MONITOR'}`);

    // OP_RETURN message (from tx skeleton or plain data)
    let msg = data.opReturnMessage || data.message;
    if (!msg && data.outputs) {
      const opReturnOut = data.outputs.find(o => o.type === 'OP_RETURN');
      msg = opReturnOut ? opReturnOut.data : 'N/A';
    }
    console.log(`OP_RETURN Message: ${msg || 'N/A'}`);

    if (data.merchantPayload) {
      const mp = data.merchantPayload;
      console.log(`Merchant Distribution: ${mp.totalDistributed || 0} VFT to ${mp.recipients || 0} recipients`);
    } else if (data.merchantPayload === null || data.merchantPayload === undefined) {
      console.log('Merchant Distribution: N/A (NewDay only)');
    }

    console.log(`Rune ID: 4841932:1`);
  }

  // Persistent state
  if (fs.existsSync(STATE_FILE)) {
    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    console.log(`State → Last Run Date: ${state.lastRunDate || 'N/A'}`);
  }

} catch (err) {
  console.error('❌ Error reading files:', err.message);
}

console.log('');
console.log('✅ Testnet only. Manual review. No broadcasting.');
console.log('Commands:');
console.log('  node vft-oracle.cjs          → Run oracle');
console.log('  node review-oracle.cjs       → Detailed review');
console.log('  node status-summary.cjs      → This quick overview');