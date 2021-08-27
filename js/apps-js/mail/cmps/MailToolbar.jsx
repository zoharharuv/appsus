const { Link } = ReactRouterDOM
export class MailToolbar extends React.Component {
    state = {
        width: window.innerWidth
    }
    handleResize = () => {
        this.setState({ width: window.innerWidth });
    }
    componentDidMount() {
        console.log(window.innerWidth);
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    render() {
        const { onSetDisplay, unreadMails } = this.props;
        const { width } = this.state;
        return (
            <section className="mail-toolbar">
                <Link to={`/mail/compose`}>
                    <button className="compose-btn" onClick={() => onSetDisplay('compose')}><img src="./img/add-sign.svg" />Compose</button>
                </Link>


                <nav className="toolbar-btns">
                    <Link to={`/mail/inbox`}>
                        <div className="inbox-btn"
                            onClick={() => onSetDisplay('inbox')}>
                            <img src="./img/inbox.svg" />{width >= 660 && 'Inbox'}</div>
                    </Link>

                    <Link to={`/mail/starred`}>
                        <div className="starred-btn"
                            onClick={() => onSetDisplay('starred')}>
                            <img src="./img/star-full.svg" />{width >= 660 && 'Starred'} </div>
                    </Link>

                    <Link to={`/mail/sent`}>
                        <div className="sent-btn"
                            onClick={() => onSetDisplay('sent')}>
                            <img src="./img/sent.svg" />{width >= 660 && 'Sent'} </div>
                    </Link>

                    <Link to={`/mail/drafts`}>
                        <div className="drafts-btn"
                            onClick={() => onSetDisplay('drafts')}>
                            <img src="./img/drafts.svg" /> {width >= 660 && 'Drafts'}</div>
                    </Link>

                    <Link to={`/mail/trash`}>
                        <div className="trash-btn"
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
