# SPY 0DTE Signal Matrix

**A pre-market decision tool for SPY/SPX 0DTE options trading.**  
**SPY/SPX 零日期权交易的开盘前决策工具。**

> Single HTML file · No install · No server · Share via link  
> 单文件 · 无需安装 · 无需服务器 · 直接发链接使用

---

## What it does / 这是什么

This tool takes your three core pre-market reads — EMA stack, GEX, and DEX — and outputs a structured trade decision: which direction to lean, which strategy to use (Buy Call / Buy Put / Spread / Condor / Butterfly), when to enter, when to exit, and when to abort.

这个工具接收你三个核心开盘前信号——EMA排列、GEX、DEX——输出一个结构化的交易决策：方向判断、推荐策略（Buy Call / Buy Put / Spread / Condor / Butterfly）、入场时机、出场目标和止损中止条件。

It is not a signal generator. It is a **signal interpreter** — it codifies the logic you've already built through trading experience so you don't have to re-derive it each morning.

它不是信号生成器，而是**信号解读器**——把你已经通过实战积累的逻辑固化下来，不用每天早上重新推导。

---

## How to use / 如何使用

**Step 1 — Open the file**

Double-click `spy_signal_matrix.html` in any browser. No internet required after the initial font load.

直接双击用任何浏览器打开 `spy_signal_matrix.html`。字体加载后不需要网络。

**Step 2 — Set Primary Signals (before the open)**

Read your three signals from TradingView / TanukiTrade / SpotGamma and click the corresponding buttons:

在TradingView / TanukiTrade / SpotGamma读取三个信号后点击对应按钮：

| Signal | What to read | Where |
|--------|-------------|-------|
| **EMA Stack** | 9 vs 20 vs 50 alignment on 5m or 15m | TradingView |
| **GEX** | Positive (stabilizing) or Negative (amplifying) | TanukiTrade / SpotGamma |
| **DEX** | Positive (buy-side dominant) or Negative (sell-side dominant) | TanukiTrade · Net Delta panel |

**Step 3 — Toggle Aux Signals (optional but recommended)**

Click any auxiliary signal tiles that apply today. Each active aux signal **modifies the analysis output** with additional context or warnings.

点亮适用的辅助信号。每个开启的辅助信号都会在分析输出中**自动叠加修正内容**。

**Step 4 — Read the output**

The analysis card tells you:
- **Direction** — Call / Put / Neutral
- **Signal quality** — High / Mid / Low
- **Recommended strategies** — green chips (✓) are what to use
- **Strategies to avoid** — gray chips (✗) are what not to use
- **Timing** — best time window during the session
- **Entry trigger** — specific price action to wait for
- **Exit target** — where to take profit
- **Abort condition** — when the setup is invalidated, exit immediately

---

## Primary Signals Reference / 主信号说明

### EMA Stack (9 / 20 / 50)

| State | Meaning |
|-------|---------|
| `9 > 20 > 50` 多头 | Bullish momentum. Retail and trend-followers lean long. |
| `9 < 20 < 50` 空头 | Bearish momentum. Structural downtrend. |
| 纠缠压缩 Flat | Equilibrium. No directional edge. Wait for breakout. |

The EMA stack tells you **what retail sees** and therefore where they'll chase. Your edge is in knowing when that chase is a trap.

EMA排列告诉你**散户看到的是什么**，从而判断他们会在哪里追单。你的优势在于识别那种追单何时是陷阱。

---

### GEX — Gamma Exposure

| State | Market Maker behavior | Effect |
|-------|-----------------------|--------|
| **+ Positive** | Long gamma → buys dips, sells rips | **Stabilizes** price. Mean-reversion tendency. Walls are strong. |
| **− Negative** | Short gamma → buys rallies, sells drops | **Amplifies** moves. Momentum is self-reinforcing. Walls can break. |

> **Key insight:** In negative GEX, the call wall is not a guaranteed ceiling — it can be fuel. Price breaking through it triggers more MM buying, accelerating the move. Respect the abort condition.
>
> **关键认知：** 在GEX负的环境下，call wall不是保证的顶部——它可能是燃料。价格突破call wall会触发更多做市商买入，加速上涨。务必遵守中止条件。

---

### DEX — Delta Exposure

| State | Meaning |
|-------|---------|
| **+ Positive** | Net delta buying in the market. Retail / institutions are net long calls or buying underlying. |
| **− Negative** | Net delta selling. Smart money is reducing exposure or buying puts for protection. |

**DEX velocity** (the aux signal) is more powerful than DEX level alone. If DEX+ is decelerating while price stalls — that's the earliest signal for your put entry, before price has turned.

**DEX动量**（辅助信号）比DEX数值本身更有价值。如果DEX正在减速同时价格停滞——那是你做put最早的信号，在价格还没转头之前。

---

## The 12 Signal Combinations / 12种信号组合

| EMA | GEX | DEX | Direction | Quality | Core Logic |
|-----|-----|-----|-----------|---------|------------|
| Bull | + | + | **Call** | ★★★ | 三力同向多头，真实上涨 |
| Bull | − | + | **Put** | ★★★ | ⚡ 你的核心Trap Setup |
| Bull | + | − | **Put** | ★★ | 多头分化，慢磨向下 |
| Bull | − | − | **Put** | ★★ | 趋势末段，聪明钱出逃 |
| Bear | − | − | **Put** | ★★★ | 三力同向空头，真实下跌 |
| Bear | + | − | **Put** | ★★ | 空头结构，GEX压制慢跌 |
| Bear | − | + | **Call** | ★★ | 底部接盘信号，等待反转确认 |
| Bear | + | + | **Wait** | ★ | 信号分歧，观望 |
| Flat | − | + | **Wait** | ★ | 压缩方向未定，最危险 |
| Flat | + | − | **Condor** | ★ | 低波整理，卖波动率 |
| Flat | + | + | **Call Spread** | ★ | 低波偏多，spread控损 |
| Flat | − | − | **Put** | ★★ | 压缩偏空，等突破 |

---

## Auxiliary Signals / 辅助信号

Click any tile to activate. Multiple can be active simultaneously.  
点击激活，可以同时开启多个。

| Signal | When to activate | What it modifies |
|--------|-----------------|-----------------|
| **Price below HVL** | Current price is under the High Volatility Level on TanukiTrade | Warns: you're in the Negative Transition Zone. Long bias is structurally weakened. |
| **VIX / IVR High** | VIX > 20 or IVR elevated | Warns: options are expensive. Prefer spreads over naked options to reduce cost basis. |
| **Volume Climax** | Unusual volume spike on open | Warns: institutional flow active. Widen stops, reduce size. |
| **OPEX Week** | Monthly options expiry week (3rd Friday) | Warns: Max Pain gravity is strong. Price may pin to a strike. Respect pin risk. |
| **DEX Velocity ↓** | DEX+ but slowing / rolling over | Confirms: earliest put entry signal in Trap Setup. Highest conviction timing. |
| **Macro Event** | CPI / FOMC / NFP day | Critical warning: GEX structure can be overridden. Consider not trading or extreme size reduction. |

---

## Strategy Guide / 策略说明

### Buy Call / Buy Put
Directional, naked. Highest reward but full theta decay. Only appropriate when signal quality is **High (★★★)** and timing is precise. Set tight abort conditions.

方向性裸期权。最高收益但theta损耗完整。只适合**高信号质量**且入场时机精准的情况。止损条件要严格执行。

### Call Spread / Put Spread
Debit spread. Buy near-strike, sell further strike. Reduces cost and theta exposure while maintaining directional bias. Ideal for **Mid quality (★★)** setups or when IVR is elevated.

借方spread。买近虚值，卖更远虚值。降低成本和时间价值损耗，保留方向性。适合**中等质量**信号或IVR偏高时。

### Iron Condor
Sell both sides. Profit if price stays range-bound. Best in **positive GEX + flat EMA** environments where walls are strong and GEX is compressing movement. Exit before last hour to avoid gamma spike.

双向卖出。适合价格不动。最佳环境是**GEX正 + EMA纠缠**，双侧墙强且波动被压制。最后一小时前平仓避免gamma spike。

### Butterfly
Pinpoint structure. Buy ATM, sell 2x OTM, buy further OTM. Best when you have a specific price target (e.g. near max pain strike on OPEX week or near a heavy-OI strike in positive GEX). Low cost, requires accuracy.

定点结构。适合有明确目标价格的情况（例如OPEX周的max pain strike，或GEX正环境中的高OI strike）。成本低，需要精准。

---

## The Trap Setup — Your Core System / 你的核心系统

```
EMA: Bull (9 > 20 > 50)
GEX: Negative
DEX: Positive
```

**What's happening:** Retail sees bullish EMA and chases the open. DEX+ confirms they're buying. But GEX− means market makers aren't providing structural support — they're letting the move happen. This is the setup for a manufactured rally that reverses.

**发生了什么：** 散户看到多头EMA在开盘追单。DEX正确认了买入。但GEX负意味着做市商没有提供结构性支撑——他们在让行情自然发展。这是人造反弹反转的setup。

**Execution sequence:**
1. Pre-market: confirm all three signals ✓
2. 9:30–9:45 — watch for gap-up or rally, do not chase
3. Wait for price to approach the **call wall** level
4. Look for: volume contraction, upper wicks, failed breakout candles
5. DEX velocity starts decelerating → **enter put** (small size)
6. Price confirms rejection → add
7. Exit at put wall or EMA support reclaim
8. **Abort:** price breaks call wall with expanding volume on multiple consecutive candles → flat immediately

**执行顺序：**
1. 开盘前：确认三个信号全部符合 ✓
2. 9:30–9:45 — 观察跳空或拉升，不追单
3. 等价格接近 **call wall** 位置
4. 等待：成交量收缩、上影线、突破失败K线
5. DEX动量开始减速 → **买put**（小仓）
6. 价格确认拒绝 → 加仓
7. 在put wall或EMA支撑处止盈出场
8. **中止条件：** 价格连续多根K线放量突破call wall → 立刻平仓

---

## When NOT to trade / 什么时候不交易

- Signal quality is Low (★) — wait for a clearer setup
- Macro Event aux is active (CPI / FOMC / NFP)
- EMA is flat/compressed AND GEX− — direction unknown, breakout can go either way
- It's the first 15 minutes of the session — liquidity is thin, GEX levels can be distorted
- You've already hit your daily loss limit

---

## Files / 文件说明

```
spy_signal_matrix.html   — The tool. Open in any browser.
README.md                — This file.
```

The HTML file is fully self-contained. No dependencies, no build step, no server. Copy it anywhere, send it to anyone.

HTML文件完全自包含。无依赖，无需构建，无需服务器。可以复制到任何地方，发给任何人。

---

## Disclaimer / 免责声明

This tool is for personal reference and decision support only. It does not constitute financial advice. All trading involves risk. Past signal patterns do not guarantee future results.

本工具仅供个人参考和辅助决策使用，不构成任何投资建议。所有交易均涉及风险，历史信号规律不代表未来表现。

---

*Built for SPY/SPX 0DTE left-side contrarian trading.*  
*专为SPY/SPX零日期权左侧反向交易构建。*
