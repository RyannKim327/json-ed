import { main_structure } from "../interface";
import * as jsed from "json-enc-dec"

export function save(filename: string, key: string, data: main_structure) {
	jsed.encrypt(data, key, {
		saveTo: filename,
		returnBuffer: false
	})
	return data
}

export function read(filename: string, key: string) {
	return jsed.decrypt(filename, key)
}
