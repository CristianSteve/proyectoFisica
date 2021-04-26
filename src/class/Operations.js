class Operations {
	static calculateTime = async (initialVelocity, finalSpeed, acceleration) => [
		(finalSpeed - initialVelocity) / acceleration,
		"t=\\frac{v_f - v_0}{a}=",
	];

	static calculateDistance = async (initialVelocity, tiempo, acceleration) => [
		initialVelocity * tiempo + (1 / 2) * acceleration * Math.pow(tiempo, 2),
		"d = v_0 ⋅ t + \\frac{1} {2} ⋅ a ⋅ t^2=",
	];

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

	static calculateVFinalWithDTV = async (
		distance,
		weather,
		initialVelocity
	) => [2 * (distance / weather) - initialVelocity, "v_f=2⋅\\frac{d}{t}-v_0="];

	static calculateVInitialWithDTV = async (distance, weather, finalSpeed) => [
		2 * (distance / weather) - finalSpeed,
		"v_0=2⋅\\frac{d}{t}-v_f=",
	];

	static calculateAccelerationT = async (
		initialVelocity,
		finalSpeed,
		weather
	) => [(finalSpeed - initialVelocity) / weather, `a = \\frac{v_f - v_0}{t}=`];

	static calculateVFinalWithDistance = async (
		initialVelocity,
		acceleration,
		distance
	) => [
		Math.sqrt(Math.pow(initialVelocity, 2) + 2 * acceleration * distance),
		"v_f = \\sqrt{{v_0}^2+2⋅a⋅d}=",
	];

	static calculateVInitialWithDistance = async (
		finalSpeed,
		acceleration,
		distance
	) => [
		Math.sqrt(Math.pow(finalSpeed, 2) - 2 * acceleration * distance),
		"v_i = \\sqrt{{v_f}^2-2⋅a⋅d}=",
	];
}

module.exports = Operations;
