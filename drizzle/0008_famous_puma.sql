-- Custom SQL migration file, put your code below! --
UPDATE users
SET password = 'temp_password'
WHERE password IS NULL;
