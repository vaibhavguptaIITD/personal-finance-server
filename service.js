const Ledger = require('ledger-cli').Ledger;
const ledger = new Ledger({ file: 'ledger.ledger' });
const Promise = require('promise');

var LedgerService = {
	balance: (accountID = '') => {

		return new Promise(function(fulfill, reject){
			var entries = [];
			ledger.balance()
			  .on('data', function(entry) {
			  	if(entry.account.fullname.startsWith(accountID)) {
			  		entries.push(entry);
			  	}
			  })
			  .once('end', function(){
			  	sortEntriesByDepth(entries);
			    fulfill(entries);
			  })
			  .once('error', function(error) {
			    reject(error);
			  });
			});

	},
	register: function(account, fromDate, toDate){

	},
	budget: function(){

	}
}

const sortEntriesByDepth = (entries) => {
	entries.sort((entry1, entry2) => {
		return entry1.account.depth - entry2.account.depth;
	});
}

module.exports = LedgerService;