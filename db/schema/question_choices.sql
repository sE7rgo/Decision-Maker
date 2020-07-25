DROP TABLE IF EXISTS choices CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_email VARCHAR(255),
  question_text VARCHAR(255),
  creation_date DATE DEFAULT NOW()
);

CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  questions_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  choice_text TEXT NOT NULL,
  borda_rank INTEGER NOT NULL
);



