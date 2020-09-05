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

// Using array.map
d3.csv("data.csv").then((data) => {
  // create a new variable
  var bmiData = data.map((d) => {
    return {
      ...d,
      BMI: d.Height * d.Weight,
    };
  });

  bmiData.columns = [...data.columns, "BMI"];
  createTable(bmiData);

  // Using array.reduce
  // Calculate average Height and Weight
  avgHeight = calcAvg(bmiData, "Height");
  d3.select("#container")
    .append("p")
    .text(`The average height is ${avgHeight}`);

  // average Weight
  avgWeight = calcAvg(bmiData, "Weight");
  d3.select("#container")
    .append("p")
    .text(`The average weight is ${avgWeight}`);

  // min and max
  minHeight = bmiData.reduce(
    (acc, d) => (Number(d.Height) < acc ? Number(d.Height) : acc),
    Infinity
  );
  d3.select("#container")
    .append("p")
    .text(`The minimum height is ${minHeight}`);

  maxBMI = d3.max(bmiData, (d) => d.BMI);
  d3.select("#container").append("p").text(`The maximum BMI is ${maxBMI}`);

  // Using d3.extent
  weightExtent = d3.extent(bmiData, (d) => Number(d.Weight));
  d3.select("#container")
    .append("p")
    .text(
      `The min weight is ${weightExtent[0]}, the max weight is ${weightExtent[1]}`
    );
});

function calcAvg(data, colName) {
  avg = data.reduce((acc, d) => acc + Number(d[colName]), 0) / data.length;
  return avg;
}

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
