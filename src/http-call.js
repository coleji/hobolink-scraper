const https = require('https')

module.exports = function () {
	return new Promise((resolve, reject) => {
		https.get({
			hostname: 'www.hobolink.com',
			port: 443,
			path: '/p/0cdac4a6910cef5a8883deb005d73ae1',
			headers: {
				authority: " www.hobolink.com",
				accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
				"accept-language": "en-US,en;q=0.9",
				"cache-control": "no-cache",
				pragma: "no-cache",
				"sec-ch-ua": '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "Linux",
				"sec-fetch-dest": "document",
				"sec-fetch-mode": "navigate",
				"sec-fetch-site": "none",
				"sec-fetch-user": "?1",
				"upgrade-insecure-requests": " 1",
				"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
			}
		}, (res) => {
			let data = '';
	
			res.on('data', (chunk) => {
				data += chunk;
			});
	
			res.on('end', () => {
				resolve(data);
			});
	
		});
	})
}