import { data_structure, main_structure } from "../interface";

export default function sanitizingData(table: string, data: data_structure, cache: main_structure) {
	const allowedColumns = cache["table_struct"][table]

	// TODO: Key filteration
	if (
		!Array.isArray(allowedColumns) ||
		!Object.keys(data).every(col => typeof allowedColumns.includes(col.toLowerCase()))
	) {
		return {
			"error": "Invalid keys"
		};
	}

	const temp: data_structure = data
	data = {}
	allowedColumns.forEach((column: string) => {
		data[column.toLowerCase()] = temp[column.toLowerCase()] ?? null
	})

	return data
}
