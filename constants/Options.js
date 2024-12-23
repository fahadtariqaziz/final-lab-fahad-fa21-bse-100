export const SelectTravellersList=[
    {
        id : 1,
        title : "Just Me",
        desc : "A sole traveller in exploration",
        icon : '',
        people : '1'

    },
    {
        id : 2,
        title : "A Couple",
        desc : "Two travellers in tandem",
        icon : '',
        people : '2 People'

    },
    {
        id : 3,
        title : "Family",
        desc : "A group of fun loving adventure",
        icon : '',
        people : '3 to 5 People'

    },
    {
        id : 4,
        title : "Friends",
        desc : "A bunch of thrill-seekes",
        icon : '',
        people : '5 to 10 People'

    },
]


export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: "Stay conscious of costs",
        icon : ''
    },
    {
        id:2,
        title: 'Moderate',
        desc: "Keep cost on the average",
        icon : ''
    },
    {
        id:3,
        title: 'Luxury',
        desc: "Dont worry about cost",
        icon : ''
    },
]

export const AI_PROMPT = "Generate Travel Plan for Location : {location}, for {totalDays} days and {totalNights} Nights for {traveler} with a {budget} budget with a filght details, Flight Prices with Booking url, Hotels options list with HotelName, Hotel address,Price, hotel image url, geo cooridnates, rating, descriptions and places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} day and {totalNights} night with each day plan with best time to visit in JSON format"