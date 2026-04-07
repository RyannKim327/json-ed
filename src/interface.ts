export type data_structure = Record<string, string | number | boolean | null>
export type json_data = Record<string | number, data_structure>
export type table_struct = Record<string, string>
export type main_structure = Record<string, json_data | table_struct>

export interface insertOptions {
	increment?: boolean
	idLength?: number
}
