import React from 'react'

class NavBar extends React.Component {
  constructor() {
    super()

    this.state = {}

  }

  render() {
    return(
      <div>
        <div className="navbar is-dark">
          <div className="navbar-brand is-primary">
            <a className="navbar-item" href="#" onClick={this.props.goToHome}>
              <img src="../images/artistifylogo.png" width="40" height="28" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}


export default NavBar
