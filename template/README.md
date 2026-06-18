# Templates

Skeleton folders used by the shell session when adding new guides.
Lives outside `docs/` so it isn't published with the site.

## `guide/` — new guide scaffold

Three files for a new topic notebook. Placeholders:

| Placeholder | Replace with |
| --- | --- |
| `{{TITLE}}` | Guide display name (e.g. `Sample Size`, `The Golf Swing`) |
| `{{SLUG}}` | Folder slug (e.g. `sample-size`, `golf-swing`) — only in `CLAUDE.md` |

The scaffolded `index.html` is a landing stub: placeholder text while the
guide has no chapters, then it auto-forwards to the first `done` chapter in
`sidebar-data.js`. (Nothing links to landing pages — the home index and the
guide switcher go straight to Chapter 1 — so they're only reached by
hand-typed folder URLs.) It also preloads `../guides.js` so the top bar
doesn't need a runtime fetch.

## How the shell session adds a new guide

1. Add the entry to `docs/guides.js`.
2. Copy `template/guide/` to `docs/<slug>/`.
3. Replace `{{TITLE}}` and `{{SLUG}}` in the three copied files with the
   real values.
4. Done — folder is ready for a content session to draft the road map.

Existing guides created before this template was added may have minor
divergences (e.g. references to specific memory notes in their `CLAUDE.md`
goal sections); the template is the canonical shape for new guides going
forward.
