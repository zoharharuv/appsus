import { storageService } from './../../../general-services-js/storage.service.js';

export const googleService = {
    getGoogleBooks
}

function getGoogleBooks(data, cb) {
    const gBooks = storageService.loadFromStorage(`gBooks.${data}`);
    if(gBooks && gBooks.length) return Promise.resolve(gBooks);
    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${data}`)
        .then(res => {
            if(!res.data.items) return [];
            storageService.saveToStorage(`gBooks.${data}`, res.data.items)
            return res.data.items;
        })
        .catch(err => {
            throw new Error('Got error:', err)
        })
}
