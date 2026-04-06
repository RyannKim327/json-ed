# JsonED (JSON Encrypted Database)
### MPOP Reverse II [Ryann Kim M. Sesgundo]


[![wakatime](https://wakatime.com/badge/user/61954829-dd88-47de-8b67-7d673663ea1c/project/60a5ecd1-86d9-48f9-9ce9-abadb9470de2.svg)](https://wakatime.com/badge/user/61954829-dd88-47de-8b67-7d673663ea1c/project/60a5ecd1-86d9-48f9-9ce9-abadb9470de2)

**JsonED** is a TypeScript-based ORM-like library designed to manage JSON data as a relational-like database with built-in encryption. It simplifies data persistence by providing a structured way to handle tables, rows, and automatic ID generation while keeping your data secure.

## Note
> I don't recommend to use this for a large-scale projects, just use this for small projects and hobbies. This is just created for fun, and to expand my ideas and knowledge.

## Features

- **Relational Structure:** Organize your JSON data into tables and records.
- **Built-in Encryption:** Uses `json-enc-dec` to keep your database files secure.
- **Auto ID Generation:** Support for both random 12-character strings and incremental numeric IDs.
- **TypeScript Support:** Fully typed for a better developer experience.
- **Simple API:** Easy to initialize and perform basic CRUD (Create, Read, Update, Delete) operations.

## Installation

```bash
npm install json-ed
```

## How To

### 1. Initialization
Import `JsonED` and initialize your database. If the file doesn't exist, it will be automatically created with an encrypted empty structure.

```typescript
import JsonED from 'json-ed';

/**
 * @param key - Required: Secret key for encryption
 * @param filename - Optional: Name of the database file (defaults to "data")
 */
const db = JsonED('my-secret-key', 'my-database');
```

> **Note:** The filename will automatically append `.dat` if not provided.

### 2. Inserting Data
You can insert data into your tables by providing either a JSON object or a formatted string.

#### Using JSON (Object)
This method is recommended for more structured data or when handling nested structures (though keep in mind that the storage is primarily flat key-value pairs per ID).

```typescript
// insert(table: string, data: object, opts?: insertOptions)
db.insert('users', {
    username: 'ryannkim',
    role: 'developer',
    active: true
});
```

#### Using String Format
You can also insert data using a comma-separated string format. This supports various data types and allows for quoted strings if the value contains commas.

```typescript
// Format: key = value, key2 = value2
db.insert('users', "username = user, age = 10, active = true, bio = 'software engineer, hobbyist'");
```

**String Format Rules:**
- **Key-Value Pairs:** Each pair should follow the `key = value` pattern.
- **Data Types:** Automatically parses `true`/`false` as booleans and numeric strings as numbers.
- **Quotes:** Use single (`'`) or double (`"`) quotes for values that contain commas or special characters.
- **Separators:** Use commas (`,`) to separate different fields.

#### ID Generation Strategies
By default, IDs are incremental (1, 2, 3...). You can customize this using the `opts` parameter.

```typescript
// Generates incremental ID: 1, 2, 3... (Default)
db.insert('logs', { event: 'startup' }, { increment: true });

// Generates random 12-character alphanumeric ID: "aB3cDe4fGh5i"
db.insert('sessions', { token: 'xyz123' }, { increment: false });

// Generates random ID with custom length (minimum 6)
db.insert('tokens', { value: 'abc' }, { increment: false, idLength: 16 });
```

### 3. Reading Data
Retrieve a specific record by its table and ID.

```typescript
// read(table: string, id: string | number)
const user = db.read('users', 1);
console.log(user);
```

### 4. Updating Data
Modify an existing record. You can provide the new data as an object or a string format. This will merge the new data with the existing record.

```typescript
// update(table: string, id: string | number, data: object | string)
db.update('users', 1, { active: false });

// Using string format
db.update('users', 1, "role = administrator, active = true");
```

### 5. Deleting Data
Remove a specific record from a table.

```typescript
// remove(table: string, id: string | number)
db.remove('users', 1);
```

## Data Structure

The internal structure of the database follows a hierarchical JSON format, organized by tables and unique identifiers:

```typescript
{
  [table: string]: {
    [id: string | number]: {
      [column: string]: string | number | boolean | undefined | null
    }
  }
}
```

### TypeScript Interfaces

```typescript
type data_structure = Record<string, string | number | boolean | undefined | null>
type json_data = Record<string | number, data_structure>
type main_structure = Record<string, json_data>

interface insertOptions {
	increment?: boolean
	idLength?: number
}
```

## How it Works

1. **Initialization:** `JsonED()` checks for the existence of the database file. If it doesn't exist, it generates a new encrypted JSON structure.
2. **Operations:** When you call `insert()`, `update()`, or `remove()`, the library:
   - Validates the table and ID.
   - Generates/Modifies/Deletes the data accordingly.
   - Re-encrypts and saves the file automatically.
3. **Encryption:** All data is stored in an encrypted format using your provided key, making it unreadable without the proper credentials.

## License

This project is licensed under the [MIT License](LICENSE.md).
