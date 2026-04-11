/* NOTE: This file controls to filter data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, filterOptions, main_structure } from "../interface";
import { read } from "../middlewares/data_control";
import { isForbiddenKey, stringToJson } from "../utils";

export default function filter_data(filename: string, key: string, cache: main_structure) {
	if (Object.keys(cache).length === 0) {
		Object.assign(cache, read(filename, key))
	}

	return (table: string, opts: filterOptions) => {
		table = table.toLowerCase();
		if (isForbiddenKey(table)) {
			throw new Error("Cannot use forbidden key as table name");
		}

		if (opts === undefined) {
			opts = {
				limit: 10,
				start: 0,
			}
		}

		if (typeof opts.query === "string") {
			opts.query = stringToJson(opts.query)
		}

		// TODO: This function is good for paginator
		// To Prevent long load time
		if (opts?.limit === undefined) {
			opts.limit = 10
		}

		// TODO: To initially starts with the first index
		if (opts?.start === undefined) {
			opts.start = 0
		}

		let filteredData: data_structure[] = []
		// const keys = Object.keys(opts?.query ?? {})
		const values = Object.values(cache[table])

		// TODO: Setup defaults if negative
		if (opts.start <= 0) {
			opts.start = 0
		}

		if (opts.limit <= 0) {
			opts.limit = 10
		}

		// TODO: To setup defaults if the number is greater than the total of data
		if (opts.start >= values.length) {
			opts.start = values.length
		}

		if (opts.limit >= values.length) {
			opts.limit = values.length
		}

		if (opts.query !== undefined) {
			// TODO: To search with specific data
			for (let [i, x] = [opts.start, opts.start]; i < opts.limit && x < opts.limit; x++) {
				i++
			}
		} else {
			// TODO: Select All
			for (let i = opts.start; i < opts.limit; i++) {
				filteredData.push(values[i])
			}
		}

		return filteredData
	}
}
