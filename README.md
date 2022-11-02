<h1>js-vanilla--render-table</h1>
<p>
  functions to convert an array into table data, then to render the equivalent html table in page
</p>
<p>
  When serving data from my API to my client app, I needed a way to dynamically render tables of data so I can propogate out the framework for multiple purposes. I've developed these functions to serve an array to the client to dynamically render the data without the use of templating engines like handlebars.
</p>
<p>
  <b>recordsToElementsData</b> will convert an array of data into a table object.
</p>
<p>
  <b>renderTable</b> will render the data contained within the table object as an html element and append it to the given html node elements by id, name, and className.
</p>
<p>
  I will probably wrap this into a Class definition later for portability and modular implementation.
</p>
