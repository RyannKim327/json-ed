import JsonED from "./src";
import * as readline from "readline"

const d = JsonED("hello", "helloworld")


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function input(prompt: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(prompt, (answer) => {
			resolve(answer);
		});
	});
}

async function insert() {
	const table = await input("Enter table: ");
	const query = await input("Enter query: ");
	d.insert(table, query);
}

async function readData() {
	const table = await input("Enter table: ");
	const id = await input("Enter ID: ");
	console.log(d.read(table, id));
}

async function updateData() {
	const table = await input("Enter table: ");
	const id = await input("Enter ID: ");
	const query = await input("Enter query: ");
	d.update(table, id, query);
}

async function main() {
	let t = true
	while (t) {
		const cmd = await input("Enter command (0=insert, 1=read, 2=update, 9=exit): ");
		const i = parseInt(cmd);

		switch (i) {
			case 0:
				await insert();
				break;
			case 1:
				await readData();
				break;
			case 2:
				await updateData();
				break;
			case 3:
				rl.close();
				return;
			case 5:
				t = false
			default:
				console.log("Invalid command");
		}
	}
}

main();
