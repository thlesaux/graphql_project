const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
    articles:store.collection('articles'),
    langues:store.collection('langues'),
    pays:store.collection('pays'),
    sources:store.collection('sources'),
    sources_scrap:store.collection('sources_scrap'),
    themes:store.collection('themes')
};