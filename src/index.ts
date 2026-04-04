/* INFO: JsonED or basically named as JSON Encrypted Database is a program developed to make an ORM like program
 * This was created and initiated on 04-05-26 with purely typescript.
 *
 * Author: Ryann Kim M. Sesgundo
 */


import generateJSON from "./middlewares/generate";
import insert_data from "./actions/insert-data";

export function JsonED(filename?: string, key?: string) {

	// TODO: To create a generalized key if ever that it is not existed
	if (!key) {
		key = "random text from the internet"
	}

	// TODO: To create a default name if it is blank
	if (!filename) {
		filename = "data"
	}

	// TODO: To filter the filename to prevent multi dots
	const fileSplit: string[] = filename.split(".")
	fileSplit.pop()
	const actualFile: string[] = fileSplit.join("").split("/")
	actualFile[actualFile.length - 1] = actualFile[actualFile.length - 1].replace(/\W/gi, "")
	filename = actualFile.join("/")

	if (!filename.endsWith(".dat")) {
		filename += ".dat"
	}

	const data = generateJSON(filename, key)
	const insert = insert_data(filename, key, data)

	return {
		insert
	}
}
