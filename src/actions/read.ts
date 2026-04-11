/* NOTE: This file controls the reading data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../interface";
import { read } from "../middlewares/data_control";
import { c, isForbiddenKey } from "../utils";
import { RESERVED_TABLE } from "../reserved";

export default function read_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, id: string | number) => {
		table = table.toLowerCase()

		if (isForbiddenKey(table) || isForbiddenKey(id)) {
			throw new Error("Cannot use forbidden key as table name or id");
		}

		// TODO: To prevent reserved table to access
		if (table === RESERVED_TABLE) {
			throw new Error(`Cannot access reserved table: ${RESERVED_TABLE}`);
		}

		if (cache[table] === undefined) {
			throw new Error("The table is not found")
		}

		if (cache[table][id] === undefined) {
			c("Read Data", "e", `No data found related to ID: ${id}`)
			return
		}

		return cache[table][id]
	}
}
