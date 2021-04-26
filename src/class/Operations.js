class Operations {
	static calculateTime = async (initialVelocity, finalSpeed, acceleration) =>
		(finalSpeed - initialVelocity) / acceleration;

	static calculateDistance = async (initialVelocity, tiempo, acceleration) =>
		initialVelocity * tiempo + (1 / 2) * acceleration * Math.pow(tiempo, 2);

	static calculateAccelerationFS = async (
		initialVelocity,
		finalSpeed,
		distance
	) => [
		(Math.pow(finalSpeed, 2) - Math.pow(initialVelocity, 2)) / (2 * distance),
		"a=\\frac{{v_f}^2 - {v_0}^2}{2⋅d} = ",
	];

	static calculateVFinal = async (initialVelocity, acceleration, distance) =>
		Math.pow(initialVelocity + 2 * acceleration * distance, 1 / 2);

	static calculateVFinal = async (initialVelocity, acceleration, weather) =>
		Math.pow(initialVelocity + acceleration * weather);

	static calculateAccelerationIV = async (
		initialVelocity,
		weather,
		distance
	) => (distance - initialVelocity * weather) / (0, 5 * Math.pow(weather, 2));

	static calculateAccelerationT = async (
		initialVelocity,
		finalSpeed,
		weather
	) => (finalSpeed - initialVelocity) / weather;
}

module.exports = Operations;
