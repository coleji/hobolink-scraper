const parse = require('node-html-parser').parse;

module.exports = function(input) {
	return new Promise((resolve, reject) => {
		try {
			const root = parse(input)
			const tbody = root.querySelector("#hobolink-latest-conditions-form\\:conditions-tree_data")
			resolve(tbody.childNodes.filter((e, i) => i > 0 && i < 11).map(tr => {
				const label = tr.querySelector(".latest-conditions-info-label").childNodes[0]['_rawText'].split(":")[0]
				const readingNode = tr.querySelector(".latest-conditions-info-reading").childNodes[0]
				const reading = (
					readingNode.childNodes.length == 0
					? readingNode['_rawText']
					: readingNode.childNodes[0]['_rawText']
				)
				const units = tr.querySelector(".latest-conditions-info-units").childNodes[0]['_rawText']
				return { label, reading, units }
			}));
		} catch (e) {
			reject(e)
		}
	})
}