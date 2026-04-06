import { data_structure, main_structure } from "../interface";

export default function sanitizingData(table: string, data: data_structure, cache: main_structure) {
	const allowedColumns = cache[`tbl_struct_${table}`]

	// TODO: Key filteration
	if (
		!Array.isArray(allowedColumns) ||
		!allowedColumns.every(col => typeof col === "string")
	) {
		return {
			"error": "Invalid keys"
		};
	}

	const temp = data
	data = {}
	allowedColumns.forEach((column: string) => {
		data[column] = temp[column] ?? null
	})

	return data
}
