/* NOTE: This file controls the deletion data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../interface";
import { read, save } from "../middlewares/data_control";

export default function delete_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, id: string | number) => {
		if (cache[table] === undefined) {
			throw new Error("No Table Found")
		}

		// TODO: To deletethe data
		if (cache[table][id] === undefined) {
			throw new Error(`Can't delete data because it is not existed`)
		}
		delete cache[table][id]

		save(filename, key, cache)
		return {
			"message": "Deleted successfully"
		}
	}
}
