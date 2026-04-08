/* NOTE: This file controls to alter or modify a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure, table_struct } from "../../interface";
import { read, save } from "../../middlewares/data_control";
import { tableValidator } from "../../utils";

export default function alter(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}
	return (table: string, newCol?: string | table_struct, deleteCol?: string[]) => {
		// TODO: Development soon, but I already have an idea, I need to figure it out first
		table = table.toLowerCase()
		const reservedTable = "table_struct"

		if (table === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (cache[reservedTable][table] === undefined) {
			throw new Error("The table is not existed")
		}

		// TODO: To solve type error
		let current: table_struct = cache[reservedTable]?.[table] as table_struct;

		if (deleteCol !== undefined) {
			deleteCol.forEach((k) => {
				if (current[k] !== undefined) {
					if (k !== "id") {
						delete current[k]
					}
				}
			})
		}

		if (newCol !== undefined) {
			if (typeof newCol === "string") {
				newCol = tableValidator(newCol)
			}
			if (newCol["id"]) delete newCol["id"]

			current = {
				...current,
				...newCol
			}
		}

		cache[reservedTable][table] = current;
		save(filename, key, cache);
		return cache
	}
}
