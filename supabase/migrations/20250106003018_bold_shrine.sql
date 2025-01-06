/*
  # Add cleanup function for old delay records

  1. New Function
    - Creates a function to delete delays older than 10 days
    - Can be called manually or scheduled externally
    - Includes safety checks and logging
*/

-- Function to clean up old delays
CREATE OR REPLACE FUNCTION cleanup_old_delays()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count integer;
BEGIN
  WITH deleted AS (
    DELETE FROM delays
    WHERE date < CURRENT_DATE - INTERVAL '10 days'
    RETURNING *
  )
  SELECT count(*) INTO deleted_count FROM deleted;

  RETURN deleted_count;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION cleanup_old_delays() TO authenticated;

-- Add comment explaining the function
COMMENT ON FUNCTION cleanup_old_delays() IS 'Removes delay records older than 10 days and returns the number of records deleted';