const records = [
	{ itemcode : 'X1234', vendor : 'exampleVendor', catalognumber : '1234' },
	{ itemcode : 'X543', vendor : 'anotherVendor', catalognumber : '543' }
];

function test() {
	let nodeIdentification = { ids : [ 'test' ] };
	let headers = [ 'itemcode', 'vendor', 'catalognumber' ];
	let tableData = recordsToElementsData(records, headers);
	console.log('rendering records');
	renderRecords(nodeIdentification, tableData);
}
