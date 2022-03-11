const db = require('./db')

const Query = {
    articles: () => db.articles.list(),
    langues: () => db.langues.list(),
    pays: () => db.pays.list(),
    sources: () => db.sources.list(),
    sources_scrap: () => db.sources_scrap.list(),
    themes: () => db.themes.list(),
}

const Article = {
    source_scrap: (root) => {
        return db.sources_scrap.list().find(function (item) {
            return item.token === root.token_source_scrap
        })
    }
}

const Langue = {
    themesParLangue: (root) => {
        return db.themes.list().filter(function(item) {
            return root.token === item.code_langue;
        });
    },
}

const Pays = {
    sourcesScrapParPays: (root) => {
        let sources = db.sources_scrap.list().filter(function(item) {
            return db.sources.list().find(function (source) {
                return source.token === item.token_source
            })
        });

        console.log(sources)
    }
}

const Source = {
    langue: (root) => {
        return db.langues.list().find(function (item) {
            return item.token === root.token_langue
        })
    },
    pays: (root) => {
        return db.pays.list().find(function (item) {
            return item.token === root.token_pays
        })
    }
}

const SourceScrap = {
    source: (root) => {
        return db.sources.list().find(function (item) {
            return item.token === root.token_source
        })
    },
    theme: (root) => {
        return db.themes.list().find(function (item) {
            return item.token === root.token_theme
        })
    },
}

const Theme = {
    langue: (root) => {
        return db.langues.list().find(function (item) {
            return item.token === root.code_langue
        })
    }
}

module.exports = { Query, Article, Langue, Pays, Source, SourceScrap, Theme }