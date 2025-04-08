import { useQuery } from '@tanstack/react-query'
import axiosClient from '../client/axios'
import { Country, CountryDetail } from '../types'

export const useAllCountries = () => {
  return useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        '/all?fields=name,capital,region,population,cca3,flags'
      )
      return data
    },
  })
}

export const useCountryByCode = (code: string) => {
  return useQuery<CountryDetail>({
    queryKey: ['country', code],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `/alpha/${code}?fields=name,population,region,flags,borders,tld,currencies,subregion,languages,capital`
      )
      return data
    },
    enabled: !!code,
  })
}
