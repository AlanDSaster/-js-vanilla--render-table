function recordsToElementsData(records, headers, actions) {
	/* generates an object that represents a table's contents for parsing with calling funciton renderRecordsTable(tableData); */
	let table = {
		tagName : 'table',
		options : {},
		children : [
			{ tagName : 'thead', options : {}, children : [] },
			{ tagName : 'tbody', options : {}, children : [] }
		]
	};
	/* template of what output data will look like */
	let exampleTableData = {
		tagName : 'table',
		options : {},
		children : [
			{
				tagName : 'thead',
				options : {},
				children : [
					{
						tagName : 'tr',
						children : [
							{ tagName : 'th', options : { colspan : 99 } }
						]
					},
					{
						tagName : 'tr',
						children : [
							{ tagName : 'th', options : { innerText : 'itemcode' } },
							{ tagName : 'th', options : { innerText : 'vendor' } },
							{ tagName : 'th', options : { innerText : 'catalognumber' } }
						]
					}
				]
			},
			{
				tagName : 'tbody',
				options : {},
				children : [
					{
						tagName : 'tr',
						children : [
							{ tagName : 'td', options : { innerText : 'X1234' } },
							{ tagName : 'th', options : { innerText : 'exampleVendor' } },
							{ tagName : 'th', options : { innerText : '1234' } }
						]
					},
					{
						tagName : 'tr',
						children : [						
							{ tagName : 'td', options : { innerText : 'X543' } },
							{ tagName : 'td', options : { innerText : 'anotherVendor' } },
							{ tagName : 'td', options : { innerText : '543' } }
						]
					}
				]
			}
		]
	};
	/* generate thead */
	if( ! headers?.length > 0 ) return console.log('ERROR: invalid headers.');
	/* create table head */
	let thead = table.children[0];
	for( let i=0,z=headers.length; i<z; i++) {
		let header = headers[i];
		thead.children.push({ tagName : 'th', options : { innerText : header } });
	}
	/* generate tbody */
	let tbody = table.children[1];
	for( let i=0, z=records.length; i<z; i++ ) {
		let record = records[i];
		let tr = { tagName : 'tr', children : [] };
		tbody.children.push(tr);
		for( let i=0,z=headers.length; i<z; i++ ) {
			let header = headers[i];
			let value = record[header] ?? '';
			let td = { tagName : 'td', options : { innerText : value } };
			tr.children.push(td);
		}
	}
	return table;
}
