import { eventBusService } from '../general-services-js/event-bus-service.js'
const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  // state = {
  // }



  render() {

    return (
      <section className="app-header main-layout">
        <h1 onClick={() => this.props.history.goBack()}>Appsus</h1>
        <nav>
          <NavLink exact to="/" >Home</NavLink>
          <NavLink to="/about" >About</NavLink>
          <NavLink to="/book" >Books</NavLink>
        </nav>
      </section>
    )
  }

}
export const AppHeader = withRouter(_AppHeader)