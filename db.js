const fs = require('fs')

let data = JSON.parse(fs.readFileSync('db.json'))

module.exports = {
    get(key) {
        let val = data
        key.split('.').filter(k=>k).forEach(k => val = val[k] ? val[k] : false)
        return val
    },
    set(key, val) {
        let link = data
        const keys = key.split('.')
        final = keys.pop()
        keys.forEach(k => link = link[k])
        link[final] = val

        fs.writeFileSync('db.json', JSON.stringify(data))
    }
}