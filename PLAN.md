# Portfolio Website Rework

## Overview

The portfolio is a Nuxt 4 application. It uses Vue 3 and TailwindCSS for styling and follows a component-based architecture for modularity and reusability.

The idea behind my portfolio is to display my multidisciplinary and versatile expertise while leaving room for my curiosity side. Explain my 4 current core skill sets: Frontend development, UI/UX design, Technical Art, and Programming visually and contextually throughout the portfolio. I wish to be able to convey my skills and creativity effectively to potential employers, both in the creative side and the technical side. Along my interests for web, games, 3D and design, I am also open to reorienting my professional career towards industrial robotic and automation.

## Pages

It has 3 static pages and 1 slug-based dynamic page for individual portfolio items.

### Home

A non-scrollable landing page. A 1 phrase introduction + the result of the intro view. It should include two buttons: one for navigating to the Work page and another for navigating to the About page.

### Work

A page showcasing my selected projects and professional work. A selection of 3-4 featured projects should be highlighted prominently. They should be presented an animated scrollable list with smooth transitions and interactive elements to engage visitors. Each project should include 1 hero image, a brief description, and relevant tags or categories.

I'd also like to have a section dedicated to "all my work" where visitors can explore the complete portfolio. This section should present all projects in a grid, table or list format, allowing users to filter and sort based on categories, tags, or other relevant criteria.

### About

A page providing information about me, my skills, and experience. I want it to communicate my 4 core skill sets: Frontend development, UI/UX design, Technical Art, and Programming as well as express my interest towards industrial robotics and automation.

3 "About Me" sections:
- "I enjoy living somewhere between the art and the tech, jumping from one to the other - or creating the bridge (easier to cross)"
- "Got problems ? call me. I love solving problems. And If I can Automate it, I’ll do it."
- "Solo indie game dev in my spare time. I enjoy data, finance and learning new things, especially tech stuff. (Nerd alert!)"

The list of things I do:
- Web Development
- 3D & Real-time Graphics
- UI/UX Design
- Game Design & Development
- Tools & Pipelines

What motivates me:
- Procedural
- Automation
- Simulation
- Optimization
- Aesthetic
- Organization

### Portfolio Item (dynamic)

A detailed view for individual portfolio items, accessible via a slug-based route. Each page should include:

- A big hero image
- Title of the project
- Relevant tags or categories
- Description of the project
- My contribution to the project
- The list of images or media showcasing the project
- Links to live demos or repositories if applicable

## Layout

A shared layout across pages for the header. The header contains:

- [LEFT SECTION] My logo
- [LEFT SECTION] My full name and short description such as "creative developer".
- [RIGHT SECTION] Locale switcher. Locales are written as language codes (e.g., "en" for English, "fr" for French). Switching the locale should update the site's language accordingly. Use either transitions or page reload to reflect the change, maybe ViewTransition API ?
- [RIGHT SECTION] Theme switcher. Use a toggle button with an icon indicating the current theme (such as sun for light and moon for dark).
- [RIGHT SECTION] Menu button on the right. Slick two offset line design that align when hovered over. The button should have a smooth transition effect when toggled. A full page menu should slide in or overlay the content when the button is activated.

The layout should be responsive and adapt to different screen sizes.

## Other

### Loading View

There's a loading view when entering the site. Navigation between pages should use the ViewTransition API for smooth transitions. The loading view should atleast include my logo, the rest of the design is up to you for creativity. The loading screen should be quick (~2 seconds) and automatically disappear once the main content is ready.

### Menu View

The menu view is a full-page overlay that appears when the menu button in the header is activated. It should slide in or overlay the content smoothly. The menu should include:

- navigation links to the Home, Work, and About pages. Bold, numbered list style.

The design should be consistent with the overall theme and responsive across different screen sizes.+

### Intro View

The first time a user goes to the homepage, they are presented with a skipable introductory interactive experience. This experience should be engaging and visually appealing, providing an overview of what I do and what motivates me. What I have in mind is a 4 steps process:

#### Step 1: I design

The user is has to drag the pen along a predefined path or shape, simulating the design process. This interaction should be smooth and visually engaging, giving the user a sense of creativity and control.

#### Step 2: I connect

A male dangling power cable appears. The cable has bouncing physics. The user needs to connect it to a female power socket.

#### Step 3: I automate

The user move a gear into a designated slot, simulating the automation process. This interaction should demonstrate the concept of mechanical or digital automation, giving the user a sense of how individual components work together to create a functional system.

#### Step 4: I create

The user interacts places the last building block on the top of 2 block stack, completing the structure. This interaction should give the user a sense of accomplishment and highlight the creative aspect of my work.

## Colors

| Type | Light | Dark |
|------|-------|------|
| Paper | #eeeee5 | #111211 |
| Surface | #e5e5da | #191a19 |
| Ink | #232520 | #eeeee7 |
| Muted | #64685f | #a1a39c |
| Line | #c2c6b9 | #393b36 |
| Profile Frontend Color | #649c91 | #649c91 |
| Profile UI/UX Color | #6F4E4C | #6F4E4C |
| Profile Technical Artist Color | #BE8B61 | #BE8B61 |
| Profile Programmer Color | #252525 | #DEDED8 |

## Fonts

| Usage | Value |
|------|-------|
| Heading | "Climate Crisis", sans-serif |
| Body | "Manrope", sans-serif |
| Label | "IBM Plex Mono", monospace |

## Guidelines

- Refer to the list of available skills in the `skills` directory.
- Any changes to locales should be reflected in the corresponding translation files in the `locales` directory.
- Any complex animations should be implemented using AnimeJS.
- Use fonts and icons from Google Fonts. Refer to [nuxt-icons](https://nuxt.com/modules/icon) and [nuxt-fonts](https://nuxt.com/modules/fonts) modules for integration.

## Inspiration

- [Awwwards](https://www.awwwards.com/) for design inspiration and trends.
- [https://itssharl.ee/](https://itssharl.ee/) for the smooth loading and simple and elegant single frame homepage.

## Tasks

- Using TailwindCSS, refactor [main.css](app/assets/css/main.css) to use theme tokens for colors and fonts. Cleanup old unused styles and utilities. Apply any best pratices for TailwindCSS and modern CSS.
- Convert [profile-logo](app/assets/images/profile-logo.svg) into a reusable Vue component in [components](app/components). It has 4 sections and each section represents a profile category. Use the new theme tokens for colors. The outline of the paths should be visible on the current background and for all theme variations.
- Update the README and PLAN documentation to reflect the new theme token usage.
