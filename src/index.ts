/* INFO: ORMYX or basically named as vokes ORM (Object-Relational Mapping) + “mix” (the idea of relational JSON mixing).
 * It is a program developed to make an ORM like program
 * This was created and initiated on 04-05-26 with purely typescript.
 *
 * Author: Ryann Kim M. Sesgundo
 */


import generateJSON from "./middlewares/generate";
import insert_data from "./actions/insert";
import read_data from "./actions/read";
import { main_structure } from "./interface";
import update_data from "./actions/update";
import delete_data from "./actions/delete";
import create_table from "./actions/tables/create";
import alter_table from "./actions/tables/alter";
import renameTable from "./actions/tables/rename";
import filter_data from "./actions/filter";
import * as path from "path";

export function ormyx(key: string, filename?: string) {
	// TODO: To create a default name if it is blank
	if (filename === undefined) {
		filename = "data"
	}

	if (filename.replace(/\s/gi, "").length < 3) {
		throw new Error("Filename is too short")
	}

	// TODO: To filter the filename to prevent multi dots and path traversal
	filename = path.basename(filename);
	filename = filename.split(".")[0];

	if (!filename.endsWith(".dat")) {
		filename += ".dat"
	}

	// TODO: To generate the file first
	const cache: main_structure = generateJSON(filename, key)

	// INFO: The return functions or public functions
	// INFO: Function about data
	const insert = insert_data(filename, key, cache)
	const read = read_data(filename, key, cache)
	const update = update_data(filename, key, cache)
	const remove = delete_data(filename, key, cache)
	const filter = filter_data(filename, key, cache)

	// INFO: Functions about table
	const create = create_table(filename, key, cache)
	const alter = alter_table(filename, key, cache)
	const rename = renameTable(filename, key, cache)

	return {
		// INFO: Data actions
		insert,
		filter,
		read,
		remove,
		update,

		// INFO: Table actions
		alter,
		create,
		rename
	}
}
