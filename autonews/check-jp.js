
const r = require('request-promise')
const fs = require('fs')

module.exports = async function check() {  
  // 1. Load API and Cache
    const raw = await r({
        url: 'https://playvalorant.com/page-data/ja-jp/news/page-data.json', //replace en-us with your region if needed
        json: true
    })
    let last = fs.readFileSync('./autonews/autonews-jp.txt', 'utf8') || 0
    last = parseInt(last)
   

    // 2. Check for new article
    const article = raw.result.data.allContentstackArticles.nodes[0]
    article.date = Date.parse(article.date).toString()
    if (article.date > last) {
        // 5. Update Cache
        fs.writeFileSync('./autonews/autonews-jp.txt', article.date)
        
        // 4. Parse Article
        return {
            success_jp: true,
            article: {
                title: article.title,
                description: article.description,
                link: article.article_type == 'External Link' ? article.external_link : `https://playvalorant.com/ja-JP/${article.url.url}`, //replace en-us with your region if needed
                banner: article.banner.url
            }
        }
    } else {
        // Nothing new
        return {
            success_jp: true,
            article: false
        }
    }
}
