# 📚 Meridian Academy — EdTech Website

A responsive, content-rich **EdTech landing & course catalog website** built with **HTML, CSS and vanilla JavaScript**. Meridian Academy showcases exam-prep courses (Class 11/12, JEE Main/Advanced, NEET UG, Dropper batches, free resources) with a searchable/filterable catalog on the homepage and a fully hydrated course detail page.

---

## 🚀 Features

- 🎨 Modern, responsive landing page with hero section, feature highlights, testimonials & FAQ
- 🔎 **Course catalog** with category filters (`All Courses`, `Class 11`, `Class 12`, `JEE Main`, `JEE Advanced`, `NEET UG`, `Dropper Batch`, `Short Courses`, `Free Resources`)
- 🖼️ Self-contained course thumbnails (inline base64 SVG illustrations — no external image hosting needed)
- 📄 **Dynamic course detail page** driven by a `?course=ID` query parameter
- 📑 Rich per-course data: curriculum breakdown, learning outcomes, prerequisites, pricing/discounts, reviews & FAQ
- 📱 Fully responsive layout for desktop, tablet & mobile

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (`index.html`, `course.html`) |
| Styling | CSS3 (`style.css`, `course.css`) |
| Behavior & Data | Vanilla JavaScript ES6 (`script.js`, `course.js`) |
| Assets | Inline base64-encoded SVG illustrations (`COURSE_IMAGES`) |

---

## 🏗️ Architecture

The site is split into two pages that share a common **in-memory data model** defined in `script.js`. The catalog page renders cards from the `COURSES` array; clicking a card navigates to `course.html?course=<id>`, where `course.js` looks up the matching course and merges it with extended details from `COURSE_EXTRA` to build the full detail page.

```mermaid
graph TB
    subgraph DataLayer["📦 Shared Data Layer (script.js)"]
        IMG[COURSE_IMAGES<br/><i>base64 SVG thumbnails</i>]
        CATS[CATEGORIES<br/><i>filter list</i>]
        COURSES[COURSES[]<br/><i>id, title, category, price,<br/>rating, image, tags...</i>]
    end

    subgraph ExtraLayer["📦 Extended Data (course.js)"]
        EXTRA[COURSE_EXTRA<br/><i>by course id:<br/>curriculum, outcomes,<br/>requirements, reviews, FAQ</i>]
    end

    subgraph Catalog["🏠 index.html — Catalog Page"]
        HERO[Hero / Features / Testimonials / FAQ]
        FILTER[Category Filter Bar]
        GRID[Course Card Grid]
    end

    subgraph Detail["📖 course.html — Detail Page"]
        HEADER[Course Header<br/><i>title, price, rating, enrol CTA</i>]
        CURRICULUM[Curriculum Accordion]
        OUTCOMES[What You'll Learn]
        REQ[Requirements]
        REVIEWS[Reviews & FAQ]
    end

    COURSES --> GRID
    CATS --> FILTER
    IMG --> GRID
    FILTER -->|filters| GRID
    GRID -->|"?course=ID"| HEADER

    COURSES -->|lookup by id| HEADER
    EXTRA -->|lookup by id| CURRICULUM
    EXTRA --> OUTCOMES
    EXTRA --> REQ
    EXTRA --> REVIEWS
```

---

## 🔄 Page & Data Flow

```mermaid
flowchart LR
    A[User lands on index.html] --> B{Browse / Search}
    B -->|Filter by category| C[script.js filters COURSES[]<br/>and re-renders grid]
    C --> B
    B -->|Click a course card| D["Navigate to course.html?course=ID"]
    D --> E[course.js reads URL param 'course']
    E --> F[Find course in COURSES[]<br/>+ merge COURSE_EXTRA[ID]]
    F --> G[Render header, curriculum,<br/>outcomes, reviews, FAQ]
    G --> H{User action}
    H -->|Enrol Now| I[Enrolment CTA]
    H -->|Back to catalog| A
```

---

## 📁 Project Structure

```
Edtech-Website-main/
├── README.md
├── index.html      # Landing page + course catalog (hero, features, testimonials, FAQ)
├── style.css        # Global / landing page styles
├── script.js         # COURSE_IMAGES, CATEGORIES, COURSES[] + catalog rendering & filtering
├── course.html       # Course detail page shell
├── course.css        # Detail page styles
└── course.js          # COURSE_EXTRA + reads ?course=ID, hydrates detail page
```

---

## 🗂️ Course Categories

| Category | Description |
|---|---|
| Class 11 / Class 12 | Full-syllabus subject courses (Physics, Chemistry, Maths, Biology) |
| JEE Main / JEE Advanced | Engineering entrance exam preparation |
| NEET UG | Medical entrance exam preparation |
| Dropper Batch | 1-year full syllabus programs for repeat aspirants |
| Short Courses | Focused, time-boxed topic crash courses |
| Free Resources | Free test series & practice material |

---

## 🚀 Getting Started

No build tools or dependencies required — it's a pure static site.

```bash
git clone <repo-url>
cd Edtech-Website-main

# Option 1: open directly
open index.html

# Option 2: serve locally (recommended for query params on course.html)
python3 -m http.server 8000
# then visit http://localhost:8000/index.html
```

To view a specific course detail page directly:

```
http://localhost:8000/course.html?course=1
```

---

## 🎨 Customization

- **Add a course**: append an entry to `COURSES[]` in `script.js` (give it a unique `id`, `category`, `image`, pricing & tags), then add a matching entry to `COURSE_EXTRA` in `course.js` (id-keyed) for curriculum/outcomes/FAQ.
- **Add a category**: add the name to the `CATEGORIES` array in `script.js` — it automatically appears as a filter pill.
- **Thumbnails**: stored as inline base64 SVG in `COURSE_IMAGES`, so new thumbnails can be added without any external image hosting.
