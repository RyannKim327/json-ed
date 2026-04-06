/* NOTE: The only function of this file is just to hold the read and save to
 * json (.dat) file for data store
 */
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
