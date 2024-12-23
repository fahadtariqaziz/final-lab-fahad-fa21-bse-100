const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
            role: "user",
            parts: [
              {text: "Generate Travel Plan for Location : Las Vegas, NV, USA, for 3 days and 2 Nights for A Couple with a Luxury budget with a filght details, Flight Prices with Booking url, Hotels options list with HotelName, Hotel address,Price, hotel image url, geo cooridnates, rating, descriptions and places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 day and 2 night with each day plan with best time to visit in JSON format"},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"tripDetails\": {\n    \"location\": \"Las Vegas, NV, USA\",\n    \"duration\": \"3 days, 2 nights\",\n    \"budget\": \"Luxury\",\n    \"travelers\": \"Couple\"\n  },\n  \"flights\": [\n    {\n      \"airline\": \"Airline Name\",\n      \"flightNumber\": \"Flight Number\",\n      \"departure\": \"Departure Airport & City\",\n      \"arrival\": \"Arrival Airport (LAS) & City\",\n      \"departureDate\": \"YYYY-MM-DD\",\n      \"returnDate\": \"YYYY-MM-DD\",\n      \"price\": \"$$$\", \n      \"bookingUrl\": \"Your Booking URL Here\" \n    }\n  ],\n  \"hotels\": [\n    {\n      \"hotelName\": \"The Bellagio\",\n      \"address\": \"3600 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$$$$\",\n      \"imageUrl\": \"Your Image URL Here\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1146,\n        \"longitude\": -115.1729\n      },\n      \"rating\": 4.5,\n      \"description\": \"Luxurious hotel on the Las Vegas Strip with stunning fountains.\",\n      \"nearbyPlaces\": [\n        {\n          \"placeName\": \"Bellagio Fountains\",\n          \"placeDetails\": \"Free water show with music\",\n          \"imageUrl\": \"Your Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1146,\n            \"longitude\": -115.1729\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"0 minutes\"\n        },\n        {\n          \"placeName\": \"Conservatory & Botanical Gardens\",\n          \"placeDetails\": \"Seasonal displays\",\n          \"imageUrl\": \"Your Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1146,\n            \"longitude\": -115.1729\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"5 minutes\"\n\n        }\n      ]\n    },\n    {\n      \"hotelName\": \"Wynn Las Vegas\",\n      \"address\": \"3131 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$$$$\",\n      \"imageUrl\": \"Your Image URL Here\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1215,\n        \"longitude\": -115.1726\n      },\n      \"rating\": 4.6,\n      \"description\": \"High-end hotel with elegant design and fine dining options.\",\n      \"nearbyPlaces\": [\n         {\n          \"placeName\": \"Lake of Dreams\",\n          \"placeDetails\": \"Spectacular water show and light displays\",\n          \"imageUrl\": \"Your Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1215,\n            \"longitude\": -115.1726\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"0 minutes\"\n        }\n      ]\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"morning\": \"Arrive in Las Vegas, check into hotel (e.g., The Bellagio), explore the hotel amenities.\",\n      \"afternoon\": \"Visit Bellagio Fountains and Conservatory & Botanical Gardens.\",\n      \"evening\": \"Fine dining at a high-end restaurant, show at a casino.\",\n    },\n    \"day2\": {\n      \"morning\": \"High Roller Observation Wheel\",\n      \"afternoon\": \"Pool time, shopping at the luxury boutiques on the Strip.\",\n      \"evening\": \"Explore a different casino, maybe catch a Cirque du Soleil show.\",\n    },\n    \"day3\": {\n      \"morning\": \"Visit the High Roller or another attraction you missed.\",\n      \"afternoon\": \"Relax by the pool, spa treatment.\",\n      \"evening\": \"Departure from Las Vegas.\"\n    }\n  }\n}\n```\n\nRemember to replace the placeholder values with actual data obtained from your preferred booking websites.  You can expand the itinerary and add more details as needed.  Also consider adding options for transportation (taxis, rideshares, etc.).  The pricing (\"$$$\", \"$$$$\") is a subjective representation; replace with actual price ranges.\n"},
            ],
          },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

  