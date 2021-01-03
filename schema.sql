CREATE DATABASE IF NOT EXISTS dolisquad_alarm;

USE dolisquad_alarm;

CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(256) NOT NULL,
    last_name VARCHAR(256) NOT NULL,
    email VARCHAR(256),
    active BOOLEAN NOT NULL,
    activation_date DATETIME NOT NULL,
    expiry_date DATETIME NOT NULL,
    CONSTRAINT unique_user UNIQUE (first_name, last_name, email)
);

CREATE TABLE IF NOT EXISTS log (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    date DATETIME NOT NULL,
    description VARCHAR(256) NOT NULL,
    CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TRIGGER IF EXISTS event_creation_timestamp;
DROP TRIGGER IF EXISTS triggers_users_constid;
DROP TRIGGER IF EXISTS trigger_log_constid;

DELIMITER |
CREATE TRIGGER event_creation_timestamp BEFORE INSERT ON log 
FOR EACH ROW 
BEGIN 
    SET NEW.date = NOW();
END|
DELIMITER ;

DELIMITER |
CREATE TRIGGER trigger_users_constid BEFORE UPDATE
ON users FOR EACH ROW
BEGIN
    SET NEW.id = OLD.id;
END|
DELIMITER ;

DELIMITER |
CREATE TRIGGER trigger_log_constid BEFORE UPDATE
ON log FOR EACH ROW
BEGIN
    SET NEW.id = OLD.id;
END|
DELIMITER ;