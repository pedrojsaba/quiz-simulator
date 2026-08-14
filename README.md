# ITIL 4 Foundation — Exam Simulator

Timed exam simulator built on a consolidated bank of **691 questions** — 612 consolidated from public banks plus 79 original exam-style questions, merged from
public GitHub question banks with duplicates removed and conflicting answers adjudicated.

- **Exam mode** — 40 questions, 60 minutes, 65% to pass (matches the real exam).
- **Practice mode** — instant feedback per question.
- **Question bank** — search and filter all 691 questions with their answers.
- **Exam-style set** — 79 original questions using the list-select ("1 and 3"), negative-stem and applied-scenario formats the real exam favours. Written from the syllabus, not copied from any official paper. 60 questions bank-wide now use the list-select format (up from 12), covering all 11 syllabus areas.
- **ES translation** — press `ES` on any question for a Spanish translation. All 691 question stems are pre-translated in `es.js` (no network call, no rate limit); the on-demand `mymemory.translated.net` fetch only kicks in as a fallback for any id missing from that file.
  Questions stay in English, as on the real exam.
- Keyboard: `A`–`D` to answer, arrow keys to navigate.

## Publish on GitHub Pages

1. Create a repo and push `index.html`, `questions.js`, `es.js`, `.nojekyll`, `README.md` to `main`.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Live at `https://<user>.github.io/<repo>/`.

Live at: https://pedrojsaba.github.io/quiz-itil4/

## Sources and adjudication

Merged from [Ditectrev](https://github.com/Ditectrev/ITIL-4-Foundation-IT-Service-Management-Practice-Tests-Exams-Questions-Answers)
and [mtvbrianking](https://github.com/mtvbrianking/itil-4-foundation-practice-exams).
1,027 raw questions collapsed to 612 unique. 31 answer conflicts were reviewed: most were
UK/US spelling or different option sets. 8 answers were corrected against ITIL 4 doctrine.

The 5 questions previously flagged `needs_review` have since been resolved by checking each
against the ITIL 4 practice-contribution doctrine: q0060, q0133, q0134 and q0135 were confirmed
correct as scraped; q0061 had a scraping error — its stem said "Service Request Management" but
its options belonged to the "Service Level Management" contribution row, so the stem was
corrected to match its options. No questions remain flagged.

## Disclaimer

Study aid only. Not affiliated with or endorsed by AXELOS or PeopleCert.
ITIL® is a registered trade mark of AXELOS Limited. Question text belongs to its original authors.
