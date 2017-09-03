const express = require('express')
const app = express()
const LedgerService = require('./service')



app.get('/balance/Income', function (req, res) {
	LedgerService.balance('Income')
	.then(function(entries){
		return entries.map(function(entry){
			entry.total.amount =  0 - entry.total.amount;
			return entry;
		});
	})
	.then(
		function(entries){
			res.send(entries);
		},
		function(exception){
			console.log(exception);
			res.send("Some error");
		}
	);
});

app.get('/balance/:accountId', function (req, res) {
	LedgerService.balance(req.params.accountId);
	.then(function(entries){
		return entries.filter(function(entry){
			return entry.total.amount > -1;
		});
	})
	.then(
		function(entries){
			res.send(entries);
		},
		function(exception){
			console.log(exception);
			res.send("Some error");
		}
	);
});


app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})