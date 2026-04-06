VFT Oracle Prototype - Now Open Source on GitHub

The Vegas Fun Token (VFT) Oracle is complete and ready for collaborative development.

WHAT IT DOES:
- Generates daily energy-backed allowances using an Energy Production Score (0-100)
- Implements NewDay claim logic with dynamic VFT suggestions
- Simulates closed-loop merchant reimbursement on Bitcoin Testnet3
- Creates OP_RETURN messages ready for inscription on the VFT Rune

TECHNICAL DETAILS:
- Rune ID: 4841932:1 on Bitcoin Testnet3
- Built with Node.js (vft-oracle.cjs)
- PSBT generation for transaction creation and signing
- All outputs for manual review (testnet only)

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
2. Run: npm install && node vft-oracle.cjs
3. Review project_status.md for full technical details
4. Open an issue or submit a PR with improvements

Testnet only. All rights reserved for testnet demonstration.

#VFT #Bitcoin #Runes #Energy #Oracle #OpenSource
