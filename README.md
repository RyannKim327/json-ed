# JsonED (JSON Encrypted Database)

[![wakatime](https://wakatime.com/badge/user/61954829-dd88-47de-8b67-7d673663ea1c/project/60a5ecd1-86d9-48f9-9ce9-abadb9470de2.svg)](https://wakatime.com/badge/user/61954829-dd88-47de-8b67-7d673663ea1c/project/60a5ecd1-86d9-48f9-9ce9-abadb9470de2)

**JsonED** is a TypeScript-based ORM-like library designed to manage JSON data as a relational-like database with built-in encryption. It simplifies data persistence by providing a structured way to handle tables, rows, and automatic ID generation while keeping your data secure.

## Note
> I don't recommend to use this for a large-scale projects, just use this for small projects and hobbies. This is just created for fun, and to expand my ideas and knowledge.

## Features

- **Relational Structure:** Organize your JSON data into tables and records.
- **Built-in Encryption:** Uses `json-enc-dec` to keep your database files secure.
- **Auto ID Generation:** Support for both random 12-character strings and incremental numeric IDs.
- **TypeScript Support:** Fully typed for a better developer experience.
- **Simple API:** Easy to initialize and perform basic operations.

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
 * @param filename - Optional: Name of the database file (defaults to "data")
 * @param key - Optional: Secret key for encryption (defaults to "random text from the internet")
 */
const db = JsonED('my-database', 'my-secret-key');
```

> **Note:** The filename will automatically append `.dat` if not provided.

### 2. Inserting Data
You can insert data using either a structured object or a comma-separated string format.

#### Using Objects
```typescript
// insert(table: string, data: object, incremental?: boolean)
db.insert('users', {
    username: 'ryannkim',
    role: 'developer',
    active: true
});
```

#### Using String Format
```typescript
db.insert('users', 'username = user1, role = guest, active = false');
```

#### ID Generation Strategies
- **Incremental IDs (Default):** Set `incremental` to `true` (or leave it out) to use numeric IDs (1, 2, 3...).
- **Random IDs:** Set `incremental` to `false` to use random 12-character alphanumeric strings.

```typescript
// Generates incremental ID: 1, 2, 3...
db.insert('logs', { event: 'startup' }, true);

// Generates random ID: "aB3cDe4fGh5i"
db.insert('sessions', { token: 'xyz123' }, false);
```

### 3. Reading Data
Retrieve a specific record by its table and ID.

```typescript
// read(table: string, id: string | number)
const user = db.read('users', 1);
console.log(user);
```

## Data Structure

The internal structure of the database follows a hierarchical JSON format, organized by tables and unique identifiers:

```typescript
{
  [table: string]: {
    [id: string | number]: {
      [column: string]: string | number | boolean
    }
  }
}
```

### TypeScript Interfaces

```typescript
type data_structure = Record<string, string | number | boolean>
type json_data = Record<string | number, data_structure>
type main_structure = Record<string, json_data>
```

## How it Works

1. **Initialization:** `JsonED()` checks for the existence of the database file. If it doesn't exist, it generates a new encrypted JSON structure.
2. **Insertion:** When you call `insert()`, the library:
   - Validates the table.
   - Generates a unique ID (random or incremental).
   - Appends the data.
   - Re-encrypts and saves the file automatically.
3. **Encryption:** All data is stored in an encrypted format using your provided key, making it unreadable without the proper credentials.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Author

**Ryann Kim M. Sesgundo**

