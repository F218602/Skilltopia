import { Injectable } from '@angular/core';
import { CellInfo } from './cell-info.interface';

@Injectable({
  providedIn: 'root'
})
export class CellInteractionService {
  public cellData : CellInfo | undefined;
  constructor() { }
}
