import React from 'react'

import {Animated} from 'react-animated-css'

class Home extends React.Component {
  constructor() {
    super()

    this.state = { }

  }


  // componentDidUpdate(prev) {
  //   if(this.props.pressed !== prev.pressed) {
  //
  //   }
  //   return null
  // }


  render() {
    return(
      <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
        <section id={`${this.props.disappear}`} className={`hero is-primary ${this.props.pressed}`}>
          <div className="hero-body">
            <div className="container">
              <h1 className={`title ${this.props.hidden}`}>
              Search by Artist
              </h1>
              <h2 className={`subtitle ${this.props.hidden}`}>
            Get top songs & artist info for any artist in the world!
              </h2>
              <form onSubmit={this.props.handleSubmit}>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input onChange={this.props.handleChange} className="input" type="text" placeholder="Search..." value={this.props.artistFullName || ''}/>
                  </div>
                  <div className="control">
                    <button className="button is-info">
                  Go!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Animated>
    )
  }
}


export default Home
