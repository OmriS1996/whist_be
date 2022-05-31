CREATE TABLE IF NOT EXISTS products (
    product_id VARCHAR(100) NOT NULL UNIQUE,
    product_name VARCHAR(50) NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    product_price INT(10) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    total_sold INT(10) NOT NULL,
    unique_sold INT(10) NOT NULL,
    PRIMARY KEY (product_id)
 );
 
 