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

		if (deleteCol !== undefined) {
			deleteCol.map((col: string, i: number) => {
				if (Array.isArray(cache[reservedTable][table])) {
					if (cache[reservedTable][table][i] !== col) {
						cache[reservedTable][table] = cache[reservedTable][table].splice(i, 1)
					}
				}
			})
		}
		if (newCol !== undefined) {
			if (Array.isArray(cache[reservedTable][table])) {
				cache[reservedTable][table] = [...cache[reservedTable][table], ...newCol]
			}
		}
		save(filename, key, cache)
		return cache
	}
}
