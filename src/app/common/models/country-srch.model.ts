export interface CountrySrchResult {
  flags:      Flags;
  name:       Name;
  capital:    string[];
  region:     string;
  population: number;
  cca2:       string;
}

export interface Flags {
  png: string;
  svg: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  aym: Aym;
  que: Aym;
  spa: Aym;
}

export interface Aym {
  official: string;
  common:   string;
}
