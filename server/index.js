const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

//Tarkasta salasana ja database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "web2"
});

app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    db.query("INSERT INTO Users (username, password, email, dateCreated) VALUES (?,?,?,1)", [username, password, email], (err, result) => {
        if (err) {
            console.log(err)
        }
    })
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM Users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) {
            console.log(err)
            res.send({error: err})
        }
        if (result.length > 0) {
            res.send(result)
        } else {
            res.send({message: "wrong username or password"})
        }
    })
})

/*
//testi
app.post('/insert', (req,res) => {
    const title = "Joku kirja";
    const author = "Joku kirjoittaja";

    db.query('INSERT INTO Books (title, author) VALUES (?, ?)', [title, author], (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
        console.log("Data inserted successfully")
    })
})
//testi
app.get("/select", (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) {
            console.log(err)
        }

        res.send(result)
    })
})
*/

app.listen(3001, () => {
    console.log("Server running")
});