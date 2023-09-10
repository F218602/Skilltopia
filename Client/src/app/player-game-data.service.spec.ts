import { TestBed } from '@angular/core/testing';

import { PlayerGameDataService } from './player-game-data.service';

describe('PlayerGameDataService', () => {
  let service: PlayerGameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerGameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
