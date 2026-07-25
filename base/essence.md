intent: I want to build a static website hosted on github pages. I want to list articles my wife shares with me so I can catalogue what she thinks is important, it should be easy to browse.
while it is easy to duplicate and have a starter. while a fodler of md files exist, it is transformed into html via scripts in the build pipeline

as a developer I want to build a static website framework for blogs and pages with npm node, so I have a good package manager as architecture
as a maintainer I want the best toolchain for the job selecting from vite, astro, wepack and others, so i can build the best product
as a maintainer I want the best js library for the job selecting from vue.js, react, vanilla and others, so i can build the best product
as a developer I want to have a Hello World! iteration for each step, so I can validate and verify the generated code easily
as a develoepr I want to have a methodical test suite to cover my work e2e, so I can work in a TDD dicipline
as a develoepr I want to have a javascript test suite to cover my work e2e, so I can work in a TDD dicipline
as a develoepr I want to have Playwright test suite to cover my work e2e, so I can work in a TDD dicipline
as a developer I want to build a static website framework for blogs and pages with npm node, so I have a good package manager as architecture
as a developer I want each page to have native mobile viewport support like with Tailwind CSS, so that it is automated
as a maintainer I want to be able to create a new .md file in root/blogs/<name_of_blog>/index.md | img.avif, where index.md will consist of a default md template to build/generate website blogs in  html format, so I can build new blogs fast and easy
as a new md file from template my title, subtitle, H1, subject and other important things should be set by the developer, so it is follproof and not copied from an existing source
as a developer I want a specific file where I can globally set the colors, like in a json file or a config yaml, so I can define it once for all pages
as a developer I want to decide the colors for light mode/dark mode in a config file so it works globally for all pages
as a user I want webpages to use my system settings when dark mode or non-dark mode so it uses my chosen settings
as a developer I want pages to have support for system settings for dark mode so we don't have to do that
as a user I want to be able to search globally across all blogs for keywords and or titles, so it is maintainable and useable when we have 200+ blog pages
as a develoepr I want to create overwview of all blogs on a tile grid where a title is a card with an img centered top, a Title below the img, and a 3 sentence preview of the blog/article text so we have clean layout.
as a develoepr I want to create overwview of all blogs on a tile grid of 4 horizontal x 3 vertical rows on desktop max-w-4xl
as a develoepr I want to create overwview of all blogs on a scaled tile grid of 4 horizontal x 3 vertical rows on tablet md breakpoint
as a develoepr I want to create overwview of all blogs on a tile grid of 2 horizontal x 3 vertical rows on mobile max-w-screen/viewport on portrait mode
as a develoepr I want to create overwview of all blogs on a tile grid of 3 horizontal x 3 vertical rows on mobile max-w-screen/viewport on landscape mode
as a user I want to see all blogs on a tile grid of 4 horizontal x 3 vertical rows not vertically scrollable to a total of 12 and pagination on desktop so it is not overwheleming
as a user I want to see all blogs on a tile grid of 2 horizontal x 3 vertical rows and vertically scrollable to a total of 18 tiles and pagination on mobile so it is not overwheleming
as a new page article I want automated SEO fundamentals in the HTML
as a new page article my footer should be able to go to previous or next article with buttons
as a new page article my footer shows "you may also like" containing subjects
as a new site, an npm script can be run to generate html/css from the root/blogs/ md files into an artifact
as a new site, an npm script can be run to produce a production preview localhost artifact
as a new site, an npm script can be run to produce a production artifact
as a product owner I want a clearly defined MVP scope with must-have / should-have / could-have labels, so we ship fast without gold-plating
as a maintainer I want all user stories prioritized with WSJF scores, so we build highest-value items first
as a developer I want a mono repo or simple single repo folder structure defined upfront, so the project remains maintainable
as a developer I want a standard project structure for src, content, assets, tests, config, dist and scripts, so contributors know where things belong
as a maintainer I want a decision record for framework selection between Astro, Vite, Webpack and others, so architecture choices are traceable
as a maintainer I want a decision record for UI selection between Vue.js, React and vanilla js, so future changes are easier
as a developer I want npm scripts for dev, test, build, preview and lint, so local workflows are predictable
as a developer I want a Hello World page rendered from markdown on day one, so the pipeline is proven early
as a developer I want a Hello World blog index page on day one, so listing logic is validated early
as a developer I want linting with ESLint and formatting with Prettier, so code quality stays consistent
as a developer I want pre-commit hooks with Husky, so broken code is blocked before commit
as a developer I want unit tests for parsing markdown and config logic, so regressions are caught quickly
as a developer I want component tests for cards, pagination and search UI, so behavior is validated in isolation
as a developer I want e2e tests with Playwright, so core user journeys are verified
as a developer I want CI builds on GitHub Actions, so every push is validated automatically
as a maintainer I want pull requests to require passing checks, so main branch remains stable
as a developer I want markdown frontmatter for title, subtitle, date, tags, image and summary, so content metadata is structured
as a developer I want invalid markdown frontmatter to fail the build with clear errors, so content mistakes are caught early
as a developer I want automatic slug generation from folder names or titles, so URLs remain consistent
as a developer I want canonical URLs configured per environment, so SEO works correctly
as a new article I want automatic meta title, meta description, robots and open graph tags, so pages are shareable
as a new article I want autogenerated structured data schema.org article markup, so search engines understand content
as a user I want a sitemap.xml generated on build, so pages are discoverable
as a user I want an RSS feed generated on build, so I can subscribe to updates
as a user I want fast page loads with optimized images and lazy loading, so browsing feels smooth
as a developer I want AVIF/WebP image pipelines with fallback support, so assets are efficient
as a user I want accessible pages with semantic HTML and keyboard navigation, so the site works for everyone
as a developer I want WCAG contrast checks for light and dark themes, so readability is maintained
as a user I want a no-javascript fallback for reading articles, so content always works
as a user I want client-side search index generation during build, so search works on static hosting
as a user I want search results ranked by title, tags and content relevance, so I find articles quickly
as a user I want tag and category filters, so I can browse topics easily
as a user I want previous and next article links based on chronology or tag context, so navigation is intuitive
as a user I want related articles based on shared tags, so discovery improves
as a developer I want pagination generated statically, so large collections scale cleanly
as a user I want responsive breakpoints centrally configured, so layouts remain consistent
as a developer I want theme tokens in json or yaml for spacing, colors, fonts and radii, so design is centralized
as a maintainer I want deployment to GitHub Pages via one command or CI workflow, so releases are simple
as a maintainer I want preview deployments per pull request, so changes are reviewed safely
as a maintainer I want versioned releases and changelog generation, so updates are traceable
as a developer I want analytics with privacy-friendly tooling, so usage can be measured without overreach
as a maintainer I want 404.html and custom error pages, so dead links are handled gracefully
as a maintainer I want backup/export of markdown content, so data is portable
as a maintainer I want clear README onboarding steps, so contributors can start in minutes
as a maintainer I want architecture diagrams for build flow, content flow and deploy flow, so the system is understandable
as a maintainer I want dependency update automation with Dependabot, so packages stay current
as a maintainer I want security scanning in CI, so risky dependencies are caught early

----

need for MVP only (cut scope hard)

Must Have

* markdown → html build
* article index grid
* responsive layout
* dark/light auto mode
* search
* previous/next links
* SEO basics
* GitHub Pages deploy
* CI build checks
* Playwright smoke tests

Should Have

* tags
* related posts
* RSS
* sitemap
* image optimization

Could Have

* analytics
* theme editor
* PR previews
* advanced ranking search



Highest-value architecture recommendation for this scope

Use Astro + markdown collections + minimal vanilla JS + Playwright + GitHub Pages.

Why:

* best fit for content-first static sites
* excellent markdown support
* little JS by default
* easy GitHub Pages deploy
* scalable to hundreds of posts


What else should be refined next (important questions)

1. Single language
2. fully static
3. Public internet site
4. markdown-only
5. Need import from saved URLs/articles
6. Need screenshots/thumbnails auto-generated
7. Need search over titles only and full text
