export class MailToolbar extends React.Component {
    componentDidMount() {
    }

    render() {
        const { onSetDisplay } = this.props;
        return (
            <section className="mail-toolbar">
                <button className="compose-btn" onClick={() => onSetDisplay('compose')}>Compose</button>
                
                <nav className="toolbar-btns">

                <div className="inbox-btn"
                onClick={() => onSetDisplay('inbox')}>
                    Inbox</div>
                
                <div className="starred-btn"
                onClick={() => onSetDisplay('starred')}>
                    Starred</div>
                
                <div className="sent-btn"
                onClick={() => onSetDisplay('sent')}>
                    Sent</div>
                
                <div className="drafts-btn"
                onClick={() => onSetDisplay('drafts')}>
                    Drafts</div>
                
                <div className="trash-btn"
                onClick={() => onSetDisplay('trash')}>
                    Trash</div>
                
                </nav>

            </section>

        );
    }
}
