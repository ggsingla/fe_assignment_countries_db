import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useCountryByCode, useAllCountries } from '@/api/queries/countries'
import { CountryDetailLoading } from '@/components/loading/CountryDetailLoading'
import { ArrowLeftIcon } from 'lucide-react'
export default function CountryDetail() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const { data: country, isLoading, error } = useCountryByCode(code ?? '')
  const { data: allCountries } = useAllCountries()

  if (isLoading) {
    return <CountryDetailLoading />
  }

  if (error || !country) {
    return (
      <div className="container mx-auto py-8">
        <h1>Country not found</h1>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    )
  }

  const getBorderCountryName = (code: string) => {
    return allCountries?.find(c => c.cca3 === code)?.name.common ?? code
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Button onClick={() => navigate(-1)} variant='secondary' className="space-x-2" size='lg'>
        <ArrowLeftIcon className="size-4" />
        <span>Back</span>
      </Button>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full shadow-md"
        />

        <div className="space-y-8">
          <h1 className="text-3xl font-bold">{country.name.common}</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name: </span>
                {Object.values(country.name.nativeName)[0]?.common}
              </p>
              <p>
                <span className="font-semibold">Population: </span>
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region: </span>
                {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region: </span>
                {country.subregion || 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Capital: </span>
                {country.capital?.join(', ')}
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain: </span>
                {country.tld.join(', ')}
              </p>
              <p>
                <span className="font-semibold">Currencies: </span>
                {Object.values(country.currencies)
                  .map(currency => currency.name)
                  .join(', ')}
              </p>
              <p>
                <span className="font-semibold">Languages: </span>
                {Object.values(country.languages).join(', ')}
              </p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {country.borders.map(border => (
                  <Link key={border} to={`/country/${border}`}>
                    <Button variant="outline" size="sm">
                      {getBorderCountryName(border)}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p className='text-muted-foreground italic'>No border countries</p>
          )}
        </div>
      </div>
    </div>
  )
} 