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
        return db.themes.list().filter(function (item) {
            return root.token === item.code_langue
        })
    },
    sourcesScrapParLangue: (root) => {
        return db.sources_scrap.list().filter(function (item) {
            const source = db.sources.list().find((source) =>
                source.token === item.token_source
            )
            return source.token_langue === root.token
        })
    },
    articlesScrapParLangue: (root) => {
        let sourcesScrapParLangue = db.sources_scrap.list().filter(function (item) {
            const source = db.sources.list().find((source) =>
                source.token === item.token_source
            )
            return source.token_langue === root.token
        })

        return db.articles.list().filter(function (item) {
            if (sourcesScrapParLangue.length > 0) {
                return sourcesScrapParLangue.find((source_scrap) =>
                    source_scrap.token === item.token_source_scrap
                )?.token === item.token_source_scrap
            }
        })
    }
}

const Pays = {
    sourcesScrapParPays: (root) => {
        return db.sources_scrap.list().filter(function (item) {
            const source = db.sources.list().find((source) =>
                source.token === item.token_source
            )
            return source.token_pays === root.token
        })
    },
    articlesScrapParPays: (root) => {
        let sourcesScrapParPays = db.sources_scrap.list().filter(function (item) {
            const source = db.sources.list().find((source) =>
                source.token === item.token_source
            )
            return source.token_pays === root.token
        })

        return db.articles.list().filter(function (item) {
            if (sourcesScrapParPays.length > 0) {
                return sourcesScrapParPays.find((source_scrap) =>
                    source_scrap.token === item.token_source_scrap
                )?.token === item.token_source_scrap
            }
        })
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
    },
    articlesParTheme: (root) => {
        const sourcesScrapParTheme = db.sources_scrap.list().filter(function (item) {
            return item.token_theme === root.token
        })

        return db.articles.list().filter(function (item) {
            if (sourcesScrapParTheme.length > 0) {
                return sourcesScrapParTheme.find((source_scrap) =>
                    source_scrap.token === item.token_source_scrap
                )?.token === item.token_source_scrap
            }
        })
    }
}

module.exports = { Query, Article, Langue, Pays, Source, SourceScrap, Theme }