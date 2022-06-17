import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { startReact } from "./App";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { worker } from "./mocks/browser";

if (environment.production) {
  enableProdMode();
}
worker.start({ quiet: true }).then(() => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err))
    .then(() => {
      startReact();
    });
});
