/* NOTE: This file controls the entering from data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, json_data, main_structure } from "../interface";
import { save } from "../middlewares/data_control";

export default function insert_data(filename: string, key: string, currentData: main_structure) {
	const idGenerator = () => {
		const limit = 11
		const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		let code = ""
		for (let i = 0; i < limit; i++) {
			const p = Math.floor(Math.random() * chars.length)
			const c = chars[p]
			code += c
		}
		return code
	}

	return (table: string, data: data_structure, incremental?: boolean) => {
		let toTable: json_data = currentData[table]
		let id: string | number = 1
		if (!toTable) {
			toTable = {}
		}

		// TODO: For ID auto generator
		if (incremental && toTable) {
			const keys = Object.keys(toTable)
			id = keys[keys.length - 1] + 1
		} else {
			const keys = Object.keys(toTable)
			id = idGenerator()
			while (keys.includes(id)) {
				id = idGenerator()
			}
		}

		toTable[id] = data
		save(filename, key, currentData)
	}
}
