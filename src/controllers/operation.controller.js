operationsProyect = {};

operationsProyect.findMethod = async (req, res) => {
	const { operationType } = req.body;

	if (!operationType) {
		res.status(409).json({
			//	message: "Parametros obligatorios no informados",
			message: "Tipo de operacion no informado",
		});
	} else {
		let response = 0;
		if (operationType == "tiempo") response = await findWeather(req);
		if (operationType == "vfinal") response = await findVFinal(req);
		res.json({ message: { operacion: response } });
	}
};

findVFinal = async (req) => {
	const { initialVelocity, acceleration, weather } = req.body;
	const distancia = await calculateDistance(
		initialVelocity,
		weather,
		acceleration
	);

	const vfinal = initialVelocity + acceleration * weather;

	return { vfinal: vfinal, distancia: distancia };
};

findWeather = async (req) => {
	const { initialVelocity, finalSpeed, acceleration } = req.body;
	const tiempo = await calculateTime(
		initialVelocity,
		finalSpeed,
		acceleration
	);

	const distancia = await calculateDistance(
		initialVelocity,
		tiempo,
		acceleration
	);

	return { tiempo: tiempo, distancia: distancia };
};

calculateTime = async (initialVelocity, finalSpeed, acceleration) =>
	(finalSpeed - initialVelocity) / acceleration;

calculateDistance = async (initialVelocity, tiempo, acceleration) =>
	initialVelocity * tiempo + (1 / 2) * acceleration * (tiempo * tiempo);

module.exports = operationsProyect;
