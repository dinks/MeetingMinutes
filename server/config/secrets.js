/**
 * Secrets Configuration
 * Place all project secrets, passwords, api keys, etc here
 * This file is ignored from version control by default
 * Always use the process.env in this file
 */
'use strict';

var secretsConfig = {
  sessionSecret: process.env.SESSION_SECRET || 'a5fa80f1da2cae9f5ff5fdc57f61c4a0',

  // List of user roles in order of lowest privileges
  userRoles: ['guest', 'user'],
};

module.exports = secretsConfig;
