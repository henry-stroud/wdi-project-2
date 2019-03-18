import React from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

console.log(process.env.MAPBOX_ACCESS_TOKEN)


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

export default Map
