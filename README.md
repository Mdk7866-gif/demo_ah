# Noor & Co. demo website

A frontend-only restaurant demo built with Next.js App Router, TypeScript, and Tailwind CSS. There is no database, authentication, or payment gateway. Names and mobile numbers typed into the site stay in memory for the current visit and are not saved.

Table QR codes should open `/menu`. Visiting `/` redirects to `/menu`.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page redirects to the menu.

Other checks:

```bash
npm run lint
npm run build
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Redirects to `/menu` |
| `/menu` | Digital menu and optional welcome prompt |
| `/offer` | Sample offers, each marked as a demo |
| `/about` | Brand story, photos, and what makes the dining room special |

## Replace the demo details

Edit `src/config/restaurant.ts`.

- Restaurant name, tagline, description, story, and highlights
- Ahmedabad address, phone display text, and `phoneTel`
- Opening hours, including closed days (`sessions: []`)
- Social links (they are labelled “Demo link” in the footer)
- `whatsappNumber`: leave it empty to show a demo booking confirmation. Set an international number with digits only, such as `9198XXXXXXXX`, to open WhatsApp with a pre-filled table request
- `marketingMessagesPerMonth` and `marketingConsentTemplate` (`{count}` and `{name}` are filled in on the menu page)
- `welcomeNote` and `welcomeDemoNote`
- `bookingTimeSlots` and `maxGuests`
- Menu dishes and offers
- Photo paths. Image files live in `public/images/`

Point each printed QR code at `https://your-domain/menu`.
