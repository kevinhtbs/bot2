let MensajeAd =
	"​🚨*VER MÁS ONLYFANS!*🚨 \n \n" +
	"['Click Aquí🔥'](https://foroxxx.com)"

/*let MensajeAd3 =
	"​🚨*Promociona lo que desees!*🚨 \n \n"*/

let imagenAd =
	"https://vilmanunez.com/wp-content/uploads/2018/10/poner-anuncios-publicitarios-gratis.png"

const N_VIDEOS = 10 //MAX 10

const MY_AD = {
	isActive: true,
	type: 2, // //defaultAd => 1 //captionAd => 2 //linksGroupAd => 3
	data: {
		ctn: MensajeAd,
		image: imagenAd,
		link: {
			text: "Canal vip ❤",
			url: "https://google.com",
		},
		linksGroupAd: [
			[
				{
					text: "Web Afiliados / Referidos",
					url: "https://youtube.com",
				},
			],
			[
				{
					text: "Acortador de enlaces",
					url: "https://facebook.com",
				},
			],
			[
				{
					text: "Web con anuncios",
					url: "https://stripchat.com",
				},
			],
			[
				{
					text: "Promociona otro canal",
					url: "https://tiktok.com",
				},
			],
		],
	},
}

module.exports = { N_VIDEOS, MY_AD }
