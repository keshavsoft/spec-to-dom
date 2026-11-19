import bindings from './bindings.json' with { type: 'json' };
import actions from './actions.js';

export async function initRightEditor(initialValue) {
  await new Promise((resolve, reject) => {
    if (!window.require) {
      reject(new Error('Monaco loader is unavailable.'));
      return;
    }

    window.require.config({
      paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs' }
    });
    window.require(['vs/editor/editor.main'], resolve, reject);
  });

  const container = document.getElementById('monacoEditor');
  if (!container) throw new Error('Monaco editor container was not found.');

  // This component has no browser event bindings; the empty JSON file keeps
  // the same component contract as the interactive left workspace.
  void bindings;
  return actions.createEditor(window.monaco, container, initialValue);
}

export default initRightEditor;
