var express = require('express');
var router = express.Router();
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { joy: 0 });
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
					var joy = parsedData.document_tone.tone_categories[0].tones[3].score;
					console.log(data);
					res.render('index', {
          				joy: joy,
          				
        });

			});
		
	} catch (e) {
		console.log(e);

	}
});

module.exports = router;
