export interface Country {
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  population: number
  region: string
  capital: string[]
  cca3: string
  flags: {
    png: string
    svg: string
    alt: string
  }
}

export interface CountryDetail extends Country {
  subregion: string
  tld: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  languages: {
    [key: string]: string
  }
  borders: string[]
}
