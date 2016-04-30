///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
///<reference path="../node_modules/angular2-jwt/typings/browser.d.ts"/>

import {bootstrap}    from "angular2/platform/browser";
import {AppComponent} from "./components/app.component";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {AUTH_PROVIDERS} from "angular2-jwt";
import {MATERIAL_BROWSER_PROVIDERS} from "ng2-material/all";

import "rxjs/Rx";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    AUTH_PROVIDERS,
    MATERIAL_BROWSER_PROVIDERS
]);