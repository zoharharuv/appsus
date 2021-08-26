const { Link } = ReactRouterDOM
import { LongTxt } from './../../../general-cmps-js/LongTxt.jsx';

export class MailPreview extends React.Component {
    state = {
        subjectLength: window.innerWidth / 100,
        bodyLength: window.innerWidth / 20
    }
    render() {
        const { mail,
            onSelectMail,
            onToggleRead,
            onStarMail,
            onDeleteMail,
            onUndelete
        } = this.props
        const { subjectLength, bodyLength } = this.state;
        return (
            <article className="mail-preview">

                <button onClick={() => onStarMail(mail)}>
                    <img src={`./img/${mail.isStarred ? 'star-full' : 'star-empty'}.svg`} />
                </button>
                <Link to={`/mail/${mail.id}`}>
                    <div className="mail-preview-content" onClick={() => onSelectMail(mail)}>
                        <h2>{mail.to.split('@')[0]} </h2>
                        <h4><LongTxt text={mail.subject} maxLength={subjectLength} /></h4>
                        <p><LongTxt text={mail.body} maxLength={bodyLength} /></p>
                    </div>
                </Link>
                <div className="preview-action-btns">

                    <button onClick={() => onToggleRead(mail)}>
                        <img src={`./img/${mail.isRead ? 'read' : 'unread'}.svg`} />
                    </button>

                    {mail.isDeleted && <button onClick={() => onUndelete(mail)}><img src="./img/undelete.svg" /></button>}

                    <button onClick={() => onDeleteMail(mail)}>
                        <img src={`./img/${mail.isDeleted ? 'delete-perm' : 'delete'}.svg`} />
                    </button>
                </div>

            </article>

        );
    }
}
