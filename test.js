const records = [
  { itemcode : 'X1234', vendor : 'exampleVendor', catalognumber : '1234' },
	{ itemcode : 'X543', vendor : 'anotherVendor', catalognumber : '543' }
];

function test() {
  let nodeIdentification = {
	  ids : [ 'test' ]
	}
	let headers = [ 'pemsnumber', 'vendor', 'catalognumber', 'producttype', 'productcategory', 'productclass' ];
	let tableData = recordsToElementsData(records, headers);
	renderRecords(nodeIdentification, tableData);
}

test();
