/* NOTE: This file controls to filter data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, main_structure } from "../interface";
import { read } from "../middlewares/data_control";
import { stringToJson } from "../utils";

export default function filter_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, data: data_structure | string) => {
		if (typeof data === "string") {
			data = stringToJson(data)
		}

		const keys = Object.keys(data)
		const values = Object.values(cache[table])
		// let filter: data_structure = {}
		// keys.forEach((key) => {
		const filter = values.filter(d => d[keys[0]] === data[keys[0]])
		// })

		return filter
	}
}
