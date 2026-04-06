/* NOTE: The main function of this file is to sanitize the data before the data added/update to the file
 * It is a one way to prevent injections and to prevent unwanted inputs on the file, as well as to sanitize first the keys
 */

import { data_structure, main_structure } from "../interface";

export default function sanitizingData(table: string, data: data_structure, cache: main_structure) {
	const allowedColumns = cache["table_struct"][table]

	// TODO: Key filteration
	Object.keys(data).map((key: string) => {
		if (Array.isArray(allowedColumns)) {
			if (!allowedColumns.includes(key.toLowerCase())) {
				delete data[key]
			}
		}

	})

	const temp: data_structure = data
	data = {}
	if (Array.isArray(allowedColumns)) {
		allowedColumns.forEach((column: string) => {
			data[column.toLowerCase()] = temp[column.toLowerCase()] ?? null
		})
	}

	return data
}
