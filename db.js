const fs = require('fs')

let data = JSON.parse(fs.readFileSync('db.json'))

console.log('Loaded', data)

module.exports = {
    get(key) {
        console.log('get', key.split('.'))
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

        console.log(data)
      
        fs.writeFileSync('db.json', JSON.stringify(data))
      
        setTimeout(() => console.log(JSON.parse(fs.readFileSync('db.json'))), 1000)
    }
}
