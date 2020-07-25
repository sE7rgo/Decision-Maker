DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_email VARCHAR(255),
  question_text VARCHAR(255),
  creation_date DATE DEFAULT NOW()::DATE
);
