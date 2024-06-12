const express = require('express');
const cors = require('cors');
const app = express();
const Joi = require('joi');
const countries = require('./countriesData.js');

//middlware to help to serve the static files
app.use(express.static('public'));

//create router for countries
const countriesRouter = express.Router();

//use cors - to comunicate with frontend
app.use(cors());

//to be able to parse JSON, if we want to use req.body
app.use(express.json());




//get all countries
countriesRouter.get('/', (req, res) => {
	let htmlResponse = '<h1>Countries List</h1><ul>';
	countries.forEach(country => {
		htmlResponse += `
            <li>
                <h2>${country.country}</h2>
                <p>Capital: ${country.capital}</p>
                <p>Description: ${country.description}</p>
                <p>Interesting Fact: ${country.interestingFact}</p>
            </li>
        `;
	});
	htmlResponse += '</ul>';
	res.setHeader('Content-Type', 'text/html');
	res.send(htmlResponse);
});



countriesRouter.post('/', (req, res) => {
	const schema = Joi.object({
		country: Joi.string().min(3).required(),
		capital: Joi.string().min(3).required(),
		description: Joi.string().min(5).required(),
		interestingFact: Joi.string().min(5).required()
	});

	const { error, value } = schema.validate(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const newCountry = {
		id: countries.length + 1,
		...value
	};

	countries.push(newCountry);

	// Budowanie odpowiedzi HTML
	let htmlResponse = `<h1>Country Added Successfully</h1>`;
	htmlResponse += `<div>
        <p>Country Name: ${newCountry.country}</p>
        <p>Capital: ${newCountry.capital}</p>
        <p>Description: ${newCountry.description}</p>
        <p>Interesting Fact: ${newCountry.interestingFact}</p>
    </div>`;

	res.send(htmlResponse);
});



// mount routera
//all routes will have prefix '/api/countries'
app.use('/api/countries', countriesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;





