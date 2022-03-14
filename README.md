# Kirjanarvostelusivusto BookApp

## Tekijät: Juuso Lahtinen, Olli Kolkki, Leo Lehtiö

Sivuston tarkoituksena on nimensä mukaisesti arvostella kirjoja.

Sivusto lähettää haun Google Books API:lle ja API palauttaa hakua vastaavat kirjat. Sivusto näyttää 40 hakutulosta kerrallaan, joista jokaista voi klikata. Kirjan klikkaaminen avaa uuden ikkunan, jossa näkyy kirjan tietoja, arvosteluja (jos niitä on) ja mahdollisuuden kirjoittaa arvostelu.

## Projekin käynnistäminen

Jos projektia haluaa kokeilla omalla laitteella, tulee luoda lokaali tietokanta. Tähän löytyy valmis komento: server/database.txt

server/index.js tiedostoon tulee muuttaa oman tietokannan tiedot, tunnus, salasana, tietokannan nimi yms. ja tallentaa tiedosto.

Kahteen luokkaan on annettava API-avain. Luokissa `LatestReviews.js` ja `List.js` on muuttuja key, johon on annettava API-avain lainausmerkkien sisään.

`const key = "(INSERT API-KEY HERE)"`

HUOM. API-avaimen liikakäyttö voi estää käytön 24 tunniksi.

Seuraavaksi avataan kaksi eri terminaalia.

Ensimmäisessä käynnistetään React komennoilla:
```
cd BookApp/
npm install
npm start
```

Toisessa käynnistetään server seuraavilla komennoilla:
```
cd server/
node index.js
```

Näiden jälkeen sivusto toimii osoitteessa: [http://localhost:3000](http://localhost:3000)

# REST API kuvaus

```
käyttäjän rekisteröinti
{
method: 'post'
endpoint: localhost:3000/register
response: null
parameters: username, password, email, date
}

Kirjautuminen (Tarkistaa, onko kirjauduttu)
{
method: 'get'
endpoint: localhost:3000/login
response: Boolean
parameters: session.user
}


Kirjautuminen (Vertailee tietokannan tietoihin)
{
method: 'post'
endpoint: localhost:3000/login
response: JSON object
parameters: username, password
}


Hae arvostelijan käyttäjänimi
{
method: 'post'
endpoint: localhost:3000/getUsername
response: JSON object
parameters: userID
}

Kirjaudu ulos
{
method: 'get'
endpoint: localhost:3000/logout
response: null
parameters: session
}

Kirjoita arvostelu
{
method: 'post'
endpoint: localhost:3000/writeReview
response: JSON object
parameters: stars, postCreated, content, posterID, bookId
}

Hae kaikki arvostelut
{
method: 'get'
endpoint: localhost:3000/getReviews
response: JSON Object
parameters: null (hakee kaikki)
}

Hae tietyn kirjan arvostelut
{
method: 'post'
endpoint: localhost:3000/getReview
response: JSON Object (hakee yhden)
parameters: bookId
}

Poista arvostelu
{
method: 'post'
endpoint: localhost:3000/deleteReview
response: null
parameters: review_id
}
```