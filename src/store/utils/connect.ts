import { isEqual } from "lodash";

const updater = (relevantState, component) => {
    Object.entries(relevantState).forEach(([key, value]) => {
        if (!isEqual(component[key], value)) component[key] = value;
    });
};
export const connect =
    ({
        mapStateToProps
    }: {
        mapStateToProps: (any, component) => any;
        mapDispatchToProps?: {};
    }) =>
    (component, store) =>
        store.subscribe(() => {
            const relevantState = mapStateToProps(store.getState(), component);
            updater(relevantState, component);
        });
