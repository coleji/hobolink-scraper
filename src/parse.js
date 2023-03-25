const parse = require('node-html-parser').parse;

module.exports = function(input) {
	return new Promise((resolve, reject) => {
		try {
			const root = parse(input)
			const tbody = root.querySelector("#hobolink-latest-conditions-form\\:conditions-tree_data")
			resolve(tbody.childNodes.filter((e, i) => i > 0 && i < tbody.childNodes.length - 1).map(tr => {
				const label = tr.querySelector(".latest-conditions-info-label").childNodes[0]['_rawText'].split(":")[0]
				const readingNode = tr.querySelector(".latest-conditions-info-reading").childNodes[0]
				const reading = (
					readingNode.childNodes.length == 0
					? readingNode['_rawText']
					: readingNode.childNodes[0]['_rawText']
				)
				const units = tr.querySelector(".latest-conditions-info-units").childNodes[0]['_rawText']
				return { label, reading, units }
			}).reduce((agg, {label, reading: readingRaw, units}) => {
				const isWindDir = label == "Wind Direction"
				const reading = isWindDir ? readingRaw.split(" ")[1] : readingRaw;
				agg[label] = {reading, units}
				if (isWindDir) {
					agg[label] = {
						...agg[label],
						extra: readingRaw.split(" ")[0]
					}
				}
				return agg;
			}, { datetime: (new Date()).getTime()}));
		} catch (e) {
			reject(e)
		}
	})
}