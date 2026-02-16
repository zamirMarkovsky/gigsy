# Refactoring & Migration Plan: Gigsy

## Objective
Merge the current codebase with the new "Safe Harbor" architecture without breaking existing functionality.

## Phase 1: The "Showcase" Build (Current Priority)
**Goal:** Display the full "Gigsy Experience" but rely on external redirects for purchasing.
1.  **Layout Audit:**
    * Locate current sidebar logic.
    * Refactor to use Tailwind logical properties (`start-0`, `end-0`) for seamless RTL support.
2.  **Data Migration:**
    * Create `scripts/migrate_events.ts`.
    * Upload current hardcoded event array to MongoDB Atlas.
    * Replace manual array in frontend with `useEvents()` hook fetching from API.
3.  **i18n Implementation:**
    * Extract all UI text to `locales/en.json` and `he.json`.
    * Ensure language toggle switches `dir` attribute on `<html>`.

## Phase 2: The Commerce Layer (Inactive / Future)
* **Status:** DO NOT IMPLEMENT YET. (Code should be drafted in `src/commerce_draft/` but not imported).
* **Scope:** Stripe Connect integration, "Pass-Through" fee logic, and the `useTicketTimer` hook.
* **Trigger:** This phase begins only when contracts are signed and `VITE_ENABLE_COMMERCE=true` is set.

## Rules of Engagement for AI Agents
* **The Surgeon Rule:** Do not delete the old `ManualEvents.js` file until the new API is confirmed working in production.
* **Preserve Styles:** When refactoring a component, use the exact same Tailwind classes to maintain the look unless it violates accessibility.
* **Hybrid Model:** If an event has a discount (e.g., Soldier/Student), the UI must prioritize showing that external link over our own buy button.