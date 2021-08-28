const { Link } = ReactRouterDOM
import { LongTxt } from './../../../general-cmps-js/LongTxt.jsx';

export class MailPreview extends React.Component {
    state = {
        subjectLength: window.innerWidth / 100,
        bodyLength: window.innerWidth / 20,
        isHover: false
    }
    onHover = () => {
        this.setState({ isHover: true })
    }

    offHover = () => {
        this.setState({ isHover: false })
    }
    render() {
        const { mail,
            onSelectMail,
            onToggleRead,
            onStarMail,
            onDeleteMail,
            onUndelete
        } = this.props
        const { subjectLength, bodyLength, isHover } = this.state;
        return (
            <article className={`mail-preview ${mail.isRead ? 'read': ''}`} onMouseEnter={this.onHover} onMouseLeave={this.offHover}>

                <button title="star" onClick={() => onStarMail(mail)}>
                    <img className="mail-star" src={`./img/${mail.isStarred ? 'star-full' : 'star-empty'}.svg`} />
                </button>
                <Link to={`/mail/${mail.id}`} onClick={() => onSelectMail(mail)}>
                    <div className="mail-preview-content" >
                        {mail.from && <h2>{mail.from.split('@')[0]}</h2>}
                        {mail.subject && <h4><LongTxt text={mail.subject} maxLength={subjectLength} /></h4>}
                        {mail.body && <p><LongTxt text={mail.body} maxLength={bodyLength} /></p>}
                    </div>
                </Link>
                    {isHover && <div className="preview-action-btns">

                        <button title="toggle read mail" onClick={() => onToggleRead(mail)}>
                            <img src={`./img/${mail.isRead ? 'read' : 'unread'}.svg`} />
                        </button>

                        {mail.isDeleted && <button title="un-delete" onClick={() => onUndelete(mail)}><img src="./img/undelete.svg" /></button>}

                        <button onClick={() => onDeleteMail(mail)}>
                            <img title="delete" src={`./img/${mail.isDeleted ? 'delete-perm' : 'delete'}.svg`} />
                        </button>
                    </div>}

            </article>

        );
    }
}
