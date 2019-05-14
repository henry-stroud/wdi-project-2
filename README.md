# WDI-Project 2
# General Assembly Project 2 :  Front-end application

## Goal: To create a Front-end application using React.js and an External API
### Timeframe
2.5 days

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS
* React.js
* External APIs
* GitHub

## My Project - Artistify

![Artistify](https://raw.githubusercontent.com/henry-stroud/wdi-project-2/master/img/artistify.png)

You can find a hosted version here ----> [artistifyapii.herokuapp.com](https://artistifyapii.herokuapp.com/)

### Overview
Artistify is an application that allows the user to sign in via Spotify OAuth through their Implicit Grant Authorization Flow, and in turn search for any Artist in the world. The search results will return that artist's Top Ten Tracks on Spotify (embedded and playable), their Nationality displayed on a map, their biography and also whether they are on tour or not.

Artistify was a pair project, and my second project at General Assembly's Web Development Immersive Course, built in 2.5 days.

### Brief
- **Build a React application** that consumes a **public API**.
- **Have several components** - At least one classical and one functional.
- **The app should include a router** - with several "pages".
- Have **semantically clean HTML**
- **Be deployed online** and accessible to the public.
- **Work in pairs**

### Process

We began the project by mapping out wireframes of exactly how we would like the site to look when finished. We settled on the idea of an application that would search any artist in the world, and return interactive data about them. We decided that the best API to use for this was Spotify's, as we imagined it would have all the data we would need for this. However, we quickly found that Spotify only returned song, album and artist data with no biography.

![screenshot - Artistify Search](https://github.com/henry-stroud/wdi-project-2/blob/master/img/artistify-search.png?raw=true)

We did some research into different music-based APIs online, and found Last FM, which was able to give us accurate biographical data on artists, as well as MusixMatch which gave data for artist nationality. We then had to use RestCountries' API to find the latitude and longitude of that country, and then decided to display that on a Mapbox map with a marker.

![screenshot - Sign in](https://github.com/henry-stroud/wdi-project-2/blob/master/img/spotify-login.png?raw=true)

Using axios to make API requests, as well promises, we chained together several API requests in an order that took the initial search from the user and parsed that data through each API to gather the correct result. We also had to encode the data into URL format, so the query could be read by the API request.

The below code demonstrates the chaining together of API calls through promises and various functions:

```

handleSubmit(e) {
  e.preventDefault()
  axios.get(`https://api.spotify.com/v1/search?q=${encodeURI(this.state.artistFullName)}&type=artist`, {
    headers: {
      Authorization: `Bearer ${this.state.apiKey}`
    }
  })
    .then(res => this.setState({ search: res.data, artistId: res.data.artists.items[0].id, artist: res.data.artists.items[0].name, pressed: '', hidden: 'hidden', disappear: 'disappear' }))
    .then(() => this.grabRecommendations())
    .then(() => this.grabTopTracks())
    .then(() => this.grabArtist())
    .then(() => this.grabArtistBio())
    .then(() => this.grabArtistNationality())

}

```

![screenshot - Spotify Login](https://github.com/henry-stroud/wdi-project-2/blob/master/img/sign-in.png?raw=true)

This data was then mapped out into each component, and reset after each new search by the user.

The order in which we went through the process ran from:

1. Project planning and ideas
2. Wireframes
3. Pseudo Code
4. Building the Webpack
5. Creating each unstyled component
6. Styling all components using Bulma classes
7. Animations via Animate.css

A lot of the work was done in pair-code as we only had limited time to complete the project. When our team was not together I researched and studied the APIs we were using, whilst my team mate focused on the design aspect of the site. We also coded using the Teletype feature on Atom.

### Challenges

One of the main challenges was allowing a user to login via Spotify. This was actually completed after the project had finished, as I became aware of a React plugin that allowed for Implicit Grant Authorization access. After some research online I managed to apply the component to our site, as well as setting the temporary API key in state to be used by the user and site. This meant that any user worldwide can login with their account and receive all the data they need.

We also went through some challenges with passing state down to child components. We figured out that it was much more convenient to hold the state in our main app.js file and then pass the props down from there rather than through unrelated components.

### Wins

One of the biggest wins was adding the Spotify login auth as stated above. Beforehand we were manually generating a key to be used every hour with the app, that was not sufficient for a public website. Another win was getting the correct data to display from lastFM as we had some trouble navigating their API data.

Another big win was getting the map to reset and re-load each time using previous props in the componentDidUpdate function, as we struggled with this initially.

The below code is a snippet of the map.

```
class Map extends React.Component {
  constructor() {
    super()
    this.markers = null
  }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.props.center,
      zoom: 2
    })
    this.setMarkers()
  }

  setMarkers(){
    this.marker =  new mapboxgl.Marker()
      .setLngLat(this.props.center)
      .addTo(this.map)
    return this.marker
  }

  componentDidUpdate(prev) {
    if(this.props.center !== prev.center) {
      this.map = new mapboxgl.Map({
        container: this.mapDiv,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: this.props.center,
        zoom: 2
      })
      this.setMarkers()
    }
  }


  render() {
    return(
      <div className="map" ref={el => this.mapDiv = el}>
      </div>
    )
  }
}
```

## Future features

At the moment the app is quite slow, due to the chaining of API calls. I think in order to make it faster I would do further research into an API that could provide all the data needed, rather than filtering through what ended up being four different APIs. If I had more time I would have liked to make the app more responsive on mobile.


## Key Takeaways

This was the first project I had done in a pair, and really showed me the value of team based cooperation in a sprint. I enjoyed the sharing of ideas, and especially pair-coding as having two minds working on the same problem helped enormously. I also learned that Public APIs are all  different and unique, and all need to be studied and researched thoroughly before implementing.
