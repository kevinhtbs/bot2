const fetch = require("node-fetch")

const query = `
query SubredditQuery( $url: String! $filter: SubredditPostFilter $iterator: String ) { getSubreddit(url: $url) { children( limit: 15 iterator: $iterator filter: $filter disabledHosts: null ) { iterator items { __typename id url title subredditId subredditTitle subredditUrl redditPath isNsfw albumUrl hasAudio fullLengthSource gfycatSource redgifsSource ownerAvatar username displayName isPaid tags isFavorite mediaSources { url width height isOptimized } blurredMediaSources { url width height isOptimized } } } } }  
`
const variables = {
	filter: "VIDEO",
	hostsDown: null,
	url: configUrl(),
}

let listVids = []

const search = async function () {
	return fetch("https://api.scrolller.com/api/v2/graphql", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
	})
		.then((response) => response.json())
		.then((datos) => {
			console.log("Data successful")
			console.log(datos.data.getSubreddit.children.items.length)

			for (let i = 0; i < datos.data.getSubreddit.children.items.length; i++) {
				const vid = datos.data.getSubreddit.children.items[i]

				let videoTitle = vid.title
				let videoUrl = ""
				let videoCover = ""

				for (let k = 0; k < vid.mediaSources.length; k++) {
					const media = vid.mediaSources[k]

					if (media.url.includes(".scrolller.com/")) {
						if (media.url.includes(".mp4")) {
							videoUrl = media.url
						}

						if (media.url.includes(".jpg")) {
							videoCover = media.url
						}
					} else {
						if (media.url.includes(".mp4")) {
							let pathId = media.url.split("/").pop()

							videoUrl = "https://static.scrolller.com/proton/" + pathId
							videoCover =
								"https://static.scrolller.com/proton/" +
								pathId.replace(".mp4", ".jpg")
							break
						}
					}
				}

				if (videoUrl != "") {
					listVids.push({
						videoUrl: videoUrl,
						videoCover: videoCover,
						//caption: videoTitle,
					})
				}
			}

			let rdListVids = listVids.sort((a, b) => Math.random() - 0.5)
			return rdListVids
		})
		.catch((e) => {
			console.log("Error")
			console.log(e)
		})
}

function configUrl() {
	let list = [
		"L3IvQW1hdGV1cg==",
		"L3IvSVJMZ2lybHM=",
		"L3IvTnNmd19BbWF0ZXVycw==",
		"L3IvTlNGV3ZlcmlmaWVkYW1hdGV1cnM=",
		"L3IvQ29sbGVnZUFtYXRldXJz",
		"L3IvQW1hdGV1clBvcm4=",
		"L3IvRnVuV2l0aEZyaWVuZHM=",
		"L3IvVmVyaWZpZWRBbWF0ZXVycw==",
		"L3IvUmVhbEdpcmxz",
	]

	let eList = list[Math.floor(Math.random() * list.length)] 
	let config = Buffer.from(eList, "base64").toString("utf8")
	return config
}

module.exports = { search }
