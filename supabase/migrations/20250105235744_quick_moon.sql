/*
  # Create delays table and security policies

  1. New Tables
    - `delays` table for storing driver delay records
      - Basic delay information (type, date, time)
      - Location details (highway, mile markers, state)
      - User association and timestamps
  
  2. Security
    - Row Level Security (RLS) enabled
    - Policies for user data access
*/

-- Create the delays table
CREATE TABLE IF NOT EXISTS delays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  event_type text NOT NULL,
  delay_type text,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  start_mile_marker text,
  end_mile_marker text,
  highway text NOT NULL,
  direction text,
  state text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE delays ENABLE ROW LEVEL SECURITY;

-- Create access policies
CREATE POLICY "Users can read own delays"
  ON delays FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own delays"
  ON delays FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own delays"
  ON delays FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);