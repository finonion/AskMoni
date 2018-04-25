'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Chatbot initiating")
})

let token = ""

// AskMoni 

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "finonion") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			decideMessage(send, text)
            //sendText(sender, "Text echo: " + text.substring(0, 100))
		}
        
        if (event.postback){
            let text = JSON.stringify(event.postback)
            decideMessage(sender, text)
            continue
        }
	}
	res.sendStatus(200)
})

app.listen(app.get('port'), function() {
	console.log("running: port")
})







