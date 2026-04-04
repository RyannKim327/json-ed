import { data_structure, json_data, main_structure } from "../interface";
import * as jsed from "json-enc-dec"

export function save(filename: string, key: string, data: main_structure) {
	jsed.encrypt(data, key, {
		saveTo: filename,
		returnBuffer: false
	})
}
