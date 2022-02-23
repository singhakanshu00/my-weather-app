const express = require("express");
const weatherData = require('./utils/weatherData');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('home', { title: "Weather App" });
});

//localhost:3000/weather?address=Kolkata
app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        res.send({ error: 'You must enter the city name' });
    }
    weatherData(address, (error, { temperature, description, cityName } = {}) => {
        if (error) {
            return res.send({ error });
        }
        else {
            res.send({ cityName, temperature, description });
        }
    });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});