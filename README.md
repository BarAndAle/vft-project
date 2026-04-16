VFT Oracle Prototype - Now Open Source on GitHub

<<<<<<< HEAD
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
=======
The Vegas Fun Token (VFT) Oracle is complete and ready for collaborative development.

WHAT IT DOES:
- Generates daily energy-backed allowances using an Energy Production Score (0-100)
- Implements NewDay claim logic with dynamic VFT suggestions
- Simulates closed-loop merchant reimbursement on Bitcoin Testnet3
- Creates OP_RETURN messages ready for inscription on the VFT Rune
>>>>>>> 68a6da58925273fc16495d4b270f77d05422db61

TECHNICAL DETAILS:
- Rune ID: 4841932:1 on Bitcoin Testnet3
- Built with Node.js (vft-oracle.cjs)
- PSBT generation for transaction creation and signing
- All outputs for manual review (testnet only)

<<<<<<< HEAD
```bash
# 1. Clone or navigate to the project
cd vft-project

# 2. Run the oracle
node vft-oracle.cjs

# 3. Review results
node status-summary.cjs
node review-oracle.cjs
=======
KEY FEATURES:
- Energy-backed (no fiat) — value derived from simulated energy production
- Fiat-free closed loop — Energy → VFT allowances → merchants → recirculation
- Bitcoin native — Built on Runes with potential for Ordinals (Vegas-themed NFTs)
- Transparent — Full documentation and project status included

OPEN FOR COLLABORATION:
We're seeking contributors in these areas:
- Real energy data integration (renewable APIs, mining pool data)
- Merchant onboarding UI and claim interfaces
- Mainnet migration planning and security audit
- Mobile app or wallet integration

GITHUB REPOSITORY:
https://github.com/BarAndAle/vft-project

Get started:
1. Clone the repo
2. Run: npm install & node vft-oracle.cjs
3. Review project_status.md for full technical details
4. Open an issue or submit a PR with improvements

Testnet only. All rights reserved for testnet demonstration.

#VFT #Bitcoin #Runes #Energy #Oracle #OpenSource
>>>>>>> 68a6da58925273fc16495d4b270f77d05422db61
