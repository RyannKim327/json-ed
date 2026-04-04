/* NOTE: This file controls the entering from data as raw to json
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { data_structure, json_data, main_structure } from "../interface";
import { read } from "../middlewares/data_control";

export default function read_data(filename: string, key: string) {
	const main_data = read(filename, key)
	return (table: string, id: string | number) => {
		return main_data[table][id]
	}
}
