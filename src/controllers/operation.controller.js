const Operations = require("../class/Operations");

operationsProyect = {};

operationsProyect.findMethod = async (req, res) => {
	const { operationType, values } = req.body;
	if (!operationType) {
		res.status(409).json({
			message: "Tipo de operacion no informado",
		});
	} else {
		let response = 0;
		if (operationType == "1") response = await findOne(values);
		if (operationType == "2") response = await findTwo(values);
		if (operationType == "3") response = await findTree(values);
		if (operationType == "4") response = await findFour(values);
		if (operationType == "5") response = await findFive(values);
		if (operationType == "6") response = await findSix(values);
		if (operationType == "7") response = await findSeven(values);
		if (operationType == "vfinal") response = await findVFinal(values);
		res.json({ message: { operationType, calculate: response } });
	}
};

findOne = async (req) => {
	const { distance, initialVelocity, finalSpeed } = req;
	const [aceleracion, ecuacion] = await Operations.calculateAccelerationFS(
		initialVelocity,
		finalSpeed,
		distance
	);
	const [tiempo, ecuacion1] = await Operations.calculateTime(
		initialVelocity,
		finalSpeed,
		aceleracion
	);
	return [
		{
			id: "Aceleracion",
			value: aceleracion,
			ecuacion: ecuacion,
			unidad: "\\frac{m}{S^2}",
		},
		{
			id: "Tiempo",
			value: tiempo,
			ecuacion: ecuacion1,
			unidad: "sg",
		},
	];
};

findTwo = async (req) => {
	const { initialVelocity, finalSpeed, acceleration } = req;

	const [tiempo, ecuacion] = await Operations.calculateTime(
		initialVelocity,
		finalSpeed,
		acceleration
	);
	const [distancia, ecuacion1] = await Operations.calculateDistance(
		initialVelocity,
		tiempo,
		acceleration
	);
	return [
		{
			id: "Distancia",
			value: distancia,
			ecuacion: ecuacion1,
			unidad: "m",
		},
		{
			id: "Tiempo",
			value: tiempo,
			ecuacion: ecuacion,
			unidad: "sg",
		},
	];
};

findTree = async (req) => {
	const { initialVelocity, finalSpeed, weather } = req;

	const [acceleration, ecuacion] = await Operations.calculateAccelerationT(
		initialVelocity,
		finalSpeed,
		weather
	);
	const [distancia, ecuacion1] = await Operations.calculateDistance(
		initialVelocity,
		weather,
		acceleration
	);
	return [
		{
			id: "Distancia",
			value: distancia,
			ecuacion: ecuacion1,
			unidad: "m",
		},
		{
			id: "Aceleracion",
			value: acceleration,
			ecuacion: ecuacion,
			unidad: "\\frac{m}{s^2}",
		},
	];
};

findFour = async (req) => {
	const { distance, initialVelocity, acceleration } = req;

	const [finalSpeed, ecuacion] = await Operations.calculateVFinalWithDistance(
		initialVelocity,
		acceleration,
		distance
	);
	const [tiempo, ecuacion1] = await Operations.calculateTime(
		initialVelocity,
		finalSpeed,
		acceleration
	);
	return [
		{
			id: "Velocidad Final",
			value: finalSpeed,
			ecuacion: ecuacion,
			unidad: "\\frac{m}{s^2}",
		},
		{
			id: "Tiempo",
			value: tiempo,
			ecuacion: ecuacion1,
			unidad: "\\frac{m}{s^2}",
		},
	];
};

findFive = async (req) => {
	const { distance, initialVelocity, weather } = req;

	const [finalSpeed, ecuacion] = await Operations.calculateVFinalWithDTV(
		distance,
		weather,
		initialVelocity
	);
	const [acceleration, ecuacion1] = await Operations.calculateAccelerationT(
		initialVelocity,
		finalSpeed,
		weather
	);
	return [
		{
			id: "Aceleracion",
			value: acceleration,
			ecuacion: ecuacion1,
			unidad: "\\frac{m}{s^2}",
		},
		{
			id: "Velocidad Final",
			value: finalSpeed,
			ecuacion: ecuacion,
			unidad: "\\frac{m}{s}",
		},
	];
};

findSix = async (req) => {
	const { distance, finalSpeed, acceleration } = req;

	const [
		initialVelocity,
		ecuacion,
	] = await Operations.calculateVInitialWithDistance(
		finalSpeed,
		acceleration,
		distance
	);
	const [tiempo, ecuacion1] = await Operations.calculateTime(
		initialVelocity,
		finalSpeed,
		acceleration
	);
	return [
		{
			id: "Velocidad Inicial",
			value: initialVelocity,
			ecuacion: ecuacion,
			unidad: "\\frac{m}{s}",
		},
		{
			id: "Tiempo",
			value: tiempo,
			ecuacion: ecuacion1,
			unidad: "sg",
		},
	];
};

findSeven = async (req) => {
	const { distance, finalSpeed, weather } = req;

	const [
		initialVelocity,
		ecuacion,
	] = await Operations.calculateVInitialWithDTV(distance, weather, finalSpeed);

	const [tiempo, ecuacion1] = await Operations.calculateAccelerationT(
		initialVelocity,
		finalSpeed,
		weather
	);
	return [
		{
			id: "Velocidad Inicial",
			value: initialVelocity,
			ecuacion: ecuacion,
			unidad: "\\frac{m}{s}",
		},
		{
			id: "Tiempo",
			value: tiempo,
			ecuacion: ecuacion1,
			unidad: "sg",
		},
	];
};

findVFinal = async (req) => {
	const { initialVelocity, acceleration, weather } = req;
	const distancia = await Operations.calculateDistance(
		initialVelocity,
		weather,
		acceleration
	);

	const vfinal = initialVelocity + acceleration * weather;

	return [
		{ id: "Velocidad final", value: vfinal },
		{ id: "Distancia", value: distancia },
	];
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
