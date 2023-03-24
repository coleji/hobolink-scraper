const fs = require('fs')
const parse = require("./parse")
const httpCall = require("./http-call")

const FREQ = 1000 * 60 * 5

function main() {
	httpCall().then(data => {
		return parse(data)
	}).then(readings => {
		const out = readings.map(({ label, reading, units }) => `"${label}","${reading}","${units}"`).join("\n")
		fs.writeFileSync("./out/readings.csv", out)
		console.log(new Date())
		console.log(out)
	}).catch(err => {
		console.error("Error: ", err)
		try {fs.unlinkSync("./out/readings.csv")} catch (e) {}
	})

	setTimeout(main, FREQ)
}

main()