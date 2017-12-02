var express = require('express');
var router = express.Router();
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { 
					anger: 0,
					disgust: 0,
					fear: 0,
					joy: 0,
					sadness: 0,
					confident: 0,
					tentative: 0,
					agreeableness: 0,
					show: false,
					recordedtext: false
	});
});


router.post('/', async function(req, res, next) {
	try {
		var tone_analyzer = new ToneAnalyzerV3({

			username: "e63b6787-9a8d-4bdf-9545-919a20ff234b",
			password: "CTmftBJLn12b",
			version_date: '2016-05-19'
		});

		tone_analyzer.tone({ text: req.body.message },
			function(err, tone) {
				if (err)
					console.log(err);
				else
					var data = JSON.stringify(tone, null, 2);
				var parsedData = JSON.parse(data);

				var anger = parsedData.document_tone.tone_categories[0].tones[0].score;
				var disgust = parsedData.document_tone.tone_categories[0].tones[1].score;
				var fear = parsedData.document_tone.tone_categories[0].tones[2].score;
				var joy = parsedData.document_tone.tone_categories[0].tones[3].score;
				var sadness = parsedData.document_tone.tone_categories[0].tones[4].score;
				var confident = parsedData.document_tone.tone_categories[1].tones[1].score;
				var tentative = parsedData.document_tone.tone_categories[1].tones[2].score;
				var agreeableness = parsedData.document_tone.tone_categories[2].tones[3].score;
				console.log(data);
				res.render('index', {
					anger: anger,
					disgust: disgust,
					fear: fear,
					joy: joy,
					sadness: sadness,
					confident: confident,
					tentative: tentative,
					agreeableness: agreeableness,
					show: true,
					recordedtext:false

				});

			});
		
	} catch (e) {
		console.log(e);

	}
});

module.exports = router;
