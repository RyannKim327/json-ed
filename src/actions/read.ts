/* NOTE: This file controls the reading data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../interface";
import { read } from "../middlewares/data_control";

export default function read_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, id: string | number) => {
		if (cache[table] === undefined) {
			throw new Error("The table is not found")
		}

		if (cache[table][id]) {
			return { "error": `No data found related to ID: ${id}` }
		}

		return cache[table][id]
	}
}
