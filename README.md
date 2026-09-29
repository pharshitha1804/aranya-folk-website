# The Aranya Club — website

A static website built with [Eleventy](https://www.11ty.dev/), with a [Decap CMS](https://decapcms.org/) editor at `/admin/` for the plant catalog, photos and page text. It is set up to be hosted on [Netlify](https://www.netlify.com/), which builds the site, receives contact-form submissions, and signs you in to the CMS.

> **All text, photos, prices and contact details are placeholder copy from the mockup.** Replace them through the CMS (or by editing the files listed below). You don't need to touch the design files to do that.

## Where things live

| What | Where | Edit in CMS under |
| --- | --- | --- |
| Plant catalog (one file per product) | `src/products/*.md` | **Plant catalog** |
| Home page text & photos | `src/_data/home.json` | Pages → Home |
| "How we work" steps (Home + Services) | `src/_data/process.json` | Pages → How we work steps |
| Products page text | `src/_data/shop.json` | Pages → Products page |
| Services | `src/_data/services.json` | Pages → Services |
| About us, values, team | `src/_data/about.json` | Pages → About us |
| Contact page, form labels, Calendly, thank-you page | `src/_data/contact.json` | Pages → Contact us |
| Logo, menu labels, email/phone/address, social links, footer | `src/_data/site.json` | Site settings |
| Photos | `src/assets/images/` | Media (or any image field) |

**Design** (layout and styling) is kept separate from the content:

- `src/_includes/base.njk` is the header, footer and page shell
- `src/*.njk` holds the page layouts (`index`, `products`, `services`, `about`, `contact`, `thanks`)
- `src/assets/css/styles.css` holds all styling. Brand colours and fonts are variables at the top.
- `src/assets/js/site.js` runs the shop filters and sorting, plus the contact-form helpers.

## Editing content

**Catalog:** Plant catalog → **+ Product**. Give the product a name, a price (a plain number such as `1200`), a category, and optionally light, placement, a short note and a photo. Turn on **Featured** to show the product on the home page. **Sort order** sets its position: lower numbers come first.

**Categories:** the category list (Indoor, Outdoor, Planters, Care) is set in `src/admin/config.yml` under the `category` field. To add a new category, add it to that list. The shop filters build themselves from whatever categories the products use.

**Calendly booking:** open Pages → Contact us → Booking (Calendly) and paste your Calendly event link, for example `https://calendly.com/your-name/site-visit`. Until you add a link, the page shows a placeholder box. Both the "Book a visit" and "Book a consultation" buttons jump to this section.

**Map:** in Google Maps choose Share → Embed a map, copy only the `src="…"` URL, and paste it into Pages → Contact us → Google Maps embed URL.

**"View portfolio" link (home page):** the link is hidden until you add a URL in Pages → Home → Selected projects.

Every save in the CMS makes a commit to GitHub. Netlify then rebuilds the site, which takes about a minute.

## Contact form

The form on `/contact/` uses [Netlify Forms](https://docs.netlify.com/forms/setup/). Submissions appear in the Netlify dashboard under **Forms → contact**. To get an email for each submission, set up notifications there. The form includes a hidden honeypot field to catch spam bots. After sending, visitors land on `/thanks/`.

**If the form isn't listed in Netlify or submitting gives a 404:** Netlify only looks for forms while it deploys. Check that form detection is on (Site configuration → Forms), then run a new deploy (Deploys → Trigger deploy → Deploy site). The deploy log should report the `contact` form, and it will then appear under Forms.

The "Enquire" button on each product opens the contact form with the product name already in the message.

## Going live on Netlify (one-time setup)

1. **Merge to `main`.** The CMS is set to save to the `main` branch (`backend.branch` in `src/admin/config.yml`).
2. **Create the site:** in Netlify choose Add new site → Import an existing project → pick this GitHub repo. The build settings come from `netlify.toml` (`npm run build`, publish folder `_site`).
3. **Turn on forms:** Site configuration → Forms → enable form detection, then redeploy once.
4. **Let the CMS sign in with GitHub:**
   - On GitHub go to Settings → Developer settings → OAuth Apps → New OAuth App. Set **Homepage URL** to your site URL and **Authorization callback URL** to `https://api.netlify.com/auth/done`.
   - In Netlify go to Site configuration → Access & security → OAuth → Install provider → GitHub, and paste in the Client ID and Secret.
5. Open `https://<your-site>/admin/` and log in with GitHub. Anyone who edits content needs write access to this repository.

To use a custom domain, add it in Netlify under Domain management.

## Working on your computer

```bash
npm install
npm start          # site at http://localhost:8080
```

To try the CMS without logging in, run `npm run cms` in a second terminal and open http://localhost:8080/admin/. In this mode the CMS edits the files on your computer directly (`local_backend: true` in the config).

`npm run build` writes the finished site to `_site/`.
