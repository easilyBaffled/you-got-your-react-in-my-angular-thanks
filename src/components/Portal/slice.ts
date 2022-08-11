import { createSlice } from "@reduxjs/toolkit";

type PortalRegistry = Record<string, boolean>;

const initialState: PortalRegistry = {};

export const portalRegistrySlice = createSlice({
    initialState,
    name: "portalRegistry",
    reducers: {
        activate(state, action) {
            console.log(action);
            state[action.payload] = true;
        },
        deactivate(state, action) {
            state[action.payload] = false;
        }
    }
});

export const { activate, deactivate } = portalRegistrySlice.actions;
export const slice = portalRegistrySlice;
