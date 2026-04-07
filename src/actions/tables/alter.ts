/* NOTE: This file controls to alter or modify a table inside of json file
 * The code structure is like this file in the repository fca-unofficial
 * https://github.com/VangBanLaNhat/fca-unofficial/blob/master/src/controllers/sendMessageMqtt.js
 */

import { main_structure } from "../../interface";

export default function alter(filename: string, key: string, cache: main_structure) {
	return (table: string, newCol?: string[], deleteCol?: string[]) => {
		// TODO: Development soon, but I already have an idea, I need to figure it out first
	}
}
