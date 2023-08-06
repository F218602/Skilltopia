// import { BuildingCommon } from './building-common';

// Base Building class
export abstract class Building implements BuildingCommon {
  abstract name: string;
  abstract cost: number;
  abstract requiredResources: string[];
  // Add other common properties and methods shared by all buildings

  constructor() {
    // Common logic for all buildings
  }
}

// Common properties for all buildings
export interface BuildingCommon {
    name: string;
    cost: number;
    requiredResources: string[];
  }

  // Specific Building classes
export class House extends Building {
    name = 'House';
    cost = 100;
    requiredResources = ['Wood', 'Stone'];
    // Add specific properties and methods for House building
  }
  
  export class Farm extends Building {
    name = 'Farm';
    cost = 150;
    requiredResources = ['Wood', 'Stone'];
    // Add specific properties and methods for Farm building
  }
  