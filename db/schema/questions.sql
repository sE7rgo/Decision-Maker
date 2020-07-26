DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_email VARCHAR(255) NOT NULL,
  question_text VARCHAR(255) NOT NULL,
  creation_date DATE DEFAULT NOW() NOT NULL,
  poll_code VARCHAR(255) NOT NULL
);
