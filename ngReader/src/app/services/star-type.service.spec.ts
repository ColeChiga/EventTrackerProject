import { TestBed } from '@angular/core/testing';

import { StarTypeService } from './star-type.service';

describe('StarTypeService', () => {
  let service: StarTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
