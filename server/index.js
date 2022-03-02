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

//Käyttäjän rekisteröinti
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

//Kirjautuminen
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

//Kirjoita arvostelu
app.post('/writeReview', (req, res) => {
    const date = new Date();
    const postCreated = date.toString();
    const stars = req.body.stars;
    const content = req.body.body;

    //user ja book id ovat 1 testimielessä
    db.query("INSERT INTO Reviews(reviewStars, dateCreated, body, user_id, book_id) VALUES (?,?,?,1,1)",
        [stars, postCreated, content], (err, res) => {
            if (err) {
                console.log(err)
            }
        })
})

//Hae arvostelut
app.get('/getReview', (req, res) => {
    db.query("SELECT * FROM Reviews", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

//Poista arvostelu (id haku ei vielä tehty)
app.post("/deleteReview", (req, res) => {
    const id = 9;

    db.query("DELETE FROM Reviews WHERE review_id = ?", [id], (err, res) => {
        if (err) {
            console.log(err)
        }
        if (res) {
            console.log(res)
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