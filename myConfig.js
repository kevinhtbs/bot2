let MensajeAd =
	"" 
	//"	🎁	- Web de afiliados / referidos \n" +
	//"	🤑	- Acortador con AdsTerra \n" +
	//"	📈	- Página con exoclick \n" +
	//"	🗺	- Redirige el tráfico a @otrosCanales o a una página web \n \n" +
	//"['Click Aquí🔥'](https://www.amazon.es)"

let imagenAd =
	"https://vilmanunez.com/wp-content/uploads/2018/10/poner-anuncios-publicitarios-gratis.png"

const N_VIDEOS = 10 //MAX 10

const MY_AD = {
	isActive: true,
	type: 3, // //defaultAd => 1 //captionAd => 2 //linksGroupAd => 3
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
					text: "🔥 Canal BRAZZERS",
					url: "https://t.me/brazzersmrk",
				},
			],
			[
				{
					text: "🔥 Canal MOFOS",
					url: "https://t.me/+yW8nsY71nOYwMWE8",
				},
			],
			[
				{
					text: "😈 Zorras Infieles",
					url: "https://t.me/+FNGfAH75r4Y5YWJh",
				},
			],
			[
				{
					text: "🍆 Mamadas 4K",
					url: "https://t.me/+CwnGJR8ku3VjM2Ix",
				},
			],
		],
	},
}

module.exports = { N_VIDEOS, MY_AD }
