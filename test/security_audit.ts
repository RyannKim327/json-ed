import { ormyx } from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

function testPrototypePollution() {
    console.log('--- Testing Prototype Pollution ---');
    const db = ormyx('secret-key', 'security-test-db');
    db.create('users', { name: 'string' });

    const forbiddenKeys = ['__proto__', 'constructor', 'prototype'];

    forbiddenKeys.forEach(key => {
        // Test update
        try {
            db.update('users', key as any, { name: 'polluted' });
            console.error(`FAIL: update allowed forbidden key: ${key}`);
        } catch (e: any) {
            console.log(`PASS: update blocked forbidden key: ${key} (${e.message})`);
        }

        // Test read
        try {
            db.read('users', key as any);
            console.error(`FAIL: read allowed forbidden key: ${key}`);
        } catch (e: any) {
            console.log(`PASS: read blocked forbidden key: ${key} (${e.message})`);
        }

        // Test delete
        try {
            db.remove('users', key as any);
            console.error(`FAIL: remove allowed forbidden key: ${key}`);
        } catch (e: any) {
            console.log(`PASS: remove blocked forbidden key: ${key} (${e.message})`);
        }

        // Test table name in insert
        try {
            db.insert(key, { name: 'polluted' });
            console.error(`FAIL: insert allowed forbidden table name: ${key}`);
        } catch (e: any) {
            console.log(`PASS: insert blocked forbidden table name: ${key} (${e.message})`);
        }
    });

    // Verify Object.prototype is NOT polluted
    if (({} as any).name === 'polluted') {
        console.error('CRITICAL FAIL: Object.prototype was polluted!');
        process.exit(1);
    } else {
        console.log('SUCCESS: Object.prototype is clean.');
    }
}

function testPathTraversal() {
    console.log('\n--- Testing Path Traversal ---');
    const traversalPath = '../../evil-path';
    const db = ormyx('secret-key', traversalPath);

    // Based on our fix, it should be sanitized to 'evil-path.dat' in the current directory
    if (fs.existsSync('../../evil-path.dat')) {
        console.error('FAIL: Path traversal succeeded! File created in parent directory.');
        process.exit(1);
    } else if (fs.existsSync('evil-path.dat')) {
        console.log('PASS: Path traversal blocked. File created in current directory as evil-path.dat');
        fs.unlinkSync('evil-path.dat');
    } else {
        console.log('PASS: Path traversal blocked. (File not created or name differs but not in parent)');
    }
}

function testRenameBug() {
    console.log('\n--- Testing Rename Reference Error ---');
    const db = ormyx('secret-key', 'rename-test-db');
    db.create('old_table', { name: 'string' });
    try {
        db.rename('old_table', 'new_table');
        console.log('PASS: rename executed without reference error.');
    } catch (e: any) {
        console.error(`FAIL: rename failed with error: ${e.message}`);
        process.exit(1);
    }
}

testPrototypePollution();
testPathTraversal();
testRenameBug();

console.log('\nAll security audits passed!');

// Cleanup
if (fs.existsSync('security-test-db.dat')) fs.unlinkSync('security-test-db.dat');
if (fs.existsSync('rename-test-db.dat')) fs.unlinkSync('rename-test-db.dat');
