# portfolio

Personal portfolio showcasing web development and design projects.
Built with [Next.js](https://nextjs.org/) (App Router) + React, styled with
Bootstrap 5. Deployed on Vercel at [www.evacihak.com](https://www.evacihak.com).

## Getting started

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm start        # serve the production build locally
```

## Project structure

```
app/
  layout.js              Shared shell — Navbar + Footer wrap every page
  page.js                Home (hero + project grid)
  globals.css            Site styles
  resume/page.js         Resume page
  projects/[slug]/page.js  ONE template that renders all project pages
components/
  NavBar.js              Shared navigation (highlights the active page)
  Footer.js              Shared footer
  ProjectCard.js         A single card in the home-page grid
lib/
  projects.js            All project content — edit here, pages update
```

## Editing content

- **Projects:** edit `lib/projects.js`. The home grid, the Projects
  dropdown, and each project detail page all read from this one file. Adding
  an entry creates a new project page automatically.
- **Navbar / Footer:** edit the components in `components/` once — the change
  applies to every page.
- **Images:** drop files in a `public/` folder and reference them as
  `/your-image.jpg` (see the `TODO` comments in `app/page.js` and the project
  template).
