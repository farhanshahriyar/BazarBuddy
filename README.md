# 🛒 BazarBuddy – A Bangladeshi Family Grocery Management App

![BazarBuddy Banner](https://gmcbt9ucve.ufs.sh/f/u4KE8aYHPK05SpmOnksv0BPKJojuqUCcLyWAhdNgE7isGMSH)

**BazarBuddy** is a Bangladeshi smart, modern web application designed to revolutionize the way families manage groceries. It offers powerful features like collaborative shopping lists, real-time expense tracking, and AI-powered item suggestions — all wrapped in a clean, responsive interface.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**, BazarBuddy ensures performance, scalability, and an elegant user experience. It leverages **AI** to suggest prices for grocery items based on the local market (Bangladesh context), making budget planning easier than ever.

---

## 📌 Table of Contents

- [✨ Overview](#-overview)
- [⚙️ Features](#️-features)
- [🧠 Key Functionalities](#-key-functionalities)
- [�️ Future Roadmap](#️-future-roadmap)
- [�🚀 Installation & Setup](#-installation--setup)
- [🧪 Technologies Used](#-technologies-used)
- [📱 Mobile Support](#-mobile-support)
- [📄 License](#-license)

---

## ✨ Overview

**BazarBuddy** empowers families to:
- 🛍️ **Plan Smarter:** Create collaborative shopping lists with ease.
- 💸 **Track Expenses:** Visualize monthly and weekly grocery spending.
- 🤖 **AI Assistance:** Get intelligent price suggestions for items automatically.
- 📄 **Export Reports:** Generate professional PDF lists for shopping trips.
- 🌍 **Bilingual Support:** Full support for both **English** and **Bangla**.
- 📱 **Mobile First:** A responsive design that works perfectly on phones and tablets.

Whether you're budgeting groceries, splitting shopping duties, or planning meals **BazarBuddy** has your back.

---

## ⚙️ Features

| Feature | Description |
|---------|-------------|
| **📝 Create & Manage Lists** | Create monthly or event-specific grocery lists with title and date. |
| **🤖 AI Price Suggestions** | Automatically estimates prices using **OpenAI/OpenRouter** with smart fallback. |
| **🌑 Premium Changelog** | A stunning, timeline-based update history with sticky navigation and featured visuals. |
| **🚀 Persistent Feedback** | Dedicated support channel integrated directly with **Supabase** for feature requests. |
| **✋ Drag & Drop Ordering** | Organize your shopping list efficiently by dragging and dropping items. |
| **📋 Duplicate Lists** | Quickly copy previous lists to start a new month without re-typing everything. |
| **📊 Expense Analytics** | Dashboard with charts showing spending trends and total statistics. |
| **📤 PDF Export** | Download your grocery lists as beautifully formatted PDFs (supports Bangla font). |
| **🌐 English & Bangla** | Switch languages instantly to suit your preference. |
| **🔒 Secure Auth** | Premium redesigned login/reset flow for a professional security experience. |

---

## 🧠 Key Functionalities

### 🤖 Smart Price Estimation
BazarBuddy uses a dual-layer system for estimating prices:
1.  **AI-Powered:** Connects to OpenAI (via Supabase Edge Functions) to intelligently guess prices.
2.  **Smart Database:** A robust local database of common Bangladeshi grocery items serves as a fallback, ensuring instant and accurate pricing even without AI connectivity.
    - *Supports various units: kg, gram, liter, pcs, dozen, etc.*

### 📄 Pro PDF & Full Reports
Generate shopping lists that are ready to print or share. The generator is optimized to handle **Bangla characters** correctly. The **Full Report** feature provides a comprehensive overview of all history and statistics.

### 📱 Responsive Mobile Layout
The application features a custom-built mobile sidebar and layout, ensuring that the app feels like a native mobile application. Recently optimized **Settings** and **Report Preview** ensure a flawless experience on small screens.

---

## �️ Future Roadmap

We are constantly working to make BazarBuddy the only tool your family needs for grocery management.

### 🚀 Q1 2026: Collaboration & Sync
- **Family Sharing**: Invite family members to specific lists via email/PIN.
- **Real-Time Presence**: See who is currently adding items to the list.
- **Mobile App (Beta)**: Native iOS and Android wrappers for better push notifications.

### 📊 Q2 2026: Financial Intelligence
- **Smart Budgets**: Set monthly limits and get notified when you're 80% through your budget.
- **Multi-Store Management**: Track prices across different local stores to find the best deals.
- **Advanced Export**: Export data to Excel/Google Sheets for custom analysis.

### 🍱 Q3 2026: Meal Planning
- **Recipe to List**: Scan a recipe or paste a link to automatically add ingredients to your list.
- **Inventory Tracking**: Keep track of what's already in your pantry to avoid double-buying.

### 💎 Q4 2026: Premium Ecosystem
- **BazarBuddy Premium**: Ad-free experience with unlimited shared lists and priority AI support.
- **API Access**: For developers to build integrations with local grocery delivery services.

---

## 🚀 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/farhanshahriyar/BazarBuddy.git
    cd BazarBuddy
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

## 🧪 Technologies Used

### Frontend Core
- **React** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **ShadCN UI** - Professional Component Library

### State & Logic
- **Context API** - State Management
- **React Query** - Data Fetching
- **Supabase Edge Functions** - AI Logic backend
- **@dnd-kit** - Drag and Drop interactions
- **Recharts** - Data Visualization
- **html2pdf.js** - PDF Generation

---

##  License

This project is licensed under the MIT License.

---

> *"The modern kitchen deserves a smart assistant."*
> — **Farhan Shahriyar** | Creator of BazarBuddy
