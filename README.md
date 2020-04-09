# node-mysql
This is sample server code using node.js and mySQL database.

## prerequisite

### mysql-8.0.19-winx64.zip
Download and install mySQL and configure on your local

### mysql-workbench-community-8.0.19-winx64.msi
Download and install GUI tool to run queries


## Data base used in this project
### DB name: sitepoint, table name: authors, all CRUD operations are performed in node.js
```python
Copy and run following command in mySQL Workbench to create sitepoint database

CREATE DATABASE sitepoint CHARACTER SET utf8 COLLATE utf8_general_ci;
USE sitepoint;

CREATE TABLE authors (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  city varchar(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO authors (id, name, city) VALUES
(1, 'Michaela Lehr', 'Berlin'),
(2, 'Michael Wanyoike', 'Nairobi'),
(3, 'James Hibbard', 'Munich'),
(4, 'Karolina Gawron', 'Wrocław');
```

## Connecting to the database
```python
const mysql = require('mysql');
/** First you need to create a connection to the database 
  Be sure to replace 'user' and 'password' with the correct values **/
const con = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.end((err) => {
  /**The connection is terminated gracefully, Ensures all remaining queries are executed, Then sends a quit packet to the MySQL server.*/
});

```
