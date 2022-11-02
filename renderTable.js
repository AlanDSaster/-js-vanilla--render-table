function renderRecords( nodeIdentification, tableData ) {
	let { ids, names, classNames } = nodeIdentification;
	/* identify where to render table data */
	let nodes = [];
	if( ids?.length > 0 ) {
		for( let i=0,z=ids.length; i<z; i++ ) {
			let element = document.getElementById(ids[i]);
			nodes.push( element );
		}
	}
	if( names?.length > 0 ) {
		for( let i=0,z=names.length; i<z; i++ ) {
			let element = document.getElementById(names[i]);
			nodes.push( element );
		}
	}
	if( classNames?.length > 0 ) {
		for( let i=0,z=classNames.length; i<z; i++ ) {
			let element = document.getElementById(classNames[i]);
			nodes.push( element );
		}
	}
	/* render each table */
	let newTable = generateElement( tableData );
	for( let i=0,z=nodes.length; i<z; i++ ) {
		let node = nodes[i];
		while( node.children.length > 0 ) node.children[0].remove();
		node.innerHtml = '';
		node.appendChild(newTable);
	}
}

function generateElement(args) {
	let { tagName, options, children } = args;
	if( ! isValidTagName( tagName ) ) throw `ERROR: could not generate element. Invalid tagName: ${tagName}`;
	let element = document.createElement(tagName);
	if( options ) {
		for( let option in options ) {
			let value = options[option];
			element[option] = value;
		}
	}
	if( children?.length > 0 ) {
		for( let i=0,z=children.length; i<z; i++ ) {
			let child = children[i];
			element.appendChild(generateElement(child));
		}
	}
	return element;
}

function isValidTagName(tagName) {
	let simple = tagName?.toString().trim() ?? '';
	let length = simple?.length ?? -1;
	let valid = ( length > 0 ) ?? false;
	return valid;
}
