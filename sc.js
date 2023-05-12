const fetch = require("node-fetch")

const query = `
query DiscoverSubredditsQuery( $filter: MediaFilter $limit: Int $iterator: String ) { discoverSubreddits( isNsfw: true filter: $filter limit: $limit iterator: $iterator ) { iterator items { __typename id url title secondaryTitle description createdAt isNsfw subscribers isComplete itemCount videoCount pictureCount albumCount isPaid username tags banner { url width height isOptimized } isFollowing children( limit: 2 iterator: null filter: SOUND disabledHosts: null homePage: true ) { iterator items { __typename id url title subredditId subredditTitle subredditUrl redditPath isNsfw albumUrl hasAudio fullLengthSource gfycatSource redgifsSource ownerAvatar username displayName isPaid tags isFavorite mediaSources { url width height isOptimized } blurredMediaSources { url width height isOptimized } } } } } } 
`

let listVids = []
const variables = {
	filter: "VIDEO",
	hostsDown: null,
	limit: 20, //30
}

const search = async function (nVids) {
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

			for (let i = 0; i < datos.data.discoverSubreddits.items.length; i++) {
				const post = datos.data.discoverSubreddits.items[i]

				for (let j = 0; j < post.children.items.length; j++) {
					const vids = post.children.items[j]

					let tl = vids.title
					let UrlVid = ""

					vids.mediaSources.forEach((media) => {
						if (
							media.url.includes(".scrolller.com/") &&
							media.url.includes(".mp4")
						) {
							listVids.push({ url: media.url, caption: tl })
							UrlVid = "hay"
						} else {
						}
					})

					if (UrlVid == "") {
						if (vids.redgifsSource != null) {
							let id = vids.redgifsSource
								.split("/")
								.pop()
								.replace("-poster", "")

							let url =
								"https://static.scrolller.com/proton/" + id + "-mobile.mp4"

							listVids.push({ url: url, caption: tl })
						} else {
							console.log("Url no Found")
						}
					}

					//if (listVids.length >= nVids) return listVids
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

module.exports = { search }
