// vft-oracle.cjs
// VFT Oracle - Finished Prototype with Merchant PSBT Outputs
// Testnet only - no broadcasting

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'oracle-output';
const STATE_FILE = 'oracle-state.json';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

// Sample testnet merchant addresses (Vegas-themed for closed-loop demo)
const SAMPLE_MERCHANTS = [
  { id: 1, address: 'tb1qet6rveaxx6655felxl6cgaltfsf27p5m7s8g03', note: 'Casino Floor' },
  { id: 2, address: 'tb1q5f2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m', note: 'Show Tickets' },
  { id: 3, address: 'tb1q9m8n7o6p5q4r3s2t1u0v9w8x7y6z5a4b3c2d1e', note: 'Hotel Rooms' },
  { id: 4, address: 'tb1q1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s', note: 'Restaurant' },
  { id: 5, address: 'tb1q0z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h', note: 'Pool & Spa' },
  { id: 6, address: 'tb1q2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z', note: 'Nightclub' },
  { id: 7, address: 'tb1q4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s', note: 'Golf Course' },
  { id: 8, address: 'tb1q3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l', note: 'Arcade/Games' }
];

// Load or initialize state
let state = { lastRunDate: null };
if (fs.existsSync(STATE_FILE)) {
  state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

const today = new Date().toISOString().split('T')[0];
const isNewDay = state.lastRunDate !== today;

// Simulated data
const btcPrice = 67417;
const energyProductionScore = Math.floor(60 + Math.random() * 40); // 60-99
const energyLevel = energyProductionScore >= 70 ? 'HIGH' : energyProductionScore >= 40 ? 'MEDIUM' : 'LOW';

let suggestedAllowance = 0;
let action = 'MONITOR';
let merchantPayload = null;

if (isNewDay) {
  suggestedAllowance = Math.floor(energyProductionScore * 2.5);
  action = 'SUGGEST_CLAIM';

  const totalDistributed = suggestedAllowance * 10;
  const perRecipient = Math.floor(totalDistributed / SAMPLE_MERCHANTS.length);

  merchantPayload = {
    date: today,
    totalDistributed,
    recipients: SAMPLE_MERCHANTS.length,
    perRecipient,
    merchants: SAMPLE_MERCHANTS.map(m => ({
      ...m,
      amount: perRecipient
    })),
    note: 'Reimbursement for fun/entertainment services - closed-loop VFT economy'
  };
}

// Compact OP_RETURN message
const opReturnMessage = `VFT:$${btcPrice} E:${energyLevel} EP:${energyProductionScore} ACT:${action} Allow:${suggestedAllowance} T:${today}${isNewDay ? ' NewDay' : ' SameDay'}`;

// Build enhanced PSBT skeleton with merchant outputs on NewDay
const outputs = [{
  index: 0,
  type: 'OP_RETURN',
  data: opReturnMessage,
  satoshis: 0
}];

// Add merchant outputs only on NewDay (each gets dust + amount in sats for demo)
if (isNewDay && merchantPayload) {
  merchantPayload.merchants.forEach((merchant, idx) => {
    outputs.push({
      index: idx + 1,
      type: 'merchant',
      address: merchant.address,
      satoshis: 546, // dust
      note: `${merchant.note} - ${merchant.amount} VFT`,
      vftAmount: merchant.amount
    });
  });
}

// Change output (last)
outputs.push({
  index: outputs.length,
  type: 'change',
  address: 'tb1qet6rveaxx6655felxl6cgaltfsf27p5m7s8g03',
  satoshis: 800 - (outputs.length * 546) // rough fee adjustment
});

const txSkeleton = {
  version: 2,
  locktime: 0,
  inputs: [{
    txid: '8823acfe343942038b1544c459e251c42ecb16c63fd7addb68dc92650cd714c8',
    vout: 1,
    satoshis: 800,
    address: 'tb1qet6rveaxx6655felxl6cgaltfsf27p5m7s8g03',
    sequence: 4294967295
  }],
  outputs,
  totalInput: 800,
  totalOutput: outputs.reduce((sum, o) => sum + (o.satoshis || 0), 0),
  fee: 200,
  messageLength: opReturnMessage.length,
  messageHex: Buffer.from(opReturnMessage, 'utf8').toString('hex')
};

// Save rich data file + tx skeleton
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const dataFile = `vft-oracle-${timestamp}.json`;
const txFile = `vft-oracle-tx-${timestamp}.json`;

const richData = {
  runTime: new Date().toISOString(),
  btcPrice: `$${btcPrice} (fallback)`,
  energyProductionScore,
  energyLevel,
  suggestedAllowance,
  action,
  isNewDay,
  opReturnMessage,
  merchantPayload
};

fs.writeFileSync(path.join(OUTPUT_DIR, dataFile), JSON.stringify(richData, null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, txFile), JSON.stringify(txSkeleton, null, 2));

// Update state
state.lastRunDate = today;
fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));

console.log('✅ VFT Oracle Run Complete (with Merchant PSBT Outputs)');
console.log(`Date: ${today} | NewDay: ${isNewDay}`);
console.log(`Action: ${action} | Allowance: ${suggestedAllowance} VFT`);
console.log(`Energy: ${energyProductionScore}/100 (${energyLevel})`);
if (merchantPayload) {
  console.log(`Merchant Distribution: ${merchantPayload.totalDistributed} VFT to ${merchantPayload.recipients} recipients`);
}
console.log(`OP_RETURN: ${opReturnMessage}`);
console.log(`Files: ${dataFile} and ${txFile}`);
console.log('📋 Review: node status-summary.cjs');
console.log('Testnet only. Manual review. No broadcasting.');