# Exam Simulator

Timed exam simulator supporting multiple certification subjects, picked from a selector in the header. Opens on **Datadog Fundamentals** by default.

## Subjects

- **Datadog Fundamentals** (default) — 90 community practice questions covering the certification syllabus (systems/networking basics, the Agent, tags & metrics, dashboards, monitors, APM, logs, integrations). Exam mode: 90 questions, 135 minutes, 60% to pass.
- **ITIL 4 Foundation** — 691 questions (612 consolidated from public banks plus 79 original exam-style questions), merged from public GitHub question banks with duplicates removed and conflicting answers adjudicated. Exam mode: 40 questions, 60 minutes, 65% to pass.

Adding another subject means dropping a `questions-<subject>.js` file (and optionally an `es-<subject>.js` translation file) into `data/`, then registering it in the `SUBJECTS` map in `index.html`.

## Features

- **Exam mode** — official question count / time limit / pass mark per subject.
- **Practice mode** — instant feedback per question.
- **Question bank** — search and filter each subject's questions with their answers.
- **ES translation** — hover or tap the small `ES` tag next to any question or answer option for an inline Spanish translation tooltip. ITIL's 691 question stems and options are pre-translated in `data/es-itil.js` (no network call, no rate limit); Datadog's are translated on demand via `mymemory.translated.net` the first time each one is viewed, then cached. Questions stay in English, as on the real exam.
- Keyboard: `A`–`C`/`D` to answer, arrow keys to navigate.
- Switching subjects resets the question bank filters; an in-progress exam is discarded (with confirmation) since sessions are subject-scoped.

## Files

```
index.html                  markup
css/styles.css              all styles
js/app.js                   exam engine, subject registry
data/img/                   question exhibit images (optional `image` field)
data/questions-itil.js      QUESTIONS_ITIL
data/es-itil.js             ES_TRANSLATIONS_ITIL
data/questions-datadog.js   QUESTIONS_DATADOG
```

## Publish on GitHub Pages

1. Create a repo and push `index.html`, `css/`, `js/`, `data/`, `.nojekyll`, `README.md` to `main`.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Live at `https://<user>.github.io/<repo>/`.

Live at: https://pedrojsaba.github.io/quiz-itil4/

## Sources and adjudication

**ITIL:** Merged from [Ditectrev](https://github.com/Ditectrev/ITIL-4-Foundation-IT-Service-Management-Practice-Tests-Exams-Questions-Answers)
and [mtvbrianking](https://github.com/mtvbrianking/itil-4-foundation-practice-exams).
1,027 raw questions collapsed to 612 unique. 31 answer conflicts were reviewed: most were
UK/US spelling or different option sets. 8 answers were corrected against ITIL 4 doctrine.
No questions remain flagged `needs_review`.

**Datadog Fundamentals:** Community-sourced practice questions supplied by the project owner; not verified against an official Datadog answer key.

## Disclaimer

Study aid only. Not affiliated with or endorsed by AXELOS, PeopleCert, or Datadog, Inc.
ITIL® is a registered trade mark of AXELOS Limited. Question text belongs to its original authors.
