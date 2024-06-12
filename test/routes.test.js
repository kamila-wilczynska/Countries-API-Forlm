const request = require('supertest');
const assert = require('assert');
const app = require('../src/index');


describe('Countries API', function () {
	describe('GET /api/countries', function () {
		it('should return all countries', function (done) {
			request(app)
				.get('/api/countries')
				.expect(200) // status 200
				.end(function (err, res) {
					if (err) return done(err);

					// Sprawdzanie czy odpowiedź jest tablicą
					assert(Array.isArray(res.body), "Response should be an array");

					// Sprawdzanie czy każdy obiekt w tablicy ma klucz 'id'
					assert(res.body.every(country => country.hasOwnProperty('id')), "Every item should have an 'id' property");

					done();
				});
		});
	});

	// Możesz dodać więcej testów dla innych endpointów
});