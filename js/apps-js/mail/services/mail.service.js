import { storageService } from './../../../general-services-js/storage.service.js';
import { utilService } from './../../../general-services-js/util.service.js';

export const mailService = {
    query,
    getMailById,
    getNextMailId,
    getPrevMailId,
    composeMail,
    deleteMail,
    undeleteMail,
    starMail,
    checkUnreads,
    readMail,
    toggleReadMail,
    getLoggedinUser
}


// GLOBAL VARS
const rndMails = ['jemarch@icloud.com', ' wildixon@live.com', ' ournews@att.net',
    'heckerman@yahoo.ca', 'koudas@aol.com', 'brainless@yahoo.com',
    'mbalazin@me.com', ' hager@verizon.net', 'rupak@mac.com',
    'amimojo@live.com', ' smeier@att.net', 'pmint@optonline.net']

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
const KEY = 'mailsDB';
var gMails;

// RUNNING FUNCS
loadMails();

// FUNCS
function getLoggedinUser(){
    return loggedinUser;
}
function query(filterBy) {
    if (!gMails || !gMails.length) loadMails()
    if (filterBy) {
        let mailsToShow;
        const { display, txt, lables } = filterBy;
        if (display === 'details' || display === 'compose')
            return Promise.resolve([]);
        // DISPLAY
        if (display === 'all') {
            mailsToShow = gMails.slice();
        }
        if (display === 'inbox') {
            mailsToShow = gMails.filter(mail => {
                return mail.to === loggedinUser.email
            })
        }
        if (display === 'sent') {
            mailsToShow = gMails.filter(mail => {
                return (mail.to !== loggedinUser.email && !mail.isDraft)
            })
        }
        if (display === 'starred') {
            mailsToShow = gMails.filter(mail => {
                return mail.isStarred
            })
        }
        if (display === 'drafts') {
            mailsToShow = gMails.filter(mail => {
                return mail.isDraft
            })
        }
        if (display === 'unread') {
            mailsToShow = gMails.filter(mail => {
                return !mail.isRead
            })
        }
        if (display === 'read') {
            mailsToShow = gMails.filter(mail => {
                return mail.isRead
            })
        }
        if (display !== 'trash') {
            let beforeFilter = mailsToShow.slice();
            mailsToShow = beforeFilter.filter(mail => {
                return !mail.isDeleted
            })
        }
        if (display === 'trash') {
            mailsToShow = gMails.filter(mail => {
                return mail.isDeleted
            })
        }

        // TEXT
        if (txt) {
            let beforeFilter = mailsToShow.slice();
            mailsToShow = beforeFilter.filter(mail => {
                return (
                    mail.subject && mail.subject.toLowerCase().includes(txt.toLowerCase())
                    || mail.from && mail.from.toLowerCase().includes(txt.toLowerCase())
                    || mail.to && mail.to.toLowerCase().includes(txt.toLowerCase())
                    || mail.body && mail.body.toLowerCase().includes(txt.toLowerCase())
                )
            })
        }
        // LABELS
        if (lables && lables.length) {
            console.log('labels');
        }
        if (!mailsToShow.length) mailsToShow = [];
        return Promise.resolve(mailsToShow);
    }
    return Promise.resolve(gMails);
}

function getMailById(mailId) {
    var mail = gMails.find(mail => {
        return mailId === mail.id;
    })
    return Promise.resolve(mail);
}

function getNextMailId(mailId) {
    const mailIdx = gMails.findIndex(mail => mail.id === mailId);
    let nextMailIdx = mailIdx + 1;
    if (nextMailIdx === gMails.length) nextMailIdx = 0;
    return gMails[nextMailIdx].id;
}

function getPrevMailId(mailId) {
    const mailIdx = gMails.findIndex(mail => mail.id === mailId);
    let prevMailIdx = mailIdx - 1;
    if (prevMailIdx < 0) prevMailIdx = gMails.length - 1;
    return gMails[prevMailIdx].id;
}


function loadMails() {
    gMails = storageService.loadFromStorage(KEY);
    if (!gMails || !gMails.length) {
        gMails = [];
        _createMails();
        _saveMailsToStorage();
    }
}

function composeMail(mail, isDraft = false) {
    const id = utilService.makeId();
    const sentAt = new Date(Date.now()).toLocaleString();
    const newMail = {
        id,
        subject: mail.subject,
        body: mail.body,
        isRead: true,
        sentAt,
        from: loggedinUser.email,
        to: mail.to,
        isStarred: false,
        isDraft,
        isDeleted: false,
    }
    gMails.push(newMail);
    _saveMailsToStorage();
    return Promise.resolve(isDraft ? 'Saved to Drafts!' : 'Mail was sent!')
}

// PREVIEW BUTTONS
function deleteMail(mailId) {
    var mailIdx = gMails.findIndex(function (mail) {
        return mailId === mail.id;
    })
    if (gMails[mailIdx].isDeleted) {
        gMails.splice(mailIdx, 1);
        _saveMailsToStorage();
        return Promise.resolve(`Deleted Forever`)
    }
    gMails[mailIdx].isRead = true;
    gMails[mailIdx].isDeleted = true;
    _saveMailsToStorage();
    return Promise.resolve(`Moved to trash!`)
}

function undeleteMail(mail) {
    mail.isDeleted = false;
    _saveMailsToStorage();
}

function readMail(mail) {
    mail.isRead = true;
    _saveMailsToStorage();
}

function toggleReadMail(mail) {
    mail.isRead = !mail.isRead;
    _saveMailsToStorage();
}
function starMail(mail) {
    mail.isStarred = !mail.isStarred;
    _saveMailsToStorage();
}

function checkUnreads() {
    var count = 0;
    gMails.forEach(mail => !mail.isRead ? count++ : '')
    return Promise.resolve((count / gMails.length) * 100);
}

// PRIVATE FUNCS
function _createMails() {
    for (let i = 0; i < 12; i++) {
        let mail = _createMail(i);
        gMails.push(mail);
    }
}

function _createMail(idx) {
    const id = utilService.makeId();
    const subject = utilService.makeLorem(2);
    const body = utilService.makeLorem(30);
    const sentAt = new Date(Date.now()).toLocaleString();
    const from = rndMails[idx]
    const newMail = {
        id,
        subject,
        body,
        isRead: false,
        sentAt,
        from,
        to: loggedinUser.email,
        isStarred: false,
        isDraft: false,
        isDeleted: false,
    }
    return newMail;
}

function _saveMailsToStorage() {
    storageService.saveToStorage(KEY, gMails);
}