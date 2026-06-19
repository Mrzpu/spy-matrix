# 信号矩阵 · SPY 0DTE Signal Matrix

**A pre-market + intraday decision system for SPY/SPX 0DTE options trading.**  
Built around dealer hedging mechanics, not lagging indicators.

Single HTML file · the three decision tabs run fully client-side · an optional AI copilot (盘伴) adds a live-board chat layer through a small serverless proxy · deployed on Vercel

---

## Core Philosophy

Price movement in SPY is largely a *consequence* of dealer hedging on the options chain.
The system's only question is: **what are market makers mechanically forced to do right now?**

This is not a signal-chasing system. It's a friction-removal system — the default state
is "do nothing," and conditions must actively earn the right to trade.

---

## Three Tabs

**盘前 Pre-Market**
Input EMA stack + GEX + DEX (3 button clicks).
System outputs directional bias, recommended strategy, entry trigger, exit target, abort condition.
Includes collapsible mindset + discipline panel with interactive pre-trade checklist (3 confirmations required).

**盘中 Intraday Referee**
Input current price, VWAP, Call Wall, Put Wall, HVL + GEX/DEX toggles.
System outputs: zone position bar with live distance metrics, MM behavior verdict, contextual 是/否 entry questions embedded directly in the verdict card.
Auto-guards: 9:30–9:45 ET opening lockout, 2:00–4:00 PM ET afternoon warning.
Runs on binary GEX/DEX toggles — by design it stays neutral at decision points it cannot
resolve with binary data alone (see 盘伴 below for where the committed call lives).

**盘后 Post-Market Journal**
Named trader profiles. Each trader logs: setup seen, execution, result, reflection, discipline star rating.
Data stored per-user in localStorage. Shareable — each person who opens the URL creates their own profile.

---

## 盘伴 — Live AI Copilot

A persistent chat docked in the corner (drag the top edge to resize its height). Every message
is sent with a live board snapshot auto-attached — price / walls / HVL / VWAP / GEX·DEX / current
verdict / ET time — so it answers against the current tape, not in the abstract. The full framework
below is written into its system prompt; it is not a general assistant, it runs this exact method.
Plain-text replies only, kept short — you're watching the tape.

Two providers, both proxied server-side (no key ever in the browser):
- **DeepSeek** — default, cheap, for routine reads
- **Claude Sonnet** — for the reads that need a sharper hand

**Beyond binary — the three axes.** Where the 盘中 referee sees only binary toggles, the copilot
takes the real numbers and reads three independent axes:
- **价位 / structure** — price vs Put/Call Wall, HVL, VWAP
- **DEX absolute value** — sign + magnitude (~50M = noise, ~400M = real fuel)
- **velocity (1D)** — which direction, and how fast, the value is changing

Value and velocity can disagree, and the disagreement is the signal. A break below HVL is not
automatically a breakdown: with deep-negative DEX and no buying fuel it's a real **Negative
Transition** (Put); with DEX crossing to genuine positive it's a **诱空 bear trap** — don't short
the break. A bounce on still-deep-negative DEX is distribution (**诱多 dead-cat**) — hold, not exit.
The committed directional call lives here, where the data supports it — not in the binary referee.

**Position-hold / exit mode.** When you say you're in a position, the copilot switches modes.
It does **not** ask your P&L — P&L anchoring is what triggers early exits. It asks only the three
axes, then enforces:
- Scale out **1/3 at the first target** (next wall / measured move) — bank enough to quiet the fear
- **Trail the remaining 2/3** behind the prior swing (lower-high for Puts, higher-low for Calls)
- Exit the runner only on a signal: **velocity rolls** (1D stops accelerating / crosses back), or **price reclaims the prior swing high**
- **Near the close, tighten** — 0DTE gamma-reversal asymmetry turns against a holder late
- When the signal still supports holding and you want out, it **pushes back**: that's a heartbeat, not the tape

It's an unflinching second opinion, not a lock — it reads only the numbers you feed it, and it
can't stop your finger on the sell button.

---

## Signal Logic

| Signal | Positive | Negative |
|--------|----------|----------|
| **GEX** | MM买跌卖涨，pin tendency，walls hold | MM追涨杀跌，trend amplified，walls can break |
| **DEX** | Net delta buying，buy-side dominant | Net delta selling，sell-side dominant |
| **EMA 9/20/50** | Bull stack，retail confidence高 | Bear stack，structural downtrend |

**The Trap Setup (highest-conviction):**
EMA bull + GEX neg + DEX pos = retail chases the open, MMs let it run, then reverse.
Wait for rally → Call Wall approach → volume shrinks → DEX decelerating → enter Put.
Abort if price breaks Call Wall with expanding volume on multiple candles.

**Key insight:** EMA systems work in negative GEX (MMs amplify trend).
In positive GEX they become grinders — price whipsaws around the EMA, every cross is a trap.
GEX is the veto layer. Chart signal + wrong MM direction = skip the trade.

---

## Intraday Zone Priority (highest to lowest)

1. Price broke Put Wall + GEX neg → trend Put, old support is new resistance
2. Price broke Call Wall + GEX neg → trend Call, old resistance is new support
3. Near Call Wall + GEX neg + DEX pos → Trap Setup, Put entry window
4. Near VWAP + GEX pos → friction zone, no trade
5. VWAP battle zone + GEX neg → decision line, wait for direction then follow with volume
6. Below VWAP + below HVL + GEX neg → wait for VWAP rejection, then Put
7. Above VWAP + GEX pos → pullback buyable, Call / Call Spread

---

## Hard Rules

1. No trade first 15 minutes
2. Max 5 trades per day  
3. No new positions after 2:00 PM ET without existing hold
4. No structure = no trade
5. Log every trade — win or lose
6. GEX is veto — if the chart says buy but MMs must sell, skip it

---

## VWAP in This System

VWAP is **not** a pre-market signal. It's an intraday tactical reference only:
- GEX pos + near VWAP → do nothing (friction zone)
- GEX neg + price below VWAP → VWAP is ceiling, wait for rejection to short
- GEX neg + VWAP as battle zone → breakout with volume determines next move

---

## Files & Deployment

```
index.html        ← the tool: three tabs + 盘伴 copilot
api/chat.js       ← serverless proxy for the copilot (routes DeepSeek / Claude)
README.md         ← this file
```

The three decision tabs run entirely in the browser (localStorage only — no account, no backend).
The 盘伴 copilot posts to `/api/chat`, which forwards to DeepSeek or Anthropic with keys held as
Vercel environment variables — `DEEPSEEK_API_KEY` and `ANTHROPIC_API_KEY` — never exposed to the browser.

*Not financial advice. 仅供参考。*
