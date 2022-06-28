import {Route, Routes, useLocation, BrowserRouter, useNavigate} from "react-router-dom";
import {Box} from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {store} from "./store";
import {Provider} from "react-redux";
import {ChakraProvider} from "@chakra-ui/react";
import {ErrorBoundary} from 'react-error-boundary'
import {PostDetail, PostsManager} from "@src/features/posts";
import {Portal} from "@src/components";
import {useEffect} from "react";

function ErrorFallback({error}) {
	console.log(error)
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
		</div>
	)
}

function App() {
	let loc = useLocation()
	let nav = useNavigate()
	useEffect(() => {
		document.addEventListener('routeChange', (e: CustomEvent) => {
			if (e.detail.url !== loc.pathname)
				nav(e.detail.url)
		})
	}, [])
	return (

		<Box>
			<h1>react</h1>

			<Portal selector="#posts-manager">
				<PostsManager/>
			</Portal>
			<Routes>
				<Route
					path="/posts/:id"
					element={
						<Portal selector="#post-detail">
							<PostDetail/>
						</Portal>
					}
				/>
			</Routes>
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
						onError={console.error}>
						<BrowserRouter>
							<App/>
						</BrowserRouter>
					</ErrorBoundary>
				</ChakraProvider>
			</Provider>
		</React.StrictMode>,
		document.getElementById("root")
	);
};
