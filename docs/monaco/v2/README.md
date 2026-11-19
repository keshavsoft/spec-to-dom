# declarative-spec Explorer V3

This is the V3 Monaco explorer workspace for `declarative-spec`, adapted from the minimalist layout design of `declarative-definitions` V5.

## Folder structure

- `index.html` — The page structure and layout with a single root element selector and Monaco editor.
- `index.js` — Loads `spec.json` via `window.ks.declarative.spec.data` (or fallback) and initializes the left and right components.
- `workspace/css/` — Shared workspace layout and theme.
- `components/left/` — The element selector control and "Show all" action.
- `components/right/` — The read-only Monaco JSON editor.

## Component Contract

Each component follows the standardized three-file pattern:
- `bindings.json` — Declarative event-to-action mapping consumed by `dom-primitive-bindings`.
- `actions.js` — Component actions and logic.
- `index.js` — Initializes the component.
