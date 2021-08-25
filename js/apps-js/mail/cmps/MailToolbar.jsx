export class MailToolbar extends React.Component {

    render() {
        const { onSetDisplay } = this.props;
        return (
            <section className="mail-toolbar">
                <button className="compose-btn" onClick={() => onSetDisplay('compose')}><img src="./img/add-sign.svg"/>Compose</button>
                
                
                <nav className="toolbar-btns">

                <div className="inbox-btn"
                onClick={() => onSetDisplay('inbox')}>
                    <img src="./img/inbox.svg"/> Inbox</div>
                
                <div className="starred-btn"
                onClick={() => onSetDisplay('starred')}>
                    <img src="./img/star-full.svg"/> Starred</div>
                
                <div className="sent-btn"
                onClick={() => onSetDisplay('sent')}>
                   <img src="./img/sent.svg"/> Sent</div>
                
                <div className="drafts-btn"
                onClick={() => onSetDisplay('drafts')}>
                    <img src="./img/drafts.svg"/> Drafts</div>
                
                <div className="trash-btn"
                onClick={() => onSetDisplay('trash')}>
                   <img src="./img/delete.svg"/>  Trash</div>
                
                </nav>

            </section>

        );
    }
}
