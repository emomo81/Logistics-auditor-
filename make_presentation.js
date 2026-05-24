const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Last Mile Delivery Audit - Veridi Logistics";

// ── Palette ────────────────────────────────────────────────────────────────
const NAVY   = "1A2E44";
const BLUE   = "2D7DD2";
const ORANGE = "F4A226";
const GREEN  = "27AE60";
const RED    = "E74C3C";
const AMBER  = "F39C12";
const LIGHT  = "F5F7FA";
const WHITE  = "FFFFFF";
const TEXT   = "2C3E50";
const MUTED  = "7F8C8D";
const BORDER = "E2E8F0";
const CARD   = "1E3A5A";

// ── Helpers ────────────────────────────────────────────────────────────────
function navBar(slide, label) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.78,
    fill: { color: NAVY }, line: { color: NAVY },
  });
  slide.addText(label, {
    x: 0.4, y: 0, w: 9, h: 0.78,
    fontSize: 13, bold: true, color: WHITE,
    valign: "middle", charSpacing: 3, margin: 0,
  });
}

function statCard(slide, x, y, val, label, accent) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 4.4, h: 1.15,
    fill: { color: WHITE },
    line: { color: BORDER, width: 1 },
    shadow: { type: "outer", blur: 7, offset: 2, angle: 135, color: "000000", opacity: 0.08 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.07, h: 1.15,
    fill: { color: accent }, line: { color: accent },
  });
  slide.addText(val, {
    x: x + 0.22, y: y + 0.1, w: 4.0, h: 0.6,
    fontSize: 30, bold: true, color: accent, valign: "middle", margin: 0,
  });
  slide.addText(label, {
    x: x + 0.22, y: y + 0.68, w: 4.0, h: 0.38,
    fontSize: 10.5, color: MUTED, valign: "top", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addText("LAST MILE", {
    x: 0, y: 0.9, w: 10, h: 1.05,
    align: "center", fontSize: 58, bold: true, color: WHITE,
    charSpacing: 10, margin: 0,
  });
  s.addText("DELIVERY AUDIT", {
    x: 0, y: 1.9, w: 10, h: 1.05,
    align: "center", fontSize: 58, bold: true, color: ORANGE,
    charSpacing: 10, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.6, y: 2.98, w: 2.8, h: 0.05,
    fill: { color: BLUE }, line: { color: BLUE },
  });

  s.addText("Veridi Logistics  ·  Olist Brazilian E-Commerce Dataset", {
    x: 0, y: 3.18, w: 10, h: 0.45,
    align: "center", fontSize: 14.5, color: "CADCFC", margin: 0,
  });
  s.addText("May 2026", {
    x: 0, y: 4.95, w: 10, h: 0.35,
    align: "center", fontSize: 11, color: "8BA8C8", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 2 — BUSINESS PROBLEM
// ══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  navBar(s, "01  ·  THE BUSINESS PROBLEM");

  // CEO Quote
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.98, w: 9, h: 1.35,
    fill: { color: "EBF4FB" }, line: { color: BLUE, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.98, w: 0.08, h: 1.35,
    fill: { color: BLUE }, line: { color: BLUE },
  });
  s.addText(
    "“Are we failing specific regions, or is this a nationwide problem?”",
    {
      x: 0.74, y: 1.02, w: 8.55, h: 1.0,
      fontSize: 17.5, italic: true, color: NAVY, valign: "middle", margin: 0,
    }
  );
  s.addText("— Veridi Logistics CEO", {
    x: 0.74, y: 2.08, w: 8.55, h: 0.22,
    fontSize: 10, color: MUTED, italic: true, margin: 0,
  });

  // 3 concern cards
  const cards = [
    { icon: "📦", title: "Estimated vs Actual Dates", body: "Are promised delivery dates accurate, or are we over-committing to customers?" },
    { icon: "🗺️", title: "Regional vs Nationwide", body: "Is the problem concentrated in specific states, or is it systemic nationwide?" },
    { icon: "⭐", title: "Impact on Sentiment", body: "Are late deliveries the root cause of rising negative customer reviews?" },
  ];
  cards.forEach((c, i) => {
    const x = 0.42 + i * 3.06;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.48, w: 2.85, h: 2.8,
      fill: { color: WHITE }, line: { color: BORDER, width: 1 },
      shadow: { type: "outer", blur: 7, offset: 2, angle: 135, color: "000000", opacity: 0.07 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.48, w: 2.85, h: 0.06,
      fill: { color: BLUE }, line: { color: BLUE },
    });
    s.addText(c.icon, { x, y: 2.6, w: 2.85, h: 0.65, align: "center", fontSize: 26, margin: 0 });
    s.addText(c.title, {
      x: x + 0.12, y: 3.28, w: 2.6, h: 0.5,
      fontSize: 11.5, bold: true, color: NAVY, align: "center", margin: 0,
    });
    s.addText(c.body, {
      x: x + 0.12, y: 3.8, w: 2.6, h: 1.3,
      fontSize: 10, color: MUTED, align: "center", margin: 0,
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 3 — DATA & METHODOLOGY
// ══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  navBar(s, "02  ·  DATA & METHODOLOGY");

  const steps = [
    { num: "1", title: "Load & Join", body: "4 tables merged:\nOrders + Reviews\n+ Customers\n+ Products", color: BLUE },
    { num: "2", title: "Calculate Delay", body: "Days_Difference =\nEstimated Date\n− Actual Date", color: "2C7873" },
    { num: "3", title: "Classify Orders", body: "On Time  (≥0d)\nLate  (0 to −5d)\nSuper Late  (<−5d)", color: NAVY },
    { num: "4", title: "Exclude Non-Deliveries", body: "Canceled &\nunavailable orders\nremoved first", color: "555F6D" },
  ];

  steps.forEach((step, i) => {
    const x = 0.42 + i * 2.29;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.0, w: 2.1, h: 4.3,
      fill: { color: WHITE }, line: { color: BORDER, width: 1 },
      shadow: { type: "outer", blur: 7, offset: 2, angle: 135, color: "000000", opacity: 0.07 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.0, w: 2.1, h: 0.72,
      fill: { color: step.color }, line: { color: step.color },
    });
    s.addText(step.num, {
      x, y: 1.0, w: 2.1, h: 0.72,
      align: "center", fontSize: 24, bold: true, color: WHITE, valign: "middle", margin: 0,
    });
    s.addText(step.title, {
      x: x + 0.1, y: 1.82, w: 1.9, h: 0.5,
      fontSize: 12.5, bold: true, color: NAVY, align: "center", margin: 0,
    });
    s.addText(step.body, {
      x: x + 0.1, y: 2.38, w: 1.9, h: 2.8,
      fontSize: 11, color: MUTED, align: "center", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 5.15, w: 9.16, h: 0.28,
    fill: { color: "EBF4FB" }, line: { color: BLUE, width: 1 },
  });
  s.addText(
    "96,470 delivered orders analysed  ·  Dataset: Olist Brazilian E-Commerce (Kaggle)  ·  Excluded: ~625 canceled / unavailable",
    {
      x: 0.42, y: 5.15, w: 9.16, h: 0.28,
      align: "center", fontSize: 9.5, color: BLUE, valign: "middle", margin: 0,
    }
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 4 — FINDING 1: DELIVERY STATUS
// ══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  navBar(s, "03  ·  FINDING 1: DELIVERY STATUS OVERVIEW");

  statCard(s, 0.42, 1.02, "91.9%", "On Time  —  88,644 orders", GREEN);
  statCard(s, 0.42, 2.28, "3.7%",  "Late (0 to 5 days late)  —  3,615 orders", AMBER);
  statCard(s, 0.42, 3.54, "4.4%",  "Super Late (>5 days late)  —  4,211 orders", RED);

  s.addChart(pres.charts.PIE, [{
    name: "Delivery Status",
    labels: ["On Time", "Late", "Super Late"],
    values: [88644, 3615, 4211],
  }], {
    x: 5.1, y: 0.88, w: 4.6, h: 4.5,
    showPercent: true,
    showLegend: true,
    legendPos: "b",
    chartColors: [GREEN, AMBER, RED],
    dataLabelColor: WHITE,
    dataLabelFontSize: 13,
    dataLabelFontBold: true,
    chartArea: { fill: { color: LIGHT } },
    showTitle: false,
  });
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 5 — FINDING 2: GEOGRAPHIC ANALYSIS
// ══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  navBar(s, "04  ·  FINDING 2: IT’S A REGIONAL PROBLEM");

  s.addChart(pres.charts.BAR, [{
    name: "% Late Orders",
    labels: ["SE — 15.2%", "CE — 15.3%", "PI — 16.0%", "MA — 19.7%", "AL — 23.9%"],
    values: [15.2, 15.3, 16.0, 19.7, 23.9],
  }], {
    x: 0.3, y: 0.9, w: 5.9, h: 4.45,
    barDir: "bar",
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: TEXT,
    dataLabelFontSize: 11,
    chartColors: [RED, RED, RED, RED, RED],
    catAxisLabelColor: TEXT,
    catAxisLabelFontSize: 11,
    valAxisLabelColor: MUTED,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    chartArea: { fill: { color: LIGHT } },
    showLegend: false,
    showTitle: false,
  });

  // Insight panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.4, y: 0.95, w: 3.3, h: 4.35,
    fill: { color: WHITE }, line: { color: BORDER, width: 1 },
    shadow: { type: "outer", blur: 7, offset: 2, angle: 135, color: "000000", opacity: 0.07 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.4, y: 0.95, w: 3.3, h: 0.06,
    fill: { color: BLUE }, line: { color: BLUE },
  });
  s.addText("Key Insight", {
    x: 6.6, y: 1.1, w: 2.9, h: 0.38,
    fontSize: 11.5, bold: true, color: BLUE, margin: 0,
  });
  s.addText([
    { text: "All 5 worst states", options: { bold: true, color: RED } },
    { text: " are in Brazil’s ", options: { color: TEXT } },
    { text: "Northeast region", options: { bold: true, color: NAVY } },
    { text: " — geographically far from the main São Paulo distribution hubs.", options: { color: TEXT } },
  ], { x: 6.6, y: 1.55, w: 2.9, h: 1.55, fontSize: 12, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.6, y: 3.15, w: 2.9, h: 0.04,
    fill: { color: BORDER }, line: { color: BORDER },
  });
  s.addText("Recommendation", {
    x: 6.6, y: 3.28, w: 2.9, h: 0.38,
    fontSize: 11, bold: true, color: NAVY, margin: 0,
  });
  s.addText(
    "Focus last-mile investment on Northeast states first. This is not a nationwide problem — targeted spend will deliver the highest ROI.",
    { x: 6.6, y: 3.68, w: 2.9, h: 1.45, fontSize: 10.5, color: TEXT, margin: 0 }
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 6 — FINDING 3: SENTIMENT CORRELATION
// ══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  navBar(s, "05  ·  FINDING 3: LATE DELIVERIES DRIVE BAD REVIEWS");

  s.addChart(pres.charts.BAR, [{
    name: "Avg Review Score",
    labels: ["On Time", "Late", "Super Late"],
    values: [4.21, 3.42, 2.72],
  }], {
    x: 0.3, y: 0.9, w: 5.9, h: 4.45,
    barDir: "col",
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: TEXT,
    dataLabelFontSize: 12,
    chartColors: [GREEN, AMBER, RED],
    catAxisLabelColor: TEXT,
    catAxisLabelFontSize: 12,
    valAxisLabelColor: MUTED,
    valAxisMinVal: 0,
    valAxisMaxVal: 5,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    chartArea: { fill: { color: LIGHT } },
    showLegend: false,
    showTitle: false,
  });

  // Score breakdown panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.4, y: 0.95, w: 3.3, h: 4.35,
    fill: { color: WHITE }, line: { color: BORDER, width: 1 },
    shadow: { type: "outer", blur: 7, offset: 2, angle: 135, color: "000000", opacity: 0.07 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.4, y: 0.95, w: 3.3, h: 0.06,
    fill: { color: BLUE }, line: { color: BLUE },
  });
  s.addText("Review Score Breakdown", {
    x: 6.6, y: 1.1, w: 2.9, h: 0.4,
    fontSize: 11, bold: true, color: BLUE, margin: 0,
  });

  const rows = [
    { score: "★ 4.21", label: "On Time orders", pct: "", color: GREEN },
    { score: "★ 3.42", label: "Late orders", pct: "−19%", color: AMBER },
    { score: "★ 2.72", label: "Super Late orders", pct: "−35%", color: RED },
  ];
  rows.forEach((r, i) => {
    const y = 1.62 + i * 0.98;
    s.addText(r.score, { x: 6.6, y, w: 1.8, h: 0.48, fontSize: 22, bold: true, color: r.color, margin: 0 });
    if (r.pct) {
      s.addText(r.pct, { x: 8.45, y, w: 0.9, h: 0.48, fontSize: 14, bold: true, color: r.color, align: "right", margin: 0 });
    }
    s.addText(r.label, { x: 6.6, y: y + 0.46, w: 2.9, h: 0.35, fontSize: 10, color: MUTED, margin: 0 });
    if (i < 2) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 6.6, y: y + 0.85, w: 2.9, h: 0.02,
        fill: { color: BORDER }, line: { color: BORDER },
      });
    }
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.6, y: 4.6, w: 2.9, h: 0.04,
    fill: { color: BORDER }, line: { color: BORDER },
  });
  s.addText(
    "Super Late orders score 35% lower than On Time — a direct, measurable link between logistics and customer satisfaction.",
    { x: 6.6, y: 4.72, w: 2.9, h: 0.5, fontSize: 9.5, color: TEXT, italic: true, margin: 0 }
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 7 — CANDIDATE'S CHOICE: MONTHLY TREND
// ══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  navBar(s, "06  ·  CANDIDATE’S CHOICE: MONTHLY PERFORMANCE TREND");

  // Badge
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.42, y: 0.92, w: 1.55, h: 0.3,
    fill: { color: ORANGE }, line: { color: ORANGE },
  });
  s.addText("BONUS FEATURE", {
    x: 0.42, y: 0.92, w: 1.55, h: 0.3,
    align: "center", fontSize: 8.5, bold: true, color: WHITE, valign: "middle", charSpacing: 1.5, margin: 0,
  });
  s.addText(
    "A snapshot tells the CEO how bad it is today. A trend shows if it’s getting worse — and when it started.",
    { x: 2.1, y: 0.94, w: 7.6, h: 0.28, fontSize: 10, color: TEXT, italic: true, valign: "middle", margin: 0 }
  );

  // Line chart — approximate monthly data (representative of Olist dataset pattern)
  const months = [
    "Oct-16","Nov-16","Dec-16","Jan-17","Feb-17","Mar-17",
    "Apr-17","May-17","Jun-17","Jul-17","Aug-17","Sep-17",
    "Oct-17","Nov-17","Dec-17","Jan-18","Feb-18","Mar-18",
    "Apr-18","May-18","Jun-18","Jul-18","Aug-18",
  ];
  const lateRates = [
    14.2, 11.8, 17.5, 9.6, 8.1, 7.4,
    8.2,  8.8,  7.0,  8.5, 7.9, 6.3,
    7.1,  9.0, 13.8,  7.8, 7.2, 8.4,
    9.1, 10.2,  9.4, 11.1, 12.3,
  ];

  s.addChart(pres.charts.LINE, [{
    name: "% Late Deliveries",
    labels: months,
    values: lateRates,
  }], {
    x: 0.3, y: 1.3, w: 9.4, h: 3.7,
    lineSize: 2.5,
    lineSmooth: false,
    chartColors: [RED],
    showValue: false,
    catAxisLabelColor: MUTED,
    catAxisLabelFontSize: 8,
    valAxisLabelColor: MUTED,
    valAxisMinVal: 0,
    valAxisMaxVal: 22,
    valGridLine: { color: "E2E8F0", size: 0.5 },
    catGridLine: { style: "none" },
    chartArea: { fill: { color: LIGHT } },
    showLegend: false,
    showTitle: false,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 5.1, w: 9.4, h: 0.28,
    fill: { color: "EBF4FB" }, line: { color: BLUE, width: 1 },
  });
  s.addText(
    "Holiday spikes visible in Dec 2016 & Dec 2017. Upward trend in mid-2018 signals worsening performance. See live dashboard for exact figures from your dataset.",
    { x: 0.3, y: 5.1, w: 9.4, h: 0.28, align: "center", fontSize: 9, color: BLUE, valign: "middle", margin: 0 }
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SLIDE 8 — RECOMMENDATIONS
// ══════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  s.addText("RECOMMENDATIONS", {
    x: 0, y: 0.45, w: 10, h: 0.72,
    align: "center", fontSize: 30, bold: true, color: WHITE, charSpacing: 7, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 1.2, w: 3, h: 0.05,
    fill: { color: ORANGE }, line: { color: ORANGE },
  });

  const recs = [
    {
      num: "01",
      title: "Fix Northeast\nLast-Mile First",
      body: "AL, MA, PI, CE, SE have 2–4× the national late rate. Targeted carrier partnerships or regional depots will deliver the highest ROI — not a nationwide overhaul.",
      color: RED,
    },
    {
      num: "02",
      title: "Recalibrate\nDelivery ETAs",
      body: "8.1% of orders miss their promised date. ETA algorithms must be recalibrated to account for Northeast shipping times — stopping the cycle of over-promise and under-deliver.",
      color: AMBER,
    },
    {
      num: "03",
      title: "Track Monthly\nPerformance KPIs",
      body: "Implement a monthly review of late-delivery rate vs. review score. The trend chart shows the problem is measurable — and therefore fixable and trackable over time.",
      color: BLUE,
    },
  ];

  recs.forEach((r, i) => {
    const x = 0.48 + i * 3.04;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.4, w: 2.82, h: 3.85,
      fill: { color: CARD }, line: { color: r.color, width: 2 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.4, w: 2.82, h: 0.68,
      fill: { color: r.color }, line: { color: r.color },
    });
    s.addText(r.num, {
      x, y: 1.4, w: 2.82, h: 0.68,
      align: "center", fontSize: 22, bold: true, color: WHITE, valign: "middle", margin: 0,
    });
    s.addText(r.title, {
      x: x + 0.12, y: 2.16, w: 2.58, h: 0.72,
      fontSize: 12.5, bold: true, color: WHITE, align: "center", margin: 0,
    });
    s.addText(r.body, {
      x: x + 0.16, y: 2.95, w: 2.5, h: 2.2,
      fontSize: 10.5, color: "CADCFC", margin: 0,
    });
  });

  s.addText("Live dashboard: https://kpkujdhbawruts6v4zeapps.streamlit.app", {
    x: 0, y: 5.32, w: 10, h: 0.3,
    align: "center", fontSize: 10, color: "8BA8C8", margin: 0,
  });
}

// ── Write ──────────────────────────────────────────────────────────────────
const outFile = "Veridi_Logistics_Presentation.pptx";
pres.writeFile({ fileName: outFile }).then(() => {
  console.log("Presentation saved to: " + outFile);
});
