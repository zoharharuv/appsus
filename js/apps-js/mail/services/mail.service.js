import { storageService } from './../../../general-services-js/storage.service.js';
import { utilService } from './../../../general-services-js/util.service.js';

export const mailService = {
    query,
    deleteMail,
    getMailById,
    getNextMailId,
    getPrevMailId,
    composeMail
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
        const { display, txt, lables } = filterBy;
        if (display === 'all'
            || display === 'details'
            || display === 'compose')
            return Promise.resolve(gMails);

        if (display !== 'all') {
            console.log('display');
        }
        if (txt) {
            console.log('txt');
        }
        if (lables && lables.length) {
            console.log('labels');
        }

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

function deleteMail(mailId) {
    var mailIdx = gMails.findIndex(function (mail) {
        return mailId === mail.id;
    })
    gMails.splice(mailIdx, 1);
    _saveMailsToStorage();
    return Promise.resolve(`Deleted ${mailId}`)
}

function loadMails() {
    gMails = storageService.loadFromStorage(KEY);
    if (!gMails) {
        gMails = [];
        _createMails();
        _saveMailsToStorage();
    }
}

function composeMail(mail) {
    const id = utilService.makeId();
    const newMail = {
        id,
        subject: mail.subject,
        body: mail.body,
        isRead: mail.isRead,
        sentAt: mail.sentAt,
        to: mail.to
    }
    gMails.push(newMail)
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
        to: 'momo@momo.com'
    }
    return newMail;
}

function _saveMailsToStorage() {
    storageService.saveToStorage(KEY, gMails);
}