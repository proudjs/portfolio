---
order: 1
ready: true
title: BMO mobile application
headline: BMO mobile app, concept redesign
tag: Unsolicited redesign · iOS · Fintech
card: "Checking a transfer: 5 taps down to 1"
summary: An unsolicited redesign of the transfer and bill-pay flows in BMO's US mobile app. I'm not affiliated with BMO.
role: Solo UX/UI Designer
scope: Audit · Information Architecture · Content Design · Visual System · Prototyping
timeline: August to October 2026 · Unsolicited redesign
prototypeUrl: https://www.figma.com/proto/T4VsNxz3dIZ8VGtUzaVIYl/BMO_10-26_Proud?page-id=916%3A24877&node-id=916-27873&starting-point-node-id=916%3A27873&scaling=scale-down&content-scaling=fixed
hero:
  src: https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/02-hero-after-transfer-record-scheduled-d459ab64-8ebe-4d02-b294-b282ce8ddc1f.webp
  alt: Redesigned transfer record, Scheduled, showing when the money leaves and arrives
  kind: phone
stats:
  - value: "98"
    label: numbered findings from a one-week audit of the live app
  - value: "15 of 15"
    label: testers could tell whether a bill payment worked
  - value: "5 → 1"
    label: taps to find out whether a transfer worked
---

<!-- Copied from uxfol.io/prouddesigns on Nov 13, 2026. Images still load from UXfolio. -->

## Overview

**Problem.** In my audit of BMO's app, it was hard to tell if a transfer or bill payment worked or when the money would move. I ran every flow on my partner's account, with his permission. The app wasn't short on information. It was short on answers.

**What I did.** I redesigned both flows around two questions: Did it work? When? Home shows what's about to leave. Every row opens the same record with one of five status words. Bill pay gets a real review with the fee and the day the money leaves.

**Result.** A clickable prototype of both flows, tested with 15 people. All 15 could tell when a transfer arrives and whether a bill payment worked.

## The problem

### It started at home.

My partner banks with BMO and kept getting tripped up. Was it him or the app? Over one week in September 2026, with his permission, I ran every transfer and bill-pay flow on his account.

Two transfers were described with twelve different phrases. The full record sat five taps away behind a menu. The activity row, where people actually look, did nothing when tapped.

On paper the app is fine: 4.8 out of 5 from 137,000 App Store ratings. Both things can be true. A high average tells you most people get through. It doesn't tell you about the ones who get stuck. Those are the people a bank can least afford to lose.

So I set a narrow brief: make transfers and bill pay answer two questions at every step. **Did it work? When?**

![Board of the twelve different status phrases BMO used across two transfers, rebuilt with invented data.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/03-before-status-words-6ebecbf1-10fe-48f4-8103-062caf134c11.webp> "wide")

*Two real transfers, twelve ways to say what happened. Rebuilt in Figma with invented data. Not a screenshot.*

## The redesign at a glance

![Redesigned Home showing what's about to leave](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/03-at-a-glance-home-3d90e4aa-6f48-4025-a80d-8a8792753ef9.webp> "phone") ![Redesigned transfer record](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/04-at-a-glance-transfer-record-e7e8ede1-bac9-4370-a139-af61e9c0f419.webp> "phone") ![Pay and transfer, Scheduled tab](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/pay-and-transfer-scheduled-253bb0a2-e6b0-4e1b-9ac5-dfe77183a65d.webp> "phone")

*Left: Home shows what's about to leave, with the day. Middle: every row opens one record, with one status word and one date story. Right: Pay & transfer keeps everything scheduled and everything that happened in one place.*

## Research

### One week, two real transfers, 98 numbered findings.

No client, no analytics, no recruited users. Just the live app and a real account, so I treated it like a lab.

I logged each problem with an ID (L01 to L98), the screen, what I saw and the guideline it broke. I kept what I *observed* separate from what I *thought it meant*, so I could tell evidence from judgment.

Two real $10 transfers ran during the audit: one came in, one I sent and canceled within the hour. An October follow-up covered adding a biller (L100 to L102).

**What other customers say.** I read the 31 most recent App Store reviews. Most complaints were about check deposit and signing in, outside this project. Two said bill pay got harder to use.

One reviewer thought the app couldn't send money to other banks. It can, but the option is hidden from the main “Transfer money” button (L35, L41). Nobody wrote that they couldn't tell if a payment went through, so I don't claim they did.

**What I didn't do:** interviews or a usability study on the live app. This is one careful audit of one account, not a sample of customers.

![Audit log excerpt, five of 98 findings: L40 activity rows do not open, L42 the record is five taps away, L43 ten status phrases for one transfer, L72 three unexplained dates, L73 balance ignores a scheduled transfer. All rated high severity.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/3WxSYwq6rdgF8ezt.webp> "wide")

## Insights

### Ninety-eight findings, four problems.

**Status can't be trusted.** Twelve phrases across two transfers, from “Transfer Confirmed” to “successfully canceled” (L43). One transfer had three unlabeled dates (L72). A canceled transfer silently disappears from activity (L80).

**The record is hidden.** The activity row shows a bank code like “WEB WEFABK CK WEBXFR TRANSFER” and does nothing when tapped (L17, L40). The real record is five taps away (L42). Transfers, bill pay and the account each keep their own history (L94 to L96).

**Blue means nothing.** On bill pay, labels, titles, links and every button are blue (L61). When everything is blue, nothing says “tap me.”

**The two money flows disagree.** Transfers get a review step and a cancel window (L68). Bill pay commits on one tap and never shows a fee or the day the money leaves (L49, L51, L56). The balance ignores a scheduled transfer (L73).

![One BMO transfer shown with three unlabeled dates: a send date, a Scheduled For chip and a deliver-by date, rebuilt with invented data.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/1ahCLVdRiZYwptxu.webp> "wide")

*Three dates for one transfer, none labeled (L72). Rebuilt in Figma with invented data. Not a screenshot.*

![BMO's account activity, where the row does nothing when tapped](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/08-before-activity-77dafb42-b3b5-473f-ab07-bcaf1f9f80b0.webp> "phone") ![BMO's one-tap Review and Pay screen](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/09-before-review-and-pay-e123063d-6803-4ace-abde-e2c57214558f.webp> "phone")

*Left: the activity row that does nothing when tapped (L17, L40). Right: bill pay's one-tap "Review and Pay" (L49, L51, L56, L61). Rebuilt in Figma with invented data. Not screenshots.*

## The rules

### Sketches first, rules second.

After the audit I sketched from rough ideas, then wrote them down as rules to check every screen against.

1. **Five words.** Scheduled, Processing, Completed, Canceled, Failed. The same word on the confirmation, the row, the tab and the record. Always a word plus an icon, never color alone.
2. **One record, many doors.** Wherever you start, you land on the same record: same status, same dates, same reference number, same cancel button until the cut-off.
3. **One date story.** "Leaves August 11 → Arrives August 14." Always a pair, always in words.
4. **Form, review, confirmation, record.** The same four steps for a transfer and a bill, so bill pay gets the review step it was missing.
5. **Blue has three jobs.** Act (the one main button), Go (links, pickers, quick actions), You are here (the selected tab, as a tint). Nothing else.

The last rule wasn't my first version. More on that below.

![Diagram: Home, the account activity row and the Pay & transfer Scheduled tab all open the same transfer record.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/qgrM0cusKP16Yvv9.webp> "wide")

*Three ways in, one record.*

## Four key decisions

![Paper sketches of the BMO redesign: Home, account detail, Recent Activity and Pay & transfer on top, and the transaction record in five states below: Scheduled, Processing, Completed, Canceled, Failed.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/4FKRI30BL3oPHIAm.webp> "wide")

*Before Figma, I sketched both flows on paper, including all five states a transfer record can be in.*

### Decision 1 of 4: Home tells you what's about to leave

BMO's Home shows balances and a promo. Nothing about the $350 leaving tomorrow (L03, L92). I added “Coming up” under the accounts: the next three things to leave, with the day. Each one opens its record. The promo is gone.

![BMO's Home before, with balances and a promo](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/11-before-home-babcdbfc-14b3-4fdc-aa39-535316c0934f.webp> "phone") ![Redesigned Home with Coming up](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/12-after-home-62d065eb-6cd0-4312-91c5-31165f402a35.webp> "phone")

*Before, balances and a promo. Rebuilt in Figma with invented data. Not a screenshot. After, coming up, each row opening its record.*

### Decision 2 of 4: The record is one tap from anywhere

Every list uses the same row with one chevron. Every row opens the same record sheet.

Instead of three histories, Pay & transfer has Scheduled, History and Search. Scheduled is what's about to happen. History is what happened. A canceled transfer stays in History with its reference number. Pay bills uses the same pattern: Payees, Payments and Search.

![Diagram: before, five taps through a menu to reach a transfer record. After, one tap from the Coming up row.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/u8Z7MDaUgLOGUXk0.webp> "wide")

*Five taps through a menu became one.*

![Redesigned account activity: Scheduled items on top, then one list by date, each row named in plain words with a chevron that opens its record.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/gallery/activity-after-3a13c036-51ea-44ba-97f5-a998abb8300c.webp> "phone")

*The same activity, redesigned. Every row says what happened in words and opens its record. Compare with BMO's version in Insights above.*

![Pay and transfer, Scheduled tab](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/H7tE4rPj95k6ZR0n.webp> "phone") ![Pay and transfer, History tab](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/lu3mvBwPSOKgYDbk.webp> "phone")

*Scheduled answers what's about to happen. History answers what happened.*

### Decision 3 of 4: Status is a chip, and there are five

Each is a tint, an icon and the word. Canceled is a cool gray on purpose, so it reads as “undone.”

Failure says what happened, where the money is and what to do. BMO's only trace of a failed payment was “RETRY” buried in a bank code (L17). Here it says the transfer didn't go through, when the money came back and why. Processing says it's too late to cancel.

![Redesigned transfer record, Scheduled: $350.00 to Lakeside Credit Union, leaves August 11, arrives August 14, with a Cancel transfer button.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/02-hero-after-transfer-record-scheduled-133ec487-a267-4658-923d-f68937a9d422.webp> "phone") ![The same transfer record in the Processing state, saying it is too late to cancel.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/13-after-transfer-record-processing-b3a67c4f-5ea6-4756-b139-07b3a369b2b8.webp> "phone") ![The same transfer record in the Completed state, with the dates it left and arrived.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/14-after-transfer-record-completed-b3f115fa-20ba-41d7-ad87-50ce57056437.webp> "phone") ![The same transfer record in the Failed state: it did not go through, the money came back August 13, and the account number could not be verified.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/gallery/15-after-transfer-record-failed-e16a2b02-d2ee-4dc5-8533-f3c194bcd5be.webp> "phone")

*The same record in four states. Only the chip, the dates and the note change.*

### Decision 4 of 4: Bill pay gets a review that tells the truth

Amount, pay from, the day it leaves, the day it's delivered, the fee, and what's available after. The cancel window is stated before you pay, not after.

![BMO's bill pay review before](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/09-before-review-and-pay-e8114bb5-8556-4ca6-aed5-105ff63e7108.webp> "phone") ![Redesigned bill pay review](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/20-after-bill-pay-review-35941605-c82b-40fa-89c0-cea2f287a95e.webp> "phone")

*Before, rebuilt in Figma with invented data. Not a screenshot. After, the day it leaves, the fee, and what's left.*

#### Smaller decisions

- **One way to transfer.** BMO's “Transfer money” buttons only reach BMO accounts (L35, L41). Here one Transfer flow covers every account.
- **“Not enough money” is caught early.** Pick an account that can't cover the amount and it turns red right away. Review shows what's available after scheduled payments (L73).
- **Cancel is a decision, not a tap.** BMO's dialog mixes “cancel” and “delete,” and its yes button matches Pay (L78, L79). Here the buttons say Cancel transfer and Keep transfer.
- **Adding a payee is a search.** A payee you already have is flagged instead of added twice (L60, L100, L102).
- **The words follow rules too.** Live items say Leaves and Arrives. Finished ones say Left and Arrived.
- **What I kept from BMO.** Face ID login (L12), full confirmation details (L13), plus and minus signs on amounts (L19), the transfer review step (L68) and the cancel dialog's structure (L77, L81).

![Redesigned cancel dialog with Cancel transfer and Keep transfer buttons](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/21-cancel-dialog-676b18e5-88d0-4554-9dec-fee7ce19aa1c.webp> "phone") ![Cancel confirmation](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/W2EUr1gNrEfxqft3.webp> "phone")

*Cancel: the buttons say what they do.*

## Where I changed my mind

> #### The blue rule
>
> My first rule was one blue element per screen, a reaction to BMO's blue-on-everything. Applied literally, the screens went flat and tappable things lost their color. I loosened it to three jobs. Same discipline, less ideology.

> #### The not-enough-money screen
>
> I first warned about a short balance at Review. Then I moved the check to the moment you pick the account, so you find out sooner.
>
> One case is still open: an amount that fits the balance but not what's left after scheduled payments. The fix is for the From check to count scheduled money too. It's the next thing I'd build.

![First version, a short-balance warning at Review](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/23-first-version-not-enough-money-f6b1873c-5756-406e-8c8a-4af147a13c39.webp> "phone") ![Final version, the check at the moment you pick the account](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/uploads/processed/6a2d92a81353f46e0d17916a/project/6ae266504888a97159698da2/section-media/24-final-not-enough-money-at-from-941250c4-35bc-4fd7-b1b1-69c4552e92ae.webp> "phone")

*First version, a warning at Review. Final, the check moved to the moment you pick the account.*

> #### The Activity tabs
>
> An account's Activity had All, Transfers and Payments tabs. That split things into yet another place. Card purchases, Zelle and deposits fit neither tab. I took the tabs out. Activity is now one list, newest first, with scheduled items on top.

![Paper sketch of the Recent Activity screen with All, Transfer and Payment tabs at the top and a list grouped by date.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/hRIvKfP39TT8FxQS.webp> "phone")

*My first sketch split Activity into tabs. I later removed them.*

## The system

### One typeface, six sizes, one blue with three jobs, five status words.

17 color styles, 6 effect styles and 14 text styles. Rows, fields, nav, headers and four button types are all components. Every screen is built from them, which is how the rules survived a week of changes.

Even shadows follow a rule: anything you can tap has one. Cards that only show information sit flat.

I tested text size on the live app (L83 to L91). The two screens where money moves can't be zoomed at all (L83). At large text, Pay bills is pushed out of its own menu (L84). Designing for this was out of scope.

I did fix contrast. The blue and secondary gray were darkened, inactive nav labels were raised and the close and copy buttons got 44-point tap targets.

![The design system: type scale, the blue with three jobs, five status chips, four button types, rows, fields, header and nav.](<https://uxfolio-prod.s3.us-east-1.amazonaws.com/6a2d92a81353f46e0d17916a/6ae266504888a97159698da2/3GovW3M039ptUtkR.webp> "wide")

## Scope and constraints

**In:** Home, account activity, the transaction record, transfers, bill pay, adding a payee and every state: scheduled, processing, completed, canceled, failed, empty.

**Out:** Zelle, mobile deposit, Explore, statements, desktop and large text sizes.

**BMO's rules I designed inside:** transfers to other banks usually take 2 to 3 business days (BMO's help pages). Transfers scheduled for today can't be canceled (BMO's in-app copy). The redesign doesn't promise faster money. It says clearly when it moves.

## Testing and outcome

**Tested with 15 people.** Some were BMO customers. Sessions were in person and on video, on a phone. More than half were 40 or older.

**15 of 15** found when the transfer arrives. More than half found it right on Home.

**15 of 15** could tell the bill payment worked, from the status word and the confirmation.

**15 of 15** canceled a transfer.

**2 of 15** hesitated at the cancel confirmation, because their own banks cancel in one tap. Both still canceled. → Add “You’ll confirm on the next step” under the button.

**1 of 15** got stuck on the payee page. They looked for search because their own bank app doesn’t save payees. → Put a search field at the top of Payees, with saved payees below.

Testers described it as easy to use and easy to navigate.

**What surprised me:** I expected a new layout to slow down older testers. It didn’t.

**What exists:** a clickable Figma prototype from sign in. Send, review, confirm and cancel a transfer. Pay a bill and add a payee. It uses a fictional customer, so no real account information appears. Every decision on this page traces to a numbered finding from the audit.

**How BMO could tell if it worked** (proposals, not results):

- Fewer support contacts asking whether a transfer or payment went through.
- More records opened from the activity row than through the menu.
- Fewer duplicate payees on the same account.

## Reflection

#### Two things I'd do differently

I’d watch a few people use the live app before designing. The audit told me what was wrong. Watching people would have told me which of the 98 things they actually feel.

I’d write the system rules on day one. I wrote them after the first screens, so every rule change meant reworking screens. That week turned out to be the most useful of the project. Most of it could have been avoided.

#### What I'd look at next

Text size. The screens where money moves can’t be enlarged at all (L83). Three recent reviews were about text that got too big or hard to read, one from someone with a visual impairment. It’s the first thing I’d design next.

#### What I'm keeping

Two habits: logging a finding before I draw a fix and writing a rule down the moment I break it.

## Try the prototype

### Clickable prototype of the transfer and bill-pay flows.

Sign in, tap Transfer, and send $350 to Lakeside Credit Union. Once it's scheduled, try canceling it. Press R to start over. [Open the full prototype](https://www.figma.com/proto/T4VsNxz3dIZ8VGtUzaVIYl/BMO_10-26_Proud?page-id=916%3A24877&node-id=916-27873&starting-point-node-id=916%3A27873&scaling=scale-down&content-scaling=fixed)

Short on time? This version skips the transfer steps. Sign in, and the $350 transfer and the ComEd bill are already scheduled on Home. Tap either one to open its record. [Open the quick version](https://www.figma.com/proto/T4VsNxz3dIZ8VGtUzaVIYl/BMO_10-26_Proud?page-id=916%3A24877&node-id=3015-32747&starting-point-node-id=3015%3A32747&scaling=scale-down&content-scaling=fixed)
