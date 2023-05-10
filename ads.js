const extraMsg = function (myAd) {
	let extra = {
		caption: myAd.data.ctn,
		parse_mode: "markdown",
		disable_web_page_preview: "true",
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: myAd.data.link.text,
						url: myAd.data.link.url,
					},
				],
			],
		},
	}

	if (myAd.type == 3) {
		extra.reply_markup.inline_keyboard = myAd.data.linksGroupAd
	}

	return extra
}

const getAdCaption = function (myAd) {
	return "\n \n -   -   -   -   -   -   -   -   -   -   -   -   -   -   - \n" + myAd.data.ctn
}

module.exports = { extraMsg, getAdCaption }
