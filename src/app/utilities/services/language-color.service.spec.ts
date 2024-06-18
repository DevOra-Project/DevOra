import { TestBed } from '@angular/core/testing';

import { LanguageColorService } from './language-color.service';

describe('LanguageColorService', () => {
  let service: LanguageColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
