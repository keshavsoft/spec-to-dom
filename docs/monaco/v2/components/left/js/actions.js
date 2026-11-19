function setOptions(select, values, placeholder) {
  if (!select) return;
  select.length = 0;
  select.add(new Option(placeholder, ''));
  values.forEach((value) => select.add(new Option(value, value)));
  select.disabled = values.length === 0;
}

export function createActions({ spec, editor, elements }) {
  const showSource = (value, title, path) => {
    editor.setValue(JSON.stringify(value, null, 2));
    if (elements.editorTitle) elements.editorTitle.textContent = title;
    if (elements.editorPath) elements.editorPath.textContent = path;
  };

  const actions = {
    initialize: () => {
      setOptions(elements.rootSelect, Object.keys(spec), 'Select Element');
      showSource(spec, 'spec.json', 'Complete library');
    },

    selectRoot: (event, targetElement) => {
      const rootKey = targetElement.value;
      if (!rootKey) {
        actions.showAll();
        return;
      }

      const elementSpec = spec[rootKey];
      showSource(elementSpec, rootKey, `spec.${rootKey}`);
    },

    showAll: () => {
      if (elements.rootSelect) elements.rootSelect.value = '';
      showSource(spec, 'spec.json', 'Complete library');
    }
  };

  return actions;
}

export default createActions;
