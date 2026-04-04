/* NOTE: This file controls the entering from data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, json_data, main_structure } from "../interface";
import { read, save } from "../middlewares/data_control";

export default function insert_data(filename: string, key: string) {
	const main_data = read(filename, key)

	const idGenerator = () => {
		const limit = 12
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
		if (incremental === undefined) {
			incremental = true
		}

		let id: string | number = 1
		if (main_data[table] === undefined) {
			main_data[table] = {}
		}

		console.log(main_data)

		// TODO: For ID auto generator
		const keys = Object.keys(main_data[table])
		if (incremental && keys.length > 0) {
			const keys = Object.keys(main_data[table])
			id = keys[keys.length - 1]
			if (typeof (id) === "number") {
				id++
			} else {
				try {
					id = parseInt(id)
					id++
				} catch (e) {
					throw new Error("ID can't be parse to numbers")
				}
			}
		} else if (!incremental && main_data[table] !== undefined) {
			const keys = Object.keys(main_data[table])
			id = idGenerator()
			while (keys.includes(id)) {
				id = idGenerator()
			}
		} else if (!incremental) {
			id = idGenerator()
		}

		main_data[table][id] = data
		console.log(main_data)
		save(filename, key, main_data)
		return main_data
	}
}
