import * as fs from "fs"
import { read, save } from "./data_control"

export default function generateJSON(filename: string, key: string) {
	if (!fs.existsSync(filename)) {
		save(filename, key, {})
		return {}
	}
	return read(filename, key)
}
