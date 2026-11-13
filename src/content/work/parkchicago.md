---
order: 3
ready: true
title: ParkChicago
headline: ParkChicago, redesigned
tag: Unsolicited redesign · iOS · Civic Tech
card: All 5 test drivers finished a parking session. 4 of 5 found the new countdown on their own.
summary: "An unsolicited redesign of the app Chicago drivers use to pay for street parking. Built around one problem: people paid and still got tickets."
note: Unofficial concept. Not affiliated with the City of Chicago or ParkChicago.
role: Solo UX/UI Designer
scope: Research · Interaction Design · Visual Design · Prototyping · Usability Testing
timeline: 7 weeks (about 300 hours) · Unsolicited redesign
prototypeUrl: https://www.figma.com/proto/BAQsqUG8rDSakWPrrkz1NL/ParkChicago_09-19?page-id=441%3A645&node-id=441-3766&starting-point-node-id=441%3A3766&scaling=scale-down&content-scaling=fixed
hero:
  src: /work/parkchicago/03-start-parking-ready-to-pay-0fcd321e-b5ca-45ab-9d73-f4741a63c849.webp
  alt: Start Parking screen, ready to pay
  kind: phone
stats:
  - value: "8 of 12"
    label: drivers I asked had missed the “time’s up” warning
  - value: "~1 min"
    label: to start a parking session in testing (longest 1:20)
  - value: "4 of 5"
    label: found the lock screen countdown without being told
---

<!-- Trimmed version (Nov 13, 2026) of the full case study on uxfol.io/prouddesigns. Every image kept. Only Proud's own sentences, shortened. -->

## Overview

**Problem.** I asked 12 drivers in and around Chicago what gets them ticketed. Most tickets came from paying wrong: the wrong zone, the wrong car or time that ran out without a warning.

**What I did.** I redesigned the app on my own, end to end. Parking starts from one screen, nearby zones come from your location, the pay button names your car and a countdown sits on your lock screen.

**Result.** A high-fidelity iOS prototype, tested with 5 drivers. All 5 finished a full parking session. 4 of 5 found the lock screen countdown on their own.

## The problem

### People weren’t skipping payment. They paid and still got tickets.

I’ve used this app for about eight years, mostly downtown. When I asked friends and family, I heard the same stories.

**No warning before time ran out.** 8 of the 12 had missed it at some point.

**Paid for the wrong car.** One person paid for parking but for their other car. Ticket anyway.

**Couldn’t read the zone number.** Stickers covered the sign, so they walked down the block to find another one.

**Paying takes four screens and a pop-up.** Skip the pop-up and you haven’t paid.

![Current app, step 1: choose a zone](</work/parkchicago/before-1-zone-6c387c76-e67f-4088-bcd7-3fc971eb277d.webp> "phone") ![Current app, step 2: choose a vehicle](</work/parkchicago/before-2-vehicle-1e436c67-69b4-40c0-bf33-b045005f666e.webp> "phone") ![Current app, step 3: choose how long](</work/parkchicago/before-3-length-fda5f769-965b-458b-8b37-c34b39ed1d3d.webp> "phone") ![Current app, step 4: the confirm pop-up](</work/parkchicago/before-4-confirm-504d6490-fccf-47ba-906e-a36771c0841a.webp> "phone")

*Zone, car, how long, then a pop-up to confirm.*

## The redesign at a glance

### It’s not about adding features. It’s about making it hard to make a mistake.

- ![Start Parking screen](</work/parkchicago/02-start-parking-default-6198ec89-4052-4225-98ab-adcc42b2e787.webp> "phone")

  **One screen to park**

  Zone, time, car and payment all in one place.

- ![Map with parking near you](</work/parkchicago/01-map-parking-near-you-544b6621-5959-4ba7-80a0-5a2a4cfe550a.webp> "phone")

  **Parking near you**

  Tap a nearby zone instead of reading the sign.

- ![Pay button that names the car](</work/parkchicago/03-start-parking-ready-to-pay-85daec8e-7611-4841-b9eb-50082a958eee.webp> "phone")

  **Your car on the button**

  “Pay $9.50 for Foxy,” so you know which plate you’re paying for.

- ![Lock screen countdown](</work/parkchicago/04-lock-screen-15-min-de70ed1e-af36-4b84-9cc2-a4a75e1ace18.webp> "phone")

  **Countdown on your lock screen**

  See time left without opening the app and extend from there.

**Two apps, not three.** ParkChicago is really three apps: Park, Map and Fleet. I narrowed it to everyday drivers and merged Park and Map. One App Store reviewer asked why Map is a separate app at all.

![The three ParkChicago apps](</work/parkchicago/three-apps-9f36f62c-166b-4b82-8323-a8943c202cc1.webp> "phone") ![App Store review asking why Map is a separate app](</work/parkchicago/review-should-not-exist-03066548-f993-4bc7-8e8a-8022ded110d7.webp> "phone")

## Research

### Twelve drivers, eight years of my own use and a pile of App Store reviews.

Not a formal study. I asked 12 friends and family who park in and around Chicago what goes wrong, then checked their stories against App Store reviews. The reviews kept hitting the same spots: fees and forced top-ups, not finishing checkout and no way to extend past the time limit.

> #### “I did this today and got a $50 ticket because I didn’t complete the final step.”
>
> App Store reviewer

*Sources: [ParkChicago® reviews on JustUseApp](https://justuseapp.com/en/app/686658594/parkchicago/reviews) and the App Store, checked October 2026.*

## Four decisions

### Sketching it first

I sketched on paper before opening Figma. Two ideas didn’t make it.

- ![Sketch of a full-screen map](</work/parkchicago/sketch-map-rejected-8abe5522-86e5-4f1b-a5a8-5fe496db8d88.webp> "phone")

  **Scrapped**

  My first map took up the whole screen.

- ![Sketch of a smaller map with nearby zones listed](</work/parkchicago/sketch-map-chosen-13ba4ce4-c997-4b17-8e1b-60cf6803a108.webp> "phone")

  **Kept**

  A smaller map, with nearby zones listed underneath.

- ![Sketch of a step-by-step form](</work/parkchicago/sketch-form-scrapped-2d8cbbcd-b713-455e-bd3d-2e33af9b3254.webp> "phone")

  **Scrapped**

  A step-by-step form. The old flow all over again.

- ![Sketch of one screen with zone, time, car and payment](</work/parkchicago/sketch-onescreen-chosen-ff7218c3-5856-4656-9ddc-51ecfa056aba.webp> "phone")

  **Kept**

  Zone, time, car and payment on one screen.

### Decision 1 of 4: How much can fit on one screen before it’s too much?

Zone, time, car, payment and total sit on one Start Parking screen, with quick picks for 30 min, 1 hr, 2 hr or Max. The pay button stays at the bottom, so there’s no “final step” to miss.

![Start Parking screen with 30 minutes picked, before paying](</work/parkchicago/02-start-parking-default-9e5eafe8-b426-4a14-b647-b0b41b183dae.webp> "phone") ![Active parking session with 2 hours left, plus Extend, Directions and Change zone buttons](</work/parkchicago/14-active-session-016bf426-c204-4ba4-bc6b-25915d626c0c.webp> "phone")

### Decision 2 of 4: How do you pay for a zone you can’t read?

You shouldn’t have to. The map uses your location to list nearby zones, closest first. The old app’s Zone Hop was buried in the fine print. Now it’s a Change zone button, so if you move the car, your paid time moves with you.

![Map listing nearby parking zones, closest first](</work/parkchicago/01-map-parking-near-you-826a6f7e-4d1e-41f1-8549-f566ba26401c.webp> "phone") ![Zone Hop asking to move the session to the new zone](</work/parkchicago/08-zone-hop-confirm-2bcba903-89d6-4bb3-8f83-3d65e97deb32.webp> "phone") ![Session moved to the new zone, with paid time kept](</work/parkchicago/09-zone-hop-moved-df33bd20-3952-459c-9776-ef41f6967561.webp> "phone")

### Decision 3 of 4: How do you stop someone paying for the wrong car?

Plates all look alike when you’re in a hurry. So the pay button says which one: “Pay $9.50 for Foxy.”

![Profile with two cars, Foxy and Pearl](</work/parkchicago/10-profile-two-cars-a6e8ac80-b9ab-419e-ace3-da9e5d2a14ca.webp> "phone") ![Adding a nickname to a new car](</work/parkchicago/15-adding-car-nickname-79920146-4614-4486-94d7-d6c7b300f276.webp> "phone") ![Pay button that names the car, Foxy, before paying](</work/parkchicago/03-start-parking-ready-to-pay-bc5b61e4-7205-4396-9ce0-a0125c67e0e9.webp> "phone")

### Decision 4 of 4: How do you warn someone who isn’t looking at the app?

Nobody keeps a parking app open. So the countdown lives on the lock screen and a reminder comes 15 minutes before time runs out. Tap Extend and adding time is one more tap.

![Lock screen countdown with a 15 minute reminder](</work/parkchicago/04-lock-screen-15-min-5d54fe92-fc43-413c-80c0-9520678675ca.webp> "phone") ![Active session with 15 minutes left](</work/parkchicago/07-active-session-15-min-left-f4dfdc7b-53fd-4278-9fd3-63725658b5fb.webp> "phone") ![Adding more time to a parking session](</work/parkchicago/05-extending-parking-40578edb-374b-4ed7-9101-4b3b5741bb87.webp> "phone")

![The live lock screen countdown prototype](</work/parkchicago/peYmOQf14n0j0Sy8.gif> "phone")

**Prototyping the countdown with AI.** A still frame can’t show a timer running out, so I rebuilt the lock screen in Figma Make, in about 5 versions. AI got me to something clickable in minutes. Checking every state was still my job. [Try the live countdown →](https://www.figma.com/make/fAQ83s0XzqPNQR8URbZbHd/Interactive-Parking-Session-Screen?p=f)

## Testing and results

### All 5 testers got through a parking session start to finish, fast.

Three took about a minute. The slowest took 1 minute 20 seconds.

[[stats: 4 of 5 :: noticed the lock screen countdown without being told || 4 of 5 :: called out the Change zone button || 4 of 5 :: liked seeing the car’s nickname on the pay button]]

![Find my car, showing where the car is parked](</work/parkchicago/11-find-my-car-a11e67e5-4d1f-4ccd-9361-6057d087be0e.webp> "phone")

*3 of 5 were surprised they could now see where their car is. The original app never had that.*

> #### The one stumble
>
> 1 of 5 paused for about 5 seconds at the start, unsure whether to tap a nearby zone or type into the search box. I’d move the search box lower, so typing becomes the backup. I haven’t tested that yet.

## Reflection

**Living with a problem helped me find it. Asking others told me it was worth fixing.** Every problem in this case study has happened to me. Asking 12 drivers showed me it wasn’t just me.

**What’s next:** search by destination, sharing where you parked, parking history as proof if you get a ticket anyway and testing with visitors who don’t know Chicago zones.

## Try the prototype

The main flow goes from login through paying, Zone Hop and finding your car. A second flow starts on the lock screen reminder.

[[prototype]]
