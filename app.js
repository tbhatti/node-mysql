const mysql = require('mysql');
const express = require('express');// file upload 1
const fileUpload = require('express-fileupload'); // file upload 2
const app = express(); // file upload 3
const cors = require('cors');
app.use(express.json()) // middle ware to use request body parameters
app.use(cors())
app.use(fileUpload()); // // file upload 4

// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'sitepoint'
});
/****Uncomment following con.query and two functions con.connect and con.end
 * only to test connection with SQL data base
 */
/*con.query('SELECT * FROM authors',(error, rows) => {        
    if(error) throw error;
     console.log("Here is the data from Data base", rows)
     authorsList = rows;
     rows.forEach(row => {
         console.log(row.name) 
     });
 
 })*/

/**Need to comment following two functions con.connect and con.end to 
 * error: Cannot enqueue Query after invoking quit.
  */
/*con.connect((err) => {
  if(err){
    console.log('Error connecting to Db', err);
    return;
  }
  console.log('Connection established');
});

con.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
  });*/
let authorsList = null;

/**End point: Get Authors list */
app.get('/authors-list', (req, res) => {
    getAllAuthors();
    res.send({ 'authors': authorsList });
});


/**End point : Insert author */
app.post("/new-author", (req, res) => {
    insertAuthor(req)
    res.send({ "author": "Author has been inserted successfully" });
});


/**End point : Update author */
app.put("/update-author", (req, res) => {
    updateAuthor(req)
    res.send({ "author": "Author has been updated successfully" });
});

let deletedAuthor = null;
/**End point : Delete author */
app.delete("/remove-author", (req, res) => {
    removeAuthor(req)
    res.send({ "author": "Author has been deleted successfully" });
});

/****Update author */
updateAuthor = (req) => {
    con.query(
        'UPDATE authors SET name = ?, city = ? Where ID = ?',
        [req.body.name, req.body.city, req.body.id],
        (err, result) => {
            if (err) throw err;
            console.log(`Changed ${result.changedRows} row(s)`);
        }
    );
}

/****Remove author */
removeAuthor = (req) => {
    con.query(
        'DELETE FROM authors WHERE id = ?', [req.body.id], (err, result) => {
            if (err) throw err;
            console.log(`Deleted ${result.affectedRows} row(s)`);
        }
    );
}

/**Insert new author*/

insertAuthor = (req) => {
    const author = { name: req.body.name, city: req.body.city };
    con.query('INSERT INTO authors SET ?', author, (err, res) => {
        if (err) throw err;
    });
}
/**Get all authors list */
getAllAuthors = () => {
    con.query('SELECT * FROM authors', (error, authors) => {
        if (error) throw error;
        authorsList = authors;
    })
}

app.listen(5000, () => {
    console.log("App listening on port 5000!");
});