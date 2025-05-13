-- Create database if it doesn't exist
SELECT 'CREATE DATABASE lime_medical'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'lime_medical')\gexec

-- Connect to the database
\c lime_medical;

-- Create extension if not exists (for UUID)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create patients table if not exists
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data if table is empty
INSERT INTO patients (name, dob)
SELECT 
    first_name || ' ' || last_name as name,
    (CURRENT_DATE - (random() * 36500)::integer * INTERVAL '1 day') as dob
FROM (
    SELECT unnest(ARRAY['John', 'Mary', 'James', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'Robert', 'Anna']) as first_name,
           unnest(ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']) as last_name
) names
WHERE NOT EXISTS (SELECT 1 FROM patients LIMIT 1)
LIMIT 10; 