import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";

function waitForElm(selector) {
    console.log("waiting for", selector);
    return new Promise((resolve) => {
        if (document.querySelector(selector))
            return resolve(document.querySelector(selector));

        const observer = new MutationObserver(() => {
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

const useElm = (selector, isActive) => {
    const [el, setEl] = useState();
    useEffect(() => {
        waitForElm(selector).then(setEl);
    }, [isActive, selector]);

    return el;
};

export function _Portal({ isActive, selector, children }) {
    const el = useElm(`[data-portal-hook="${selector}"]`, isActive);

    if (!isActive || !el) return null;
    console.log(selector, el, isActive);

    return createPortal(children, el);
}

function mapStateToProps(state, { selector }) {
    return { isActive: state.portalRegistry[selector] };
}

export const Portal = connect(mapStateToProps)(_Portal);
