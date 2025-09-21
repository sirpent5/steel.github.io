// constants to use for api scraping :)

const SERVICES = 
{
  NETFLIX: { id: 203, name: "Netflix" },
  HULU: { id: 157, name: "Hulu" },
  DISNEY_PLUS: { id: 372, name: "Disney+" },
  AMAZON_ID: { id: 26, name: "AMAZON" },
  PEACOCK: { id: 388, name: "Peacock" },
  APPLE_TV: { id: 371, name: "AppleTV" },
  MAX: { id: 387, name: "Max" },
  TUBI: { id: 296, name: "Tubi"},
  PARAMOUNT: { id: 444, name: "Paramount"},
  FUBO: { id: 373, name: "Fubo"},
  CRUNCHYROLL: { id: 79, name: "Crunchyroll"},
};

const GENRES = 
{
  ACTION: {id: 1, name: "Action"},
  ADULT: {id: 30, name: "Adult"},
  ANIMATION: {id: 2, name: "Animation"},
  ANIME: {id: 33, name: "Anime"},
  BIOGRAPHY: {id: 31, name: "Biography"},
  COMEDY: {id: 4, name: "Comedy"},
  CRIME: {id: 5, name: "Crime"},
  DOCUMENTARY: {id: 6, name: "Documentary"},
  DRAMA: {id: 7, name: "Drama"},
  FAMILY: {id: 8, name: "Family"},
  FANTASY: {id: 9, name: "Fantasy"},
  FOOD: {id: 34, name: "Food"},
  GAMESHOW: {id: 28, name: "Game-Show"},
  HISTORY: {id: 10, name: "History"},
  HORROR: {id: 11, name: "Horror"},
  KIDS: {id: 21, name: "Kids"},
  MUSIC: {id: 12, name: "Music"},
  MUSICAL: {id: 32, name: "Musical"},
  MYSTERY: {id: 13, name: "Mystery"},
  NATURE: {id: 36, name: "Nature"},
  NEWS: {id: 22, name: "News"},
  REALITY: {id: 23, name: "Reality"},
  ROMANCE: {id: 14, name: "Romance"},
  SCIFIFANTASY: {id: 40, name: "Sci-Fi-Fantasy"},
  SCIFI: {id: 15, name: "Sci-Fi"},
  SOAP: {id: 25, name: "Soap"},
  SPORTS: {id: 29, name: "Sports"},
  SUPERNATURAL: {id: 37, name: "Supernatural"},
  TALK: {id: 26, name: "Talk"},
  THRILLER: {id: 17, name: "Thriller"},
  TRAVEL: {id: 35, name: "Travel"},
  TV: {id: 38, name: "TV"},
  WAR: {id: 18, name: "War"},
  WARPOLI: {id: 41, name: "War-Politics"},
  WESTERN: {id: 19, name: "Western"}
};



module.exports = {
  SERVICES,
  GENRES
};
