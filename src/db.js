var mysql = require("mysql2");

module.exports = function(credentials, readings) {
	return new Promise(function(resolve, reject) {
		var connection = mysql.createConnection(credentials);
		const mappings = {
			"datetime": "datetime",
			Temperature: "temp",
			'Wind Speed': "windSpeed",
			'Gust Speed': "windGust",
			'Wind Direction': "windDirDeg",
			Rain: "rain",
			'Temperature (Air Temp)': "airTemp",
			Pressure: "pressure",
			PAR: "par",
			RH: "rh",
			'Dew Point': "dewPoint"
		}
		const columns = Object.keys(readings).reduce((agg, label) => {
			const colName = mappings[label]
			const {reading, units, extra} = readings[label];
			if (!colName) {
				console.log("Unrecognized label " + label)
				return agg;
			}
			agg.statements.push(`${colName} = ?`)
			agg.values.push(colName == "datetime" ? readings[label] : reading)
			if (colName != "datetime") {
				agg.statements.push(`${colName}Unit = ?`)
				agg.values.push(units)
			}
			if (colName == "windDirDeg") {
				agg.statements.push(`windDirSymbol = ?`)
				agg.values.push(extra)
			}
			return agg;
		}, {statements: [], values: []})

		connection.query(
			`insert into hobolink_readings set ${columns.statements.join(", ")}`,
			columns.values,
			function(err, results) {
				connection.end();
				if (err) reject(err);
				else resolve();
			}
		)
	});
}
