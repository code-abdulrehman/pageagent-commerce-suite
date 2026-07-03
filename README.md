# Northstar Goods — Page Agent Commerce Suite

A full-stack ecommerce starter built with **Next.js App Router**, **PostgreSQL + Prisma**, TypeScript, Tailwind CSS, seeded operational data, and an embedded **Page Agent** UI assistant.

Everything in the application UI, product copy, mock content, and demo prompts is in English.

## What is included

### Storefront
- Responsive home page and multi-category catalog
- Product detail pages with stock, ratings, specifications, and related products
- Search, category filters, product sorting, local cart, and demo checkout
- Customer sign-in and a simple order-history page
- Customer-service help center and support-ticket form
- Mock product imagery generated as deterministic SVG artwork; no stock-photo account or external image host is required

### Admin workspace
- Protected administrator login
- Operations overview and key metrics
- Product catalog and inventory view; create-product workflow
- Order search, filtering, fulfillment status management, and an event trail in the schema
- Customer directory
- Support-ticket triage and state management
- Confirmation prompts before status-changing actions

### Backend and data
- PostgreSQL database defined in `prisma/schema.prisma`
- Seed script with five categories, twenty products, sample customers, orders, and support cases
- Session cookie signed with HMAC for the demo
- APIs for sign-in, sign-out, checkout/order creation, support tickets, product creation, order status changes, and ticket status changes
- Docker Compose configuration for PostgreSQL 16

### Page Agent
The exact requested Page Agent demo script is embedded globally:

```html
<script src="https://cdn.jsdelivr.net/npm/page-agent@1.10.0/dist/iife/page-agent.demo.js" crossorigin="true"></script>
```

When the app is running, Page Agent adds its own in-page control panel. Prompt examples are also included in the storefront and admin views.

## Quick start

### 1. Create your environment file

```bash
cp .env.example .env
```

Change `SESSION_SECRET` to a long random value before any deployment.

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Install packages and seed the database

```bash
npm install
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Demo accounts

| Role | Email | Password | Entry |
| --- | --- | --- | --- |
| Administrator | `admin@northstar.demo` | `AdminDemo!2026` | `/admin/login` |
| Customer | `avery@example.com` | `CustomerDemo!2026` | `/login` |
| Support agent seed | `support@northstar.demo` | `AgentDemo!2026` | Database seed only |

These credentials are intentionally public and are **only for a local demonstration**. Delete or replace them before deployment.

## Suggested Page Agent tasks

### Customer tasks
- `Search for the Aurora Insulated Bottle and add one to my cart.`
- `Show me travel products under $100.`
- `Open customer support and start a return request for order NTH-10428.`
- `Go to my cart and proceed to checkout.`

### Admin tasks
- `Open the orders page and show orders awaiting fulfillment.`
- `Find order NTH-10428 and change its status to processing.`
- `Open support cases and find the high priority damaged item request.`
- `Go to products and show items with low inventory.`

## Important production notes

1. **Page Agent demo CDN**: The included `page-agent.demo.js` is documented by the Page Agent project as a technical-evaluation script that uses a free testing LLM. Do not send real customer data, payment data, or production admin sessions through it. Move to a bring-your-own-model configuration and proxy credentials server-side before production.

2. **Payment processing**: Checkout deliberately does not collect card details and does not connect to a payment processor. Add a compliant provider such as Stripe, Adyen, or Braintree with server-side webhooks, idempotency, fraud controls, tax calculation, and signed payment states.

3. **Authentication and authorization**: The included cookie session is a small demo implementation. Production needs a real identity provider, MFA for privileged roles, CSRF protection, rate limits, structured audit logs, password reset flows, and granular permissions.

4. **Operations safety**: Keep human confirmation around refunds, cancellations, address changes, export actions, and fulfillment state changes. Treat agent-generated actions as suggestions until confirmed.

5. **Commerce capabilities to add for a real launch**: image storage and moderation, payment webhooks, shipping rates and labels, returns portal, tax engine, discounts, inventory reservations, analytics, transactional email, monitoring, backups, and GDPR/CCPA controls.

## Project structure

```text
app/                      Next.js routes and API handlers
app/admin/(workspace)/    Protected admin pages
components/               Storefront, cart, agent prompt, and admin UI components
lib/                      Data access, session, seed fallback, formatting, SVG artwork
prisma/                   PostgreSQL schema and seed script
docker-compose.yml        Local Postgres service
```

## Useful commands

```bash
npm run dev         # Start development server
npm run build       # Generate Prisma client and build the app
npm run db:push     # Sync schema to your local database
npm run db:seed     # Seed demo records
npm run db:reset    # Reset schema and reseed local database
```
