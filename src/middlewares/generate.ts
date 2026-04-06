/* NOTE: The main role of this file is to manage the file if it is not yet
 * generated, it is to prevent the error to crud and other actions to the project
 */

import * as fs from "fs"
import { read, save } from "./data_control"

export default function generateJSON(filename: string, key: string) {
	if (!fs.existsSync(filename)) {
		save(filename, key, { "table_struct": {} })
		return { "table_struct": {} }
	}
	const data = read(filename, key)
	if (data["table_struct"] === undefined) {
		data["table_struct"] = {}
	}
	return data
}
