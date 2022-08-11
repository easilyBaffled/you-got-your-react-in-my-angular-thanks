import {configureStore} from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import {setupListeners} from "@reduxjs/toolkit/query";
import {api as postsApi} from "@src/features/posts";
import {slice as portal} from "@src/components/Portal"

export const store = configureStore({
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(postsApi.middleware),

	reducer: {
		[portal.name]: portal.reducer,
		[postsApi.reducerPath]: postsApi.reducer
	}
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
