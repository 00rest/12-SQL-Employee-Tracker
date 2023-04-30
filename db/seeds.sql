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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Orest", "Panas", 1, NULL),
       ("Bob", "Smith", 2, 1),
       ("Eric", "Cartman", 3, 2),
       ("Randy", "Marsh", 4, 5),
       ("Curtis", "Jackson", 5, 1),
       ("Rob", "Kardashian", 6, 5),
       ("Eugene", "Silverman", 7, 5),
       ("Steve", "Kozlov", 7, 5);