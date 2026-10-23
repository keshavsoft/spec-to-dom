import meta from "./meta.js";

export const registerGlobal = (appendToDom) => {
    if (!appendToDom) return;

    globalThis.ks ??= {};

    globalThis.ks.specToDom = {
        meta,
        appendToDom
    };
};

export default registerGlobal;
