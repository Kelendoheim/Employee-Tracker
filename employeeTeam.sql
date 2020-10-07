DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;


use employee_db;


CREATE TABLE department(
departmentId INTEGER NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (departmentId)
);

CREATE TABLE role(
roleID INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (roleID)
);

CREATE TABLE employee(
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NULL,
manager_id INT NULL,
PRIMARY KEY (id)
);


INSERT INTO department (name) VALUES ("Smith House");

INSERT INTO role (title, salary, department_id) VALUES ("Family Keepers", 30000.55, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Adventurers", 30100, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Beth", "Smith", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rick", "Sanchez", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jerry", "Smith", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Summer", "Smith", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Morty", "Smith", 2, 2);
