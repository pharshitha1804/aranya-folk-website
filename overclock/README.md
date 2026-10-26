# Overclock — website

The Overclock site, built from the "Radial" design (desktop + mobile). It is plain HTML, CSS and JavaScript: no build step, no frameworks.

| File | What it holds |
| --- | --- |
| `index.html` | All the text: hero, about, the four pillars, services, team, case studies, footer |
| `styles.css` | All styling. Brand colours are variables at the top. Phone layout first, desktop from 900px wide. |
| `script.js` | The spinning logo mark, page switching (About / Services / Team / Work / Contact), the services accordion and the phone menu |
| `assets/spiral.png` | The dotted spiral in the hero |
| `assets/mark.svg` | The logo mark (also the browser-tab icon) |
| `assets/team/*.jpg` | Team photos (320×320, square) |

**Pages** work through the address bar: `yoursite.com/#services`, `#about`, `#team`, `#work`, `#contact`. Clicking a service name in the hero opens that service on the Services page.

## Editing

- **Text:** open `index.html` and change the words. Each section is marked with a comment like `<!-- ===== Services ===== -->`.
- **Email address:** search `index.html` for `hello@overclock.org` (it appears twice on one line: the link and the visible text).
- **Team photo:** replace the file in `assets/team/` with a square photo using the same file name.
- **Case studies:** each one is an `<article class="case">` in the Work section. The tag and title appear twice in each (once for desktop, once for phones), so change both.
- **Colours:** the variables at the top of `styles.css` (`--teal` is the main brand colour).

To preview locally, open `index.html` in a browser.

## Putting it online with your Squarespace domain

Squarespace can't host a site made of your own code files; it only hosts sites built in its own editor. So the site is hosted on **Netlify** (free), and your Squarespace domain is pointed at it. You keep the domain at Squarespace.

### 1. Create the site on Netlify

**Option A: connected to GitHub (updates automatically when the code changes)**

1. Sign in at [app.netlify.com](https://app.netlify.com) (sign up with GitHub).
2. **Add new site → Import an existing project → GitHub**, and pick `aranya-folk-website`.
3. Set **Branch to deploy** to the branch with this folder (`main` once merged).
4. Set **Base directory** to `overclock`. Leave the build command empty; the publish directory is `overclock`.
5. Click **Deploy**. You get an address like `overclock-abc123.netlify.app`. Open it and check the site.

**Option B: drag and drop (quickest, no GitHub)**

1. Download this `overclock` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the folder onto the page.
3. You get a `something.netlify.app` address. To update later, drag the folder again under **Deploys**.

Rename the site under **Site configuration → Change site name** (for example `overclock-advisory.netlify.app`).

### 2. Add your domain in Netlify

1. In the site, go to **Domain management → Add a domain**, and type your domain (e.g. `yourdomain.com`).
2. Choose to keep your DNS where it is (external DNS); don't move nameservers to Netlify. Netlify then shows the records to add. They will be the ones below.

### 3. Point the domain from Squarespace

1. Sign in to Squarespace and open the **Domains** dashboard, then click your domain.
2. Open **DNS** (DNS settings).
3. Under **Squarespace Defaults**, delete the default records (the trash icon) so they don't conflict. **Leave alone** any MX or TXT records: those run your email.
4. Under **Custom records**, add:

   | Host | Type | Data / value |
   | --- | --- | --- |
   | `@` | A | `75.2.60.5` |
   | `www` | CNAME | `your-site-name.netlify.app` |

   Use the exact `.netlify.app` name of your site. If Netlify shows different values, use Netlify's.
5. Save. Changes usually take effect within an hour, and can take up to 24 hours.

### 4. Turn on HTTPS

Back in Netlify, under **Domain management → HTTPS**, click **Verify DNS configuration**, then **Provision certificate**. This is free and renews automatically. After that the site loads at `https://yourdomain.com`.

### Email

The site links to `hello@overclock.org`. For that address to receive mail, set up email for your domain (for example Google Workspace, which Squarespace sells, or Zoho Mail). Its MX records go in the same Squarespace DNS page, and they don't conflict with the website records above.
