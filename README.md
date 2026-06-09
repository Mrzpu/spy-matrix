# 信号矩阵 · SPY 0DTE Signal Matrix

**SPY/SPX 零日期权的盘前决策 + 盘中裁判系统。**

> Single HTML file · No install · No server · Open in any browser  
> 单文件 · 无依赖 · 浏览器直接打开 · 发链接即可分享

---

## Philosophy / 设计哲学

不问"市场要去哪"，只问"做市商此刻被迫做什么？"

This tool is built on a single premise: in highly liquid, options-heavy tickers like SPY, spot price movement is often a *consequence* of dealer hedging on the options chain, not the other way around. The system codifies that logic into two layers — a pre-market strategic read and an intraday tactical referee — so you don't have to re-derive it each morning while half-asleep on Pacific time.

---

## Two-Layer Architecture / 双层架构

### Layer 1 — 盘前（Pre-Market）

**Purpose:** Set the day's directional bias and strategy *before* the open. No prices to input, no noise.

**Inputs (3 buttons):**

| Signal | What to read | Source |
|--------|-------------|--------|
| **EMA Stack** (9/20/50) | Bullish / Bearish / Flat alignment on 5m or 15m | TradingView |
| **GEX** | Positive (stabilizing) or Negative (amplifying) | TanukiTrade / SpotGamma |
| **DEX** | Positive (buy-side) or Negative (sell-side) | TanukiTrade · Net Delta |

**Outputs:**

- Direction — Call / Put / Neutral
- Signal quality — High / Mid / Low
- Recommended strategies — Buy Call, Buy Put, Call Spread, Put Spread, Iron Condor, Butterfly
- Strategies to avoid
- Best time window, entry trigger, exit target, abort condition
- Auxiliary signal modifiers (VIX, HVL, Volume, OPEX, DEX Velocity, Macro Event)

**12 signal combinations are pre-mapped.** Click three buttons, read the card. Done.

---

### Layer 2 — 盘中（Intraday Referee）

**Purpose:** Once the market is open, input live levels and let the system tell you whether to act or step away.

**Inputs (5 numbers + 2 toggles):**

| Input | What it is | Where to read |
|-------|-----------|---------------|
| **Current Price** | SPY last price | Any chart |
| **VWAP** | Volume-weighted average price | TradingView |
| **Call Wall** | Highest call OI strike above price | TanukiTrade |
| **Put Wall** | Highest put OI strike below price | TanukiTrade |
| **HVL** | High Volatility Level | TanukiTrade |
| **GEX** +/− | Intraday GEX read | TanukiTrade |
| **DEX** +/− | Intraday DEX read | TanukiTrade |

**The system auto-calculates:**

- Which zone the price is in relative to all key levels
- A visual price bar showing position vs Put Wall / HVL / VWAP / Call Wall
- A verdict with one of four states:

| State | Color | Meaning |
|-------|-------|---------|
| **可以操作** | Teal | Setup is valid. Specific action provided. |
| **等待** | Amber | Conditions are forming but not confirmed. Wait. |
| **禁止 · 把手离开键盘** | Vermillion | Friction zone. No edge. Do nothing. |
| **待定** | Gray | Insufficient data or ambiguous positioning. |

**Built-in protections:**

- **Opening guard (9:30–9:45 ET):** Red warning bar auto-appears during the first 15 minutes. Disappears automatically after.
- **VWAP friction zone:** If price is within ±0.3% of VWAP and GEX is positive → automatic "把手离开键盘" verdict. No action has an edge here.
- **Call Wall / Put Wall proximity detection:** System detects when price nears a wall and adjusts verdict based on GEX sign (wall holds vs wall breaks).

---

## Zone Logic / 区间判断逻辑

The referee layer uses price position relative to five levels plus GEX/DEX state to determine the zone. The key scenarios:

| Condition | Verdict | Logic |
|-----------|---------|-------|
| Near VWAP + GEX pos | **禁止** | MM双向压制，摩擦区 |
| Near Call Wall + GEX neg + DEX pos | **⚡ Trap Setup** | 散户追高，MM即将反向抛售 |
| Near Call Wall + GEX pos | **禁止** | 结构性天花板，追多必死 |
| Near Put Wall + GEX pos | **禁止** | 结构性地板，做空必死 |
| Near Put Wall + GEX neg | **警戒** | 支撑可能击穿，观察 |
| Below VWAP + Below HVL + GEX neg | **做空** | 弱势结构，等反抽VWAP做put |
| Above VWAP + Above HVL + GEX neg + DEX pos | **警戒** | 反弹中但地基不稳，等trap |
| Above VWAP + GEX pos | **做多** | VWAP支撑有效，可做call |
| Below VWAP + GEX pos | **等待** | 有缓冲但偏弱，等企稳 |

---

## The Trap Setup — Core System / 核心系统

```
Pre-market:  EMA Bull + GEX Negative + DEX Positive
Intraday:    Price approaching Call Wall + DEX decelerating
```

**What's happening:** Retail sees bullish EMA and chases the open. DEX+ confirms buying. GEX− means MMs aren't providing structural support — they're letting the rally happen. When price hits the Call Wall, MMs must sell to hedge. The rally reverses.

**Execution:**

1. 盘前确认 EMA/GEX/DEX 三信号 ✓
2. 9:30–9:45 — 观察拉升，不追
3. 盘中tab输入关键位 → 系统追踪价格位置
4. 价格接近 Call Wall → 系统输出 "⚡ Trap Setup"
5. 确认K线（上影线/吞没/缩量）→ Buy Put
6. 系统显示价格接近 Put Wall → 止盈区间
7. **Abort：** 价格放量突破 Call Wall 不回头 → 立刻平仓

---

## Entry Checklist / 入场确认

The model tells you **what to do today** (strategic). The entry checklist tells you **when to pull the trigger** (tactical). These are two separate decisions.

The checklist lives in the intraday tab, below the referee verdict. Select Put or Call direction, then confirm conditions one by one. **5 or more confirmed = entry signal.**

### Put Entry Checklist

| # | Condition | Why it matters |
|---|-----------|----------------|
| 壹 | 盘前模型确认做 Put | Strategic direction must be set first |
| 贰 | 开盘后价格有过拉升 | MMs induce longs first — this makes puts cheaper and creates profit space |
| 叁 | 接近阻力位 (Call Wall / VWAP / HVL) | MM hedging pressure is strongest at these levels |
| 肆 | 上涨量能收缩 | Rally is running out of fuel — buyers exhausted |
| 伍 | K线出现拒绝信号 (上影线 / 吞没 / doji) | Price is failing to hold highs — visible rejection |
| 陆 | 15m MACD 在零轴下方 | Key insight: if MACD is below zero, the rally is a trap regardless of whether price reaches VWAP. Price doesn't need to touch VWAP for the setup to be valid. |
| 柒 | DEX 动量减速 | Earliest timing signal — buy-side momentum fading before price turns |
| 捌 | 已过开盘15分钟 | Liquidity established, GEX/DEX data is reliable |

### Call Entry Checklist

| # | Condition | Why it matters |
|---|-----------|----------------|
| 壹 | 盘前模型确认做 Call | Strategic direction confirmed |
| 贰 | 开盘后价格有过回调 | MMs induce shorts first — calls become cheaper |
| 叁 | 接近支撑位 (Put Wall / VWAP / EMA) | MM buying support is strongest here |
| 肆 | 下跌量能收缩 | Selling pressure exhausted |
| 伍 | K线出现支撑信号 (下影线 / 锤子 / 吞没) | Price holding lows — visible support |
| 陆 | 15m MACD 在零轴上方 | Pullback is a wash, not a reversal |
| 柒 | DEX 动量在增加 | Buy-side momentum building |
| 捌 | 已过开盘15分钟 | Liquidity established |

### Scoring

| Count | State | Action |
|-------|-------|--------|
| 5–8 confirmed | **入场信号确认** (green/red) | Entry is valid. Execute. |
| 3–4 confirmed | **接近确认** (amber) | Almost there. Wait for 1-2 more. |
| 0–2 confirmed | **等待中** (gray) | Conditions not met. Keep watching. |

### Critical: Model ≠ Immediate Entry

The model says "put day" at 6:30 AM Pacific. That does NOT mean buy puts at 6:31 AM. The flow is:

```
6:30 AM  →  Model: "today is a put day"
6:30 AM  →  You: go back to sleep or drink coffee
9:30 ET  →  Market opens. Watch. Don't touch.
9:45 ET  →  Opening guard lifts. Start observing.
10:15 ET →  Price rallies, approaches Call Wall, volume shrinks...
10:15 ET →  Open entry checklist. Start confirming items.
10:22 ET →  6/8 confirmed → Enter put.
```

The checklist is the bridge between "what" and "when."

---

## Mindset & Discipline / 心法纪律

The tool includes a collapsible mindset panel (盘前 tab, click to expand) containing:

**认知底层 — Dealer Hedging Moves the Market**
- +GEX: MMs高抛低吸 → K线突破是陷阱
- −GEX: MMs追涨杀跌 → 技术支撑如废纸
- Gamma Flip: 市场物理法则转折点
- 核心问题: 做市商此刻被迫做什么？

**心法**
- 多则惑，少则得
- 情绪隔离：亏损不拥有我
- 内求觉察：答案在系统里
- Discipline, mindset, and discipline

**三大陷阱识别**
- +GEX 假突破陷阱
- −GEX 支撑失效陷阱
- Gamma Flip 均值回归失效陷阱

**硬性纪律**
1. 每天不超过 5 笔
2. 开盘 15 分钟不进场
3. 没有结构不做
4. 盈亏必须复盘
5. GEX 是否决权

**开仓三步核对（interactive checkboxes）**
1. 确认底牌 — GEX? Call Wall? Put Wall? Gamma Flip?
2. 验证冲突 — 信号与 MM 对冲方向是否一致？
3. 逆向思考 — 散户一边还是做市商一边？

All three must be checked before the badge turns green. This is by design.

---

## VWAP in This System / VWAP 的定位

VWAP is **not** a signal input in the pre-market layer. It is an intraday tactical level used only in the referee layer, because:

1. VWAP resets daily and moves every minute — it's not a pre-market static read
2. Its role is **entry timing precision**, not direction — direction comes from EMA + GEX + DEX
3. Adding it to the signal buttons would create noise and encourage overriding direction with timing

In the referee layer, VWAP serves three specific functions:

- **Friction zone detection:** Price ±0.3% of VWAP + GEX pos = no-trade zone
- **Resistance in weakness:** Below VWAP + GEX neg = VWAP is ceiling, wait for rejection to short
- **Support confirmation:** Above VWAP + GEX pos = VWAP is floor, pullbacks are buyable

---

## Design / 设计说明

The interface uses a refined light aesthetic inspired by ink-wash painting's principles (留白, texture, restraint) without traditional Chinese visual motifs:

- **Background:** Rice-paper warm white (#f4f1eb) with subtle grain texture
- **Typography:** Noto Serif SC for Chinese headings, Source Serif 4 italic for English accent text, DM Sans for UI data
- **Color:** Ink black for structure, vermillion (朱红 #c23b22) for bearish/warning, teal (#2d7a6f) for bullish/go, amber for caution
- **Numbering:** 壹贰叁肆伍 instead of 12345 in the discipline rules
- **Layout:** Generous whitespace as intentional design element

---

## Files / 文件

```
spy_signal_matrix_v2.html   — The tool. Open in any browser.
README.md                   — This file.
```

Self-contained HTML. No server, no build, no dependencies. Copy anywhere, share with anyone.

To deploy as a website: push to GitHub → Settings → Pages → select `main` branch → live at `https://username.github.io/repo-name/`. Rename the HTML to `index.html` for a clean URL.

---

## When NOT to Trade / 什么时候不交易

- Signal quality is Low — wait
- Macro Event day (CPI / FOMC / NFP)
- EMA flat + GEX neg — direction unknown
- First 15 minutes of session
- Referee says "禁止" or "把手离开键盘"
- Three-step checklist incomplete
- Daily loss limit hit
- You're tired, frustrated, or chasing

---

## Disclaimer / 免责声明

This tool is for personal reference and decision support only. It does not constitute financial advice. All trading involves risk. Past signal patterns do not guarantee future results.

本工具仅供个人参考，不构成投资建议。

---

*Built for left-side contrarian 0DTE trading.*  
*专为左侧反向零日期权交易构建。*
