const PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

// Step 1: Search for the city
async function searchCity(cityName) {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(cityName)}&type=locality&key=${PLACES_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== "OK") {
        throw new Error(`Error searching city: ${data.status}`);
    }
    return data.results[0];
}

// Step 2: Get city details
async function getCityDetails(placeId) {
    const fields = 'name,geometry,formatted_address,photos'
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${PLACES_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== "OK") {
        throw new Error(`Error fetching city details: ${data.status}`);
    }
    return data.result;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");

    if (!city) {
        return new Response(JSON.stringify({ error: "City name is required" }), { status: 400 });
    }

    try {
        const citySearch = await searchCity(city);
        const cityDetails = await getCityDetails(citySearch.place_id);
        const cityInfo = {
            name: cityDetails.name,
            location: cityDetails.geometry.location,
            address: cityDetails.formatted_address,
            photos: cityDetails.photos
                ? cityDetails.photos.map(photo => {
                      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${PLACES_API_KEY}`;
                  })
                : [],
        };
        return new Response(JSON.stringify(cityInfo), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

