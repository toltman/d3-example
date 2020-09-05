// import data and create a table
d3.csv("data.csv").then((d) => {
  createTable(d);
});

// filter data and create a second table
d3.csv("data.csv").then((data) => {
  // filter data
  var tallData = data.filter((d) => {
    return d.Height > 70;
  });
  tallData.columns = data.columns;
  createTable(tallData);
});

// sorting data: heaviest to lightest
d3.csv("data.csv").then((data) => {
  // sort data
  var sortedData = data
    .slice()
    .sort((a, b) => d3.descending(a.Weight, b.Weight));
  sortedData.columns = data.columns;
  createTable(sortedData);
});

function createTable(data) {
  // create table and header row
  let table = d3.select("#container").append("table");
  let theader = table.append("tr");

  // generate column names from data columns
  data.columns.forEach((colName) => {
    theader.append("th").text(colName);
  });

  // write each row from data
  data.forEach((row) => {
    tableRow = table.append("tr");
    data.columns.forEach((colName) => {
      tableRow.append("td").text(`${row[colName]}`);
    });
  });
}
