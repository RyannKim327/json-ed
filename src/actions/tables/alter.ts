/* NOTE: This file controls to alter or modify a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure, table_struct } from "../../interface";
import { save } from "../../middlewares/data_control";
import { tableValidator } from "../../utils";

export default function alter(filename: string, key: string, cache: main_structure) {

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

		// FIX: Type error
		const current: table_struct = cache[reservedTable]?.[table];

		if (Array.isArray(current)) {
			let updated: table_struct = current;

			if (deleteCol !== undefined) {
				for (const key of Object.keys(updated)) {
					if (!deleteCol.includes(key)) {
						delete updated[key];
					}
				}
			}

			if (newCol !== undefined) {
				if (typeof newCol === "string") {
					newCol = tableValidator(newCol)
				}

				updated = {
					...updated,
					...newCol
				}
				// const cols: string[] = Array.isArray(newCol)
				// 	? newCol
				// 	: Object.values(newCol); // convert Record → string[]
				//
				// updated = [...updated, ...cols];
			}

			cache[reservedTable][table] = updated;
			save(filename, key, cache)

		}

		return cache
	}
}
