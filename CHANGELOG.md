# Changelog

All notable changes to this project will be documented in this file.

<!-- NOTE: Only the developer is allowed to change the version number, but suggestions for updates are always welcome. -->

## [0.0.1-beta] - 2026-04-07
- **feat:** Added console errors, logs, and warnings.
- **feat:** Added `alter` table functionality.
- **chore:** Initial work on `alter` and general updates.
- **doc:** Updated documentation.
- **release:** First beta release on npm.

## [2026-04-06]
- **feat:** Added options in `insert` for increment and ID length.
- **feat:** Added `delete` functionality and made the key a required parameter.
- **feat:** Included `remove` as an alias for the `delete` function.
- **feat:** Added `create table` functionality.
- **fix:** Made `insertOption` optional.
- **fix:** Validated ID length to be non-negative or non-NaN.
- **fix:** Resolved data undefined errors.
- **fix:** Improved `read` to return objects.
- **fix:** Added access control for reserved tables.
- **fix:** Fixed create table persistence error.
- **fix:** Improved update data validation and sanitization.
- **refactor:** Code and documentation initiation.
- **refactor:** Disabled auto-creation of tables.
- **refactor:** Forced lowercase keys.
- **doc:** Updated tutorial and README with special notes for table creation.

## [2026-04-05]
- **Initial Commit:** Project initiation.
- **feat:** Added "no table found" error handling.
- **feat:** Added string-based query support.
- **feat:** Added query filter and checker.
- **feat:** Added `update` functionality (initially under testing).
- **fix:** Fixed save and read operations.
- **fix:** Corrected directory structure.
- **fix:** Fixed cache storage bug.
- **fix:** Resolved error where empty values became 0.
- **fix:** Fixed comma data parsing error.
- **fix:** Improved error returns.
- **fix:** Fixed spaced key error.
- **fix:** Added preventive measurements.
- **doc:** Initially added README and License.
- **doc:** Updated README and tutorial.
- **chore:** Added `tsconfig.json`.
- **chore:** Updated dependencies.
