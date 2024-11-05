export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();
  if (!response.ok) {
    // if this is true its mean you got success response  :200/300 false:400/500
    throw new Error("Failed to fetch places"); // when you throw an error you crash the application  then, you should wrap code potetially throw an error with try catch
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  // as parameter we ecpect an array of places here
  const response = await fetch("http://localhost:3000/user-places", {
    // Configure the request
    method: "PUT", // Use PUT method here, becuase in defualt is get method but in backend and get is wrong method in here
    body: JSON.stringify({ places }), // Attach the places array as JSON, backend need JSON
    headers: {
      "Content-Type": "application/json", // Correctly set Content-Type header for JSON data
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user data");
  }
  return resData.message; // Return the message property from backend response
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();
  if (!response.ok) {
    // if this is true its mean you got success response  :200/300 false:400/500
    throw new Error("Failed to fetch user places"); // when you throw an error you crash the application  then, you should wrap code potetially throw an error with try catch
  }

  return resData.places;
}
