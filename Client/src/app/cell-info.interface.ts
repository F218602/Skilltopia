import { Building, Resource } from "./game-object.interface";

export interface CellInfo {
    row?: number;
    col?: number;
    image?: number;
    tile?: Building| Resource; // Optional property for the building on the cell
  }
  