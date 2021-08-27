import { utilService } from "../../../general-services-js/util.service.js"
export class AddTxt extends React.Component{
  state ={
    txt: ''
  }

  componentDidMount() {
    const {mailTxt} = this.props
    if (mailTxt) this.setState({txt: mailTxt},() => {
      const note =   {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
          txt: `${mailTxt}`
        },
        style: {
          
        }
      }
  
      this.props.funcs.onAdd(note)
    })
  }

  onAdd = (ev) => {
    ev.preventDefault()
    const {txt} = this.state

    const note =   {
      id: utilService.makeId(),
      type: "note-txt",
      isPinned: false,
      info: {
        txt: `${txt}`
      },
      style: {
        
      }
    }

    this.props.funcs.onAdd(note)
  }

  handleChange = (ev) => {
    this.setState({txt: ev.target.value})
  }


  render(){
    const {txt} = this.state
  return (
    <section >
      <form className='add-input-form' onSubmit={this.onAdd} action="">
      <input onChange={this.handleChange} value={txt} placeholder="Enter Note" type="text" />
      <button>+</button>
      </form>
    </section>
  );
}
}