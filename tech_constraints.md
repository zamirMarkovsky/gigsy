# Technical Constraints & Architecture: Gigsy

## 1. The Stack
* **Frontend:** Vite + React + TypeScript + Tailwind CSS.
* **Database:** MongoDB Atlas (NoSQL) - *Free Tier M0 Sandbox*.
* **Deployment:** Mobile-first, responsive web app.

## 2. Responsive & Layout Patterns (RTL-First)
* **Directionality Strategy:**
    * NEVER use `left-0` or `right-0`.
    * ALWAYS use logical properties: `start-0` (Right in Hebrew, Left in English) and `end-0`.
    * Ensure the `<html>` tag dynamically sets `dir="rtl"` or `dir="ltr"` based on the active language.
* **The Sidebar Protocol:**
    * **Desktop (`lg` breakpoint):** Visible (Sticky). Position: `start-0`. Width: `w-64`.
    * **Mobile (`< lg` breakpoint):** Hidden by default. Triggered by Hamburger Button (`start-0` of navbar). Opens as overlay `z-40`.

## 3. Data Architecture: The "Smart Engine"
We use a **Localized Field Pattern** to handle Hebrew/English while preserving Brand Names.

### The Event Schema (Strict TypeScript Interface)
```typescript
interface GigsyEvent {
  _id: string;
  source: {
    name: string;        // IMMUTABLE. "Zappa" stays "Zappa".
    origin_url: string;  // The deep link to the original event.
    is_partner: boolean; // TRUE = We sell it. FALSE = Redirect.
  };
  title: {
    original: string;    // Raw input from provider.
    en?: string;         // Translated title.
    he?: string;         // Translated title.
  };
  pricing: {
    base_price: number;  // Face value (e.g., 100).
    currency: string;    // "ILS"
  };
  // Flexible bucket for adaptive data (Sports, Music, Standup)
  metadata: Record<string, any>; 
}
```

## 4. Commerce Architecture (Phase 2 - DRAFT ONLY)
* **Stripe Connect:** Logic is defined but disabled.
* **Button Logic:**
    * The "Buy" button component must support a mode prop:
    * mode="active" -> Triggers Stripe Flow.
    * mode="showcase" -> Triggers "Coming Soon" Modal.
* **Current Default:** mode="showcase".

## 5. Internationalization (i18n)
* **Library:** i18next.
* **Rule:** NO hardcoded strings in JSX. All text must be in src/locales/en.json and he.json.
* **Brand Shield:** The translation engine must have a "AllowList" to prevent translating venue names.

## 6. Data Lifecycle (Garbage Collection)
* **Visibility Rule:** Events are "Live" until they are 50% complete.
    * **Formula:** ExpirationTime = StartTime + (Duration / 2).
    * **Fallback:** If duration is unknown, assume 2 hours (expire 60 mins after start).
* **Cleanup Strategy:**
    * **Soft Delete:** The API query must filter out expired events (where expiry > now).
    * **Hard Delete:** A scheduled background job (cron) should permanently delete events 24 hours after they finish to save DB space.