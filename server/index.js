const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    key: "userId",
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    },
}))

//Tarkasta salasana ja database
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "BookApp"
});

//Käyttäjän rekisteröinti
app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const date = new Date();
    const userCreated = date.toString();

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }

        db.query("INSERT INTO Users (username, password, email, userDateCreated) VALUES (?,?,?,?)",
            [username, hash, email, userCreated], (err, result) => {
                if (err) {
                    console.log(err)
                }
            })
    })
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({
            loggedIn: true,
            user: req.session.user
        })
    } else {
        res.send({loggedIn: false})
    }
})

//Kirjautuminen
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM Users WHERE username = ?;",
        username,
        (err, result) => {
        if (err) {
            console.log(err)
            res.send({err: err})
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    req.session.user = result
                    console.log(req.session.user)
                    res.send(result)
                } else {
                    res.send({message: "wrong username or password"})
                }
            })
        } else {
            res.send({message: "User does not exist"})
        }
    })
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.send("User logged out")
})

//Kirjoita arvostelu
app.post('/writeReview', (req, res) => {
    const date = new Date();
    const postCreated = date.toString();
    const stars = req.body.stars;
    const content = req.body.body;
    const bookId = req.body.bookId;

    //user id on 1 testimielessä
    db.query("INSERT INTO Reviews(reviewStars, reviewDateCreated, reviewBody, user_id, book_id) VALUES (?,?,?,1,?)",
        [stars, postCreated, content, bookId], (err, res) => {
            if (err) {
                console.log(err)
            }
        })
})

//Hae kaikki arvostelut
app.get('/getReviews', (req, res) => {

    db.query("SELECT * FROM Reviews", (err, result) => {
        console.log(result)
        res.send(result)
    })

})

//Hae tietyn kirjan arvostelut
app.post('/getReview', (req, res) => {
    const book_id = req.body.bookId;

    db.query("SELECT * FROM Reviews WHERE book_id = ?", [book_id], (err, result) => {
        console.log(result)
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

app.listen(3001, () => {
    console.log("Server running")
});