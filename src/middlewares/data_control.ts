import { data_structure, json_data, main_structure } from "../interface";
import * as jsed from "json-enc-dec"
import * as fs from "fs"

export function save(filename: string, key: string, data: main_structure) {
	// jsed.encrypt(data, key, {
	// 	saveTo: filename,
	// 	returnBuffer: false
	// })
	fs.writeFileSync(filename, JSON.stringify(data, null, 2))
}

export function read(filename: string, key: string) {
	return JSON.parse(fs.readFileSync(filename, "utf8"))
}
