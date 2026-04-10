import { TestBed } from '@angular/core/testing';

import { Comic } from './comic';

describe('Comic', () => {
  let service: Comic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
