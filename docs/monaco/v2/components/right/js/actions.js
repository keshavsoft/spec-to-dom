export const actions = {
  createEditor: (monaco, container, initialValue) => monaco.editor.create(container, {
    value: JSON.stringify(initialValue, null, 2),
    language: 'json',
    theme: 'vs-dark',
    readOnly: true,
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    folding: true,
    wordWrap: 'on',
    padding: { top: 18, bottom: 18 }
  })
};

export default actions;
