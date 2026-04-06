/* NOTE: This file controls to create a tabale inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../../interface";
import { read } from "../../middlewares/data_control";

export default function createTable(filename: string, key: string, cache: main_structure) {
	return (table: string, columns: string[]) => {
		table = table.toLowerCase()

		// TODO: Anti destroy reserve table
		if (table === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (Object.keys(cache).length === 0) {
			Object.assign(cache, read(filename, key))
		}

		// TODO: To prevent overwrite of the table
		if (cache[table] !== undefined) {
			throw new Error("Table is already existed")
		}

		// TODO: Clearing cache table
		cache[table] = {}

		// TODO: To make all columns in lowercase
		for (let i = 0; i < columns.length; i++) {
			columns[i] = columns[i].toLowerCase()
		}

		if (!columns.includes("id")) {
			columns.push("id")
		}

		cache["table_struct"][table] = columns

		return {
			"message": "New table created"
		}
	}
}
