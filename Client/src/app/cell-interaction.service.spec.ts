import { TestBed } from '@angular/core/testing';

import { CellInteractionService } from './cell-interaction.service';

describe('CellInteractionService', () => {
  let service: CellInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
