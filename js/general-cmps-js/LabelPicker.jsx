export class LabelPicker extends React.Component {
  state = {
    isShown: false
  }

  showLabels = () => {
    this.setState({ isShown: !this.state.isShown })
  }

  addLabel = (label) => {
    this.props.onSetLabel(label)
  }
  render() {
    return (
      <section title="add labels" className='label-picker'>
        <span className="material-icons" onClick={this.showLabels}>label
          {this.state.isShown && <div className="labels">
            <button className="label-btn label-critical" onClick={()=>this.addLabel('critical')}>Critical</button>
            <button className="label-btn label-family" onClick={()=>this.addLabel('family')}>Family</button>
            <button className="label-btn label-work" onClick={()=>this.addLabel('work')}>Work</button>
            <button className="label-btn label-friends" onClick={()=>this.addLabel('friends')}>Friends</button>
            <button className="label-btn label-spam" onClick={()=>this.addLabel('spam')}>Spam</button>
            <button className="label-btn label-memories" onClick={()=>this.addLabel('memories')}>Memories</button>
            <button className="label-btn label-romantic" onClick={()=>this.addLabel('romantic')}>Romantic</button>
          </div>}
        </span>
      </section>
    )
  }
}