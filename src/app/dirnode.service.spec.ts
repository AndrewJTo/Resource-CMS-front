import { TestBed } from '@angular/core/testing';

import { DirnodeService } from './dirnode.service';

describe('DirnodeService', () => {
  let service: DirnodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirnodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
