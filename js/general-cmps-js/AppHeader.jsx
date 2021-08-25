import { eventBusService } from '../general-services-js/event-bus-service.js'
const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  state = {
    isOpen: false
  }

  openNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }


  render() {
    const { isOpen } = this.state;
    return (
      <section className="app-header main-layout">
        <NavLink exact to="/" ><h1>Appsus</h1></NavLink>
        {isOpen && <nav className="nav-bar">
          <NavLink to="/about" onClick={this.openNavbar}>About</NavLink>
          <NavLink to="/book" onClick={this.openNavbar}>Books</NavLink>
        </nav>}
        <button className={`navbar-toggle-btn ${isOpen && 'rotated'}`} onClick={this.openNavbar}>☰</button>
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)