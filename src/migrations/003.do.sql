CREATE TABLE IF NOT EXISTS transactions (
    transaction_id VARCHAR(100) NOT NULL UNIQUE,
    unix_date INT(50) NOT NULL,
    transaction_usd INT(50) NOT NULL,
    PRIMARY KEY (transaction_id)
 );