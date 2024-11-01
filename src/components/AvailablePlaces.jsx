import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import {fetchAvailablePlaces} from "../http.js"
export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  // when fetching data its commmon to have 3 state above the data state(availble places), the loading state (fetching), error state( use to show potetical erro)

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        //wrap try around the code might failed
        const places = await fetchAvailablePlaces()

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        // define the code here if an error in above counter, because again throw an error in above shit the whole application up
        // and of course handeling the rorr in React app means showing the error massage in the ui , so wee need another satte , error satet
        setError({ message: error.message || "could not fetch  places" });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);
  if (error) {
    return <Error title="An Error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching Place Data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
