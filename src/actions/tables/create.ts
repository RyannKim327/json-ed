/* NOTE: This file controls to create a tabale inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../../interface";
import { read } from "../../middlewares/data_control";

export default function createTable(filename: string, key: string, cache: main_structure) {
	return (table: string, columns: string[]) => {
		if (Object.keys(cache).length === 0) {
			Object.assign(cache, read(filename, key))
		}

		// TODO: To prevent overwrite of the table
		if (cache[table] !== undefined) {
			throw new Error("Table is already existed")
		}

		// TODO: Clearing cache table
		cache[table] = {}
		cache[`tbl_struct_${table}`] = columns

		return {
			"message": "New table created"
		}
	}
}
