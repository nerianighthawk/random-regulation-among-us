import http from 'http'
import querystring from 'querystring'
import { Client } from 'discord.js'
const client = new Client()

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
    if (msg.content !== '.rrau') {
        const member = msg.author
        if (!member.voice.channel) return message.channel.send('実行者がボイスチャンネルに参加していません')
        const vcMenbers = menubar.voice.channel.members
        const names = vcMenbers.map(m => m.user.username)
        vcMenbers.array.forEach(vcm => {
            vcm.user.send('あなたの縛り内容は\n')
            vcm.user.send('「」')
            vcm.user.send('\nです。')
        })
        message.channel.send(names.join('\n'))
        message.channel.send('\nに縛り内容を送信しました。')
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)
