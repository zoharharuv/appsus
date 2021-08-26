const { Link } = ReactRouterDOM
export class MailToolbar extends React.Component {

    render() {
        const { onSetDisplay, unreadMails } = this.props;
        return (
            <section className="mail-toolbar">
                <Link to={`/mail/compose`}>
                    <button className="compose-btn" onClick={() => onSetDisplay('compose')}><img src="./img/add-sign.svg" />Compose</button>
                </Link>


                <nav className="toolbar-btns">
                    <Link to={`/mail/inbox`}>
                        <div className="inbox-btn"
                            onClick={() => onSetDisplay('inbox')}>
                            <img src="./img/inbox.svg" /> Inbox</div>
                    </Link>

                    <Link to={`/mail/starred`}>
                        <div className="starred-btn"
                            onClick={() => onSetDisplay('starred')}>
                            <img src="./img/star-full.svg" /> Starred</div>
                    </Link>

                    <Link to={`/mail/sent`}>
                        <div className="sent-btn"
                            onClick={() => onSetDisplay('sent')}>
                            <img src="./img/sent.svg" /> Sent</div>
                    </Link>

                    <Link to={`/mail/drafts`}>
                        <div className="drafts-btn"
                            onClick={() => onSetDisplay('drafts')}>
                            <img src="./img/drafts.svg" /> Drafts</div>
                    </Link>

                    <Link to={`/mail/trash`}>
                        <div className="trash-btn"
                            onClick={() => onSetDisplay('trash')}>
                            <img src="./img/delete.svg" />  Trash</div>
                    </Link>

                </nav>
                <p>Unread mails: {unreadMails}</p>

            </section>

        );
    }
}
