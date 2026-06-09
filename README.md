# 信号矩阵 · SPY 0DTE Signal Matrix

**A pre-market + intraday decision system for SPY/SPX 0DTE options trading.**  
Built around dealer hedging mechanics, not lagging indicators.

Single HTML file · No install · No server · Open in any browser

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

**盘后 Post-Market Journal**
Named trader profiles. Each trader logs: setup seen, execution, result, reflection, discipline star rating.
Data stored per-user in localStorage. Shareable — each person who opens the URL creates their own profile.

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

## Files

```
spy_signal_matrix_v2.html   ← the tool
README.md                   ← this file
```

*Not financial advice. 仅供参考。*
