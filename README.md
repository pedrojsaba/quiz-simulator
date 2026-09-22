# Exam Simulator

Timed exam simulator supporting multiple certification subjects, picked from a selector in the header. No simulator is selected on load: choose one to see its exam setup and question bank. The choice is not remembered between visits (only an in-progress exam is resumed after a reload).

## Subjects

- **Datadog Fundamentals** — 90 community practice questions covering the certification syllabus (systems/networking basics, the Agent, tags & metrics, dashboards, monitors, APM, logs, integrations). Exam mode: 90 questions, 135 minutes, 60% to pass.
- **ITIL 4 Foundation** — 691 questions (612 consolidated from public banks plus 79 original exam-style questions), merged from public GitHub question banks with duplicates removed and conflicting answers adjudicated. Exam mode: 40 questions, 60 minutes, 65% to pass.
- **VMware VCTA** — 139 original questions (25 with diagrams) written from the VMware Cloud Foundation 9.0 *Compute*, *Network*, and *Storage Fundamentals* lecture manuals. Exam length, time, and pass mark (40 q, 60 min, 70%) are estimates, not official values.
- **VMware VCP-VCF** — 195 original questions (20 with diagrams, 12 multi-select) written from the VMware Cloud Foundation 9.0 *Build, Manage, and Secure* and *Automate and Operate* lecture manuals. Exam mode follows the published VCP-VCF Administrator format: 60 questions, 135 minutes, multiple choice + multiple choice multiple selection; pass mark is a scaled 300/500, shown as an approximate 60%.

Adding another subject means dropping a `questions-<subject>.js` file (and optionally an `es-<subject>.js` translation file) into `data/`, then adding a `<script>` tag and a `<select>` option in `index.html` and an entry in the `SUBJECTS` map in `js/app.js`.

## Features

- **Exam mode** — question count / time limit / pass mark per subject (official for ITIL, Datadog, and VCP-VCF; estimated for VCTA).
- **Question images** — a question can carry an optional `"image": "data/img/..."` field; the exhibit shows under the question text in exam, practice, review, and the question bank. Datadog `dd015` and `dd047` use placeholder images (`data/img/dd015.svg`, `data/img/dd047.svg`) to be replaced with the originals.
- **Multi-select questions** — a question with more than one entry in `"answers"` renders as checkboxes ("Select N answers") instead of single-choice, and grades as correct only when the full set matches, no partial credit. Used by VCP-VCF's 12 multiple choice multiple selection questions, matching the official exam format.
- **Practice mode** — instant feedback per question.
- **Question bank** — search and filter each subject's questions with their answers.
- **ES translation** — hover or tap the small `ES` tag next to any question or answer option for an inline Spanish translation tooltip. ITIL's 691 question stems and options are pre-translated in `data/es-itil.js` (no network call, no rate limit); Datadog, VCTA, and VCP-VCF are translated on demand via `mymemory.translated.net` the first time each one is viewed, then cached. Questions stay in English, as on the real exam.
- Keyboard: `A`–`C`/`D` to answer, arrow keys to navigate.
- Switching subjects resets the question bank filters; an in-progress exam is discarded (with confirmation) since sessions are subject-scoped.

## Files

```
index.html                  markup
css/styles.css              all styles
js/app.js                   exam engine, subject registry
data/questions-itil.js      QUESTIONS_ITIL
data/es-itil.js             ES_TRANSLATIONS_ITIL
data/questions-datadog.js   QUESTIONS_DATADOG
data/questions-vcta.js      QUESTIONS_VCTA
data/questions-vcp.js       QUESTIONS_VCP
data/img/                   placeholder exhibits for Datadog (dd015, dd047)
data/img/vcta/              diagrams extracted from the VCTA lecture manuals
data/img/vcp/               diagrams extracted from the VCP-VCF lecture manuals
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

**VMware VCTA and VCP-VCF:** Original questions written from the VMware Cloud Foundation 9.0 lecture manuals (Compute, Network, Storage Fundamentals; Build, Manage, and Secure; Automate and Operate). Distractors are authored, not taken from the manuals, and the answers have not been reviewed by a VMware-certified expert. Diagrams are extracted from the same manuals. VCP-VCF exam format (60 questions, 135 minutes, scaled 300/500) comes from Broadcom's published exam details; VCTA values are estimates.

## Disclaimer

Study aid only. Not affiliated with or endorsed by AXELOS, PeopleCert, Datadog, Inc., Broadcom, or VMware.
ITIL® is a registered trade mark of AXELOS Limited. Question text belongs to its original authors.
