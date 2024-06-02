import { TestBed } from '@angular/core/testing';

import { ActiveComponentsService } from './active-components.service';

describe('ActiveComponentsService', () => {
  let service: ActiveComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
