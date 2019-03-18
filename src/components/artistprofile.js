import React from 'react'

import Map from './map'
import TopTracks from './toptracks'

import {Animated} from 'react-animated-css'

class ArtistProfile extends React.Component {
  constructor() {
    super()

    this.state = {

    }

  }

  render() {
    return(
      <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
        <div className="columns black">
          <div className="column is-one-third">
            <h1 className="title top-tunes whiteText">
            Top Tracks
            </h1>
            {this.props.topTracks &&
            <div>
              {this.props.topTracks.slice(0,5).map((track, i) => <TopTracks key={i} {...track} />)}
            </div>
            }
          </div>
          <div className="column is-two-thirds">
            <h1 className="title whiteText">
              {this.props.artist}
            </h1>
            <div className="columns">
              <div className="column">
                {this.props.mapCenter &&
                  <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                    <Map
                      center={this.props.mapCenter}
                    />
                  </Animated>
                }
                <br />
                <h5><b>On Tour:</b> {this.props.ontourboolean}</h5>
                <h5><b>Genre:</b> {this.props.genre} </h5>
              </div>
              <div className="column">
                <h4 className="h4">{this.props.newBio}</h4>
              </div>
            </div>
          </div>
        </div>
      </Animated>
    )
  }
}


export default ArtistProfile
