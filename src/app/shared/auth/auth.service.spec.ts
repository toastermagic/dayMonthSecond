import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';

describe('Auth Service', () => {
  beforeEachProviders(() => [AuthService]);

  it('should ...',
     inject([AuthService], (service: AuthService) => { expect(service).toBeTruthy(); }));
});
