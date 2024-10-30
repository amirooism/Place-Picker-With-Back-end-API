import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

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
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();
        if (!response.ok) {
          // if this is true its mean you got success response  :200/300 false:400/500
          throw new Error("Failed to fetch places"); // when you throw an error you crash the application  then, you should wrap code potetially throw an error with try catch
        }
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
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
