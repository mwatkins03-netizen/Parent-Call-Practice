# Parent Call Practice

A live voice role-play for teacher-education students. Each student calls an AI parent and practices delivering difficult news (a reading delay, a suspension, a special education referral, an AI-written essay, an injury at recess). The parent reacts realistically, captions run live for both voices, and afterward the student gets a transcript, rubric feedback, a self-rating, and a reflection to export. By Marc Watkins, University of Mississippi.

## Run it

It's one static file. Upload this folder to a GitHub repository and turn on GitHub Pages; `.nojekyll` is included. The page must be served over **https** (or `localhost`) for the microphone to work. Opening the file directly from disk won't allow mic access.

## Two modes

- **Demo:** needs no key and makes no network calls. A scripted parent speaks fixed lines in the device's built-in voice. Students speak (captioned by the browser, best in Chrome or Edge) or type. Feedback is calculated on the device.
- **Live AI parent:** a real-time AI parent powered by the Google Gemini Live API (`gemini-3.8-live`), with AI rubric feedback from `gemini-3.5-flash-lite`. Each user pastes a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey). The key stays in the browser and is sent only to Google. Model names can be changed under Set up → Advanced.

## Before class use

- **Use a paid key.** Google may use free-tier conversations to improve its products. Free keys are for testing with invented scenarios only.
- **Don't hand students a shared key.** Anyone with the page and the key could use it. For a class, put a small server (for example a Cloudflare Worker) in front that issues short-lived Gemini [ephemeral tokens](https://ai.google.dev/gemini-api/docs/live-api/ephemeral-tokens), so no key is exposed.
- **Rough cost on a paid key:** about $0.15–$0.50 per 10-minute call, depending on how much back-and-forth there is. Check Google's current [pricing](https://ai.google.dev/gemini-api/docs/pricing).

## Features

- 5 built-in scenarios; parent stance (calm, defensive, angry, overwhelmed, in denial) × 3 difficulty levels; 8 voices
- Instructors can write their own scenarios and share them as a `.json` file that students import
- Call screen with an animated parent portrait, a level meter for the student's voice, a 10-minute timer with spoken warnings, mute, and a "Take a break" hold
- Live captions with adjustable size and colors, a running transcript, and the option to type any line instead of speaking
- Debrief: talk balance, questions asked, empathy phrases and jargon detected, AI feedback on a 5-part rubric, self-rating, and reflection questions
- Export as HTML, PDF (print), copied text, or a `.txt` transcript; work saves in the browser (localStorage) until cleared

## Accessibility

Live captions for both speakers; the transcript reads only finished lines to screen readers; typed input as an alternative to speech; full keyboard operation with visible focus, a skip link, and a focus-trapped break dialog; reduced-motion support; AA color contrast; responsive down to phone width. Captions are machine-generated and can contain errors.

## Privacy

No accounts, no analytics, no server of its own. In Live mode, call audio and the transcript (for feedback) go to Google's Gemini API under the key owner's terms. Everything else stays in the student's browser, and "Clear all my data" deletes it.

## Credits and licenses

- The feedback rubric is adapted from the SPIKES protocol for delivering bad news (Baile, Buckman, Lenzi, Glober, Beale & Kudelka, 2000, *The Oncologist* 5(4), 302–311), reworked for school–family conversations. The SPIKES authors are not responsible for this adaptation.
- University of Mississippi colors: red #CE1126, navy #14213D, powder blue #006BA6 and #48C6E4. The UM typeface Termina is used if available; otherwise Archivo (SIL Open Font License, via Google Fonts).
- All scenarios, names, and families are invented.
- Content license: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## AI disclosure

Designed by Marc Watkins and built with Claude (Anthropic) as a collaborator. Content was reviewed by a human educator. The parent in Live mode is an AI voice from Google Gemini, and AI feedback can be wrong; treat it as one perspective, not a grade.

More at [marcwatkins.substack.com](https://marcwatkins.substack.com).
