# Mathias Alsos Paulsen - Portfolio

A modern, minimalistic portfolio/CV website with Apple-OS aesthetic, built for GitHub Pages.

**Live Site:** https://alsoscode.github.io/

## Features

- Single-page responsive design
- Light/dark mode toggle with localStorage persistence
- Smooth scrolling navigation with active section highlighting
- Accessible (keyboard navigation, ARIA labels, semantic HTML)
- Print-friendly CSS
- Clean, modern Apple-inspired design

## GitHub Pages Deployment

This site is configured for GitHub Pages deployment:

1. The repository is already set up at `https://github.com/AlsosCode/AlsosCode.github.io`
2. GitHub Pages serves from the `main` branch
3. Your site is live at `https://alsoscode.github.io/`

## Customization

### Change Accent Color
Edit the `--accent` variable in [style.css](style.css):
```css
:root {
  --accent: #0071e3; /* Change this to your preferred color */
}
```

### Update Content
- **Personal Info:** Edit the sections in [index.html](index.html)
- **Projects:** Add project cards in the `#projects` section
- **Skills:** Add tech stack items in the `#skills` section
- **Experience:** Add work history in the `#experience` section
- **Education:** Add academic background in the `#education` section

### Add Your CV
Place your CV as `cv.pdf` in the root directory for the download button to work.

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (CSS variables, flexbox, responsive design)
- Vanilla JavaScript (no frameworks)
- GitHub Pages hosting

## Browser Support

Works on all modern browsers with CSS custom properties and IntersectionObserver support.

## License

© 2025 Mathias Alsos Paulsen. All rights reserved.
