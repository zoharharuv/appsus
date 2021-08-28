const { Link } = ReactRouterDOM
import { mailService } from "../services/mail.service.js"
import { LabelPicker } from './../../../general-cmps-js/LabelPicker.jsx';
export class MailDetails extends React.Component {
    state = {
        labels: this.props.mail.labels
    }
    componentDidMount() {
        this.setState({ labels: this.props.mail.labels })
    }

    onSetLabel = (label) => {
        mailService.setLabel(this.props.mail, label).then(res => {
            this.setState({ labels: res.labels })
        })
    }

    onRemoveLabel = (label) => {
        mailService.removeLabel(this.props.mail, label).then(res => {
            this.setState({ labels: res.labels })
        })
    }
    render() {
        const user = mailService.getLoggedinUser();
        const { mail, onStarMail, onUndelete, onDeleteMail, onReplyMail } = this.props;
        const { labels } = this.state;
        return (
            <article className="mail-details" >

                <div className="mail-info">
                    <button className="mail-reply-btn" onClick={() => onReplyMail(mail)} title="reply">
                        <img className="mail-reply" src="./img/reply.svg" />
                    </button>
                    <h3>
                        {mail.from !== user.email ? `From: ${mail.from}` : `To: ${mail.to}`}
                    </h3>
                    <h1>Subject: {mail.subject}</h1>
                    <p>{mail.body}</p>
                    {labels.length > 0 && <div className="printed-labels">
                        {labels.map((label, idx) => <span onClick={()=>this.onRemoveLabel(label)} className={`label label-${label}`} key={idx}>{label}</span>)}
                    </div>}
                    <p>Sent at: {mail.sentAt.toLocaleString()}</p>
                </div>

                <div className="mail-actions">
                    <button onClick={() => onStarMail(mail)} title="star">
                        <img className="mail-star" src={`./img/${mail.isStarred ? 'star-full' : 'star-empty'}.svg`} />
                    </button>
                    <button title="delete" onClick={() => onDeleteMail(mail)}><img src={`./img/${mail.isDeleted ? 'delete-perm' : 'delete'}.svg`} /></button>
                    {mail.isDeleted && <button title="un-delete" onClick={() => onUndelete(mail)}><img src="./img/undelete.svg" /></button>}
                    <LabelPicker onSetLabel={this.onSetLabel} />
                    <button title="make a note"><Link to={`/note/${mail.id}`}><img src="./img/note-nav.svg" /></Link></button>
                </div>
            </article>
        )
    }
}
