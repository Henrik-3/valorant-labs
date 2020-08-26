const fs = require('fs')

let data = JSON.parse(fs.readFileSync('database/db.json'))

module.exports = {
    get(key) {
        let val = data
        key.split('.').forEach(k => val = val[k] ? val[k] : false)
        return val
    },
    set(key, val) {
        console.log('set', key.split('.'), val)
        let link = data
        const keys = key.split('.')
        const final = keys.pop()
        keys.forEach(k => link = link[k])
        link[final] = val
      
        fs.writeFileSync('database/db.json', JSON.stringify(data, null, 2))
      
        setTimeout(() => console.log(JSON.parse(fs.readFileSync('/database/db.json'))), 1000)
    }
}
