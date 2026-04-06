# JsonED (JSON Encrypted Database)
### MPOP Reverse II [Ryann Kim M. Sesgundo]

[![wakatime](https://wakatime.com/badge/user/61954829-dd88-47de-8b67-7d673663ea1c/project/60a5ecd1-86d9-48f9-9ce9-abadb9470de2.svg)](https://wakatime.com/badge/user/61954829-dd88-47de-8b67-7d673663ea1c/project/60a5ecd1-86d9-48f9-9ce9-abadb9470de2)

**JsonED** is a TypeScript-based ORM-like library designed to manage JSON data as a relational-like database with built-in encryption. It simplifies data persistence by providing a structured way to handle tables, rows, and automatic ID generation while keeping your data secure.

## Note
> I don't recommend using this for large-scale projects; it's best suited for small projects, prototypes, or hobbies. This was created for fun and as a way to expand my ideas and knowledge.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [How To](#how-to)
  - [1. Initialization](#1-initialization)
  - [2. Creating Tables (Optional)](#2-creating-tables-optional)
  - [3. Inserting Data](#3-inserting-data)
  - [4. Reading Data](#4-reading-data)
  - [5. Updating Data](#5-updating-data)
  - [6. Deleting Data](#6-deleting-data)
- [Data Structure](#data-structure)
- [How it Works](#how-it-works)
- [Security Best Practices](#security-best-practices)
- [License](#license)

## Features

- **Relational Structure:** Organize your JSON data into tables and records.
- **Built-in Encryption:** Uses `json-enc-dec` to keep your database files secure.
- **Auto ID Generation:** Support for both random 12-character strings and incremental numeric IDs.
- **Flexible Data Insertion:** Support for both JSON objects and easy-to-use string formats.
- **TypeScript Support:** Fully typed for an enhanced developer experience.

## Installation

```bash
npm install json-ed
```

## How To

### 1. Initialization
Import `JsonED` and initialize your database. If the file doesn't exist, it will be automatically created with an encrypted structure.

```typescript
import JsonED from 'json-ed';

/**
 * @param key - Required: Secret key for encryption (must be kept safe!)
 * @param filename - Optional: Name of the database file (defaults to "data")
 */
const db = JsonED('my-secret-key', 'my-database');
```

> **Note:** The filename will automatically append `.dat` if not provided.

### 2. Creating Tables (Optional)
While `JsonED` automatically creates tables when you first insert data, you can explicitly create a table to define its structure.

```typescript
// create(table: string, columns: string[])
db.create('users', ['username', 'email', 'role', 'active']);
```

### 3. Inserting Data
You can insert data into your tables by providing either a JSON object or a formatted string. If the table doesn't exist, it will be created automatically.

#### Using JSON (Object)
This method is recommended for structured data.

```typescript
// insert(table: string, data: object, opts?: insertOptions)
db.insert('users', {
    username: 'ryannkim',
    role: 'developer',
    active: true
});
```

#### Using String Format
You can also insert data using a simple `key = value` string format.

```typescript
// Format: key = value, key2 = value2
db.insert('users', "username = user, age = 10, active = true, bio = 'software engineer, hobbyist'");
```

**String Format Rules:**
- **Key-Value Pairs:** Each pair follows the `key = value` pattern.
- **Data Types:** Automatically parses `true`/`false` as booleans and numeric strings as numbers.
- **Quotes:** Use single (`'`) or double (`"`) quotes for values that contain commas or special characters.
- **Separators:** Use commas (`,`) to separate different fields.

#### ID Generation Strategies
By default, IDs are incremental (1, 2, 3...). You can customize this using the `opts` parameter.

```typescript
// Incremental ID: 1, 2, 3... (Default)
db.insert('logs', { event: 'startup' }, { increment: true });

// Random 12-character alphanumeric ID: "aB3cDe4fGh5i"
db.insert('sessions', { token: 'xyz123' }, { increment: false });

// Random ID with custom length (minimum 6)
db.insert('tokens', { value: 'abc' }, { increment: false, idLength: 16 });
```

### 4. Reading Data
Retrieve a specific record by its table and ID.

```typescript
// read(table: string, id: string | number)
const user = db.read('users', 1);

if (user.error) {
    console.error(user.error);
} else {
    console.log(user);
}
```

### 5. Updating Data
Modify an existing record. You can provide the new data as an object or a string format. This will merge the new data with the existing record.

```typescript
// update(table: string, id: string | number, data: object | string)
db.update('users', 1, { active: false });

// Using string format
db.update('users', 1, "role = administrator, active = true");
```

### 6. Deleting Data
Remove a specific record from a table.

```typescript
// remove(table: string, id: string | number)
db.remove('users', 1);
```

## Data Structure

The internal structure of the database follows a hierarchical JSON format:

```typescript
{
  "table_struct": {
    "table_name": ["column1", "column2", "id"]
  },
  "table_name": {
    "1": {
      "column1": "value",
      "id": 1
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

1. **Initialization:** `JsonED()` checks for the existence of the database file. If missing, it creates a new encrypted file with an initialized table structure.
2. **Operations:** When calling `insert()`, `update()`, or `remove()`, the library:
   - Synchronizes with the encrypted file.
   - Performs the requested operation on the data cache.
   - Automatically re-encrypts and saves the file to disk.
3. **Encryption:** All data is encrypted using `json-enc-dec`, ensuring that even if someone gains access to the `.dat` file, the content remains secure without the key.

## Security Best Practices

- **Keep Your Key Secret:** Your encryption key is the only way to recover your data. Never hardcode it in public repositories. Use environment variables.
- **Backup Your Data:** While `JsonED` is secure, always keep backups of your `.dat` files.
- **Key Consistency:** Using a different key on an existing database will fail to decrypt the data correctly.

## License

This project is licensed under the [MIT License](LICENSE.md).
