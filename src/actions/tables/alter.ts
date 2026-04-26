/* NOTE: This file controls to alter or modify a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure, table_struct } from "../../interface";
import { read, save } from "../../middlewares/data_control";
import { c, isForbiddenKey, tableValidator } from "../../utils";
import { RESERVED_COLUMN, RESERVED_TABLE } from "../../reserved";

export default function alter(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}
	return (table: string, newCol?: string | table_struct, deleteCol?: string[]) => {
		// TODO: Development soon, but I already have an idea, I need to figure it out first
		table = table.toLowerCase()

		if (isForbiddenKey(table)) {
			throw new Error("Cannot use forbidden key as table name");
		}

		if (table === RESERVED_TABLE) {
			throw new Error(`Cannot access reserved table: ${RESERVED_TABLE}`);
		}

		if (cache[RESERVED_TABLE][table] === undefined) {
			throw new Error("The table is not existed")
		}

		// TODO: To solve type error
		let current: table_struct = cache[RESERVED_TABLE]?.[table] as table_struct;

		if (deleteCol !== undefined) {
			deleteCol.forEach((k) => {
				if (current[k] !== undefined) {
					if (k !== "id" && k !== RESERVED_COLUMN) {
						delete current[k]
					}
				}
			})
		}

		if (newCol !== undefined) {
			if (typeof newCol === "string") {
				newCol = tableValidator(newCol)
			}

			if (newCol[RESERVED_COLUMN] !== undefined) {
				delete newCol[RESERVED_COLUMN]
				c("Altering table", "w", `A reserve column is deleted`)
			}

			if (newCol["id"]) delete newCol["id"]
			if (newCol[RESERVED_COLUMN]) delete newCol[RESERVED_COLUMN]


			current = {
				...current,
				...newCol
			}
		}

		cache[RESERVED_TABLE][table] = current;
		save(filename, key, cache);
		return cache
	}
}
