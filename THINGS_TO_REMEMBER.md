# FRONTEND & ADMIN SYNCHRONIZATION GUIDELINES (THINGS TO REMEMBER)

This document is the **single source of truth** for keeping storefront UI elements and the admin management panels synchronized.

> **GOLDEN RULE**: 
> **Any feature, visual element, promotion, text, badge, or banner added or changed on the frontend MUST be controllable, editable, and viewable from the Admin Panel (`/admin`). Any change should be verified on BOTH sides.**

---

## 1. Core Synchronization Architecture

Whenever content or elements are added to the frontend:
1. **Schema / Data Definition**:
   - TypeScript definitions in [`lib/`](file:///c:/Software/cricket-sportswear-website-layout/lib/) (e.g. `lib/store-taxonomy.ts`, `lib/site-assets.ts`, `lib/products-data.ts`).
   - Mongoose database schema in [`models/`](file:///c:/Software/cricket-sportswear-website-layout/models/) (e.g. `models/StoreTaxonomy.ts`, `models/SiteMedia.ts`, `models/Product.ts`).
2. **API Routes**:
   - Must handle `GET` (fetch config with default fallbacks) and `PUT`/`POST` (update and persist).
   - Ensure defaults are populated and legacy data shapes don't break when new fields are introduced.
3. **Frontend Consumer (`components/` or `app/`)**:
   - Reads stored values on initial load.
   - Listens to `storage` events for instant real-time synchronization across browser tabs/windows.
   - Fetches from the API in the background.
4. **Admin Dashboard Controller (`app/admin/components/`)**:
   - Provide explicit UI controls (inputs, toggles, file uploaders/pickers, lists with Add/Remove).
   - Maintain a **Live Storefront Preview** so the admin immediately sees how changes will appear on the storefront.
   - Save to database via API (`/api/...`) AND write to `localStorage` to broadcast immediate local updates.

---

## 2. Element-by-Element Mapping Matrix

| Storefront Feature / Component | Frontend Location | Admin Controller Tab & Component | Database / API Route |
| :--- | :--- | :--- | :--- |
| **Top Promotional Announcement Bar** | [`components/site-header.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/site-header.tsx) | `TaxonomyManagerTab.tsx` > Subtab: Announcement | `/api/taxonomy` (`announcement.items`, `enabled`, `bgColor`, `textColor`) |
| **Hero Carousel Banners** | [`components/cricket-home.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/cricket-home.tsx) (`HeroSlider`) | `MediaAssetsTab.tsx` > Hero Carousel Banners | `/api/media` (`media.heroBanners`) |
| **Promotional Split Posters (Rohit / SKY)** | [`components/cricket-home.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/cricket-home.tsx) (`PromotionalSlider`) | `MediaAssetsTab.tsx` > Promotional Split Banners | `/api/media` (`media.promotionalSection`) |
| **Category Showcase & Grid Images** | [`components/cricket-home.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/cricket-home.tsx) (`CategoryGrid`) | `MediaAssetsTab.tsx` > Category Showcase Banners | `/api/media` (`media.categoryBanners`) |
| **Video Section (Virat In Action)** | [`components/cricket-home.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/cricket-home.tsx) (`#video`) | `MediaAssetsTab.tsx` > Action Video Player | `/api/media` (`media.videoUrl`) |
| **TeamWear Campaign Banner** | [`components/cricket-home.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/cricket-home.tsx) (`#team-wear`) | `MediaAssetsTab.tsx` > TeamWear Main Banner | `/api/media` (`media.teamwearBanner`) |
| **Action Gallery Carousel** | [`components/cricket-home.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/cricket-home.tsx) (`ActionGalleryCarousel`) | `MediaAssetsTab.tsx` > Action Gallery Carousel | `/api/media` (`media.actionGallery`) |
| **Partner Logos** | [`components/cricket-home.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/cricket-home.tsx) (`#partners`) | `MediaAssetsTab.tsx` > Partner Logos | `/api/media` (`media.partnerLogos`) |
| **Main Navbar Menus & Dropdowns** | [`components/site-header.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/site-header.tsx) | `TaxonomyManagerTab.tsx` > Subtab: Main Categories | `/api/taxonomy` (`mainCategories`) |
| **Sub-Categories & Filters** | [`components/site-header.tsx`](file:///c:/Software/cricket-sportswear-website-layout/components/site-header.tsx), `/products` filters | `TaxonomyManagerTab.tsx` > Subtab: Categories | `/api/taxonomy` (`categories`) |
| **Badges / Promotional Tags** | Product cards, detail badges | `TaxonomyManagerTab.tsx` > Subtab: Badges & Tags | `/api/taxonomy` (`badges`) |
| **Sports Types** | Navigation, filters, landing pages | `TaxonomyManagerTab.tsx` > Subtab: Sports Types | `/api/taxonomy` (`sports`) |
| **Available Sizes** | Product filters, size selectors | `TaxonomyManagerTab.tsx` > Subtab: Sizes List | `/api/taxonomy` (`sizes`) |
| **Contact Info & Footer Details** | Storefront Footer, Contact sections | `TaxonomyManagerTab.tsx` > Subtab: Contact & Socials | `/api/taxonomy` (`contactInfo`) |
| **Products & Inventory** | Catalog (`/products`), Product Details (`/products/[slug]`) | `InventoryTab.tsx` & `ProductEditorModal.tsx` | `/api/products`, `/api/products/[id]` |
| **Product Customer Reviews** | Product Details (`/products/[slug]`) | `ProductEditorModal.tsx` > Section 7: Customer Reviews | `/api/products/[id]` (`reviews`, `rating`, `reviewsCount`) |
| **Customer Orders & Invoices** | Checkout (`/checkout`), User order notifications | `OrdersTab.tsx` (Status tracking, print receipt, filters) | `/api/orders` |

---

## 3. Mandatory Checklist for New Frontend Changes

Before concluding any work that introduces or modifies a frontend element:

- [ ] **1. Admin UI Check**: Is there a corresponding control in `/admin` (in `MediaAssetsTab`, `TaxonomyManagerTab`, `InventoryTab`, or `SettingsTab`) where an admin can edit, add, or toggle this element?
- [ ] **2. Persistence Check**: When saved in `/admin`, is the value stored in the MongoDB collection (`StoreTaxonomy`, `SiteMedia`, or `Product`) as well as `localStorage`?
- [ ] **3. Cross-Tab Sync Check**: Does changing the value in `/admin` immediately reflect on the open frontend tab without requiring a full manual hard reload (via `window.dispatchEvent(new Event('storage'))` and API sync)?
- [ ] **4. Fallback Safety Check**: If the database is empty or the field is unset, does the frontend gracefully fall back to sensible defaults instead of crashing or showing a blank page?

---

## 4. Trusted Media Sources & Google Drive Link Transformation

When admins enter or update image and video links:
1. **Allowed / Trusted Domains**:
   - Google Drive & Google Photos/UserContent (`drive.google.com`, `docs.google.com`, `lh3.googleusercontent.com` .. `lh6.googleusercontent.com`)
   - Trusted CDNs: Cloudinary (`res.cloudinary.com`), Unsplash (`images.unsplash.com`), Imgur (`i.imgur.com`), Shopify CDN (`cdn.shopify.com`), Pexels (`images.pexels.com`), GitHub (`raw.githubusercontent.com`)
   - Local project media paths (`/images/...`, `/videos/...`) and Base64 uploaded files (`data:image/...`, `data:video/...`)
2. **Auto-Conversion**:
   - Google Drive sharing links (e.g. `https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing` or `https://drive.google.com/open?id=<FILE_ID>`) are **automatically converted** to direct streaming URLs (`https://lh3.googleusercontent.com/d/<FILE_ID>`) upon input.
   - Any untrusted external domain is rejected with clear, actionable validation feedback in the admin interface.

- [ ] **5. Responsive View Check**: Does the element look good on desktop, tablet, and mobile (e.g. mobile tickers vs desktop sliders)?
- [ ] **6. Build Verification**: Run `npm run build` or inspect terminal logs to ensure TypeScript compilation passes.
