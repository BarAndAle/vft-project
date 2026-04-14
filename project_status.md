# VFT Project Status
**Network**: Bitcoin Testnet3 | **Updated**: April 14, 2026
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

### Finished Oracle Prototype (Step 20+)
**Status**: Complete, polished, and ready for collaboration

#### Core Features
- Daily scheduling + persistent state (oracle-state.json)
- Simulated Energy Production Score (60-99) driving dynamic allowances
- NewDay detection -> SUGGEST_CLAIM with energy-backed VFT amount
- Merchant reimbursement simulation (closed-loop Vegas fun economy)
  - 8 sample testnet merchant addresses with individual amounts
- Compact OP_RETURN messages (<80 bytes) ready for inscription
- Enhanced PSBT skeleton that includes merchant outputs on NewDay runs
- Quick status tools: status-summary.cjs, review-oracle.cjs

#### Quick Commands
node vft-oracle.cjs          # Run oracle (generates rich data + enhanced PSBT)
node status-summary.cjs      # Fast overview
node review-oracle.cjs       # Detailed review with full merchant list

### Latest NewDay Example (2026-04-14)
- Energy Production Score: 84/100 (HIGH)
- Suggested Daily Allowance: 210 VFT
- Action: SUGGEST_CLAIM
- Merchant Distribution: 2,100 VFT across 8 sample merchants (~262 VFT each)
- Merchants: Casino Floor, Show Tickets, Hotel Rooms, Restaurant, Pool & Spa, Nightclub, Golf Course, Arcade/Games
- OP_RETURN Message: VFT:$67417 E:HIGH EP:84 ACT:SUGGEST_CLAIM Allow:210 T:2026-04-14 NewDay
- PSBT Skeleton: Includes OP_RETURN + 8 merchant outputs + change (manual review only)

### Vision Achieved
This prototype demonstrates energy-backed VFT allowances in a fiat-free, Bitcoin-native closed-loop system for Vegas-style fun/entertainment.  
Allowances generated from energy production, claimed via participation, merchants reimbursed in VFT - no fiat, no exchanges.

**Ready for collaboration**: Share the full vft-project folder with your Moltbook agent or others.

**Testnet only.** All outputs for manual review. No broadcasting.

**Finished Oracle Prototype - Clean, documented, and enhanced.**