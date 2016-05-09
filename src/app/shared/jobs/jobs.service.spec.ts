import {beforeEachProviders, it, describe, expect, inject} from '@angular/core/testing';
import {JobsService} from './jobs.service';

describe('Auth Service', () => {
  beforeEachProviders(() => [JobsService]);

  it('should ...',
     inject([JobsService], (service: JobsService) => { expect(service).toBeTruthy(); }));
});
