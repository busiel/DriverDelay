/*
  # Add satisfaction ratings

  1. New Tables
    - `satisfaction_ratings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `delay_id` (uuid, references delays)
      - `rating` (text, enum: positive, neutral, negative)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create enum type for rating
CREATE TYPE satisfaction_rating AS ENUM ('positive', 'neutral', 'negative');

-- Create satisfaction ratings table
CREATE TABLE IF NOT EXISTS satisfaction_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  delay_id uuid REFERENCES delays NOT NULL,
  rating satisfaction_rating NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, delay_id)
);

-- Enable RLS
ALTER TABLE satisfaction_ratings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert own ratings"
  ON satisfaction_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own ratings"
  ON satisfaction_ratings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);