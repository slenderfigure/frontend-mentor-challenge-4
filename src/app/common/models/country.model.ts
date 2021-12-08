import { Flags } from "./country-srch.model";

export interface Country {
  name:         Name; 
  tld:          string[]; 
  borders:      string[] | any[];
  currencies:   Currencies; 
  capital:      string[]; 
  flags:        Flags;
  region:       string; 
  population:   number;
  subregion:    string; 
  languages:    Languages;
}

export interface Border {
  name: string;
  cca2: string;
}

export interface Currencies {
  [ key: string ]: {
    name:   string;
    symbol: string;
  };
}

export interface Languages {
  [ key: string ]: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  [ key: string ]: Translation;
}

export interface Translation {
  official: string;
  common:   string;
}
