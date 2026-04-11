/* NOTE: This file controls to create a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { createTableOptions, main_structure, table_struct } from "../../interface";
import { read, save } from "../../middlewares/data_control";
import { c, isForbiddenKey, tableValidator } from "../../utils";
import { RESERVED_COLUMN, RESERVED_TABLE } from "../../reserved";

export default function createTable(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}
	return (table: string, columns: table_struct | string, { autoincrement, unique }: createTableOptions) => {

		// TODO: Changing the type structure

		table = table.toLowerCase()

		if (isForbiddenKey(table)) {
			throw new Error("Cannot use forbidden key as table name");
		}

		const regex = /^[A-Za-z_]+$/
		if (!regex.test(table)) {
			throw new Error("Table name only accepts alphabet characters and underscore")
		}

		// TODO: Anti destroy reserve table
		if (table === RESERVED_TABLE) {
			throw new Error(`Cannot access reserved table: ${RESERVED_TABLE}`);
		}

		if (autoincrement === undefined) {
			autoincrement = true
		}

		if (typeof columns === "string") {
			columns = tableValidator(columns)
		}

		if (columns[RESERVED_COLUMN] !== undefined) {
			delete columns[RESERVED_COLUMN]
			c("Creation of table", "w", `A reserve column is deleted`)
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

		if (unique !== undefined) {
			columns[RESERVED_COLUMN] = unique
		}

		cache[RESERVED_TABLE][table] = columns

		save(filename, key, cache)
		return {
			"message": "New table created"
		}
	}
}
