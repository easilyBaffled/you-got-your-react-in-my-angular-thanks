import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { startReact } from "./App";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { worker } from "./mocks/browser";

window.history.pushState = new Proxy(window.history.pushState, {
    apply: (target, thisArg, argArray) => {
        // force angular with https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router
        // if (argArray[2] === location.pathname) return;
        window.document.dispatchEvent(
            new CustomEvent("routeChange", { detail: { url: argArray[2] } })
        );
        return target.apply(thisArg, argArray);
    }
});

if (environment.production) enableProdMode();

worker.start({ quiet: true }).then(() => {
    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.log(err))
        .then(() => {
            startReact();
        });
});
