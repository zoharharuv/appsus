import { utilService } from "../../../general-services-js/util.service.js"

export class AddImg extends React.Component{
  state ={
    label: '',
    url: ''
  }

  handleChange = (ev) => {
    const field = ev.target.name
    this.setState({[field]: ev.target.value})
  }

  onAdd = () => {
    const {label,url} = this.state

    const note =    {
      id: utilService.makeId(),
      type: "note-img",
      labels: [],
      info: {
        url: `${url}`,
        title: `${label}`
      },
      style: {
       
      }
    } 

    this.props.funcs.onAdd(note)
  }

  render(){
    const {label,url} = this.state
    return <section  className='add-actions-section'>
      <section className="add-inputs-section">
    <input name='label' onChange={this.handleChange} value={label} placeholder="Img Label" type="text" />
    <input name='url' onChange={this.handleChange} value={url} placeholder="Img Url" type="text" />
    </section>
    <section className="add-button-section">
    <button  onClick={this.onAdd}>+</button>
    </section>
  </section>
  }
    
}
