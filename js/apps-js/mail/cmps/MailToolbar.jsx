const { Link } = ReactRouterDOM
export class MailToolbar extends React.Component {
    state = {
        width: window.innerWidth
    }
    handleResize = () => {
        this.setState({ width: window.innerWidth });
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    render() {
        const { onSetDisplay, unreadMails, currentDisplay } = this.props;
        const { width } = this.state;
        return (
            <section className="mail-toolbar">
                <Link to={`/mail/compose`}>
                    <button className={`compose-btn ${currentDisplay === 'compose' ? 'active' : ''}`} onClick={() => onSetDisplay('compose')}><img src="./img/add-sign.svg" />Compose</button>
                </Link>


                <nav className="toolbar-btns">
                    <Link to={`/mail/inbox`}>
                        <div className={`inbox-btn ${currentDisplay === 'inbox' ? 'active' : ''}`}
                            onClick={() => onSetDisplay('inbox')}>
                            <img src="./img/inbox.svg" />{width >= 660 && 'Inbox'}</div>
                    </Link>

                    <Link to={`/mail/starred`}>
                        <div className={`starred-btn ${currentDisplay === 'starred' ? 'active' : ''}`}
                            onClick={() => onSetDisplay('starred')}>
                            <img src="./img/star-full.svg" />{width >= 660 && 'Starred'} </div>
                    </Link>

                    <Link to={`/mail/sent`}>
                        <div className={`sent-btn ${currentDisplay === 'sent' ? 'active' : ''}`}
                            onClick={() => onSetDisplay('sent')}>
                            <img src="./img/sent.svg" />{width >= 660 && 'Sent'} </div>
                    </Link>

                    <Link to={`/mail/drafts `}>
                        <div className={`drafts-btn ${currentDisplay === 'drafts' ? 'active' : ''}`}
                            onClick={() => onSetDisplay('drafts')}>
                            <img src="./img/drafts.svg" /> {width >= 660 && 'Drafts'}</div>
                    </Link>

                    <Link to={`/mail/trash `}>
                        <div className={`trash-btn ${currentDisplay === 'trash' ? 'active' : ''}`}
                            onClick={() => onSetDisplay('trash')}>
                            <img src="./img/delete.svg" /> {width >= 660 && 'Trash'} </div>
                    </Link>

                </nav>
                {width > 660 && unreadMails ? <p className="unread-msg">Unread mails</p> : ''}
                <div className="unread-container">
                    <div className="unread-percent" style={{ width: `${unreadMails}%` }}>{unreadMails && width >= 660? unreadMails.toFixed(0) + '%' : ''}</div>
                </div>

            </section>

        );
    }
}
