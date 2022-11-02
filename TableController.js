class TableController {
	/* this object is a client side object that will convert an array into a table object */
	constructor() { 
		this.validTags = [
			'a',
			'abbr',
			'acronym',
			'acronym',
			'address',
			'applet',
			'applet',
			'area',
			'article',
			'aside',
			'audio',
			'b',
			'base',
			'basefont',
			'basefont',
			'bdi',
			'bdo',
			'big',
			'big',
			'blockquote',
			'body',
			'br',
			'button',
			'canvas',
			'caption',
			'center',
			'center',
			'cite',
			'code',
			'col',
			'colgroup',
			'data',
			'datalist',
			'dd',
			'del',
			'details',
			'dfn',
			'dialog',
			'dir',
			'dir',
			'div',
			'dl',
			'dt',
			'em',
			'embed',
			'fieldset',
			'figcaption',
			'figure',
			'font',
			'font',
			'footer',
			'form',
			'frame',
			'frame',
			'frameset',
			'frameset',
			'h1> to <h6',
			'head',
			'header',
			'hr',
			'html',
			'i',
			'iframe',
			'img',
			'input',
			'ins',
			'kbd',
			'label',
			'legend',
			'li',
			'link',
			'main',
			'map',
			'mark',
			'meta',
			'meter',
			'nav',
			'noframes',
			'noframes',
			'noscript',
			'object',
			'ol',
			'optgroup',
			'option',
			'output',
			'p',
			'param',
			'picture',
			'pre',
			'progress',
			'q',
			'rp',
			'rt',
			'ruby',
			's',
			'samp',
			'script',
			'section',
			'select',
			'small',
			'source',
			'span',
			'strike',
			'strike',
			'strong',
			'style',
			'sub',
			'summary',
			'sup',
			'svg',
			'table',
			'tbody',
			'td',
			'template',
			'textarea',
			'tfoot',
			'th',
			'thead',
			'time',
			'title',
			'tr',
			'track',
			'tt',
			'tt',
			'u',
			'ul',
			'var',
			'video',
			'wbr'
		];
	}
	/* generates an object that represents a table's contents for parsing with calling funciton renderRecordsTable(tableData); */
	recordsToElementsData(records, headers, actions) {
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
	/* renders a js table object as an html element to a set of given element ids, names, and classNames */
	renderRecords( nodeIdentification, tableData ) {
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
		let newTable = this.generateElement( tableData );
		for( let i=0,z=nodes.length; i<z; i++ ) {
			let node = nodes[i];
			while( node.children.length > 0 ) node.children[0].remove();
			node.innerHtml = '';
			node.appendChild(newTable);
		}
	}
	/* creates an html element from an element js object */
	generateElement(args) {
		let { tagName, options, children } = args;
		if( ! this.validTags.includes(tagName?.toString().toLowerCase() ) ) throw `ERROR: could not generate element. Invalid tagName: ${tagName}`;
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
				element.appendChild(this.generateElement(child));
			}
		}
		return element;
	}
}
