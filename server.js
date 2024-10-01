const express = require('express')
const axios = require('axios')
const app = express()
const key = 'testkey' //CHANGE IF USING 
app.use(express.json())
const webhookURL = 'https://discord.com/api/webhooks/1283420366336954399/A0S0ZKtiUwM4K4Prt7nVoYZzYR_TRUE9LXQ5pRWZi1KtORTtny30Onrn565ZJWwtWyYG'
function send_webhook(user, deeplink) {
    axios.post(webhookURL, {'embeds': [{'title': "New call", 'description': `A new call for user ${user} has been requested, respond [here](${deeplink})`, color: "16776960"}]})
}
app.post("/newcall", async (req, res) => {
    console.log(req.body)
    if (!req.body.Key || req.body.Key !== key) {return res.send('STOP HACKER')}
    const username = await axios.get('https://users.roblox.com/v1/users/'+ req.body.UserId)
    send_webhook(username.data.name, `https://www.roblox.com/games/start?placeId=${req.body.PlaceId}&gameInstanceId=${req.body.JobId}&launchData=${encodeURIComponent(JSON.stringify({'UserId': req.body.UserId}))}`)
    return res.send('successful')
})
app.listen(3000, () => {
    print("server running")
});
