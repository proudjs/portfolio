---
order: 2
ready: true
title: Furcast
headline: Furcast
tag: Capstone · AI · Health Tech
card: All 5 pet owners logged a day in under 2 minutes
summary: "A pet health web app built around the question every owner asks: is this serious or should I wait and see?"
role: Lead UX/UI Designer
scope: Visual Design · Interaction Design · Design System · Prototyping · Usability Testing
team: 2 UX Designers
timeline: 8 weeks · UT Austin capstone
prototypeUrl: https://www.figma.com/proto/YIwKKXKpf2L5lfJoFplvYG/Furcast_April-2026?node-id=1-706&starting-point-node-id=1-706&scaling=scale-down
hero:
  src: https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/08-home-5a09ba32-d2a2-47ef-a8b9-2c7b53f15c7f.webp
  alt: Furcast Home screen
  kind: phone
stats:
  - value: "5 of 5"
    label: testers logged a full day in under 2 minutes
  - value: "~30 sec"
    label: to log on their second try
  - value: "2 of 5"
    label: got stuck on the AI screens, so I designed a sheet that explains the score
---

<!-- Copied from uxfol.io/prouddesigns on Nov 13, 2026. Images still load from UXfolio. -->

## Overview

**Problem.** More than half of the 24 pet owners we surveyed had missed or might have missed an early sign of illness. Only 3 used an app to keep track.

**What I did.** About 80% of the design: Home, the Daily Log, the AI health tools, onboarding, the design system and the prototype. The AI points out patterns and leaves the diagnosis to the vet. My teammate built Reminders and Medical Records.

**Result.** A high-fidelity MVP and clickable prototype, tested with 5 pet owners after the course.

## The problem

### Owners notice the small signs. They just have nowhere to keep them.

Between vet visits, most owners rely on receipts, scattered notes or memory. This one’s personal: Charli, the cat in these screens, is mine.

A small survey: 24 owners, mostly friends and family, leaning toward women and dog owners. The answers were still consistent enough to build on.

[[stats: 58% :: have missed or might have missed an early sign of illness || 25% :: don’t track their pet’s health at all || 3 of 24 :: use an app to track it]]

## The solution at a glance

### Four tools in one app, built around what owners told us they wanted.

- ![Daily Log screen](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/furcast-dailylog-nav-4c91eb25-d0b8-42ab-a5a9-3ac53bbbbd0a.webp> "phone")

  **Daily Log**

  Log food, water, energy and more in a few taps.

- ![AI Health Insights screen](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/31-ai-health-insights-nav-v8-d52955c9-02df-4d81-8a10-79fa37520883.webp> "phone")

  **AI Health Insights**

  Patterns from your logs, explained in plain language.

- ![Reminders screen](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6a2d93451353f46e0d17be65/u2DYDLvJoRod5Xca.webp> "phone")

  **Reminders**

  Meds, vet visits and orders, by push, text or email. Built by my teammate.

- ![Medical Records screen](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/24-records-home-7dba33f3-2d81-4027-b959-d50c06ffa78c.webp> "phone")

  **Medical Records**

  Vaccines, visits and documents for every pet in one place. Built by my teammate.

## Research

### Do owners track their pet’s health at all? And has not tracking ever cost them?

We surveyed 24 owners and reviewed three pet health apps to find out.

> #### “A valuable record of past visits & future visit needs / vaccinations that are due.”
>
> Survey respondent, on why they keep using a pet health app

#### Records and reminders came first

91.7% wanted to track medical records and reminders, more than any other feature.

#### Logging had to be fast

79% of respondents work full time. Our team set a bar of under 2 minutes for a daily log. Any longer and people would not keep it up.

#### What other apps get wrong

We reviewed 11pets, Digitail and PetDesk with Nielsen’s heuristics, accessibility checks and user reviews. Three complaints kept coming up.

**Too many steps** → We kept the daily log to a few taps.

**Hard-to-read reports** → Furcast explains each pattern in plain language.

**Messy records** → We sorted records by type and added search.

#### Two kinds of owners

**Penny** only worries when something seems off. She forgets her questions at the vet. → One-tap logging and Vet Visit Prep.

**Camila** worries daily and fears missing small changes. → The app flags patterns across days.

![Persona cards for Penny and Camila side by side, with what each needs, her behaviors, pain points and priority tools](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/personas-side-by-side-af71bc50-13de-4531-ab18-5d040104e076.webp> "wide")

#### The question we designed for

**How might we help owners keep track of the small signs, without making pet care feel like homework?**

## Defining the MVP

### The survey decided what made the cut.

We matched every survey answer to a feature. The most-requested ones became the MVP. We cut community discussion: only 29.2% of owners wanted it.

![Bar chart of survey answers, with medical records and reminders at the top at 92%](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6a2d93451353f46e0d17be65/kq4yxx179LUBo4Ng.webp> "wide")

#### Why a web app

Vets often ask owners to watch something for a few days. Nobody downloads an app for that. A web app opens from a link on any phone.

## From structure to screens

### Site map first, then flows, then wireframes.

Five tabs, with Home pulling in today’s status, reminders and AI alerts. In hi-fi, each Daily Log question got its own card with bigger buttons.

![Furcast site map with Home, Daily Log, Reminders, Medical Records, AI Health Insights and Profile](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/site-map-top-levels-ca87c03a-f972-4f53-9e19-2227c8056f0f.webp> "wide")

![Daily Log user flow from the dashboard to saving a log and logging the next pet](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6a2d93451353f46e0d17be65/PamKzzmENkaU00A6.webp> "wide")

*Daily Log user flow. After saving, owners can loop back and log their next pet.*

![Lo-fi wireframes of Home, Log history, Log confirmation, New appointment and Medical Records](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6a2d93451353f46e0d17be65/wFmRYsXTgkJlAO8m.webp> "wide")

![Daily Log in lo-fi and hi-fi, with each question moved onto its own card with bigger tap targets](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/daily-log-lofi-to-hifi-nav-b4d7c975-25a0-453c-903e-c7a2e92bd4af.webp> "wide")

## Three decisions

### Decision 1 of 3: How simple can the Daily Log be and still be useful?

Too simple and the log tells you nothing. Too much and busy owners quit.

Each question takes one tap, in plain words like “Less” or “Didn’t eat.” After you save, either all looks fine or the app flags a pattern, like low energy on 3 of the last 7 days.

**My part.** I designed the Daily Log and the feedback after you save.

### Decision 2 of 3: How much should the AI say?

If a health app tells a worried owner their dog is fine and it isn’t, that’s a real problem. So the AI only suggests. It points out when logged signs line up and leaves the diagnosis to the vet.

**Symptom Check** rates each result Monitor, Watch or Act now. It shows why, so owners can disagree. **Vet Visit Prep** turns a week of logs into questions for the vet. 70.8% of owners wanted it.

**My part.** I designed Symptom Check and Vet Visit Prep.

![AI Health Insights](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/gallery/31-ai-health-insights-v8-18370c74-f773-45bf-9539-ec535b3950a6.webp> "phone") ![Vet Visit Prep](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/gallery/32-vet-visit-prep-6392ae2f-ac1d-4627-a467-c67557030a9c.webp> "phone") ![Symptom Check](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/gallery/33-symptom-check-072031a3-e99f-4c4a-9736-cad11d521908.webp> "phone")

### Decision 3 of 3: How warm can a health app look?

We wanted a pet journal, not a medical chart. So we chose Chestnut with warm neutrals. Crimson, Amber and Olive show up only when something needs attention. Every button and input has its full set of states.

**My part.** I built the color system and components. My teammate used them for Reminders and Medical Records.

![Furcast color roles, from Chestnut brand and button colors to Crimson, Amber and Olive status colors](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/ds-colors-preview-67cae82f-6cca-4b30-a472-03873f63c611.webp> "wide")

![Furcast buttons and input fields in every state, from default and hover to pressed, disabled and error](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6a2d93451353f46e0d17be65/OykMOo5gtMZAox1O.webp> "wide")

![Furcast in the brown exploration](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/furcast-brown-nav-7c5304ba-e7cd-4cb7-b6a6-c03887100db9.webp> "phone")

#### The brown exploration

Later, on my own, I tried brown. Chestnut sits too close to Crimson, the error red.

![Vet Visit Prep in Chestnut and in brown, side by side](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/vet-visit-prep-chestnut-vs-brown-5f9930a3-cdcd-44af-8725-ef4f6e915596.webp> "wide")

#### Chestnut vs brown

Brown keeps the main action and the error badge apart. We kept Chestnut for the course because the system was built on it. I’d test brown with users next.

## Testing and what I changed

### Logging was fast. The AI screens needed work.

The course ended at the prototype. I wanted to know if it actually worked, so I asked 5 pet owners to log their pet’s day in the prototype, then do it again.

[[stats: 5 of 5 :: finished their first log in under 2 minutes. The second time, about 30 seconds. → Keep the one-tap log. || 2 of 5 :: took longer on the AI screens and asked how it worked. → I made the “How is this calculated?” link easier to find and designed a sheet that shows how the score adds up. || 1 of 5 :: asked for text reminders (they already exist) and wanted to ask the AI questions. → Make the text option easier to spot. Any AI answers would come only from the pet’s own logs, to keep our suggestions-only rule.]]

![The sheet that explains how the health score works](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6a2d93451353f46e0d17be65/section-media/34-how-score-works-v3-84bd519d-7a7b-48a0-87f8-240096c54523.webp> "phone")

#### The fix for the AI screens

The “How is this calculated?” link was tiny and led nowhere. I made it bigger and designed the sheet it opens. It lists each sign logged this week and the points it took off. It says plainly that the score is a quick glance, not a diagnosis.

#### Two more fixes

After the course, I also fixed two places where the design claimed more than it could back up.

**The health score came off Vet Visit Prep.** Owners share that screen with their vet. A vet had no way to check the math.

**“Symptoms Detected” became “Signs you logged.”** The owner logged them, not the app. The old label sounded like a diagnosis.

#### In testers’ words

> #### “This is way better than my sticky note. Now I don’t have to remember it, just check on this link.”
>
> Usability test participant

> #### “I’ve been using my note app on my phone for a long time. This is amazing, I can add and track other things now!”
>
> Usability test participant

#### In our mentor’s words

> #### “Resilient, adaptable team. The app store-style product page was a creative and memorable framing.”
>
> UT Austin course mentor

## Reflection

#### What I learned

**Words make promises.** “Symptoms Detected” promised a diagnosis the app couldn’t give. Now I check every label against what the product can back up.

**AI has to show its work.** Next time I’d design the explanation in from day one.

**Test sooner.** Five testers showed me where the AI screens lost people. We couldn’t see that from the inside.

#### What’s next

- **Let the vet start it.** The vet sends a Furcast link after a visit. The owner logs at home. The vet gets the report before the follow-up.
- **Then:** test the new explainer, first-time setup and the remaining prototype screens.

#### What I’m most proud of

A team of two built close to what we planned on day one. By the end, every screen ran on the same system.

## Try the prototype

27 clickable screens, from onboarding to the full Daily Log and all three AI tools. Swipe through onboarding, then tap “Or log in.”

[[prototype]]
