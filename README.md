<div align="center">

# 🛡️ JobShield AI

### Don't let a fake job offer steal your future.

**An AI-powered job-offer risk assessment platform that helps students, freshers, and job seekers spot suspicious recruitment messages before they share money or personal information.**

<br/>

![JobShield AI](https://img.shields.io/badge/JobShield-AI-00C98D?style=for-the-badge&logo=shieldsdotio&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

[Overview](#-the-problem) · [Features](#-key-features) · [How it works](#-how-it-works) · [Tech stack](#-technology-stack) · [Setup](#-getting-started) · [Limitations](#-important-limitations)

</div>

---

## 🚨 The problem

Searching for a job or internship should be exciting—not risky.

Students and freshers regularly receive recruitment messages through email, WhatsApp, social media, and job portals. Some messages may contain warning signs such as:

- Requests for registration fees, deposits, or payments to secure a job.
- Unrealistic salary promises or guaranteed selection.
- Pressure to act immediately.
- Requests for OTPs, passwords, banking details, or sensitive documents.
- Unclear company information or suspicious recruitment language.

It can be difficult to know what to trust, especially for someone applying for their first job.

## 💡 Our solution

**JobShield AI** gives users a simple place to review a job offer, internship description, or recruiter message.

The user submits the offer details. JobShield sends the supplied text to an AI-powered analysis service and returns an easy-to-understand risk assessment, including a score, possible warning signs, positive indicators, safety recommendations, and independent verification steps.

> **Our goal:** Help people pause, think, and verify before trusting a job offer.

JobShield is a decision-support tool. It does not make the final decision for the user.

## ✨ Key features

| Feature | What it does |
|---|---|
| 🤖 AI offer analysis | Reviews supplied job or internship text for possible scam warning signs. |
| 📊 Risk score | Shows an estimated score from 0–100 and a Low, Medium, or High risk category. |
| 🚩 Warning signs | Highlights suspicious or concerning details found in the submitted text. |
| ✅ Positive indicators | Shows details that may appear reassuring, without treating them as proof. |
| 🧭 Safety recommendations | Suggests practical precautions based on the submitted information. |
| 🔎 Verification steps | Gives users steps to independently check the employer and recruiter. |
| 🏢 Company review checklist | Helps users review company information; it is not a live registry verification service. |
| 🕘 Scan history | Saves authenticated users' previous scan reports in Supabase. |
| 🔐 Authentication and data access | Uses Supabase Auth and row-level security for private scan reports. |
| 📱 Responsive interface | Designed to work across desktop, tablet, and mobile screens. |

## 🧭 How it works

1. **Open the scanner** — choose the type of opportunity: job offer, internship, recruiter message, or another opportunity.
2. **Add the details** — paste the readable job description or recruiter message and optionally provide the company name.
3. **Run the scan** — JobShield securely sends the submitted text to its Supabase Edge Function.
4. **Review the report** — see the estimated risk score, risk category, warning signs, positive indicators, recommendations, and uncertainty notes.
5. **Verify independently** — contact the company using contact details found through its independently located official channels. Never rely only on the contact details in a suspicious message.

## 📈 Understanding the risk score

The current application groups scores into these categories:

| Score | Category | Meaning |
|---:|---|---|
| 0–34 | 🟢 Low Risk | The supplied text contains fewer detected warning signs. It is **not** a guarantee that the offer is genuine. |
| 35–69 | 🟠 Medium Risk | Some details deserve additional checking before proceeding. |
| 70–100 | 🔴 High Risk | The supplied text contains stronger warning signs. Be cautious and independently verify the opportunity. |

**Important:** The score is an AI-generated estimate based on the information supplied by the user. It is not a probability, background check, legal finding, or proof that an opportunity is safe or fraudulent.

## 🖥️ Pages in the application

- **Home** (`index.html`) — product introduction and main navigation.
- **Scan Job** (`scan.html`) — submit job-offer information for analysis.
- **Scan Results** (`results.html`) — review the latest risk assessment.
- **Verify Company** (`verify.html`) — use a company information review checklist.
- **Scan History** (`history.html`) — view saved reports for the signed-in user.
- **Safety Tips** (`safety.html`) — learn practical ways to avoid recruitment scams.
- **About** (`about.html`) — learn about the purpose of JobShield.
- **Account** (`account.html`) — sign in or create an account.

## 🧰 Technology stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Responsive layout, visual design, and animations |
| JavaScript (ES modules) | Frontend interactions and application logic |
| Vite | Local development server and production build |
| Supabase Auth | User authentication |
| Supabase PostgreSQL | Stores scan reports |
| Supabase Row Level Security (RLS) | Restricts report access to the report owner |
| Supabase Edge Functions | Secure server-side AI request handling |
| Google Gemini API | AI-powered analysis of submitted offer text |
| GitHub | Source-code hosting and version control |
| Vercel | Frontend deployment |

## 🏗️ Architecture

```text
User
 │
 ▼
JobShield Web App
(HTML + CSS + JavaScript + Vite)
 │
 ├── Supabase Auth
 │     └── User session
 │
 ├── Scan History
 │     └── Supabase PostgreSQL
 │           └── scan_reports + Row Level Security
 │
 └── Analyze Offer
       └── Supabase Edge Function
             ├── Validates the user's session
             ├── Sends supplied text to Gemini API
             ├── Formats the risk assessment
             └── Saves the report using the user's identity
```

The Gemini API key is stored as a Supabase Edge Function secret. It is not placed in browser JavaScript or committed to the repository.

## 🚀 Getting started

### Prerequisites

Install the following before running the project:

- [Node.js (LTS)](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A [Supabase](https://supabase.com/) project
- A [Google AI Studio API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

Replace the example repository URL with your own GitHub repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure frontend environment variables

Create a file named `.env` in the project root. Copy the variable names from `.env.example` and add your own Supabase project URL and **public anon/publishable key**:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLIC_ANON_OR_PUBLISHABLE_KEY
```

Do not put a Gemini API key, Supabase service-role key, database password, or other secret in this file.

### 4. Set up the Supabase database

In the Supabase Dashboard:

1. Open your project.
2. Open **SQL Editor**.
3. Open `supabase/migrations/202611150001_create_scan_reports.sql` from this repository.
4. Copy the SQL into the SQL Editor and run it once.
5. Confirm that the `scan_reports` table exists and that RLS is enabled.

The migration creates policies that allow authenticated users to read and insert only their own scan reports.

### 5. Configure the AI Edge Function

Install and use the Supabase CLI through the project's local dependency:

```bash
npx supabase login
npx supabase link --project-ref YOUR-PROJECT-REF
```

Set the Gemini key and model as Supabase secrets. Replace the example value with your own key:

```bash
npx supabase secrets set GEMINI_API_KEY=YOUR_GEMINI_API_KEY
npx supabase secrets set GEMINI_MODEL=YOUR_SUPPORTED_GEMINI_MODEL
```

Deploy the function:

```bash
npx supabase functions deploy analyze-offer
```

Use a Gemini model currently available to your Google AI Studio project. Model availability and quotas can change.

### 6. Run the website locally

```bash
npm run dev
```

Open the local address printed by Vite in your browser (usually `http://localhost:5173`).

### 7. Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

### Deploy with Vercel

1. Push the project to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Select **Add New → Project** and import your GitHub repository.
4. Keep the Vite framework preset.
5. Add the two frontend environment variables from your `.env` file in Vercel Project Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy the project.
7. After changing environment variables, redeploy so the new values are applied.

Keep Gemini and other server-side secrets in Supabase Edge Function secrets—not in Vercel frontend variables.

## 🔐 Security and privacy

- Supabase Auth is used for authenticated access to the scanner workflow.
- The `scan_reports` table has Row Level Security enabled.
- Users can access only reports associated with their authenticated user ID, according to the supplied RLS policies.
- The Edge Function validates the user's access token before processing a scan.
- The Gemini API key is stored server-side as a Supabase secret.
- `.env` is excluded from Git through `.gitignore`.

**Before a public launch:** review Supabase Auth settings, allowed redirect URLs, email confirmation, API quotas, rate limits, retention/deletion requirements, and applicable privacy obligations. Do not assume a starter configuration is a complete security audit.

## ⚠️ Important limitations

JobShield is designed to identify **possible warning signs**, not to certify an employer or job offer.

- The current upload control accepts PDF, JPG, and PNG files and provides a local preview. This version does **not** extract text from uploaded files. Users must paste the readable offer text into the scanner for AI analysis.
- The company review page is a guided checklist. It does not query official company registries, inspect domain ownership, or authenticate a recruiter.
- A supplied job URL is treated as context. The application does not crawl the website or independently verify the link.
- AI can make mistakes, miss warning signs, or misunderstand context. Always verify important information independently.
- A low-risk score does not mean an offer is guaranteed safe. A high-risk score is not a legal determination of fraud.
- Do not upload passwords, OTPs, bank details, identity documents, or other unnecessary sensitive personal information.

## 🛣️ Future improvements

Possible next steps for the project:

- Extract text from uploaded PDF and image files.
- Add independent company-domain and public registry checks using trusted data sources.
- Add recruiter contact and domain consistency checks.
- Add downloadable PDF reports.
- Add scan filtering, search, and report deletion controls.
- Add rate limiting, abuse monitoring, and stronger operational security.
- Add multilingual analysis for more job seekers.

These are proposed improvements and are not represented as completed features.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make a focused change.
4. Test the application with `npm run build`.
5. Open a pull request describing the change.

Please do not commit `.env` files, API keys, access tokens, or other credentials.

## 📄 License

No license has been specified yet. Add a `LICENSE` file before presenting this repository as open source or allowing reuse under specific terms.

---

<div align="center">

### 🛡️ JobShield AI

**Think before you trust. Verify before you accept.**

Built to help students and job seekers make safer, more informed decisions.

</div>
