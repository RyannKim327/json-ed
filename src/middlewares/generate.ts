import * as fs from "fs"
import * as jsed from "json-enc-dec"
import { save } from "./data_control"

export default function generateJSON(filename: string, key: string) {
	if (!fs.existsSync(filename)) {
		save(filename, key, {})

		console.log(`File created as ${filename}`)
		return {}
	}
	console.log(`File "${filename}" already existed`)
	return jsed.decrypt(filename, key)
}
