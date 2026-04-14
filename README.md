# VFT Oracle Prototype

**Energy-backed Oracle for Vegas Fun Token (VFT)** on Bitcoin Testnet3 (Rune ID: **4841932:1**)

A demonstration of a fiat-free, closed-loop economy where energy production generates daily VFT allowances that flow to merchants for Vegas-style entertainment — all on native Bitcoin Runes.

## Features

- Daily scheduling with persistent state (`oracle-state.json`)
- Energy Production Score (60–99) drives dynamic VFT allowances
- NewDay logic for `SUGGEST_CLAIM` actions
- Closed-loop merchant reimbursement simulation (8 sample testnet merchants)
- Compact OP_RETURN messages (<80 bytes) for Rune inscriptions
- Enhanced PSBT skeletons that include merchant outputs on NewDay runs
- Clean review tools (`status-summary.cjs` and `review-oracle.cjs`)

## Quick Start

```bash
# 1. Clone or navigate to the project
cd vft-project

# 2. Run the oracle
node vft-oracle.cjs

# 3. Review results
node status-summary.cjs
node review-oracle.cjs