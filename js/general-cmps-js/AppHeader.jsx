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
          <NavLink to="/book" onClick={this.openNavbar}>Books</NavLink>
          <NavLink to="/mail" onClick={this.openNavbar}>Mails</NavLink>
          <NavLink to="/note" onClick={this.openNavbar}>Notes</NavLink>
        </nav>}
        <img className={`navbar-toggle-btn ${isOpen && 'rotated'}`} onClick={this.openNavbar} src='./img/navbar.svg'/>
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)