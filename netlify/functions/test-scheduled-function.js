const { schedule } = require("@netlify/functions")
const main = require("../../index.js")
const myConfig = require("../../myConfig.js")

const handler = async function (event, context) {
	//console.log("Received event:", event);

	console.log("Handler Init..")
	await main.sendVids(myConfig.N_VIDEOS, myConfig.MY_AD)
	console.log("Handler Finish...")

	return {
		statusCode: 200,
	}
}

exports.handler = schedule("*/20 * * * *", handler) //5  //  */15
