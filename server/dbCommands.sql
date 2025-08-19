-- This extension is required to generate UUIDs (if not already installed)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table to store Google login information only
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store messages from the contact form
CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store common household data for a user
CREATE TABLE household_common (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    electricity_usage DECIMAL,
    water_usage DECIMAL,
    waste_generation DECIMAL,
    gas_cylinder DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store data for family members
CREATE TABLE family_members (
    id SERIAL PRIMARY KEY,
    household_common_id INT REFERENCES household_common(id) ON DELETE CASCADE,
    name VARCHAR(255),
    private_vehicle DECIMAL,
    public_vehicle DECIMAL,
    air_travel DECIMAL,
    veg_meals DECIMAL,
    non_veg_meals DECIMAL
);

-- Table to store recommendations generated for the user
CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    household_common_id INT REFERENCES household_common(id) ON DELETE CASCADE,
    recommendation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing sessions via connect-pg-simple
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
