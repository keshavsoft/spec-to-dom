import bindings from './bindings.json' with { type: 'json' };
import { createActions } from './actions.js';

const getBindEvents = () =>
  window.ks?.domPrimitive?.bindings?.bindEvents ||
  window.ks?.domPrimitiveBindings?.bindEvents ||
  window.ks?.bindEvents;

export async function initLeftWorkspace({ spec, editor }) {
  const elements = {
    rootSelect: document.getElementById('rootSelect'),
    editorTitle: document.getElementById('editorTitle'),
    editorPath: document.getElementById('editorPath')
  };

  const actions = createActions({ spec, editor, elements });
  actions.initialize();

  let bindEvents = getBindEvents();
  if (typeof bindEvents !== 'function') {
    try {
      const mod = await import('https://keshavsoft.github.io/dom-primitive-bindings/dist/v8/min.js');
      bindEvents = mod.bindEvents || mod.default || getBindEvents();
    } catch (_) {}
  }

  if (typeof bindEvents !== 'function') {
    throw new Error('dom-primitive-bindings v8 is not available.');
  }

  bindEvents('leftWorkspace', bindings, actions);
  return actions;
}

export default initLeftWorkspace;
