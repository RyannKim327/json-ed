/* NOTE: This file controls to alter or modify a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../../interface";
import { save } from "../../middlewares/data_control";
import { c } from "../../utils";

export default function alter(filename: string, key: string, cache: main_structure) {
	return (table: string, newCol?: string[], deleteCol?: string[]) => {
		// TODO: Development soon, but I already have an idea, I need to figure it out first
		table = table.toLowerCase()
		const reservedTable = "table_struct"

		if (table === "table_struct") {
			throw new Error("Cannot access reserved table: table_struct");
		}

		if (cache[reservedTable][table] === undefined) {
			throw new Error("The table is not existed")
		}

		const current = cache[reservedTable]?.[table];

		if (Array.isArray(current)) {
			let updated: string[] = [...current];

			if (deleteCol !== undefined) {
				updated = updated.filter(
					(col: string) => !deleteCol.includes(col)
				);
			}

			if (newCol !== undefined) {
				const cols: string[] = Array.isArray(newCol)
					? newCol
					: Object.values(newCol); // convert Record → string[]

				updated = [...updated, ...cols];
			}

			cache[reservedTable][table] = updated;
			save(filename, key, cache)

		}

		return cache
	}
}
