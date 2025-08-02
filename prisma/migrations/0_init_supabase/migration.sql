-- -- CreateSchema
-- CREATE SCHEMA IF NOT EXISTS "auth";

-- -- CreateEnum
-- CREATE TYPE "auth"."aal_level" AS ENUM ('aal1', 'aal2', 'aal3');

-- -- CreateEnum
-- CREATE TYPE "auth"."code_challenge_method" AS ENUM ('s256', 'plain');

-- -- CreateEnum
-- CREATE TYPE "auth"."factor_status" AS ENUM ('unverified', 'verified');

-- -- CreateEnum
-- CREATE TYPE "auth"."factor_type" AS ENUM ('totp', 'webauthn', 'phone');

-- -- CreateEnum
-- CREATE TYPE "auth"."one_time_token_type" AS ENUM ('confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token');

