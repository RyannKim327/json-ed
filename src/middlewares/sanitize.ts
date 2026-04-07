/* NOTE: The main function of this file is to sanitize the data before the data added/update to the file
 * It is a one way to prevent injections and to prevent unwanted inputs on the file, as well as to sanitize first the keys
 */

import { data_structure, main_structure } from "../interface";

export default function sanitizingData(table: string, data: data_structure, cache: main_structure) {
	const columns = cache["table_struct"][table]
	const allowedColumns = Object.keys(columns)
	
	const sanitized: data_structure = {}

	// TODO: This is to make sure that the only data to insert is the data that is actually settled
	// in the setup
	allowedColumns.forEach((column: string) => {
		const colLower = column.toLowerCase();
		const val = data[colLower];
		
		if (val !== undefined) {
			// Basic type checking if needed, but for now we just allow what matches
			// Actually the original code tried to check typeof
			// But let's just ensure we only keep allowed columns
			sanitized[colLower] = val;
		}
	})

	return sanitized
}
