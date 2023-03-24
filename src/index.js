// const fs = require('fs')
const parse = require("./parse")
const httpCall = require("./http-call")

httpCall().then(data => {
	const readings = parse(data)
	readings.forEach(({ label, reading, units }) => console.log(`"${label}": "${reading}" "${units}"`))
})
