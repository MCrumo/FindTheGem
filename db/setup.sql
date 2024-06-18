-- Create table
CREATE TABLE patents (
    applicationNumber TEXT,
    publicationNumber TEXT PRIMARY KEY,
    title TEXT,
    status TEXT,
    country TEXT,
    grantDate DATE NULL,
    expirationDate DATE NULL,
    sizeFamily INTEGER NULL,
    numberCitations INTEGER NULL,
    score FLOAT NULL
);