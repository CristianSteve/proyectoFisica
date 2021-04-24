const Operations = require("../class/Operations");

operationsProyect = {};

operationsProyect.findMethod = async (req, res) => {
	const { operationType, values } = req.body;
	console.log(req.body);

	if (!operationType) {
		res.status(409).json({
			//	message: "Parametros obligatorios no informados",
			message: "Tipo de operacion no informado",
		});
	} else {
		let response = 0;
		if (operationType == "tiempo") response = await findWeather(values);
		if (operationType == "vfinal") response = await findVFinal(values);
		res.json({ message: { operationType, calulate: response } });
	}
};

findVFinal = async (req) => {
	const { initialVelocity, acceleration, weather } = req;
	const distancia = await Operations.calculateDistance(
		initialVelocity,
		weather,
		acceleration
	);

	const vfinal = initialVelocity + acceleration * weather;

	return { vfinal: vfinal, distancia: distancia };
};

findWeather = async (req) => {
	const { initialVelocity, finalSpeed, acceleration } = req;
	const tiempo = await Operations.calculateTime(
		initialVelocity,
		finalSpeed,
		acceleration
	);

	const distancia = await Operations.calculateDistance(
		initialVelocity,
		tiempo,
		acceleration
	);

	return { tiempo: tiempo, distancia: distancia };
};

module.exports = operationsProyect;
