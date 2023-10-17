INSERT INTO department (name)
VALUES ("department 1"),
        ("department 2"),
        ("department 3");

INSERT INTO role(department_id, title, salary)
VALUES  (1,"role 1", 80000),
        (2,"role 2", 60000),
        (2,"role 3", 60000),
        (3,"role 4", 50000);

INSERT INTO employee(role_id, first_name, last_name, manager_id)
VALUES  (1,"name1","name2", NULL),
        (2,"secondname1","secondname2", 1),
        (3,"thirdname1","thirdname2", 1),
        (4,"fourthname1", "fourthname2", 3);

