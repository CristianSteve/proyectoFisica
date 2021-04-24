require("dotenv").config(); //Configuracion para tomar variables de entorno del sistema

const app = require("./app");

async function main() {
	await app.listen(app.get("port"));
	console.log(`On port ${app.get("port")}`);
}

main();
