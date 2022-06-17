import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import { PostsManager } from "@src/features/posts";
import { Portal } from "@src/components";

function App() {
  return (
    <Box>
      <h1>react</h1>
      <Switch>
        <Route
          path="/"
          component={() => (
            <Portal selector="#posts-manager">
              <PostsManager />
            </Portal>
          )}
        />
      </Switch>
    </Box>
  );
}

// Initialize the msw worker, wait for the service worker registration to resolve, then mount
export const startReact = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};
