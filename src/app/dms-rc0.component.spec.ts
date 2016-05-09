import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {DmsRc0AppComponent} from '../app/dms-rc0.component';

beforeEachProviders(() => [DmsRc0AppComponent]);

describe('App: DmsRc0', () => {
  it('should create the app',
     inject([DmsRc0AppComponent], (app: DmsRc0AppComponent) => { expect(app).toBeTruthy(); }));

  // it('should have as title \'dms-rc0 works!\'',
  //     inject([DmsRc0AppComponent], (app: DmsRc0AppComponent) => {
  //   expect(app.title).toEqual('dms-rc0 works!');
  // }));
});
