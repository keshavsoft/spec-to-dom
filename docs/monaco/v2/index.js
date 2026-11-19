import { initRightEditor } from './components/right/js/index.js';
import { initLeftWorkspace } from './components/left/js/index.js';

async function boot() {
  try {
    let spec = window.ks?.declarative?.spec?.data;
    if (!spec) {
      try {
        const mod = await import('../../dist/v2/min.js');
        spec = mod.spec || mod.default || window.ks?.declarative?.spec?.data;
      } catch (_) {
        const mod = await import('https://keshavsoft.github.io/declarative-spec/docs/dist/v2/min.js');
        spec = mod.spec || mod.default || window.ks?.declarative?.spec?.data;
      }
    }
    const editor = await initRightEditor(spec);
    await initLeftWorkspace({ spec, editor });
  } catch (error) {
    console.error('[Spec Explorer V5]', error);
  }
}

boot();
