---
# Copy this file to src/content/work/<slug>.md. The slug becomes the URL: /work/<slug>
# Files that start with _ are ignored by the site.
order: 9                      # card order on the home page
ready: false                  # true = the case study can be opened on the site
title: Project name           # card title
headline: Project name, what it is   # big red title on the case study page
tag: Unsolicited redesign · Topic    # small label above the title
card: One line for the home page card, with a real number.
summary: One or two sentences under the title.
role: Solo UX/UI Designer
scope: Research, information architecture, visual design, prototyping
timeline: Month to Month 2026
hero:
  src: "slot:Hero image"      # or a real path like /work/<slug>/hero.webp (put files in public/work/<slug>/)
  caption: ""
stats:                        # up to three
  - value: "5 → 1"
    label: what the number means
claims:
  can: What this project proves.
  cant: What it doesn't prove yet.
prototypeUrl: ""              # leave empty to hide the button
---

## Section label (shows in "On this page")

### The red headline for this section.

Body text in plain sentences.

![Caption under the image.](<slot:What goes here> "wide")

![Before caption.](<slot:Before screen> "phone") ![After caption.](<slot:After screen> "phone")

1. **Rule name.** One line about it.

> #### Where I changed my mind
>
> What I tried first, what happened, what I did instead.

[[claims]]

[[prototype]]
