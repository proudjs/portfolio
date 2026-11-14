---
order: 1
ready: true
covers:
  - /work/bmo/12-after-home-62d065eb-6cd0-4312-91c5-31165f402a35.webp
  - /work/bmo/02-hero-after-transfer-record-scheduled-d459ab64-8ebe-4d02-b294-b282ce8ddc1f.webp
title: BMO mobile app
headline: BMO mobile app, concept redesign
tag: Unsolicited redesign · iOS · Fintech
card: "Checking a transfer: 5 taps down to 1"
summary: An unsolicited redesign of the transfer and bill-pay flows in BMO's US mobile app. I'm not affiliated with BMO.
role: Solo UX/UI Designer
scope: Audit · Information Architecture · Content Design · Visual System · Prototyping
timeline: August to October 2026
prototypeUrl: https://www.figma.com/proto/T4VsNxz3dIZ8VGtUzaVIYl/BMO_10-26_Proud?page-id=916%3A24877&node-id=916-27873&starting-point-node-id=916%3A27873&scaling=scale-down&content-scaling=fixed
hero:
  src: /work/bmo/12-after-home-62d065eb-6cd0-4312-91c5-31165f402a35.webp
  alt: Redesigned Home with Coming up, showing what's about to leave
  kind: phone 108 86
  also:
    src: /work/bmo/02-hero-after-transfer-record-scheduled-d459ab64-8ebe-4d02-b294-b282ce8ddc1f.webp
    alt: Redesigned transfer record, Scheduled, showing when the money leaves and arrives
stats:
  - value: "15 of 15"
    label: testers could tell whether a bill payment worked
  - value: "98"
    label: numbered findings from a one-week audit of the live app
  - value: "5 → 1"
    label: taps to find out whether a transfer worked
---

<!-- Trimmed version (Nov 13, 2026) of the full case study on uxfol.io/prouddesigns. Every image kept. Only Proud's own sentences, shortened. -->

## Overview

**Problem.** In my audit of BMO's app, it was hard to tell if a transfer or bill payment worked or when the money would move. The app wasn't short on information. It was short on answers.

**What I did.** I redesigned both flows around two questions: Did it work? When? Home shows what's about to leave. Every row opens the same record with one of five status words.

**Result.** A clickable prototype of both flows, tested with 15 people. All 15 could tell when a transfer arrives and whether a bill payment worked.

## The problem

### It started at home.

My partner banks with BMO and kept getting tripped up. Was it him or the app? Over one week in September 2026, with his permission, I ran every transfer and bill-pay flow on his account.

Two transfers were described with twelve different phrases. The full record sat five taps away behind a menu. The activity row, where people actually look, did nothing when tapped.

The app has 4.8 out of 5 from 137,000 App Store ratings. A high average tells you most people get through. It doesn't tell you about the ones who get stuck.

So I set a narrow brief: make transfers and bill pay answer two questions at every step. **Did it work? When?**

![Board of the twelve different status phrases BMO used across two transfers, rebuilt with invented data.](</work/bmo/03-before-status-words-6ebecbf1-10fe-48f4-8103-062caf134c11-clear.webp> "wide")

*Two real transfers, twelve ways to say what happened. Rebuilt in Figma with invented data. Not a screenshot.*

## The redesign at a glance

![Redesigned Home showing what's about to leave](</work/bmo/03-at-a-glance-home-3d90e4aa-6f48-4025-a80d-8a8792753ef9.webp> "phone 108 86") ![Redesigned transfer record](</work/bmo/04-at-a-glance-transfer-record-e7e8ede1-bac9-4370-a139-af61e9c0f419.webp> "phone") ![Pay and transfer, Scheduled tab](</work/bmo/pay-and-transfer-scheduled-253bb0a2-e6b0-4e1b-9ac5-dfe77183a65d.webp> "phone")

*Left: Home shows what's about to leave, with the day. Middle: every row opens one record, with one status word and one date story. Right: Pay & transfer keeps everything scheduled and everything that happened in one place.*

## Research

### One week, two real transfers, 98 numbered findings.

No client, no analytics, no recruited users. Just the live app and a real account, so I treated it like a lab. I logged each problem with an ID (L01 to L98), the screen, what I saw and the guideline it broke.

I also read the 31 most recent App Store reviews. Two said bill pay got harder to use.

**What I didn't do:** interviews or a usability study on the live app. This is one careful audit of one account, not a sample of customers.

![Audit log excerpt, five of 98 findings: L40 activity rows do not open, L42 the record is five taps away, L43 ten status phrases for one transfer, L72 three unexplained dates, L73 balance ignores a scheduled transfer. All rated high severity.](</work/bmo/3WxSYwq6rdgF8ezt-clear.webp> "wide 60")

## Insights

### Ninety-eight findings, four problems.

**Status can't be trusted.** Twelve phrases across two transfers (L43). One transfer had three unlabeled dates (L72).

**The record is hidden.** The activity row does nothing when tapped (L40). The real record is five taps away (L42).

**Blue means nothing.** On bill pay, every button is blue (L61). When everything is blue, nothing says “tap me.”

**The two money flows disagree.** Bill pay commits on one tap and never shows a fee or the day the money leaves (L49, L51, L56).

![One BMO transfer shown with three unlabeled dates: a send date, a Scheduled For chip and a deliver-by date, rebuilt with invented data.](</work/bmo/1ahCLVdRiZYwptxu-clear.webp> "wide 60")

*Three dates for one transfer, none labeled (L72). Rebuilt in Figma with invented data. Not a screenshot.*

![BMO's account activity, where the row does nothing when tapped](</work/bmo/08-before-activity-77dafb42-b3b5-473f-ab07-bcaf1f9f80b0.webp> "phone") ![BMO's one-tap Review and Pay screen](</work/bmo/09-before-review-and-pay-e123063d-6803-4ace-abde-e2c57214558f.webp> "phone")

*Left: the activity row that does nothing when tapped. Right: bill pay's one-tap "Review and Pay." Rebuilt in Figma with invented data. Not screenshots.*

## The rules

### Sketches first, rules second.

1. **Five words.** Scheduled, Processing, Completed, Canceled, Failed. Always a word plus an icon, never color alone.
2. **One record, many doors.** Wherever you start, you land on the same record.
3. **One date story.** "Leaves August 11 → Arrives August 14." Always a pair, always in words.
4. **Form, review, confirmation, record.** The same four steps for a transfer and a bill.
5. **Blue has three jobs.** Act, Go and You are here. Nothing else.

![Diagram: Home, the account activity row and the Pay & transfer Scheduled tab all open the same transfer record.](</work/bmo/qgrM0cusKP16Yvv9-clear.webp> "wide 60")

*Three ways in, one record.*

## Four key decisions

![Paper sketches of the BMO redesign: Home, account detail, Recent Activity and Pay & transfer on top, and the transaction record in five states below: Scheduled, Processing, Completed, Canceled, Failed.](</work/bmo/4FKRI30BL3oPHIAm-clear.webp> "wide")

*Before Figma, I sketched both flows on paper, including all five states a transfer record can be in.*

### Decision 1 of 4: Home tells you what's about to leave

BMO's Home shows balances and a promo. Nothing about the $350 leaving tomorrow. I added “Coming up” under the accounts: the next three things to leave, with the day.

- ![BMO's Home before, with balances and a promo](</work/bmo/11-before-home-babcdbfc-14b3-4fdc-aa39-535316c0934f.webp> "phone")

  **Before**

- ![Redesigned Home with Coming up](</work/bmo/12-after-home-62d065eb-6cd0-4312-91c5-31165f402a35.webp> "phone 108 86")

  **After**

*Before, balances and a promo. After, coming up, each row opening its record.*

### Decision 2 of 4: The record is one tap from anywhere

Every row opens the same record sheet. Instead of three histories, Pay & transfer has Scheduled, History and Search.

![Diagram: before, five taps through a menu to reach a transfer record. After, one tap from the Coming up row.](</work/bmo/u8Z7MDaUgLOGUXk0-clear.webp> "wide")

*Five taps through a menu became one.*

![Redesigned account activity: Scheduled items on top, then one list by date, each row named in plain words with a chevron that opens its record.](</work/bmo/activity-after-3a13c036-51ea-44ba-97f5-a998abb8300c.webp> "phone 114 86") ![Pay and transfer, Scheduled tab](</work/bmo/H7tE4rPj95k6ZR0n.webp> "phone") ![Pay and transfer, History tab](</work/bmo/lu3mvBwPSOKgYDbk.webp> "phone")

*The same activity, redesigned. Scheduled answers what's about to happen. History answers what happened.*

### Decision 3 of 4: Status is a chip, and there are five

Each is a tint, an icon and the word. Failure says what happened, where the money is and what to do. Processing says it's too late to cancel.

![Redesigned transfer record, Scheduled: $350.00 to Lakeside Credit Union, leaves August 11, arrives August 14, with a Cancel transfer button.](</work/bmo/02-hero-after-transfer-record-scheduled-133ec487-a267-4658-923d-f68937a9d422.webp> "phone") ![The same transfer record in the Processing state, saying it is too late to cancel.](</work/bmo/13-after-transfer-record-processing-b3a67c4f-5ea6-4756-b139-07b3a369b2b8.webp> "phone") ![The same transfer record in the Completed state, with the dates it left and arrived.](</work/bmo/14-after-transfer-record-completed-b3f115fa-20ba-41d7-ad87-50ce57056437.webp> "phone") ![The same transfer record in the Failed state: it did not go through, the money came back August 13, and the account number could not be verified.](</work/bmo/15-after-transfer-record-failed-e16a2b02-d2ee-4dc5-8533-f3c194bcd5be.webp> "phone")

*The same record in four states. Only the chip, the dates and the note change.*

### Decision 4 of 4: Bill pay gets a review that tells the truth

Amount, the day it leaves, the fee, and what's available after. The cancel window is stated before you pay, not after.

- ![BMO's bill pay review before](</work/bmo/09-before-review-and-pay-e8114bb5-8556-4ca6-aed5-105ff63e7108.webp> "phone")

  **Before**

- ![Redesigned bill pay review](</work/bmo/20-after-bill-pay-review-35941605-c82b-40fa-89c0-cea2f287a95e.webp> "phone 114 86")

  **After**

*Before, and after: the day it leaves, the fee, and what's left.*

#### Smaller decisions

- **Cancel is a decision, not a tap.** The buttons say Cancel transfer and Keep transfer.
- **“Not enough money” is caught early.** Pick an account that can't cover the amount and it turns red right away.
- **What I kept from BMO.** Face ID login, full confirmation details, plus and minus signs on amounts and the transfer review step.

![Redesigned cancel dialog with Cancel transfer and Keep transfer buttons](</work/bmo/21-cancel-dialog-676b18e5-88d0-4554-9dec-fee7ce19aa1c.webp> "phone") ![Cancel confirmation](</work/bmo/W2EUr1gNrEfxqft3.webp> "phone")

*Cancel: the buttons say what they do.*

## Testing and outcome

### Tested with 15 people.

Some were BMO customers. More than half were 40 or older.

[[stats: 15 of 15 :: found when the transfer arrives || 15 of 15 :: could tell the bill payment worked || 15 of 15 :: canceled a transfer]]

**2 of 15** hesitated at the cancel confirmation, because their own banks cancel in one tap. Both still canceled. → Add “You’ll confirm on the next step” under the button.

**1 of 15** got stuck on the payee page. They looked for search. → Put a search field at the top of Payees.

**What surprised me:** I expected a new layout to slow down older testers. It didn’t.

## Where I changed my mind

> #### The blue rule
>
> My first rule was one blue element per screen. Applied literally, the screens went flat and tappable things lost their color. I loosened it to three jobs. Same discipline, less ideology.

> #### The not-enough-money screen
>
> I first warned about a short balance at Review. Then I moved the check to the moment you pick the account, so you find out sooner.

- ![First version, a short-balance warning at Review](</work/bmo/23-first-version-not-enough-money-f6b1873c-5756-406e-8c8a-4af147a13c39.webp> "phone 114 86")

  **First version**

- ![Final version, the check at the moment you pick the account](</work/bmo/24-final-not-enough-money-at-from-941250c4-35bc-4fd7-b1b1-69c4552e92ae.webp> "phone")

  **Final**

*First version, a warning at Review. Final, the check moved to the moment you pick the account.*

> #### The Activity tabs
>
> An account's Activity had All, Transfers and Payments tabs. That split things into yet another place. I took the tabs out. Activity is now one list, newest first.

![Paper sketch of the Recent Activity screen with All, Transfer and Payment tabs at the top and a list grouped by date.](</work/bmo/hRIvKfP39TT8FxQS.webp> "sketch")

*My first sketch split Activity into tabs. I later removed them.*

## The system

### One typeface, six sizes, one blue with three jobs, five status words.

17 color styles, 6 effect styles and 14 text styles. Every screen is built from shared components, which is how the rules survived a week of changes. I also fixed contrast: the blue and secondary gray were darkened and the close and copy buttons got 44-point tap targets.

![The design system: type scale, the blue with three jobs, five status chips, four button types, rows, fields, header and nav.](</work/bmo/3GovW3M039ptUtkR-clear.webp> "wide")

## Reflection

### Two things I’d do differently.

**I’d watch a few people use the live app before designing.** The audit told me what was wrong. Watching people would have told me which of the 98 things they actually feel.

**I’d write the system rules on day one.** I wrote them after the first screens, so every rule change meant reworking screens.

**Next, text size.** The screens where money moves can’t be enlarged at all (L83). It’s the first thing I’d design next.

## Try the prototype

### Clickable prototype of the transfer and bill-pay flows.

Sign in, tap Transfer, and send $350 to Lakeside Credit Union. Once it's scheduled, try canceling it. [Open the full prototype](https://www.figma.com/proto/T4VsNxz3dIZ8VGtUzaVIYl/BMO_10-26_Proud?page-id=916%3A24877&node-id=916-27873&starting-point-node-id=916%3A27873&scaling=scale-down&content-scaling=fixed)

Short on time? Sign in, and the $350 transfer and the ComEd bill are already scheduled on Home. [Open the quick version](https://www.figma.com/proto/T4VsNxz3dIZ8VGtUzaVIYl/BMO_10-26_Proud?page-id=916%3A24877&node-id=3015-32747&starting-point-node-id=3015%3A32747&scaling=scale-down&content-scaling=fixed)
