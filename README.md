# Veridi Logistics — "Last Mile" Delivery Audit

---

## A. Executive Summary

An audit of 96,470 delivered orders from the Olist Brazilian E-Commerce dataset reveals that **8.1% of deliveries are late** (3.7% Late, 4.4% Super Late — more than 5 days past the promised date), confirming the CEO's suspicion that Veridi is over-promising and under-delivering. The problem is **not nationwide**: the five worst-performing states are all located in Brazil's Northeast region (Alagoas 23.9%, Maranhão 19.7%, Piauí 16.0%, Ceará 15.3%, Sergipe 15.2%), far from the main São Paulo distribution hubs. Late deliveries are directly correlated with lower customer review scores, with Super Late orders receiving measurably worse ratings than On Time orders. Targeted investment in Northeast last-mile infrastructure — not a nationwide overhaul — is the recommended first action.

---

## B. Project Links

- **Notebook (Google Colab):** [logistics_auditor.ipynb](https://colab.research.google.com/drive/1VAAmrHdF12UJwhNQ9mZvDuzk8vIWb7DY?usp=sharing) *(Anyone with link can view)*
- **Dashboard (Streamlit Cloud):** [https://kpkujdhbawruts6v4zeapps.streamlit.app/](https://kpkujdhbawruts6v4zeapps.streamlit.app/)
- **Presentation:** [Google Slides — Last Mile Delivery Audit](https://docs.google.com/presentation/d/1ipM2q-LXO8iChG9oQE1CZwib7zx8Cz46Wl0xtcGl7Ao/edit?usp=sharing) *(Anyone with link can view)*

---

## C. Technical Explanation

### Data Cleaning

- **Duplicate reviews:** The reviews table has a 1-to-many relationship with orders. Only the most recent review per `order_id` was kept (deduplicated by `review_answer_timestamp`) before joining to avoid row inflation — verified with a row-count assertion after the merge.
- **Excluded orders:** Orders with `order_status` of `canceled` or `unavailable` were excluded from all delivery-time calculations, as they have no meaningful delivery date.
- **Missing delivery dates:** Any delivered orders still missing `order_delivered_customer_date` were dropped before computing `days_difference`.
- **Category translation:** Portuguese product category names were mapped to English using the bundled `product_category_name_translation.csv`, with an untranslated fallback for any unmatched values.

### Candidate's Choice — Monthly Performance Trend

The dashboard's **Monthly Trend** tab tracks late-delivery rate and average review score side-by-side over time. A single-point audit tells the CEO *how bad* the problem is today; a time-series tells her *whether it is getting worse* and *when it started* — which determines urgency and whether a specific operational change (e.g. a warehouse move, a surge period) caused a structural spike. This feature directly supports the CEO's next decision: whether to treat this as a long-standing systemic issue or a recent operational failure.

---

## Project Structure

```
Logistics-auditor-/
├── logistics_auditor.ipynb          # Google Colab analysis notebook
├── logistics_auditor.pdf            # PDF export of notebook (with charts)
├── Veridi_Logistics_Presentation.pptx  # Slide deck
├── requirements.txt                 # Streamlit Cloud dependencies
├── .gitignore                       # Excludes raw CSVs and node_modules
└── Streamlit App(Dashboard)/
    ├── app.py                       # Streamlit dashboard
    └── master_dataset.csv           # Processed dataset (exported from notebook)
```

---

## Tools Used

| Tool | Purpose |
|---|---|
| Google Colab | Data analysis & notebook |
| Python (pandas, plotly) | Data processing & visualisation |
| Streamlit Cloud | Public interactive dashboard |
| Google Slides | Presentation |
| Olist Brazilian E-Commerce (Kaggle) | Dataset |
