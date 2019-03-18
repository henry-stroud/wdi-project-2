import React from 'react'

const TopTracks = ({id}) => {
  return (
    <div className= "embed">
      <iframe className= "embed" src={`https://open.spotify.com/embed/track/${id}`} width="300" height="80" frameBorder="0" allow="encrypted-media"></iframe>
    </div>
  )
}

export default TopTracks
