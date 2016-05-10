import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AuthService, ExternalLoginService} from './app/shared';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import {HTTP_PROVIDERS} from '@angular/http';
import {MdIconRegistry} from '@angular2-material/icon';
import {DmsRc0AppComponent, environment} from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(DmsRc0AppComponent,
  [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    AUTH_PROVIDERS,
    AuthService,
    ExternalLoginService,
    MdIconRegistry,
    FIREBASE_PROVIDERS,
    defaultFirebase('https://blazing-heat-6719.firebaseio.com')
  ]);
