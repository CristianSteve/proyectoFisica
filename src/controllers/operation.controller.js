const Operations = require("../class/Operations");

operationsProyect = {};

operationsProyect.findMethod = async (req, res) => {
	const { operationType, values } = req.body;
	console.log(req.body);
	if (!operationType) {
		res.status(409).json({
			message: "Tipo de operacion no informado",
		});
	} else {
		let response = 0;
		if (operationType == "1") response = await findOne(values);
		if (operationType == "2") response = await findTwo(values);
		if (operationType == "3") response = await findTree(values);
		if (operationType == "4") response = await findWeather(values);
		if (operationType == "vfinal") response = await findVFinal(values);
		res.json({ message: { operationType, calculate: response } });
	}
};

findOne = async (req) => {
	const { distance, initialVelocity, finalSpeed } = req;
	const aceleracion = await Operations.calculateAccelerationFS(
		initialVelocity,
		finalSpeed,
		distance
	);
	console.log(aceleracion);
	const tiempo = await Operations.calculateTime(
		initialVelocity,
		finalSpeed,
		aceleracion[0]
	);
	return [
		{
			id: "Aceleracion",
			value: aceleracion[0],
			ecuacion: aceleracion[1],
			unidad: "\\frac{m}{S^2}",
		},
		{
			id: "Tiempo",
			value: tiempo,
			ecuacion: "t=\\frac{v_f - v_0}{2⋅d} = ",
			unidad: "sg",
		},
	];
};

findTwo = async (req) => {
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
	return [
		{
			id: "Distancia",
			value: distancia,
			ecuacion: "d = v_0 ⋅ t + \\frac{1} {2} ⋅ a ⋅ t^2=",
			unidad: "m",
		},
		{
			id: "Tiempo",
			value: tiempo,
			ecuacion: "t = \\frac{v_f - v_0}{2⋅d}=",
			unidad: "sg",
		},
	];
};

findTree = async (req) => {
	const { initialVelocity, finalSpeed, weather } = req;

	const acceleration = await Operations.calculateAccelerationT(
		initialVelocity,
		finalSpeed,
		weather
	);
	console.log(finalSpeed - initialVelocity, weather);
	const distancia = await Operations.calculateDistance(
		initialVelocity,
		weather,
		acceleration
	);
	return [
		{
			id: "Distancia",
			value: distancia,
			ecuacion: "d = v_0 ⋅ t + \\frac{1} {2} ⋅ a ⋅ t^2=",
			unidad: "m",
		},
		{
			id: "Aceleracion",
			value: acceleration,
			ecuacion: "a = \\frac{v_f - v_0}{t}=",
			unidad: "\\frac{m}{s^2}",
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
