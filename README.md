# spec-to-dom

[![NPM Version](https://img.shields.io/npm/v/spec-to-dom.svg?style=flat-square&color=2563eb)](https://www.npmjs.com/package/spec-to-dom)
[![NPM Downloads](https://img.shields.io/npm/dm/spec-to-dom.svg?style=flat-square&color=10b981)](https://www.npmjs.com/package/spec-to-dom)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square)](package.json)
[![Live Documentation](https://img.shields.io/badge/docs-live%20site-4f46e5.svg?style=flat-square)](https://keshavsoft.github.io/spec-to-dom/)

A high-performance, zero-dependency declarative DOM mounting utility for modern web components, tables, and browser UI elements.

---

## 🔗 Quick Links

- 🌐 **Live Documentation & Interactive Playground:** [https://keshavsoft.github.io/spec-to-dom/](https://keshavsoft.github.io/spec-to-dom/)
- 📦 **NPM Package:** [https://www.npmjs.com/package/spec-to-dom](https://www.npmjs.com/package/spec-to-dom)
- 🐙 **GitHub Repository:** [https://github.com/keshavsoft/spec-to-dom](https://github.com/keshavsoft/spec-to-dom)
- 📖 **Documentation Chapters:**
  - [The Story & Overview (Home)](https://keshavsoft.github.io/spec-to-dom/)
  - [Why Use spec-to-dom](https://keshavsoft.github.io/spec-to-dom/pages/why-use.html)
  - [How to Use & API Reference](https://keshavsoft.github.io/spec-to-dom/pages/how-to-use.html)
  - [Interactive Live Playground](https://keshavsoft.github.io/spec-to-dom/pages/playground.html)
  - [Interactive Examples](https://keshavsoft.github.io/spec-to-dom/pages/example.html)

---

## ⚡ Highlights

- **Zero Dependencies:** Less than 1KB minified with zero runtime overhead or supply-chain baggage.
- **Native Browser Performance:** Uses native `.append()` and `.prepend()` directly without heavy Virtual DOM reconciliation.
- **Universal Collections:** Accepts individual `HTMLElement` nodes, arrays of elements, `NodeList`, and `HTMLCollection`.
- **Prepend & Append Modes:** Prepend real-time live events or append batches to table bodies seamlessly.
- **Framework Agnostic:** Pairs naturally with vanilla JavaScript, Custom Web Components, Tailwind CSS token engines, or micro-frontends.

---

## 📦 Installation

Install via npm:

```bash
npm install spec-to-dom
```

Or using pnpm / yarn:

```bash
pnpm add spec-to-dom
# or
yarn add spec-to-dom
```

Or load directly via CDN (no build step needed):

```html
<script type="module">
  import appendToDom from "https://cdn.jsdelivr.net/npm/spec-to-dom@1.2.1/src/index.js";
</script>
```

---

## 🚀 Quick Start

### 1. Mount a Single Element (Replace Mode)

```javascript
import appendToDom from "spec-to-dom";

// 1. Create a native element
const card = document.createElement("div");
card.className = "card shadow-sm p-4";
card.innerHTML = "<h3>Account Details</h3><p>User profile information.</p>";

// 2. Mount directly into container #app (clears existing content by default)
appendToDom({
  buildSpec: card,
  targetHtmlId: "app"
});
```

### 2. Prepend Live Activity / Notifications

```javascript
import appendToDom from "spec-to-dom";

const alertBox = document.createElement("div");
alertBox.className = "alert alert-info";
alertBox.textContent = "⚡ New transaction received!";

// Prepend to top of container
appendToDom({
  buildSpec: alertBox,
  targetHtmlId: "feed-container",
  appendPosition: "prepend"
});
```

### 3. Append Collections (Table Rows, Lists)

```javascript
import appendToDom from "spec-to-dom";

// Create array of table rows
const rows = users.map(user => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${user.id}</td><td>${user.name}</td>`;
  return tr;
});

// Appends all rows without wiping container
appendToDom({
  buildSpec: rows,
  targetHtmlId: "table-body",
  appendPosition: "append"
});
```

---

## 📋 API Reference

### `appendToDom({ buildSpec, targetHtmlId, appendPosition, showLog })`

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `buildSpec` | `Node \| Node[] \| Collection` | *Required* | Element node, array of nodes, or collection to attach |
| `targetHtmlId` | `string` | *Required* | HTML `id` attribute of the target destination container |
| `appendPosition` | `"append" \| "prepend"` | `"append"` | Position mode; `"prepend"` adds to top, `"append"` adds to end |
| `showLog` | `boolean` | `false` | Enable console debug logs for inspection |

**Returns:** The resolved `HTMLElement` container or `null` if the container was not found.

---

## 🌐 Global Registration

When loaded in the browser, `spec-to-dom` automatically attaches itself to the global namespace:

```javascript
// Access version & engine metadata
console.log(window.ks.specToDom.meta);
// { version: "1.2.1", name: "spec-to-dom" }

// Call globally from anywhere
window.ks.specToDom.appendToDom({
  buildSpec: myNode,
  targetHtmlId: "container"
});
```

---

## 📂 Repository Structure

```
spec-to-dom/
├── docs/                      # Documentation portal (GitHub Pages)
│   ├── index.html             # The Story & Architectural Overview
│   ├── css/style.css          # White-theme, high-contrast, modern UI styles
│   ├── js/app.js              # Interactive client script & copy functionality
│   └── pages/
│       ├── why-use.html       # Why use spec-to-dom vs alternatives
│       ├── how-to-use.html    # Installation & API reference
│       ├── playground.html    # Interactive Live Playground
│       └── example.html       # Real-world interactive code examples
├── bin/
│   └── cli.js                 # Scaffolding CLI utility
├── src/
│   ├── index.js               # Library entry point
│   ├── v1/                    # Engine v1 implementation
│   └── v2/                    # Engine v2 implementation
├── package.json
└── README.md
```

---

## 📄 License

[ISC](LICENSE) © [KeshavSoft](https://github.com/keshavsoft)
