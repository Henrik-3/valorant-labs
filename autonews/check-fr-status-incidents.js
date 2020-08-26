
const r = require('request-promise')
const fs = require('fs')
const moment = require('moment')

module.exports = async function check() {  
  // 1. Load API and Cache
    const raw = await r({
        url: 'https://valorant.secure.dyn.riotcdn.net/channels/public/x/status/eu.json', //replace en-us with your region if needed
        json: true
    })
    let last = fs.readFileSync('./autonews/autonews-fr-status-incidents.txt', 'utf8') || 0
    last = parseInt(last)
   

    // 2. Check for new article
    const article = raw.incidents[0]
    
    article.updates[0].updated_at = Date.parse(article.updates[0].updated_at).toString()
    if (article.updates[0].updated_at > last) {
        // 5. Update Cache
        fs.writeFileSync('./autonews/autonews-fr-status-incidents.txt', article.updates[0].updated_at)
        
        var error;
        try {
            article.titles.find(c => c.locale == 'fr_FR').content
         } catch (e) {
            error = e
        }
      if(error === undefined) {
        moment.locale('fr')
        // 4. Parse Article
        return {
            success_fr_status: true,
            article: {
                title: article.titles.find(c => c.locale == 'fr_FR').content,
                description: article.updates[0].translations.find(c => c.locale == 'fr_FR').content,
                created_at: moment(article.created_at).format('LLLL'),
                platforms: article.platforms[0],
                footer: 'VALORANT LABS [AUTONEWS STATUS][EU]'
            }
        }
    } else {
        moment.locale('fr')
        return {
            success_fr_status: true,
            article: {
                title: article.titles.find(c => c.locale == 'en_US').content,
                description: article.updates[0].translations.find(c => c.locale == 'en_US').content,
                created_at: moment(article.created_at).format('LLLL'),
                platforms: article.platforms[0],
                footer: "VALORANT LABS [AUTONEWS STATUS][EU] - Le message d'erreur n'existe pas en français"
            }
        }
    }
    } else {
        // Nothing new
        return {
            success_fr_status: true,
            article: false
        }
    }
}
