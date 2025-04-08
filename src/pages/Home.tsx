import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { useAllCountries } from '@/api/queries/countries'
import { SearchIcon, XIcon } from 'lucide-react'
import { HomeLoading } from '@/components/loading/HomeLoading'

export default function Home() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState<string>('')

  const { data: countries, isLoading, error } = useAllCountries()

  const filteredCountries = countries?.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase())
    const matchesRegion = region ? country.region === region : true
    return matchesSearch && matchesRegion
  }) ?? []

  if (isLoading) {
    return <HomeLoading />
  }

  if (error) {
    return <div className="container mx-auto py-8">Error loading countries</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for a country..."
            className="pl-9 md:pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Filter by Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Africa">Africa</SelectItem>
              <SelectItem value="Americas">Americas</SelectItem>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="Europe">Europe</SelectItem>
              <SelectItem value="Oceania">Oceania</SelectItem>
            </SelectContent>
          </Select>
          {region && (
            <XIcon className="size-5 text-destructive"
              onClick={() => setRegion('')}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-16 xl:gap-24">
        {filteredCountries.map((country) => (
          <Link key={country.cca3} to={`/country/${country.cca3}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow pt-0">
              <CardHeader className='p-0'>
                <img
                  src={country.flags.png}
                  alt={country.flags.alt || `Flag of ${country.name.common}`}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <h2 className="font-bold text-xl">{country.name.common}</h2>
                <div className="space-y-1">
                  <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                  <p><span className="font-semibold">Region:</span> {country.region}</p>
                  <p><span className="font-semibold">Capital:</span> {country.capital?.join(', ')}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 