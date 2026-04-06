export type data_structure = Record<string, string | number | boolean | null>
export type json_data = Record<string | number, data_structure | string[]>
export type main_structure = Record<string, json_data>

export interface insertOptions {
	increment?: boolean
	idLength?: number
}
