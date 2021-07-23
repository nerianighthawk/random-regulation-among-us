const http = require('http')
const querystring = require('querystring')
const discord = require('discord.js')
const ruleList = require('./rule-list.js')
const client = new discord.Client()

const ruleNum = ruleList.rules.length

http.createServer(function (req, res) {
    if (req.method == 'POST') {
        var data = ""
        req.on('data', function (chunk) {
            data += chunk
        })
        req.on('end', function () {
            if (!data) {
                console.log("No post data")
                res.end()
                return
            }
            var dataObject = querystring.parse(data)
            console.log("post:" + dataObject.type)
            if (dataObject.type == "wake") {
                console.log("Woke up in post")
                res.end()
                return
            }
            res.end()
        })
    }
    else if (req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Discord Bot is active now\n')
    }
}).listen(3000)

client.on('message', async msg => {
    if (msg.content === '!ping') {
        msg.channel.send('Pong!')
    }
})

client.on('message', async msg => {
    if (msg.content === '.rrau') {
        const member = msg.member
        if (!member.voice.channel) return msg.channel.send('実行者がボイスチャンネルに参加していません')
        const vcMembers = member.voice.channel.members
        const names = vcMembers.map(m => m.nickname)
        const randomRules = getRandomRules(vcMembers.length)
        vcMembers.forEach((vcm, idx) => {
            vcm.user.send(`あなたの縛り内容は\n「${randomRules[idx]}」\nです。`)
        })
        msg.channel.send(names.join('\n')+`\nに縛り内容を送信しました。`)
    }
})

function getRandomRules(memberNum) {
    var randomRules = []
    while(randomRules.length < memberNum) {
        var tmp = Math.floor(Math.random * ruleNum)
        if(!randomRules.includes(tmp)) {
            randomRules.push(tmp)
            break
        }
    }
    return randomRules.map(num => ruleList.rules[num])
}

client.login(process.env.DISCORD_BOT_TOKEN)
