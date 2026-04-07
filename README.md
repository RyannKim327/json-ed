# Ormyx (JSON-based Relational Database)
### MPOP Reverse II [Ryann Kim M. Sesgundo]

[![wakatime](https://wakatime.com/badge/user/61954829-dd88-47de-8b67-7d673663ea1c/project/60a5ecd1-86d9-48f9-9ce9-abadb9470de2.svg)](https://wakatime.com/badge/user/61954829-dd88-47de-8b67-7d673663ea1c/project/60a5ecd1-86d9-48f9-9ce9-abadb9470de2)
[![npm version](https://img.shields.io/npm/v/ormyx.svg)](https://www.npmjs.com/package/ormyx)

**Ormyx** is a TypeScript-based ORM-like library designed to manage JSON data as a relational-like database with built-in encryption. It simplifies data persistence by providing a structured way to handle tables, rows, and automatic ID generation while keeping your data secure.

## Note
> I don't recommend using this for large-scale projects; it's best suited for small projects, prototypes, or hobbies. This was created for fun and as a way to expand my ideas and knowledge.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [How To](#how-to)
  - [1. Initialization](#1-initialization)
  - [2. Creating Tables (Required)](#2-creating-tables-required)
  - [3. Inserting Data](#3-inserting-data)
  - [4. Reading Data](#4-reading-data)
  - [5. Updating Data](#5-updating-data)
  - [6. Deleting Data](#6-deleting-data)
  - [7. Altering Tables](#7-altering-tables)
- [Data Structure](#data-structure)
- [How it Works](#how-it-works)
- [Security Best Practices](#security-best-practices)
- [Changelog](CHANGELOG.md)
- [License](#license)

## Features

- **Relational Structure:** Organize your JSON data into tables and records.
- **Built-in Encryption:** Uses `json-enc-dec` to keep your database files secure.
- **Auto ID Generation:** Support for both random 12-character strings and incremental numeric IDs.
- **Flexible Data Insertion:** Support for both JSON objects and easy-to-use string formats.
- **TypeScript Support:** Fully typed for an enhanced developer experience.

## Installation

```bash
npm install ormyx
```

## How To

### 1. Initialization
#### `ormyx(key: string, filename?: string)`
To get started, you need to initialize **Ormyx** with a secret encryption key. If the database file does not exist, it will be created automatically.

**Option A: Providing a Custom Filename**
You can specify a name for your database. The `.dat` extension will be added automatically if you don't provide it.

```typescript
import { ormyx } from 'ormyx';

// This creates/loads 'my-database.dat'
const db = ormyx('your-secret-key', 'my-database');
```

**Option B: Using the Default Filename (Optional)**
If you omit the second parameter, the database will default to `data.dat`.

```typescript
import { ormyx } from 'ormyx';

// This creates/loads 'data.dat'
const db = ormyx('your-secret-key');
```

> **Warning:** The encryption key is the only way to access your data. If you lose the key or use a different one later, you will not be able to read the existing database. Always store your keys in environment variables!

### 2. Creating Tables (Required)
#### `db.create(tableName: string, columns: string[])`
You **must** create a table before you can insert any data. This defines the structure and prevents unauthorized table access.

```typescript
// Example: db.create('users', ['username', 'email', 'role', 'active'])
db.create('users', ['username', 'email', 'role', 'active']);
```

### 3. Inserting Data
#### `db.insert(tableName: string, data: object | string, options?: insertOptions)`
You can insert data into your tables by providing either a JSON object or a formatted string. 

#### Using JSON Object (Recommended)
This method is recommended for structured data and better type safety.

```typescript
// Example: db.insert('users', { username: 'ryannkim', active: true })
try {
    const result = db.insert('users', {
        username: 'ryannkim',
        role: 'developer',
        active: true
    });
    console.log('Inserted record:', result);
} catch (error) {
    console.error('Failed to insert:', error.message);
}
```

#### Using String Format
A convenient shorthand for simple data entry.

```typescript
// Example: db.insert('users', "username = mpop, role = admin")
db.insert('users', "username = mpop, role = admin, active = true");
```

**String Format Rules:**
- **Pairs:** Use `key = value` format.
- **Types:** Numbers and booleans (`true`/`false`) are automatically parsed.
- **Quotes:** Wrap values in `'` or `"` if they contain commas or special characters.
- **Separators:** Separate fields with a comma (`,`).

#### ID Generation Strategies
Control how IDs are generated via the `options` parameter.

```typescript
// Incremental ID: 1, 2, 3... (Default)
db.insert('logs', { event: 'startup' }, { increment: true });

// Random 12-character alphanumeric ID
db.insert('sessions', { token: 'xyz123' }, { increment: false });

// Random ID with custom length (minimum 6)
db.insert('tokens', { value: 'abc' }, { increment: false, idLength: 16 });
```

### 4. Reading Data
#### `db.read(tableName: string, id: string | number)`
Retrieve a specific record by its ID.

```typescript
// Example: db.read('users', 1)
const user = db.read('users', 1);

if (user) {
    console.log('User data:', user);
} else {
    console.error('Record not found');
}
```

### 5. Updating Data
#### `db.update(tableName: string, id: string | number, data: object | string)`
Modify an existing record. New data is merged with the existing record.

```typescript
// Example: db.update('users', 1, { active: false })
db.update('users', 1, { active: false });

// Using string format
db.update('users', 1, "role = administrator, active = true");
```

### 6. Deleting Data
#### `db.remove(tableName: string, id: string | number)`
Remove a specific record from a table.

```typescript
// Example: db.remove('users', 1)
const status = db.remove('users', 1);
console.log(status.message); // "Deleted successfully"
```

### 7. Altering Tables
#### `db.alter(tableName: string, newColumns?: string[], deleteColumns?: string[])`
Modify the structure of an existing table. You can add new columns or remove existing ones.

```typescript
// Add new columns to the 'users' table
db.alter('users', ['age', 'gender']);

// Remove columns from the 'users' table
db.alter('users', undefined, ['role']);

// Add and remove columns simultaneously
db.alter('users', ['address'], ['active']);
```

## Data Structure

The internal structure of the database follows a hierarchical JSON format:

```json
{
  "table_struct": {
    "users": ["username", "email", "role", "active", "id"]
  },
  "users": {
    "1": {
      "username": "ryannkim",
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

1. **Initialization:** `ormyx()` checks for the database file. If missing, it initializes a new encrypted file.
2. **Operations:** Every write operation (`insert`, `update`, `remove`) synchronizes with the encrypted file, performs the operation in-memory, and then flushes the re-encrypted data back to disk.
3. **Encryption:** Powered by `json-enc-dec`, ensuring data at rest is secure.

## Contributing

Contributions are welcome! To maintain a clean and manageable history, please use **Semantic Commit Messages**:

- `feat:` for new features
- `fix:` for bug fixes
- `rebrand:` for rebranding changes
- `docs:` or `doc:` for documentation changes
- `style:` for formatting, missing semi colons, etc.
- `refactor:` for refactoring production code
- `test:` for adding missing tests

- `chore:` for updating build tasks, package manager configs, etc.

Example: `feat: add support for custom primary keys`

## Security Best Practices

- **Environment Variables:** Never hardcode your encryption key. Use `.env` files or secrets managers.
- **Key Consistency:** Using a different key on an existing database will result in decryption failure and potential data corruption if forced.
- **Backups:** Regularly backup your `.dat` files. Encryption protects data privacy, not data loss.

## License

This project is licensed under the [MIT License](LICENSE.md).

---
<!-- NOTE: Only the developer is allowed to change the version number, but suggestions for updates are always welcome. -->
[View Changelog](CHANGELOG.md)
