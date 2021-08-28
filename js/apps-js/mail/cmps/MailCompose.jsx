export class MailCompose extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: ''
        }
    }

    mailState
    interval

    componentDidMount() {
        // HANDLE NOTE DATA AND START SAVE MAIL STATE
        const { noteData, mailData } = this.props;
        if (mailData) this.handleMailData(mailData)
        noteData ? this.handleNoteData(noteData) : this.startInterval();
    }

    startInterval = () => {
        this.mailState = this.state.mail
        this.interval = setInterval(() => {
            this.mailState = this.state.mail
        }, 5000);
    }

    handleMailData = ({ from, subject }) => {
        const newMail = {
            to: from,
            subject: 'Re:' + subject,
            body: ''
        }
        this.setState({ mail: { ...newMail } }, this.startInterval)
    }

    handleNoteData = ({ type, info }) => {
        let subject = '';
        let body = '';
        // HANDLE BY TYPE
        if (type === 'note-txt') {
            body = info.txt;
        }
        if (type === 'note-img' || type === 'note-video') {
            subject = info.title;
            body = info.url;
        }
        if (type === 'note-todos') {
            subject = info.label;
            body = info.todos.map(todo => {
                return todo.txt;
            }).join(', ')
        }
        const newMail = {
            to: '',
            subject,
            body
        }
        this.setState({ mail: { ...newMail } }, this.startInterval)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        this.mailState = this.state.mail
        if (this.mailState.body) this.props.onSaveDraft(this.mailState)
        this.clearState()
    }
    
    clearState = () =>{
        const clearTemplate = {
            to: '',
            subject: '',
            body: ''
        }
        this.setState({ mail: { ...clearTemplate } }, this.props.clearCompose())
    }
    
    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ mail: { ...this.state.mail, [field]: value } });
    };
    
    onSend = (ev = null) => {
        if (!this.state.mail.to || !this.state.mail.to.includes('@') || !this.state.mail.subject || !this.state.mail.body) return;
        if (ev) ev.preventDefault();
        this.props.onSendMail(this.state.mail);
        this.clearState()
    };

    render() {
        const { to, subject, body } = this.state.mail
        return (
            <form className="mail-compose">
                <input
                    type="email"
                    name="to"
                    value={to}
                    placeholder="To who?"
                    onChange={this.handleChange}
                    required
                />

                <input
                    type="text"
                    name="subject"
                    value={subject}
                    placeholder="Enter subject"
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                />
                <textarea
                    name='body'
                    placeholder="Enter mail text here"
                    value={body}
                    rows="10"
                    minLength="1"
                    maxLength="420"
                    wrap="soft"
                    onChange={this.handleChange}
                    required
                >
                </textarea>

                <div className="mail-compose-btns">
                    <button className="compose-send-btn" onClick={this.onSend}>Send mail </button>
                </div>
            </form>

        );
    }
}
