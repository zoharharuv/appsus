import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailToolbar } from "../cmps/MailToolbar.jsx";
import { MailsList } from "../cmps/MailsList.jsx";
import { MailDetails } from "../cmps/MailDetails.jsx";
import { MailCompose } from "../cmps/MailCompose.jsx";
import { noteService } from "../../note/services/note.service.js";
import { mailService } from "../services/mail.service.js";
import { eventBusService } from './../../../general-services-js/event-bus-service.js';
import { Loader } from "../../../general-cmps-js/Loader.jsx";

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: {
            display: 'all',
            txt: '',
            lables: []
        },
        selectedMail: null,
        noteData: null,
        repliedMail: null,
        unreadMails: 0
    }
    initialFilter;

    componentDidMount() {
        this.initialFilter = this.state.filterBy;
        const noteId = this.props.match.params.noteId;
        const mailId = this.props.match.params.mailId;
        const id = mailId || noteId;
        this.checkHrefParams(id);
    }

    // CHECKS IF MAILID / INBOX,TRASH ETC
    checkHrefParams = (id) => {
        if (!id) {
            this.props.history.push('/mail')
            this.loadMails()
        } else {
            if (this.props.match.path.includes('compose')) {
                noteService.getNoteById(id)
                    .then(note => {
                        if (note) this.onComposeNote(note);
                    })
            }
            if (id === 'inbox'
                || id === 'sent'
                || id === 'drafts'
                || id === 'trash'
                || id === 'starred') {
                this.onSetDisplay(id)
            }
            else {
                mailService.getMailById(id)
                    .then(mail => {
                        if (mail) this.onSelectMail(mail, true);
                    })
            }
        }
    }

    // MAIN FUNC THAT LOADS MAILS
    loadMails = () => {
        mailService.query(this.state.filterBy)
            .then((mails) => {
                this.setState({ mails }, this.setUnreadMails());
            });
    };
    // SETS UNREAD COUNT
    setUnreadMails = () => {
        mailService.checkUnreads()
            .then(unreadMails => this.setState({ unreadMails }))
    }

    // SELECT MAIL FROM PREVIEWS
    onSelectMail = (selectedMail, isFromLink = false) => {
        isFromLink ? this.onToggleRead(selectedMail) : this.onReadMail(selectedMail);
        this.setState({ selectedMail }, () => {
            this.onSetDisplay('details')
        })
    }

    onComposeNote = (noteData) => {
        this.setState({ noteData }, () => {
            this.onSetDisplay('compose')
        })
    }
    // DETAILS BUTTONS
    onReplyMail = (repliedMail) => {
        this.setState({ repliedMail }, () => {
            this.onSetDisplay('compose')
        })
    }

    // PREVIEW BUTTONS
    onReadMail = (selectedMail) => {
        mailService.readMail(selectedMail);
        this.loadMails()
    }
    onToggleRead = (selectedMail) => {
        mailService.toggleReadMail(selectedMail);
        this.loadMails()
    }
    onStarMail = (selectedMail) => {
        mailService.starMail(selectedMail);
        this.loadMails()
    }

    onDeleteMail = (selectedMail) => {
        mailService.deleteMail(selectedMail.id)
            .then(txt => eventBusService.emit('user-msg', { txt, type: 'success' }, this.loadMails()))
    }
    onUndelete = (selectedMail) => {
        mailService.undeleteMail(selectedMail);
        this.state.filterBy.display === 'details' ? this.onSetDisplay('all') : this.loadMails();
    }

    // SET THE DISPLAY: ALL/INBOX/SEND..
    onSetDisplay = (val) => {
        this.setState({ filterBy: this.initialFilter }, () => {
            this.setState({ filterBy: { ...this.state.filterBy, display: val }, }, () => {
                this.loadMails();
            });
        })
    }
    // HANDLE SEARCH BAR INPUT
    onSearch = (val) => {
        if (this.state.filterBy.display !== 'all') this.onSetDisplay('all')
        this.setState({ filterBy: { ...this.state.filterBy, txt: val }, }, () => {
            this.loadMails();
        });
    }
    // SEND MAIL
    onSendMail = (mail) => {
        mailService.composeMail(mail)
            .then((txt) => {
                eventBusService.emit('user-msg', { txt, type: 'success' })
                this.onSetDisplay('sent')
            })
    }
    // SAVE TO DRAFTS
    onSaveDraft = (mail) => {
        mailService.composeMail(mail, true)
            .then((txt) => {
                eventBusService.emit('user-msg', { txt, type: 'success' })
                this.onSetDisplay('drafts')
            })
    }
    clearCompose = () => {
        this.setState({repliedMail: null, noteData: null})
    }
    // REFRESH THE FILTER
    onRefresh = () => {
        this.setState({ filterBy: this.initialFilter }, () => {
            this.loadMails();
        });
    }



    render() {
        const { mails, filterBy, selectedMail, unreadMails, noteData, repliedMail } = this.state;
        if (!mails && !filterBy && !selectedMail) return <Loader />
        return (
            <section className="mail-app" >
                <MailFilter onSearch={this.onSearch}
                    onSetDisplay={this.onSetDisplay}
                    currDisplay={filterBy.display}
                    onRefresh={this.onRefresh} />

                <MailToolbar onSetDisplay={this.onSetDisplay} unreadMails={unreadMails} currentDisplay={filterBy.display} />

                {/* NO MAILS */}
                {mails.length <= 0 && filterBy.display !== 'compose' && filterBy.display !== 'details' &&
                    <h2 className="no-mails">No mails were found!</h2>}

                {/* MAILS LIST */}
                {
                    mails.length > 0 && filterBy.display !== 'compose' && filterBy.display !== 'details' &&
                    <MailsList mails={mails}
                        onSelectMail={this.onSelectMail}
                        onToggleRead={this.onToggleRead}
                        onStarMail={this.onStarMail}
                        onDeleteMail={this.onDeleteMail}
                        onUndelete={this.onUndelete} />
                }

                {/* SELECTED MAIL DETAILS */}
                {
                    filterBy.display === 'details' && selectedMail &&
                    <MailDetails
                        mail={selectedMail}
                        onStarMail={this.onStarMail}
                        onDeleteMail={this.onDeleteMail}
                        onUndelete={this.onUndelete}
                        onReplyMail={this.onReplyMail} />
                }

                {/* COMPOSE NEW MAIL */}
                {
                    filterBy.display === 'compose' &&
                    <MailCompose
                        onSaveDraft={this.onSaveDraft}
                        onSendMail={this.onSendMail}
                        noteData={noteData}
                        mailData={repliedMail} 
                        clearCompose={this.clearCompose}/>
                }

            </section >

        );
    }
}
