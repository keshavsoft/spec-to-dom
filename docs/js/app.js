/**
 * spec-to-dom Documentation - Interactive Client Scripts
 */

// Implementation of appendToDom for live client-side demonstrations
const appendToDom = ({ buildSpec, targetHtmlId, appendPosition, showLog } = {}) => {
  const content = buildSpec;
  const localTargetHtmlId = targetHtmlId;
  const localAppendPosition = appendPosition;
  const localShowLog = showLog;

  if (localShowLog) console.log("renderToDom 1 (content):", content);

  const container = document.getElementById(localTargetHtmlId);
  if (!container) {
    console.warn(`[spec-to-dom] Target element #${localTargetHtmlId} not found.`);
    return null;
  }

  const isCollection = Array.isArray(content) ||
      content instanceof NodeList ||
      content instanceof HTMLCollection;

  if (isCollection) {
      if (localAppendPosition === "prepend") {
          container.prepend(...content);
      } else {
          container.append(...content);
      }
  } else {
      if (localAppendPosition === "prepend") {
          container.prepend(content);
      } else {
          container.innerHTML = "";
          container.append(content);
      }
  }

  if (localShowLog) console.log("renderToDom 2 (mounted):", container);
  return container;
};

// Global registration
window.ks = window.ks || {};
window.ks.specToDom = {
  meta: { version: "1.2.1", name: "spec-to-dom" },
  appendToDom
};

// Copy code button handler
document.addEventListener("DOMContentLoaded", () => {
  // Handle copy buttons
  document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      let textToCopy = "";
      
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) textToCopy = targetElement.innerText;
      } else {
        const pre = button.closest(".code-box")?.querySelector("pre");
        if (pre) textToCopy = pre.innerText;
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = button.innerText;
          button.innerText = "Copied!";
          button.style.color = "#16a34a";
          button.style.borderColor = "#16a34a";
          setTimeout(() => {
            button.innerText = originalText;
            button.style.color = "";
            button.style.borderColor = "";
          }, 2000);
        }).catch(err => {
          console.error("Failed to copy:", err);
        });
      }
    });
  });

  // Setup Live Demo Playground if present
  let alertCount = 0;
  let rowCount = 0;

  const btnMountCard = document.getElementById("demo-btn-card");
  const btnPrepend = document.getElementById("demo-btn-prepend");
  const btnAppendRow = document.getElementById("demo-btn-row");
  const btnClear = document.getElementById("demo-btn-clear");
  const targetId = "live-demo-target";

  if (btnMountCard) {
    btnMountCard.addEventListener("click", () => {
      // Build a card DOM element
      const card = document.createElement("div");
      card.className = "demo-item card-box";
      card.innerHTML = `
        <div>
          <strong style="color:#0f172a; display:block;">Profile Card Mounted</strong>
          <span style="font-size:0.85rem; color:#64748b;">Mounted cleanly via appendToDom with default replace mode.</span>
        </div>
        <span style="background:#e0e7ff; color:#4338ca; font-size:0.75rem; padding:0.2rem 0.5rem; border-radius:4px; font-weight:600;">Single Node</span>
      `;

      appendToDom({
        buildSpec: card,
        targetHtmlId: targetId,
        showLog: true
      });
    });
  }

  if (btnPrepend) {
    btnPrepend.addEventListener("click", () => {
      alertCount++;
      const alertItem = document.createElement("div");
      alertItem.className = "demo-item notification";
      alertItem.innerHTML = `
        <span>⚡ Prepend Event #${alertCount} at ${new Date().toLocaleTimeString()}</span>
        <span style="font-size:0.75rem; font-weight:600;">prepended</span>
      `;

      appendToDom({
        buildSpec: alertItem,
        targetHtmlId: targetId,
        appendPosition: "prepend",
        showLog: true
      });
    });
  }

  if (btnAppendRow) {
    btnAppendRow.addEventListener("click", () => {
      rowCount++;
      const item1 = document.createElement("div");
      item1.className = "demo-item";
      item1.innerHTML = `<span>📦 Collection Batch Item #${rowCount}.A</span><span style="color:#64748b; font-size:0.8rem;">Batch Node</span>`;

      const item2 = document.createElement("div");
      item2.className = "demo-item";
      item2.innerHTML = `<span>📦 Collection Batch Item #${rowCount}.B</span><span style="color:#64748b; font-size:0.8rem;">Batch Node</span>`;

      // Pass array collection
      appendToDom({
        buildSpec: [item1, item2],
        targetHtmlId: targetId,
        appendPosition: "append",
        showLog: true
      });
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", () => {
      const container = document.getElementById(targetId);
      if (container) {
        container.innerHTML = '<div style="color:#94a3b8; font-style:italic; padding:1.5rem; text-align:center;">Container cleared. Click any button on the left to render live DOM nodes!</div>';
      }
    });
  }
});
