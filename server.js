const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const shortHash = require('short-hash');

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const urlDbCreation = {};
const urlDbLookup = {};

/*
urlDbCreation= { 
    key:value,
    long: short


}

urlDbLookup= { 
    key:value,
    short: long
}
*/

// creation of shortUrl, with longUrl input
app.post('/longUrl/:link', (req, res) => {
	try {
		if (req.params.link in urlDbCreation) {
			res.status(200).send(`${urlDbCreation[req.params.link]}`);
		} else {
			const urlConvert = shortHash(`${req.params.link}`);

			urlDbCreation[req.params.link] = urlConvert;

			urlDbLookup[urlConvert] = req.params.link;

			console.log('url', req.params.link, urlConvert, urlDbCreation, urlDbLookup);
			res.status(201).send(urlConvert);
		}
	} catch (err) {
		res.status(500).send(`Something went wrong`);
	}
});

// lookup longUrl, with shortUrl input
app.get('/:link', (req, res) => {
	try {
		console.log('getreq link', req.params.link, urlDbLookup[req.params.link]);
		if (urlDbLookup.hasOwnProperty(req.params.link)) {
			res.status(301).send(`${urlDbLookup[req.params.link]}`);
		} else {
			res.status(404).send(`${req.params.link} not found`);
		}
	} catch (err) {
		res.status(500).send(`Something went wrong`);
	}
});
