# Changelog

All notable changes to this project will be documented in this file.

<!-- NOTE: Only the developer is allowed to change the version number, but suggestions for updates are always welcome. -->

## 2026-04-08
### [0.0.1-beta.2]
- **feat:** Added `dataFilter` middleware to ensure strict type safety and prevent unwanted data injection.
- **feat:** Enhanced `db.create` to support both JSON objects and formatted strings for table structure definition.
- **feat:** Added `autoincrement` support for numeric primary keys (default: `true`).
- **feat:** Support for random 12-character string IDs by defining `id: 'string'` in table structure.
- **fix:** Fixed `db.alter` to support adding new columns via both object and string formats, utilizing `tableValidator`.
- **fix:** Resolved bug where `0` (numeric) and `false` (boolean) values were incorrectly ignored during filtering.
- **fix:** Fixed `NaN` ID error on `db.insert` when using incremental numeric IDs.
- **fix:** Improved table structure validation to resolve column case mismatch issues.
- **fix:** Updated `db.update` and `sanitizingData` to correctly preserve and validate existing data columns.
- **refactor:** Standardized internal type handling for default values across all operations.
- **refactor:** Updated internal table structure to use objects instead of arrays for better performance and clarity.
- **test:** Added comprehensive test suite for data insertion and validation.
- **docs:** Updated `README.md` with detailed usage examples and documentation for new features.

## 2026-04-07
### [0.0.1-beta.1]
- **rebrand:** Rebranded package from `json-ed` to `ormyx`.
- **doc:** Fixed documentation bugs and updated "How To" instructions.

### [0.0.1-beta]
- **feat:** Added console logging for errors, warnings, and success messages.
- **feat:** Added `db.alter` functionality for modifying existing table structures.
- **doc:** Initial documentation update for the first beta release.
- **release:** First beta release on npm.

## 2026-04-06
- **feat:** Added options in `insert` for custom ID increment and length.
- **feat:** Added `db.remove` functionality and alias support.
- **feat:** Added `db.create` table functionality.
- **fix:** Improved `db.read` to return structured objects.
- **fix:** Implemented access control for reserved system tables.
- **refactor:** Enforced lowercase keys for consistency across the database.
- **doc:** Added detailed tutorial and notes for table creation in `README.md`.

## 2026-04-05
- **Initial Commit:** Project initiation.
- **feat:** Basic CRUD operations (insert, read, update, delete).
- **feat:** String-based query support and filtering.
- **fix:** Resolved various issues with data persistence and parsing.
- **chore:** Project configuration (tsconfig, dependencies).
