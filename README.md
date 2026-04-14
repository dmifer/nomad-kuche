# Nomad Küche

Central Asian culinary experiences in Vienna. A one-page landing site with Cal.com workshop booking and inquiry forms.

## Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

### 1. Create the GitHub Repository

```bash
# Initialize git and push
git init
git add .
git commit -m "Initial commit: Nomad Küche landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nomad-kuche.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will run automatically on push and deploy to:
   `https://YOUR_USERNAME.github.io/nomad-kuche/`

### 3. Custom Domain (Optional)

To use a custom domain like `nomadkuche.com`:

1. Add your domain to `public/CNAME`:
   ```
   nomadkuche.com
   ```

2. Update `vite.config.js` — change the base path:
   ```js
   base: '/',  // was '/nomad-kuche/'
   ```

3. Configure DNS at your domain registrar:
   - **A records** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME** record: `YOUR_USERNAME.github.io`

4. In GitHub repo → Settings → Pages → Custom domain → enter `nomadkuche.com`
5. Check "Enforce HTTPS"

6. Update `index.html` meta tags (`og:url`, `og:image`) with your real domain.

## Project Structure

```
nomad-kuche/
├── .github/workflows/
│   └── deploy.yml          # Auto-deploy on push to main
├── public/
│   ├── 404.html            # SPA fallback for GitHub Pages
│   ├── CNAME               # Custom domain (fill in if needed)
│   ├── favicon.svg         # Brand favicon
│   └── robots.txt          # SEO
├── src/
│   ├── main.jsx            # React entry point
│   └── NomadKuche.jsx      # Full site component
├── index.html              # HTML shell + SEO meta tags
├── package.json
├── vite.config.js           # Vite config with GH Pages base
└── README.md
```

## Customization

### Cal.com Booking

The booking calendar is embedded inline from Cal.com. To change the event:
- Edit `calLink` in the `CalEmbed` component in `src/NomadKuche.jsx`
- Current: `nomadkuche/manty-workshop`
- Manage availability, questions, and notifications at [cal.com](https://cal.com)

### Images

All images are currently gradient placeholders. Replace them with real photography:
1. Add images to `public/images/`
2. Replace `<ImgPlaceholder>` components with `<img>` tags
3. Recommended: food close-ups, dough preparation, steam, hands shaping manty

### Contact Form

The inquiry form currently shows a confirmation UI but doesn't send data.
To make it functional, options include:
- **Formspree**: Add `action="https://formspree.io/f/YOUR_ID"` — no backend needed
- **Netlify Forms**: Add `netlify` attribute if hosting on Netlify
- **Email API**: Connect to SendGrid/Resend via a serverless function

### Content

All text content is in `src/NomadKuche.jsx`. Search for section comments
(`ABOUT`, `EXPERIENCES`, `WORKSHOP`, etc.) to find and edit copy.

### Social Preview Image

Create an `og-image.jpg` (1200×630px) and place it in `public/`.
Update the `og:image` URL in `index.html` to match your domain.

## Tech Stack

- **Vite** — build tool
- **React 18** — UI
- **Cal.com** — booking (free plan, inline embed)
- **GitHub Pages** — hosting (free)
- **GitHub Actions** — CI/CD (auto-deploy on push)

## License

© 2025 Nomad Küche. All rights reserved.
