/**
 * Small standalone helpers used across tests/page objects.
 * Deliberately dependency-free so any spec or page object can require it.
 */

/** Generate a short random suffix, e.g. for unique usernames/emails in create-flow tests. */
function randomSuffix(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length);
}

/** Build a unique username like "TestUser_ab12cd" to avoid collisions on repeat runs. */
function uniqueUsername(prefix = 'TestUser') {
    return `${prefix}_${randomSuffix()}`;
}

/** Build a unique email address for create-flow tests. */
function uniqueEmail(prefix = 'test.user') {
    return `${prefix}.${randomSuffix()}@example.com`;
}

/** Format a JS Date as OrangeHRM's expected yyyy-mm-dd input format. */
function formatDate(date = new Date()) {
    return date.toISOString().split('T')[0];
}

module.exports = { randomSuffix, uniqueUsername, uniqueEmail, formatDate };
