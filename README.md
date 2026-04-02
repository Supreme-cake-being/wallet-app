# Wallet App

A mobile wallet dashboard application built with React, TypeScript, and Vite. This project implements a transactions list and a detailed view, featuring dynamic data formatting, complex point calculations, and smooth UI animations.

## Tech Stack

- **Framework:** React.js 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (`index.css`) with Nunito & DM Sans fonts

## Implemented Features

- **Interactive Balance Card:** Dark gradient card displaying current balance ($847.23), available credit ($652.77 out of $1,500), and a progress bar.
- **Daily Points System:** Complex recursive memoized formula based on seasonal days (Sep/Dec/Mar/Jun). Formats points over 1000 with a "K" (e.g., 29K).
- **Smart Transactions List (10 Mocked Cases):**
  - **Dynamic Date Logic:** Shows weekday name if within the last 7 days, otherwise falls back to `M/D/YY`.
  - **Status & Users:** Handles `Pending` prefixes and authorized users (e.g., "Diana · Tuesday").
  - **Amount Formatting:** Distinguishes between Payments (`+$174.00`) and Credits (`-$34.20`).
- **Transaction Detail Screen:** Features a back button, huge amount display, status badges (Approved/Pending), card info, and full date.
- **Animations & UX:** Staggered fade-in effects on list items, smooth screen slide-up transitions, and system-style green/amber badges.

## Project Structure

```
wallet-app/
├── public/
│   └── data.json              # Mock data with all transaction edge cases
├── src/
│   ├── screens/               # UI Screens (TransactionsList, TransactionDetail)
│   ├── types/                 # TypeScript interfaces
│   ├── utils/                 # Helpers (dates, amounts, points, colors)
│   ├── App.tsx                # App shell & routing logic
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles & animations
└── package.json
```

## Getting Started

1. **Clone the repository** .
2. **Install dependencies:**
   ```bash
   npm install
   ```
   _(or `yarn install` / `pnpm install`)_
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. Open the provided `localhost` link in your browser. For the best experience, toggle **Device Mode (F12)** in your browser's DevTools and select a mobile device like iPhone 12/14.
