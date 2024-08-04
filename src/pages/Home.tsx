import { useEffect, useRef, useState } from "react";
import Filter from "../components/Filter";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { fetchCars } from "../../utils/fetchCars";
import { CarType } from "../types";
import Warning from "../components/Warning";
import Card from "../components/Card";
import ShowMore from "../components/ShowMore";
import { useSearchParams } from "react-router-dom";
import { fuels, years } from "../../utils/constants";

const Home = () => {

  const [cars, setCars] = useState<CarType[] | null>(null);

  // bu state sadece boolean değerler alabilir
  const [isError, setIsError] = useState<boolean>(false);

  // katalog divinin referansı
  const catalogRef = useRef<HTMLDivElement>(null);

  // urldeki paramlare erişme
  const [params] = useSearchParams();

  useEffect(() => {
    // urldeki bütün arama parametrelerinden nesene oluşturma
    const paramsObj = Object.fromEntries(params.entries());

    // fonksiyona parametreleri gönderme
    fetchCars(paramsObj)
      .then((data) => setCars(data))
      .catch(() => setIsError(true));
  }, [params]);

  return (
    <div className="mb-40">
      <Hero catalogRef={catalogRef} />

      <div ref={catalogRef} className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>

          <p>Discover cars you might like</p>

          <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <Filter options={fuels} name="fuel_type" />
              <Filter options={years} name="year" />
            </div>
          </div>
        </div>

        {/* Araba Listesi*/}
        {!cars ? (
          <Warning>Loading...</Warning>
        ) : isError ? (
          <Warning>Sorry, an error occurred while fetching the data.</Warning>
        ) : cars.length < 1 ? (
          <Warning>No vehicles matching the search criteria were found.</Warning>
        ) : (
          cars.length > 1 && (
            <section>
              <div className="home__cars-wrapper">
                {cars?.map((car, i) => (
                  <Card car={car} key={i} />
                ))}
              </div>

              <ShowMore />
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
