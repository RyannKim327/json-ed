/* INFO: JsonED or basically named as JSON Encrypted Database is a program developed to make an ORM like program
 * This was created and initiated on 04-05-26 with purely typescript.
 *
 * Author: Ryann Kim M. Sesgundo
 */


import generateJSON from "./middlewares/generate";
import insert_data from "./actions/insert";
import read_data from "./actions/read";
import { main_structure } from "./interface";
import update_data from "./actions/update";

export default function JsonED(filename?: string, key: string) {
	// TODO: To create a default name if it is blank
	if (filename === undefined) {
		filename = "data"
	}

	if (filename.replace(/\s/gi, "").length < 3) {
		throw new Error("Filename is too short")
	}

	// TODO: To filter the filename to prevent multi dots
	const actualFile = filename.split("/");
	const lastPart = actualFile[actualFile.length - 1];
	const nameOnly = lastPart.split(".")[0];
	actualFile.push(nameOnly);
	filename = actualFile[actualFile.length - 1];

	if (!filename.endsWith(".dat")) {
		filename += ".dat"
	}

	// TODO: To generate the file first
	let cache: main_structure = generateJSON(filename, key)

	// INFO: The return functions or public functions
	const insert = insert_data(filename, key, cache)
	const read = read_data(filename, key, cache)
	const update = update_data(filename, key, cache)

	return {
		insert,
		read,
		update
	}
}
