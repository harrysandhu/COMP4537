CREATE TABLE IF NOT EXISTS admin(
    admin_id VARCHAR (100) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(511) NOT NULL,
    salt VARCHAR(40) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(admin_id)
);



CREATE TABLE IF NOT EXISTS api_request(
    request_id INT NOT NULL AUTO_INCREMENT,
    admin_id VARCHAR (100) NOT NULL,
    endpoint VARCHAR (100) NOT NULL,
    request_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(request_id),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);