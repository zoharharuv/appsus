import { storageService } from './../../../general-services-js/storage.service.js';
import { utilService } from './../../../general-services-js/util.service.js';

export const mailService = {
    query,
    getMailById,
    getNextMailId,
    getPrevMailId,
    composeMail,
    updateMailIsRead,
    deleteMail,
    starMail
}

// GLOBAL VARS
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
const KEY = 'mailsDB';
var gMails;

// RUNNING FUNCS
loadMails();

// FUNCS
function query(filterBy) {
    if (filterBy) {
        let mailsToShow;
        const { display, txt, lables, isRead } = filterBy;
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
                return mail.to !== loggedinUser.email
            })
        }
        if (display === 'starred') {
            mailsToShow = gMails.filter(mail => {
                return mail.isStarred === true
            })
        }
        if (display === 'drafts') {
            mailsToShow = gMails.filter(mail => {
                return mail.isDraft === true
            })
        }
        if (display !== 'trash') {
            let beforeFilter = mailsToShow.slice();
            mailsToShow = beforeFilter.filter(mail => {
                return mail.isDeleted === false
            })
        }
        if (display === 'trash') {
            mailsToShow = gMails.filter(mail => {
                return mail.isDeleted === true
            })
        }
        // TEXT
        if (txt) {
            let beforeFilter = mailsToShow.slice();
            mailsToShow = beforeFilter.filter(mail => {
                return mail.subject.toLowerCase().includes(txt.toLowerCase())
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
    if (!gMails) {
        gMails = [];
        _createMails();
        _saveMailsToStorage();
    }
}

function composeMail(mail, isDraft = false) {
    const id = utilService.makeId();
    const sentAt = Date.now();

    const newMail = {
        id,
        subject: mail.subject,
        body: mail.body,
        isRead: true,
        sentAt,
        to: mail.to,
        isStarred: false,
        isDraft,
        isDeleted: false,
    }
    gMails.push(newMail);
    _saveMailsToStorage();
    return Promise.resolve(newMail)
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
    gMails[mailIdx].isDeleted = true;
    return Promise.resolve(`Moved to trash!`)
}

function updateMailIsRead(mail) {
    mail.isRead = !mail.isRead;
    _saveMailsToStorage();
}
function starMail(mail) {
    mail.isStarred = !mail.isStarred;
    _saveMailsToStorage();
}

// PRIVATE FUNCS
function _createMails() {
    for (let i = 0; i < 5; i++) {
        const mail = _createMail();
        gMails.push(mail);
    }
}

function _createMail() {
    const id = utilService.makeId();
    const newMail = {
        id,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
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