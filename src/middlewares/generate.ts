/* NOTE: The main role of this file is to manage the file if it is not yet
 * generated, it is to prevent the error to crud and other actions to the project
 */

import * as fs from "fs"
import { read, save } from "./data_control"
import { RESERVED_TABLE } from "../reserved"

export default function generateJSON(filename: string, key: string) {
	if (!fs.existsSync(filename)) {
		save(filename, key, { [RESERVED_TABLE]: {} })
		return { [RESERVED_TABLE]: {} }
	}
	const data = read(filename, key)
	if (data[RESERVED_TABLE] === undefined) {
		data[RESERVED_TABLE] = {}
	}
	return data
}
