# 🛒 BazarBuddy – Family Grocery Management App

![BazarBuddy Banner](https://gmcbt9ucve.ufs.sh/f/u4KE8aYHPK05SpmOnksv0BPKJojuqUCcLyWAhdNgE7isGMSH)

**BazarBuddy** is a smart, modern web application designed to revolutionize the way families manage groceries. It offers powerful features like collaborative shopping lists, real-time expense tracking, and AI-powered item suggestions — all wrapped in a clean, responsive interface.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**, BazarBuddy ensures performance, scalability, and an elegant user experience. It leverages **AI** to suggest prices for grocery items based on the local market (Bangladesh context), making budget planning easier than ever.

---

## 📌 Table of Contents

- [✨ Overview](#-overview)
- [⚙️ Features](#️-features)
- [🧠 Key Functionalities](#-key-functionalities)
- [🚀 Installation & Setup](#-installation--setup)
- [🧪 Technologies Used](#-technologies-used)
- [📱 Mobile Support](#-mobile-support)
- [📄 License](#-license)

---

## ✨ Overview

**BazarBuddy** empowers families to:
- 🛍 **Plan Smarter:** Create collaborative shopping lists with ease.
- 💸 **Track Expenses:** Visualize monthly and weekly grocery spending.
- 🤖 **AI Assistance:** Get intelligent price suggestions for items automatically.
- 📄 **Export Reports:** Generate professional PDF lists for shopping trips.
- 🌍 **Bilingual Support:** Full support for both **English** and **Bangla**.
- 📱 **Mobile First:** A responsive design that works perfectly on phones and tablets.

Whether you're budgeting groceries, splitting shopping duties, or planning meals—**BazarBuddy** has your back.

---

## ⚙️ Features

| Feature | Description |
|---------|-------------|
| **📝 Create & Manage Lists** | Create monthly or event-specific grocery lists with title and date. |
| **🤖 AI Price Suggestions** | Automatically estimates prices for thousands of items using AI (with smart fallback database). |
| **✋ Drag & Drop Ordering** | Organize your shopping list efficiently by dragging and dropping items. |
| **📋 Duplicate Lists** | Quickly copy previous lists to start a new month without re-typing everything. |
| **📊 Expense Analytics** | Dashboard with charts showing spending trends and total statistics. |
| **📤 PDF Export** | Download your grocery lists as beautifully formatted PDFs (supports Bangla font). |
| **🔄 History Tracking** | Keep a record of all your past shopping lists and expenses. |
| **🌓 Dark/Light Mode** | Seamless theming for comfortable viewing day or night. |
| **🌐 English & Bangla** | Switch languages instantly to suit your preference. |

---

## 🧠 Key Functionalities

### 🤖 Smart Price Estimation
BazarBuddy uses a dual-layer system for estimating prices:
1.  **AI-Powered:** Connects to OpenAI (via Supabase Edge Functions) to intelligently guess prices.
2.  **Smart Database:** A robust local database of common Bangladeshi grocery items serves as a fallback, ensuring instant and accurate pricing even without AI connectivity.
   - *Supports various units: kg, gram, liter, pcs, dozen, etc.*

### 📄 Pro PDF Generation
Generate shopping lists that are ready to print or share on WhatsApp. The PDF generator is optimized to handle **Bangla characters** correctly, ensuring your "চাল" (Rice) and "ডাল" (Lentil) lists look perfect.

### 📱 Responsive Mobile Layout
The application features a custom-built mobile sidebar and layout, ensuring that the app feels like a native mobile application when used on smartphones. The navigation is intuitive, with a bottom-sheet style menu for smaller screens.

---

## 🚀 Installation & Setup

Follow these steps to get BazarBuddy running on your local machine.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Supabase account (for backend)

### Project Structure 

```
bazar-buddy-v2
├─ bun.lockb
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ bbdy.png
│  ├─ Loginpage.jpg
│  ├─ placeholder.svg
│  ├─ robots.txt
│  └─ _redirects
├─ README.md
├─ Run-local.bat
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ components
│  │  ├─ AreaChart.tsx
│  │  ├─ DashboardLayout.tsx
│  │  ├─ GroceryItemForm.tsx
│  │  ├─ GroceryItemTable.tsx
│  │  ├─ LanguageSwitcher.tsx
│  │  ├─ MetricCard.tsx
│  │  ├─ PDFPreview.tsx
│  │  ├─ PrintPreview.tsx
│  │  ├─ ProtectedRoute.tsx
│  │  ├─ Sidebar.tsx
│  │  ├─ TotalSpentPieChart.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ contexts
│  │  ├─ AuthContext.tsx
│  │  ├─ GroceryContext.tsx
│  │  └─ LanguageContext.tsx
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ index.css
│  ├─ integrations
│  │  └─ supabase
│  │     ├─ client.ts
│  │     └─ types.ts
│  ├─ lib
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ CreateList.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ EditList.tsx
│  │  ├─ ForgotPassword.tsx
│  │  ├─ Index.tsx
│  │  ├─ ListHistory.tsx
│  │  ├─ Login.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ Profile.tsx
│  │  ├─ Register.tsx
│  │  ├─ ResetPassword.tsx
│  │  └─ Settings.tsx
│  ├─ utils
│  │  ├─ currency.ts
│  │  └─ translations.ts
│  └─ vite-env.d.ts
├─ supabase
│  ├─ config.toml
│  └─ functions
│     └─ generate-price
│        └─ index.ts
├─ tailwind.config.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

### Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/farhanshahriyar/BazarBuddy-Family-Grocery-Management-App.git
    cd bazar-buddy-v2
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit: `http://localhost:8080` (or the port shown in terminal)

5.  **Build for Production**
    ```bash
    npm run build
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
- **React Hook Form** - Form Handling
- **Zod** - Schema Validation

### Features & Integrations
- **Supabase** - Auth, Database, realtime subscriptions
- **Supabase Edge Functions** - AI Logic backend
- **@dnd-kit** - Drag and Drop interactions
- **Recharts** - Data Visualization
- **jsPDF & autoTable** - PDF Generation
- **Lucide React** - Beautiful Icons

---

## 📱 Mobile Support

BazarBuddy is designed with a **"Mobile-First"** approach.
- **Touch-optimized** drag and drop.
- **Responsive** data tables and charts.
- **Collapsible** sidebar and mobile drawer navigation.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

> *"The modern kitchen deserves a smart assistant."*
> — **Farhan Shahriyar** | Creator of BazarBuddy


