const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {



  render() {
    return (
      <section className="app-header main-layout">
        <NavLink exact to="/" ><h1>Appsus</h1></NavLink>
        <nav className="nav-bar">
          <NavLink to="/book" onClick={this.openNavbar}><img className="nav-btn book-nav" src="img/book-nav.svg" /></NavLink>
          <NavLink to="/mail" onClick={this.openNavbar}><img className="nav-btn mail-nav" src="img/mail-nav.svg" /></NavLink>
          <NavLink to="/note" onClick={this.openNavbar}><img className="nav-btn note-nav" src="img/note-nav.svg" /></NavLink>
        </nav>
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)