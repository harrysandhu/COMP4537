CREATE TABLE IF NOT EXISTS questions (
  id VARCHAR(10) NOT NULL,
  question VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE options (
  optionID INT NOT NULL,
  questionID VARCHAR(10) NOT NULL,
  answer VARCHAR(255) DEFAULT NULL,
  isCorrect BIT DEFAULT 0,
  PRIMARY KEY(optionID),
  CONSTRAINT fk_has_question FOREIGN KEY(questionID) REFERENCES questions(id)
);