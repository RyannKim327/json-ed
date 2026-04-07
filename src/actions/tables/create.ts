/* NOTE: This file controls to create a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure, table_struct } from "../../interface";
import { read, save } from "../../middlewares/data_control";
import { c, tableValidator } from "../../utils";

export default function createTable(filename: string, key: string, cache: main_structure) {
	return (table: string, columns: table_struct | string, autoincrement?: boolean) => {
		table = table.toLowerCase()

		// TODO: Anti destroy reserve table
		if (table === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (autoincrement === undefined) {
			autoincrement = true
		}

		if (typeof columns === "string") {
			columns = tableValidator(columns) as table_struct
		}

		if (Object.keys(cache).length === 0) {
			Object.assign(cache, read(filename, key))
		}

		// TODO: To prevent overwrite of the table
		if (cache[table] !== undefined) {
			c("Create Table", "e", "Table is already existed")
			return
		}

		// TODO: Clearing cache table
		cache[table] = {}

		const allowedIdType = ["string", "number", "int"]

		if (columns["id"] === undefined) {
			columns["id"] = "number"
		}

		if (!allowedIdType.includes(columns["id"])) {
			throw new Error("ID only requires string or number/int datatype")
		}

		cache["table_struct"][table] = columns

		save(filename, key, cache)
		return {
			"message": "New table created"
		}
	}
}
