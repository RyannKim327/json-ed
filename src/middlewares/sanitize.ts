import { data_structure, main_structure } from "../interface";

export default function sanitizingData(table: string, data: data_structure, cache: main_structure): data_structure | { error: string } {
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
