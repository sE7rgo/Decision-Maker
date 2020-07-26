DROP TABLE IF EXISTS choices CASCADE;
CREATE TABLE choices (
  id SERIAL PRIMARY KEY NOT NULL,
  questions_id INTEGER REFERENCES questions(id),
  choice_text TEXT NOT NULL,
  borda_rank INTEGER
);
