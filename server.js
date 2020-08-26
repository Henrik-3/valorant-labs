//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const Canvas = require("canvas");
const fs = require('fs');
const config = require("./commands/config.json");
const apistats = require('./database/api.json');

const Discord = require("eris");
const client = new Discord(config.token);

//require('download')('https://cdn.glitch.com/15c546f8-c377-494a-a8f3-e5f452789cdf/product_sans.ttf', './')
//require('download')('https://cdn.glitch.com/6f24e132-ed6a-4704-a40d-19f2a8f508ca/valorant_font.ttf', './')

Canvas.registerFont('product_sans.ttf', { family: 'product_sans' })
Canvas.registerFont('valorant_font.ttf', { family: 'valorant_font'})
Canvas.registerFont('umeboshi_.ttf', { family: 'japan2'})
Canvas.registerFont('anton.ttf', { family: 'anton'})

//db
const db = require("./db.js")

client.on("ready", () => {
  client.editStatus('online', { name: client.guilds.size + ' Servers | Send me a DM with your issues and wishes :D', type: 3 })
  client.editChannel('704236477755818004', { name: 'Server: ' + client.guilds.size})
  client.editChannel('734112117254389800', { name: 'User: ' + client.users.size})
  console.log("Ready")
  const activities = [
    "Empty",
    "Custom Status 1",
    "Custom Status 2",
    "Custom Status 3",
    "Custom Status 4"
  ]
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    client.editStatus('online', { name: activities[index], type: 3 })
  }, 10000); // Runs this every 10 seconds.
  setInterval(() =>{ 
    dbl.postStats(client.guilds.size)
  }, 180000)
 setInterval (function() {
  require('./autonews/check-en-us.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      url: data.article.link,
      image: {
        url: data.article.banner
      }, 
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [AUTONEWS WEBSITE]'
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'en-us').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
}
})
}, 60000)
setInterval (function() {
  require('./autonews/check-en-gb.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      url: data.article.link,
      image: {
        url: data.article.banner
      }, 
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [AUTONEWS WEBSITE]'
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'en-gb').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
}
})
}, 60000)
setInterval (function() {
  require('./autonews/check-de.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      url: data.article.link,
      image: {
        url: data.article.banner
      }, 
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [AUTONEWS WEBSITE]'
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'de').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-jp.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      url: data.article.link,
      image: {
        url: data.article.banner
      }, 
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [AUTONEWS WEBSITE]'
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'jp').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
}
})
}, 60000)
setInterval (function() {
  require('./autonews/check-pt-br.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      url: data.article.link,
      image: {
        url: data.article.banner
      }, 
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [AUTONEWS WEBSITE]'
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'pt-br').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
}
})
}, 60000)
setInterval (function() {
  require('./autonews/check-fr.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      url: data.article.link,
      image: {
        url: data.article.banner
      }, 
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [AUTONEWS WEBSITE]'
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'fr').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
}
})
}, 60000)
setInterval (function() {
  require('./autonews/check-de-status-maintences.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Erstellt am:', value: data.article.created_at, inline: true},
        { name: 'Platformen betroffen:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'de').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-de-status-incidents.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Erstellt am:', value: data.article.created_at, inline: true},
        { name: 'Platformen betroffen:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'de').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-en-gb-status-maintences.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Created at:', value: data.article.created_at, inline: true},
        { name: 'Platformens affected:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'en-gb').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-en-gb-status-incidents.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Created at:', value: data.article.created_at, inline: true},
        { name: 'Platformens affected:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'en-gb').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-en-us-status-maintences.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Created at:', value: data.article.created_at, inline: true},
        { name: 'Platforms affected:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'en-us').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-en-us-status-incidents.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Created at:', value: data.article.created_at, inline: true},
        { name: 'Platforms affected:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'en-us').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-fr-status-maintences.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Créé à:', value: data.article.created_at, inline: true},
        { name: 'Plateformes concernées:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'fr').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-fr-status-incidents.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Créé à:', value: data.article.created_at, inline: true},
        { name: 'Plateformes concernées:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'fr').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-jp-status-maintences.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'で作成:', value: data.article.created_at, inline: true},
        { name: '影響を受けるプラットフォーム:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'jp').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-jp-status-incidents.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'で作成:', value: data.article.created_at, inline: true},
        { name: '影響を受けるプラットフォーム:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'jp').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-pt-br-status-maintences.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Criado em:', value: data.article.created_at, inline: true},
        { name: 'Plataformas em questão:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'pt-br').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)
setInterval (function() {
  require('./autonews/check-pt-br-status-incidents.js')().then(data => {
    console.log(data)
  if (data.article) {
    var Embed = {embed: {
      color: 0xff4654,
      description: data.article.description,
      title: data.article.title,
      fields: [
        { name: 'Criado em:', value: data.article.created_at, inline: true},
        { name: 'Plataformas em questão:', value: data.article.platforms, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: data.article.footer
      }
    }}
    
    const settings = require('./database/db.json');
  
    // Filter for Guilds with Newschannel
    Object.keys(settings).filter(guild => settings[guild].news && settings[guild].lang == 'pt-br').forEach(guild => {
      let channel = settings[guild].news.replace(/[^0-9]/g, '') // Replace all non-numbers
      guild = client.guilds.get(guild)
      if (guild) {
        channel = guild.channels.get(channel)
        if (channel) {
          client.createMessage(channel.id, Embed)
        }
      }
    })
  }
})
}, 60000)

setInterval(function() {
  apistats.usercount = Number(client.users.size)
  fs.writeFileSync('./database/api.json', JSON.stringify(apistats, null, 2));
}, 7200000)

apistats.servercount = Number(client.guilds.size)
apistats.usercount = Number(client.users.size)
fs.writeFileSync('./database/api.json', JSON.stringify(apistats, null, 2));

})

client.on('guildCreate', async g => {
  if(g.region == 'europe') { 
    const db2 = require('./database/db.json')
    db2[g.id] = { prefix: 'v?', news: false, lang: 'en-gb', blacklist: false}
    fs.writeFileSync('./database/db.json', JSON.stringify(db2, null, 2));
    var DMUser = await client.getDMChannel(g.ownerID)
    await DMUser.createMessage({embed: {
      color: 0xff4654,
      title: 'Language Selection',
      description: 'Hey, based on your server location (`europe`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `en-gb`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br` in a normal server channel',
      fields: [
        { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [SERVER JOINED]'
      }
    }})
  } else if(g.region == 'us-central' || g.region == 'us-south' || g.region == 'us-west' || g.region == 'us-east') { 
    const db2 = require('./database/db.json')
    db2[g.id] = { prefix: 'v?', news: false, lang: 'en-us', blacklist: false}
    fs.writeFileSync('./database/db.json', JSON.stringify(db2, null, 2));
    var DMUser = await client.getDMChannel(g.ownerID)
    await DMUser.createMessage({embed: {
      color: 0xff4654,
      title: 'Language Selection',
      description: 'Hey, based on your server location (`us`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `en-us`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br` in a normal server channel',
      fields: [
        { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [SERVER JOINED]'
      }
    }})
  } else if(g.region == 'brazil') { 
    const db2 = require('./database/db.json')
    db2[g.id] = { prefix: 'v?', news: false, lang: 'pt-br', blacklist: false}
    fs.writeFileSync('./database/db.json', JSON.stringify(db2, null, 2));
    var DMUser = await client.getDMChannel(g.ownerID)
    await DMUser.createMessage({embed: {
      color: 0xff4654,
      title: 'Language Selection',
      description: 'Hey, based on your server location (`brazil`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `pt-br`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br` in a normal server channel',
      fields: [
        { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [SERVER JOINED]'
      }
    }})
  } else if(g.region == 'japan') { 
    const db2 = require('./database/db.json')
    db2[g.id] = { prefix: 'v?', news: false, lang: 'jp', blacklist: false}
    fs.writeFileSync('./database/db.json', JSON.stringify(db2, null, 2));
    var DMUser = await client.getDMChannel(g.ownerID)
    await DMUser.createMessage({embed: {
      color: 0xff4654,
      title: 'Language Selection',
      description: 'Hey, based on your server location (`japan`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `jp`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br` in a normal server channel',
      fields: [
        { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [SERVER JOINED]'
      }
    }})
  } else {
      const db2 = require('./database/db.json')
      db2[g.id] = { prefix: 'v?', news: false, lang: 'en-us', blacklist: false}
      fs.writeFileSync('./database/db.json', JSON.stringify(db2, null, 2));
      var DMUser = await client.getDMChannel(g.ownerID)
    await client.createMessage(DMUser.id, {embed: {
      color: 0xff4654,
      title: 'Language Selection',
      description: 'Hey, based on your server location (`' + g.region + '`) and the available bot languages (`de/fr/en-gb/en-us/jp/pt-br`), your bot language was set to `en-us`. To change the language, do `v?settings lang de/fr/en-gb/en-us/jp/pt-br` in a normal server channel',
      fields: [
        { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [SERVER JOINED]'
      }
    }})
  }
  client.createMessage('CHANNEL ID FOR INVITES HERE', {embed: {
    color: 0x00ff00,
    title: `Neuer Server: ${g.name}`,
    thumbnail: {
      url: g.iconURL
    },
    fields: [
      { name: 'ID', value: g.id, inline: true},
      { name: 'MemberCount', value: g.memberCount, inline: true},
      { name: 'Region', value: g.region, inline: true},
      { name: 'OwnerID', value: g.ownerID, inline: true},
      { name: 'Server Boost Level', value: g.premiumTier, inline: true},
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'VALORANT LABS [INVITE SYSTEM]'
    }
  }})
  apistats['servercount']++
  fs.writeFileSync('./database/api.json', JSON.stringify(apistats, null, 2));
})

client.on('guildDelete', async g => {
  var DMUser = await client.getDMChannel(g.ownerID)
    await DMUser.createMessage({embed: {
      color: 0xff4654,
      title: 'Server kick',
      description: 'Hey, i saw that you removed VALORANT LABS from your server, do you wanna tell me why so that i can improve the bot or add features that are missing? \n If yes, please write here in the chat your wishes or improvments or send me a DM if you want to discuss with me directly: Henrik3#1451',
      fields: [
        { name: 'Support Server', value: '[Support Server](https://discord.gg/b5FmTqG)', inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [SERVER JOINED]'
      }
    }})
    client.createMessage('CHANNEL ID FOR INVITES HERE', {embed: {
      color: 0xff0000,
      title: `Server left: ${g.name}`,
      thumbnail: {
        url: g.iconURL
      },
      fields: [
        { name: 'ID', value: g.id, inline: true},
        { name: 'MemberCount', value: g.memberCount, inline: true},
        { name: 'Region', value: g.region, inline: true},
        { name: 'OwnerID', value: g.ownerID, inline: true},
        { name: 'Server Boost Level', value: g.premiumTier, inline: true},
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [INVITE SYSTEM]'
      }
    }})
  apistats['servercount']--
  fs.writeFileSync('./api.json', JSON.stringify(apistats, null, 2));
})

//DM Chat
client.on('messageCreate', async message => {
  if(message.author.id == "YOUR ID HERE" && message.content.startsWith('!labs') ) {
    console.log('test')
    const args = message.cleanContent.split(' ')
    console.log(args)
    var userID = args[1]
    args.shift()
    args.shift()
    console.log(userID)
    var DMUser = await client.getDMChannel(userID)
    await DMUser.createMessage({embed: {
      color: 0xffffff,
      title: 'Message from the VALORANT LABS Creator',
      description: args.join(' ').toString(),
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [MESSAGE SYSTEM]'
      }
    }})
    client.createMessage('CHANNEL ID FOR DMS HERE ', {embed: {
      color: 0xffffff,
      title: 'Message Successfully Send to ' + userID,
      description: args.join(' ').toString(),
      timestamp: new Date().toISOString(),
      footer: {
        text: 'VALORANT LABS [MESSAGE SYSTEM]'
      }
    }})
  } else {
    return;
  }
})



// Commands laden
let Commands = {};
['help', 'link', 'weapon', 'stats', 'ranked', 'settings', 'patch', 'help2', 'map', 'weapons', 'agent', 'botinfo', 'vote', 'status', 'usage', 'blacklist', 'help3', 'template', 'game'].forEach(name => Commands[name] = require(`./commands/${name}.js`))

client.on('messageCreate', (message) => {
 if(message.channel.type !== 1) {
  // Command und Arguments checken
  const prefix = db.get(`${message.guildID}.prefix`) || 'v?'
  if (message.content.toLowerCase().startsWith(prefix)) {
     const args = message.content.toLowerCase().substr(prefix.length).split(' ')
     const cmd = args.shift()
   if(db.get(`${message.guildID}.blacklist`) == true) {
     console.log('test')
     var blacklist = JSON.parse(fs.readFileSync('database/blacklist.json'))
     console.log(blacklist)
     var serverid = message.guildID
     var arrayblacklist = blacklist[serverid].blacklisted
     console.log(arrayblacklist)
   if(arrayblacklist.includes('<#' + message.channel.id + '>') && arrayblacklist) {
     client.createMessage(message.channel.id, {embed: {
       color: 0xff4654,
       title: "I'm not allowed to write here",
       description: 'If you think this is an error, contact the server admin',
       timestamp: new Date().toISOString(),
       footer: {
         text: 'VALORANT LABS [SETTINGS]'
       }
     }}).then(msg => {
       setTimeout(() => {
        msg.delete();
        message.delete();
       }, 5000)
     })
      apistats[cmd]++
      apistats['all']++
      fs.writeFileSync('./database/api.json', JSON.stringify(apistats, null, 2))
    } else {
      if(Commands[cmd]) {
        Commands[cmd](args, client, message, {
          Canvas: Canvas, // Damit man das nicht bei jedem command einzelnd machen muss
          Discord: Discord
        })
        apistats[cmd]++
        apistats['all']++
        fs.writeFileSync('./database/api.json', JSON.stringify(apistats, null, 2))
     } else {
      client.createMessage(message.channel.id, {embed: {
        color: 0xff4654,
        title: "This command does not exist",
        description: 'Use **v?help** to see all available commands',
        timestamp: new Date().toISOString(),
        footer: {
          text: 'VALORANT LABS [COMMAND NOT FOUND]'
        }
      }})
      apistats['all']++
      fs.writeFileSync('./database/api.json', JSON.stringify(apistats, null, 2))
     }
  }
  } else {
    if (Commands[cmd]) {
      Commands[cmd](args, client, message, {
        Canvas: Canvas, // Damit man das nicht bei jedem command einzelnd machen muss
        Discord: Discord
      })
      apistats[cmd]++
      apistats['all']++
      fs.writeFileSync('./database/api.json', JSON.stringify(apistats, null, 2))
    } else {
      client.createMessage(message.channel.id, {embed: {
        color: 0xff4654,
        title: "This command does not exist",
        description: 'Use **v?help** to see all available commands',
        timestamp: new Date().toISOString(),
        footer: {
          text: 'VALORANT LABS [COMMAND NOT FOUND]'
        }
      }})
      apistats['all']++
      fs.writeFileSync('./database/api.json', JSON.stringify(apistats, null, 2))
    }
  }
 }
 } else if(message.channel.type == 1 && message.author.id != "BOT ID HERE") {
  client.createMessage('CHANNEL ID FOR DMS HERE', {embed: {
    color: 0xffffff,
    title: 'Nachricht von ' + message.author.username + '#' + message.author.discriminator + ' | ID: ' + message.author.id,
    description: message.cleanContent,
    timestamp: new Date().toISOString(),
    footer: {
      text: 'VALORANT LABS [MESSAGE SYSTEM]'
    }
  }})
  }
})

client.connect();