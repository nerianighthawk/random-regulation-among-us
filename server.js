const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js');
const client = new discord.Client()

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
        const names = vcMembers.map(m => m.user.username)
        vcMembers.forEach(vcm => {
            vcm.user.send('あなたの縛り内容は\n')
            vcm.user.send('「」')
            vcm.user.send('\nです。')
        })
        msg.channel.send(names.join('\n'))
        msg.channel.send('\nに縛り内容を送信しました。')
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)
