import os
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Resolve data file path relative to this script (works locally & on Streamlit Cloud)
_HERE = os.path.dirname(os.path.abspath(__file__))
_DATA_FILE = os.path.join(_HERE, "master_dataset.csv")

st.set_page_config(
    page_title="Veridi Logistics Auditor",
    layout="wide",
)

# ── Data ──────────────────────────────────────────────────────────────────────

@st.cache_data
def load_data():
    df = pd.read_csv(
        _DATA_FILE,
        parse_dates=[
            "order_purchase_timestamp",
            "order_delivered_customer_date",
            "order_estimated_delivery_date",
        ],
    )
    df["order_month"] = df["order_purchase_timestamp"].dt.to_period("M").astype(str)
    return df


try:
    df = load_data()
except FileNotFoundError:
    st.error(
        "**master_dataset.csv not found.**  \n"
        "Run `logistics_auditor.ipynb` in Google Colab, download the exported file, "
        "and place it in the same folder as `app.py`."
    )
    st.stop()

# ── Sidebar filters ───────────────────────────────────────────────────────────

st.sidebar.title("Filters")

all_states = sorted(df["customer_state"].dropna().unique())
selected_states = st.sidebar.multiselect("State(s)", all_states, default=all_states)

all_statuses = ["On Time", "Late", "Super Late"]
selected_statuses = st.sidebar.multiselect("Delivery Status", all_statuses, default=all_statuses)

all_months = sorted(df["order_month"].dropna().unique())
month_range = st.sidebar.select_slider(
    "Month range",
    options=all_months,
    value=(all_months[0], all_months[-1]),
)

filtered = df[
    df["customer_state"].isin(selected_states)
    & df["delivery_status"].isin(selected_statuses)
    & df["order_month"].between(month_range[0], month_range[1])
].copy()

# ── Header ────────────────────────────────────────────────────────────────────

st.title("Veridi Logistics — Delivery Performance Auditor")
st.caption("Olist Brazilian E-Commerce Dataset | Last Mile Audit")

if filtered.empty:
    st.warning("No data matches the current filters.")
    st.stop()

# ── KPI row ───────────────────────────────────────────────────────────────────

total = len(filtered)
on_time = (filtered["delivery_status"] == "On Time").sum()
late = (filtered["delivery_status"] == "Late").sum()
super_late = (filtered["delivery_status"] == "Super Late").sum()
avg_score = filtered["review_score"].mean()

c1, c2, c3, c4, c5 = st.columns(5)
c1.metric("Total Orders", f"{total:,}")
c2.metric("On Time", f"{on_time / total * 100:.1f}%")
c3.metric("Late", f"{late / total * 100:.1f}%")
c4.metric("Super Late (>5d)", f"{super_late / total * 100:.1f}%")
c5.metric("Avg Review Score", f"{avg_score:.2f} / 5")

st.divider()

# ── Tabs ──────────────────────────────────────────────────────────────────────

tab1, tab2, tab3, tab4, tab5 = st.tabs(
    ["Geographic", "Sentiment", "Monthly Trend", "Categories", "About"]
)

COLOR_MAP = {"On Time": "#2ecc71", "Late": "#f39c12", "Super Late": "#e74c3c"}

# ── Tab 1: Geographic ─────────────────────────────────────────────────────────

with tab1:
    st.subheader("Late Delivery Rate by State")

    state_stats = (
        filtered.groupby("customer_state")
        .agg(
            total_orders=("order_id", "count"),
            late_orders=("delivery_status", lambda x: (x != "On Time").sum()),
            avg_review=("review_score", "mean"),
            avg_days_diff=("days_difference", "mean"),
        )
        .reset_index()
    )
    state_stats["late_pct"] = (
        state_stats["late_orders"] / state_stats["total_orders"] * 100
    ).round(1)
    state_stats = state_stats.sort_values("late_pct", ascending=False)

    fig = px.bar(
        state_stats,
        x="customer_state",
        y="late_pct",
        color="late_pct",
        color_continuous_scale="RdYlGn_r",
        title="% Late Deliveries by State",
        labels={"customer_state": "State", "late_pct": "% Late"},
        text=state_stats["late_pct"].astype(str) + "%",
        hover_data={"avg_review": ":.2f", "total_orders": True},
    )
    fig.update_traces(textposition="outside")
    fig.update_layout(coloraxis_showscale=False, xaxis_tickangle=-45, height=460)
    st.plotly_chart(fig, use_container_width=True)

    col_a, col_b = st.columns(2)
    with col_a:
        st.subheader("Late Rate vs Review Score (by State)")
        fig2 = px.scatter(
            state_stats,
            x="late_pct",
            y="avg_review",
            size="total_orders",
            text="customer_state",
            color="late_pct",
            color_continuous_scale="RdYlGn_r",
            labels={"late_pct": "% Late", "avg_review": "Avg Review"},
        )
        fig2.update_traces(textposition="top center")
        fig2.update_layout(coloraxis_showscale=False, height=400)
        st.plotly_chart(fig2, use_container_width=True)

    with col_b:
        st.subheader("State Detail Table")
        display_df = state_stats[
            ["customer_state", "total_orders", "late_pct", "avg_review", "avg_days_diff"]
        ].rename(
            columns={
                "customer_state": "State",
                "total_orders": "Orders",
                "late_pct": "% Late",
                "avg_review": "Avg Review",
                "avg_days_diff": "Avg Days Diff",
            }
        )
        st.dataframe(display_df.round(2), use_container_width=True, height=400)

# ── Tab 2: Sentiment ──────────────────────────────────────────────────────────

with tab2:
    st.subheader("Does Late Delivery Drive Bad Reviews?")

    col_a, col_b = st.columns(2)

    with col_a:
        sentiment = (
            filtered.groupby("delivery_status")["review_score"].mean().reset_index()
        )
        fig = px.bar(
            sentiment,
            x="delivery_status",
            y="review_score",
            color="delivery_status",
            color_discrete_map=COLOR_MAP,
            title="Avg Review Score by Delivery Status",
            labels={"delivery_status": "Status", "review_score": "Avg Review Score"},
            text=sentiment["review_score"].round(2),
        )
        fig.update_traces(textposition="outside")
        fig.update_layout(yaxis_range=[0, 5.5], showlegend=False, height=400)
        st.plotly_chart(fig, use_container_width=True)

    with col_b:
        bins = [-100, -30, -14, -7, -3, 0, 7, 30, 100]
        labels = ["<-30d", "-30 to -14d", "-14 to -7d", "-7 to -3d", "-3 to 0d", "0 to 7d", "7 to 30d", ">30d"]
        temp = filtered.copy()
        temp["days_bin"] = pd.cut(temp["days_difference"], bins=bins, labels=labels)
        bin_scores = (
            temp.groupby("days_bin", observed=True)["review_score"]
            .mean()
            .reset_index()
        )
        fig2 = px.line(
            bin_scores,
            x="days_bin",
            y="review_score",
            title="Review Score vs Days Early/Late",
            labels={"days_bin": "Days (negative = late)", "review_score": "Avg Review"},
            markers=True,
        )
        fig2.update_layout(yaxis_range=[1, 5.5], height=400)
        st.plotly_chart(fig2, use_container_width=True)

    st.subheader("Review Score Distribution")
    fig3 = px.histogram(
        filtered.dropna(subset=["review_score"]),
        x="review_score",
        color="delivery_status",
        color_discrete_map=COLOR_MAP,
        barmode="group",
        title="Review Score Distribution by Delivery Status",
        labels={"review_score": "Review Score (1–5)", "delivery_status": "Status"},
        nbins=5,
    )
    st.plotly_chart(fig3, use_container_width=True)

# ── Tab 3: Monthly Trend (Candidate's Choice) ─────────────────────────────────

with tab3:
    st.subheader("Monthly Performance Trend")
    st.caption(
        "**Candidate's Choice feature:** Month-over-month trends reveal whether the problem "
        "is seasonal, worsening, or tied to a specific event — critical for prioritising fixes."
    )

    monthly = (
        filtered.groupby("order_month")
        .agg(
            total=("order_id", "count"),
            late=("delivery_status", lambda x: (x != "On Time").sum()),
            avg_review=("review_score", "mean"),
        )
        .reset_index()
    )
    monthly["late_pct"] = (monthly["late"] / monthly["total"] * 100).round(1)

    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=monthly["order_month"],
            y=monthly["late_pct"],
            name="% Late",
            mode="lines+markers",
            line=dict(color="crimson", width=2),
        )
    )
    fig.add_trace(
        go.Scatter(
            x=monthly["order_month"],
            y=monthly["avg_review"],
            name="Avg Review Score",
            mode="lines+markers",
            line=dict(color="steelblue", width=2),
            yaxis="y2",
        )
    )
    fig.update_layout(
        title="Monthly Late Delivery Rate vs Average Review Score",
        xaxis_title="Month",
        yaxis=dict(title="% Late Deliveries", titlefont=dict(color="crimson")),
        yaxis2=dict(
            title="Avg Review Score",
            titlefont=dict(color="steelblue"),
            overlaying="y",
            side="right",
            range=[1, 5],
        ),
        legend=dict(x=0.01, y=0.99),
        height=460,
    )
    st.plotly_chart(fig, use_container_width=True)

    col_a, col_b = st.columns(2)
    with col_a:
        st.metric("Best month (lowest late %)", monthly.loc[monthly["late_pct"].idxmin(), "order_month"])
    with col_b:
        st.metric("Worst month (highest late %)", monthly.loc[monthly["late_pct"].idxmax(), "order_month"])

# ── Tab 4: Categories ─────────────────────────────────────────────────────────

with tab4:
    st.subheader("Late Delivery Rate by Product Category (English)")

    if "category_en" not in filtered.columns or filtered["category_en"].isna().all():
        st.info("Category data not available. Re-run the notebook with the order_items join.")
    else:
        cat_stats = (
            filtered.groupby("category_en")
            .agg(
                total=("order_id", "count"),
                late=("delivery_status", lambda x: (x != "On Time").sum()),
                avg_review=("review_score", "mean"),
            )
            .reset_index()
        )
        cat_stats["late_pct"] = (cat_stats["late"] / cat_stats["total"] * 100).round(1)
        cat_stats = cat_stats[cat_stats["total"] >= 50].sort_values(
            "late_pct", ascending=False
        )

        n = st.slider("Show top N categories", 5, 30, 15)

        fig = px.bar(
            cat_stats.head(n),
            x="late_pct",
            y="category_en",
            orientation="h",
            color="late_pct",
            color_continuous_scale="RdYlGn_r",
            title=f"Top {n} Categories by Late Delivery Rate",
            labels={"late_pct": "% Late", "category_en": "Category"},
            text=cat_stats.head(n)["late_pct"].astype(str) + "%",
            hover_data={"avg_review": ":.2f", "total": True},
        )
        fig.update_traces(textposition="outside")
        fig.update_layout(
            coloraxis_showscale=False,
            yaxis={"categoryorder": "total ascending"},
            height=max(400, n * 28),
        )
        st.plotly_chart(fig, use_container_width=True)

# ── Tab 5: About ──────────────────────────────────────────────────────────────

with tab5:
    st.markdown(
        """
## About This Dashboard

**Project:** Veridi Logistics "Last Mile" Delivery Auditor
**Dataset:** [Olist Brazilian E-Commerce](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)
**Notebook:** Google Colab (`logistics_auditor.ipynb`)
**Dashboard:** Streamlit Cloud (`app.py`)

---

### Data Pipeline
1. Raw Olist CSVs processed in `logistics_auditor.ipynb`
2. Tables joined: Orders + Reviews + Customers + Order Items + Products + Translations
3. `Days_Difference = estimated_delivery - actual_delivery` (positive = early, negative = late)
4. Orders classified as **On Time** (≥0d), **Late** (−5d to 0d), **Super Late** (<−5d)
5. Canceled / unavailable orders excluded
6. Exported as `master_dataset.csv` → loaded here

---

### Candidate's Choice: Monthly Performance Trend

Tracking late-delivery rate and review scores month-over-month answers:
- Is the problem **getting worse**? (escalate urgency)
- Is it **seasonal**? (allocate surge capacity pre-holiday)
- Did a specific event (e.g., Black Friday) cause a permanent spike?

This transforms the audit from a snapshot into an **actionable time-series analysis**
the CEO can use to track the impact of remediation efforts going forward.
        """
    )
