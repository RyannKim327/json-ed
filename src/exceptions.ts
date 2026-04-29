export class OrmyxTableExistenceException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "Table Existence Error"
		this.message = message

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, Error)
		} else {
			this.stack = (new Error()).stack
		}
	}
}

export class OrmyxForbiddenTableException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "Forbidden Table Error"
		this.message = message

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, Error)
		} else {
			this.stack = (new Error()).stack
		}
	}
}

export class OrmyxWhereClauseException extends Error {
	constructor(message: string) {
		super(message)
		this.name = "Where Clause Error"
		this.message = message

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, Error)
		} else {
			this.stack = (new Error()).stack
		}
	}
}
