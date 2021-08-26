const { Link } = ReactRouterDOM
import { eventBusService } from './../general-services-js/event-bus-service.js';

export class UserMsg extends React.Component {

  state = {
    msg: null
  }
  removeEventBus;
  timeoutId;

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(this.onCloseMsg, 2500)
      })
    })
  }

  componentWillUnmount() {
    this.removeEventBus()
  }



  onCloseMsg = () => {
    this.setState({ msg: null })
    clearTimeout(this.timeoutId)
  }


  render() {
    const { msg } = this.state
    if (!msg) return <React.Fragment />
    return (
      <section className={`user-msg ${msg.type || ''}`}>
        <h1>{msg.txt}</h1>
        {msg.bookId && <Link to={`book/${msg.bookId}`} onClick={this.onCloseMsg}>Check it Out</Link>}
        <button onClick={this.onCloseMsg}>X</button>
      </section>
    )
  }
}
