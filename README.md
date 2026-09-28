# UniRent — Campus Peer-to-Peer Rental Marketplace

UniRent is a frontend application built for college students to rent everyday academic and campus essentials (calculators, lab gear, cameras, projectors, textbooks) directly from peers on campus.

## Tech Stack

* **Framework:** React 19 + TypeScript
* **Tooling:** Vite 6
* **Styling:** Tailwind CSS v4
* **Routing:** React Router v7
* **Icons:** Lucide React
* **State Management:** Reactive local storage service with seed data

## Folder Structure

```text
unirent-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/       # Button, Input, Select, Badge, Card, Modal, ConfirmationDialog, EmptyState, Toast
│   │   ├── layout/       # Navbar, Footer, Layout
│   │   └── marketplace/  # ItemCard, PriceSummaryBox
│   ├── data/             # Rich realistic mock datasets
│   ├── pages/            # 12 distinct pages
│   ├── services/         # StorageService for state persistence
│   ├── types/            # TypeScript interfaces
│   ├── App.tsx           # Route definitions
│   ├── main.tsx          # Application root
│   └── index.css         # Tailwind & custom tokens
├── index.html
├── package.json
└── tsconfig.json
```

## Implemented Pages

1. **Home / Landing (`/`)**: Hero, value proposition, quick stats, featured items, 3-step how-it-works, footer.
2. **Marketplace (`/marketplace`)**: Search bar, category filters, sorting, availability toggle, item cards, responsive grid.
3. **Item Details (`/item/:id`)**: Item image, specifications, owner profile, rental duration selector, auto price calculation: `(Daily Rent × Days) + Security Deposit`.
4. **Create Listing (`/create-listing`)**: Item name, category, description, price, deposit, location, image upload/presets, draft/publish options.
5. **Booking / Checkout (`/checkout/:id`)**: Cost breakdown, simulated MST testnet wallet, address display, demo payment confirmation.
6. **Booking Confirmation (`/booking-confirmation/:bookingId`)**: Reference code, reservation details, escrow notice, quick navigation.
7. **My Rentals (`/my-rentals`)**: Upcoming, Active, Completed, Cancelled tabs, return actions, cancellation dialog.
8. **My Listings (`/my-listings`)**: Items listed by student, availability pause/resume, edit listing modal, deletion confirmation.
9. **Transaction History (`/transactions`)**: Audit log with transaction references, escrow statuses, and future MST blockchain hash placeholders.
10. **Disputes (`/disputes`)**: Active dispute list, case modal, photographic evidence preview, file dispute form, on-chain verification disclaimer.
11. **Profile (`/profile`)**: Student identity, .edu verification status, peer rating, reputation metrics, edit profile modal.
12. **Settings (`/settings`)**: Notification toggles, testnet MST wallet connection, token faucet (+50 MST), password update, session sign out.

## Getting Started

```bash
# Navigate to directory
cd unirent-frontend

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
