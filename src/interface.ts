export type data_structure = Record<string, string | number | boolean | null>
export type json_data = Record<string | number, data_structure>
export type table_struct = Record<string, string>
export type table_base = Record<string, table_struct>
export type main_structure = Record<string, json_data | table_base>

export interface insertOptions {
	increment?: boolean
	idLength?: number
}

export interface filterOptions {
	limit?: number
	start?: number
	query?: data_structure | string
}

export interface createTableOptions {
	unique?: string,
	autoincrement?: boolean
}
