import { EnergySource } from "./sources";
import { EnergyUnit, VolumeUnit, WeightUnit } from "./units";
import { GreenHouseGas } from "./ghg";
import { FactorType } from "./factors";

export enum StationaryActivity {
  SOLID = "Solid",
  GAS = "Gas",
  LIQUID = "Liquid",
}

export enum MobileActivity {
  AIR = "Air",
  ROAD = "Road",
  TRAIN = "Train",
  SEA = "Sea",
}

export enum WasteActivity {
  SOLID_LANDFILL = "SolidLandfill",
  SOLID_BIOLOGICAL = "SolidBiological",
  INCINERATION = "Incineration",
  SEWAGE = "Sewage",
  WASTEWATER = "Wastewater",
}

export enum ProcessActivity {
  MINERAL_INDUSTRY = "MineralIndustry",
  PETROLEUM_REFINING = "PetroleumRefining",
  CHEMICAL_INDUSTRY = "ChemicalIndustry",
  METAL_INDUSTRY = "MetalIndustry",
  ELECTRONICS = "ElectronicsIndustry",
  OTHERS = "OtherProcesses",
}

export enum EmissionScope {
  SCOPE_1 = "Scope1",
  SCOPE_2 = "Scope2",
  SCOPE_3 = "Scope3",
}

// Interfaces for complex types
export interface Scope1EmissionSource {
  stationary: StationaryActivity;
  mobile: MobileActivity;
  wastes: WasteActivity;
  fugitive: ProcessActivity;
  process: ProcessActivity;
}

export interface Scope2EmissionSource {
  indirect: EnergySource;
}

export interface EmissionActivity {
  scope: EmissionScope;
  source: Scope1EmissionSource | Scope2EmissionSource;
  unit: EnergyUnit | VolumeUnit | WeightUnit;
  ghg: GreenHouseGas;
  factor: FactorType;
}
