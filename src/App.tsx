import { Box, ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { useLocation, BrowserRouter } from "react-router-dom";

import { Portal } from "@src/components";
import { PostDetail, PostsManager } from "@src/features/posts";

import { store } from "./store";

function ErrorFallback({ error }) {
    console.log(error);
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </div>
    );
}

function App() {
    const loc = useLocation();
    // const nav = useNavigate();
    useEffect(() => {
        // const debounceNav = debounce(nav, 500);

        document.addEventListener("routeChange", (e: CustomEvent) => {
            // if (e.detail.url !== loc.pathname) debounceNav(e.detail.url);
            console.log(e.detail, location, history, loc);
        });
    }, []);
    return (
        <Box>
            <Portal selector="posts-manager">
                <PostsManager />
            </Portal>
            <Portal selector="post-detail">
                <PostDetail />
            </Portal>
            {/*<Routes>*/}
            {/*	<Route*/}
            {/*		path="/posts/:id"*/}
            {/*		element={*/}
            {/*			<Portal selector="post-detail">*/}
            {/*				<PostDetail/>*/}
            {/*			</Portal>*/}
            {/*		}*/}
            {/*	/>*/}
            {/*</Routes>*/}
        </Box>
    );
}

// Initialize the msw worker, wait for the service worker registration to resolve, then mount
export const startReact = () => {
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <ChakraProvider>
                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onError={console.error}
                    >
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </ErrorBoundary>
                </ChakraProvider>
            </Provider>
        </React.StrictMode>,
        document.getElementById("root")
    );
};
