-- PostgreSQL initialization script for local development
-- This script runs when the PostgreSQL container starts for the first time

-- Create the database if it doesn't exist
SELECT 'CREATE DATABASE shadi_portal'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'shadi_portal')\gexec

-- Connect to the database
\c shadi_portal;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The Prisma migrations will handle the actual schema creation
-- This file is mainly for any additional setup needed
