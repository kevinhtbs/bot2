require("dotenv").config()
const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)
const sc = require("./sc")
const ads = require("./ads")
const idChat = process.env.CHAT_ID

console.log("Index Load")

const sendVids = async function (nVids, myAd) {
	let videosSent = 0
	console.log("Enviar " + nVids + " videos")

	await sc.search(nVids).then(async (videos) => {
		console.log(videos.length + " videos encontrados")
		bot.telegram.sendMessage(
			idChat,
			"🔥 .  .  .  🔥  .  . New .  .  🔥  .  .  . 🔥"
		)
		await new Promise((resolve) => setTimeout(resolve, 500))

		for (let i = 0; i < videos.length; i++) {
			if (videosSent == nVids) return
			const vid = videos[i]

			if (myAd.isActive) {
				//videosSent == 2 ||
				if (videosSent == nVids / 2) {

					//let nr =  Math.floor(Math.random() * 4)
					//await new Promise((resolve) => setTimeout(resolve, 800))
					//myAd.type
					switch (myAd.type) {
						case 1:
							defaultAd(myAd)
							break
						case 2:
							vid.caption += ads.getAdCaption(myAd)
							break
						case 3:
							linksGroupAd(myAd)
							break
						default:
							break
					}

					console.log("Ad enviado...." + " " + videosSent + " " + i)
				}
			}

			let extraSend = {
				caption: vid.caption,
				parse_mode: "markdown",
				disable_web_page_preview: "true",
			}

			try {
				bot.telegram.sendVideo(idChat, vid.url, extraSend)
				console.log("Vid enviado...." + " " + videosSent + " " + i)
				videosSent += 1
				await new Promise((resolve) => setTimeout(resolve, 800))
			} catch (error) {
				console.log(error)
			}
		}

		//return "Return"
	})
}

async function defaultAd(myAd) {
	let ex = ads.extraMsg(myAd)
	await bot.telegram.sendPhoto(idChat, myAd.data.image, ex)
}

async function linksGroupAd(myAd) {
	let ex = ads.extraMsg(myAd)
	ex.caption = "​🚨*Promociona lo que desees!*🚨"
	await bot.telegram.sendMessage(idChat, myAd.data.ctn, ex)
}

//bot.launch()
console.log("Index END")
module.exports = { sendVids }
