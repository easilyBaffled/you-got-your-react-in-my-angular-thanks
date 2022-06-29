// @ts-nocheck
import { useState, cloneElement, Children } from "react";
import { createPortal } from "react-dom";

function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector))
            return resolve(document.querySelector(selector));

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const useElm = (selector) => {
    const [el, setEl] = useState();
    waitForElm(selector).then(setEl);

    return el;
};

const goodParse = (v) => {
    try {
        return JSON.parse(v);
    } catch (e) {
        return v;
    }
};

export function Portal({ selector, children }) {
    const el = useElm(selector);

    if (!el) return null;

    const props = Object.fromEntries(
        Object.entries(el?.dataset ?? {}).map(([k, v]) =>
            v === "fn" ? [k, el[k]] : [k, goodParse(v)]
        )
    );

    return createPortal(
        Children.map(children, (c) =>
            cloneElement(c, {
                ...props
            })
        ),
        el
    );
}
