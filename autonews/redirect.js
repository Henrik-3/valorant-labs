const Languages = [ 'de-de', 'en-us', 'en-gb', 'es-mx', 'es-es', 'fr-fr', 'id-id', 'it-it', 'ja-jp', 'ko-kr', 'pl-pl', 'pt-br', 'ru-ru', 'th-th', 'tr-tr', 'vi-vn', 'zh-tw' ]

module.exports = (req, res) => {
  if (req.query.v) {
    let lang = 'en-us'
    const me = req.get('accept-language').split(',')[0].toLowerCase()
    
    if (Languages.includes(me)) {
      lang = me
    } else if (Languages.find(l => l.split('-')[0] == me.split('-')[0])) {
      lang = Languages.find(l => l.split('-')[0] == me.split('-')[0])
    }
    
    res.redirect(`https://beta.playvalorant.com/${lang}${req.query.v}`)
  } else {
    // Article not found
  }
}