INSERT INTO department (name)
VALUES ("Management"),
       ("Accounting"),
       ("Sales"),
       ("Human Resources"),
       ("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 200000.00, 1),
       ("Accountant", 90000.99, 2),
       ("Bookkeeper", 60000.49, 2),
       ("Salesman", 80000.45, 3),
       ("Talent manager", 70000.57, 4),
       ("CS manager", 65000.54, 5),
       ("CS representative", 45000.75, 5);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "Orest", "Panas", 1),
       (2, "Bob", "Smith", 2),
       (3, "Eric", "Cartman", 3),
       (4, "Randy", "Marsh", 4),
       (5, "Curtis", "Jackson", 5),
       (6, "Rob", "Kardashian", 6),
       (7, "Eugene", "Silverman", 7),
       (8, "Steve", "Kozlov", 7);

UPDATE employee SET manager_id = NULL WHERE id = 1;
UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 2 WHERE id = 3;
UPDATE employee SET manager_id = 5 WHERE id = 4;
UPDATE employee SET manager_id = 1 WHERE id = 5;
UPDATE employee SET manager_id = 5 WHERE id = 6;
UPDATE employee SET manager_id = 5 WHERE id = 7;
UPDATE employee SET manager_id = 5 WHERE id = 8;