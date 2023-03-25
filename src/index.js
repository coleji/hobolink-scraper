const fs = require('fs')
const parse = require("./parse")
const httpCall = require("./http-call")
const callDb = require("./db")

const FREQ = process.env.CALL_FREQ || 1000 * 5
console.log("call freq: " + FREQ)

const outPath = "./out/readings.json"

function tryCallDb(readings) {
	const {
		DB_HOST: host,
		DB_SCHEMA: database,
		DB_USER: user,
		DB_PASSWORD: password
	} = process.env

	if (host && database && user && password) {
		callDb({ host, database, user, password}, readings)
	}
} 

function main() {
	httpCall().then(data => {
		return parse(data)
	}).then(readings => {
		console.log(readings)
		fs.writeFileSync(outPath, JSON.stringify(readings, undefined, 1))
		tryCallDb(readings)
	}).catch(err => {
		console.error("Error: ", err)
		try {fs.unlinkSync(outPath)} catch (e) {}
	})	
}

function triggerRepeat() {
	main();
	setTimeout(triggerRepeat, FREQ)
}

triggerRepeat()
