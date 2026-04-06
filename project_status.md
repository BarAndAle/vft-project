# VFT Project Status
**Network**: Bitcoin Testnet3 | **Updated**: April 6, 2026
---
### Rune Details
| Field | Value |
|---|---|
| **Rune Name** | VFT |
| **Rune ID** | 4841932:1 |
| **Etch Transaction** | 70c559f55d9436c0b81c593e548ec081caa1ffc53db349ddd25f820d0285cca5 |
| **Confirmed Block** | 4841932 |
| **Premine** | 150,000,000 VFT (attached to dust UTXO) |
| **Mint Terms** | Closed |
| **Divisibility** | 0 (whole units) |
| **Symbol** | V |
| **Wallet** | Sparrow Wallet - tb1qet6rveaxx6655felxl6cgaltfsf27p5m7s8g03 |

### Finished Oracle Prototype (vft-oracle.cjs) - Step 20
**Status**: Complete and demo-ready for Moltbook collaboration

#### Core Features Implemented
- Daily scheduling + persistent state (oracle-state.json)
- Simulated Energy Production Score (60-99) driving dynamic allowances
- NewDay detection -> SUGGEST_CLAIM with energy-backed VFT amount
- Merchant reimbursement simulation (closed-loop Vegas fun economy)
  - 8 sample testnet merchant addresses with individual amounts
- Compact OP_RETURN messages (<80 bytes) ready for inscription
- Transaction skeletons (PSBT-style) generated for manual review only
- Quick status tools: status-summary.cjs and review-oracle.cjs

#### Quick Commands
node vft-oracle.cjs          # Run oracle
node status-summary.cjs      # Fast overview
node review-oracle.cjs       # Detailed review

### Latest NewDay Example (2026-04-06)
- Energy Production: HIGH (EP:74)
- Suggested Allowance: 185 VFT
- Merchant Distribution: 1,850 VFT across 8 sample merchants (with testnet addresses)
- OP_RETURN: VFT:$67417 E:HIGH EP:74 ACT:SUGGEST_CLAIM Allow:185 T:2026-04-06 NewDay

### Vision Achieved
This prototype demonstrates energy-backed VFT allowances in a fiat-free, Bitcoin-native closed-loop system for Vegas-style fun/entertainment — allowances generated from "energy production," claimed via participation, and merchants reimbursed in VFT. No exchanges or fiat ramps required.

**Ready for next phase**: Share the full vft-project folder with your personal agent on Moltbook for collaborative improvements before going live.

**Testnet only.** All outputs for manual review. No broadcasting.

✅ **Finished Oracle Prototype - Ready for handover.**