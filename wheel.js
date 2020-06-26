



d3.select(self.frameElement).style("height", "1400px");
d3.select(self.frameElement).style("width", "1400px");

// This example draws a Radial Hub and Spoke Graph on a page with
// multiple HTML layout constructs.
// Created by Frank Guerino : "http://www.guerino.net"

// Data Used for this example...

var focalNode = [
  {id: "N1", name: "YOU", type: "Data Type 1", hlink: "http://www.if4it.com"}
];

var nodeSet = [
  {id: "N2", name: "#36 Damage of Illumination", type: "Data Type 3", relName: "Advance #35", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N3", name: "#38 Disparity", type: "Data Type 4", relName: "Members of a Family #37", hlink: "http://www.if4it.com/resources.html"},
  {id: "N4", name: "#40 Liberation", type: "Data Type 5", relName: "Halting #39", hlink: "http://www.if4it.com/taxonomy.html"},
  {id: "N5", name: "#42 Increase", type: "Data Type 1", relName: "Reduction #41", hlink: "http://www.if4it.com/disciplines.html"},
  {id: "N6", name: "#44 Meeting", type: "Data Type 2", relName: "Parting #43", hlink: "http://www.if4it.com"},
  {id: "N7", name: "#46 Rising", type: "Data Type 3", relName: "Gathering #45", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N8", name: "#48 The Well", type: "Data Type 4", relName: "Exhaustion #47", hlink: "http://www.if4it.com/resources.html"},
  {id: "N9", name: "#50 The Cauldron", type: "Data Type 5", relName: "Revolution #49", hlink: "http://www.if4it.com/taxonomy.html"},
  {id: "N10", name: "#52 Mountain", type: "Data Type 1", relName: "Thunder #51", hlink: "http://www.if4it.com/disciplines.html"},
  {id: "N11", name: "#54 Making a Young Girl Marry", type: "Data Type 2", relName: "Gradual Progress #53", hlink: "http://www.if4it.com"},
  {id: "N12", name: "#56 Travel", type: "Data Type 3", relName: "Richness #55", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N13", name: "#58 Joy", type: "Data Type 4", relName: "Wind #57", hlink: "http://www.if4it.com/resources.html"},
  {id: "N14", name: "#60 Discipline", type: "Data Type 5", relName: "Dispersal #59", hlink: "http://www.if4it.com/taxonomy.html"},
  {id: "N15", name: "#62 Predominance of the Small", type: "Data Type 1", relName: "Faith in the Center #61", hlink: "http://www.if4it.com/disciplines.html"},
  {id: "N16", name: "#64 Unfinished", type: "Data Type 3", relName: "Completion #63", hlink: "http://www.if4it.com"},
  {id: "N17", name: "Darkness #4", type: "Data Type 1", relName: "#3 Difficulty", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N18", name: "Contention #6", type: "Data Type 1", relName: "#5 Waiting", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N19", name: "Accord #8", type: "Data Type 4", relName: "#7 The Army", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N20", name: "Treading #10", type: "Data Type 4", relName: "#9 Small Nurturance", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N21", name: "Obstruction #12", type: "Data Type 4", relName: "#11 Tranquility", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N22", name: "Great Possession #14", type: "Data Type 1", relName: "#13 Sameness with others", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N23", name: "Delight #16", type: "Data Type 5", relName: "#15 Modesty", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N24", name: "Degeneration #18", type: "Data Type 5", relName: "#17 Following", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N25", name: "Observing #20", type: "Data Type 6", relName: "#19 Overseeing", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N26", name: "Adornment #22", type: "Data Type 6", relName: "#21 Biting Through", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N27", name: "Return #24", type: "Data Type 6", relName: "#23 Stripping Away", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N28", name: "Great Accumulation #26", type: "Data Type 6", relName: "#25 Fidelity", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N29", name: "Great Access #28", type: "Data Type 6", relName: "#27 Jaws", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N30", name: "Perserverance #32", type: "Data Type 6", relName: "#31 Sensing", hlink: "http://www.if4it.com/glossary.html"},
  {id: "N31", name: "Great Power #34", type: "Data Type 6", relName: "#33 Withdrawl", hlink: "http://www.if4it.com/glossary.html"}
];


function drawRadialHubAndSpoke( drawingName, focalNode, nodeSet, selectString, colors, margin, outerRadius, innerRadius, sortArcs ) {

  // drawingName => A unique drawing identifier that has no spaces, no "." and no "#" characters.
  // focalNode => Primary Node of Context.
  // nodeSet => Set of nodes and their relevant data.
  // selectString => String that allows you to pass in
  //           a D3 select string.
  // colors => String to set color scale.  Values can be...
  //           => "colorScale10"
  //           => "colorScale20"
  //           => "colorScale20b"
  //           => "colorScale20c"
  // margin => Integer margin offset value.
  // outerRadius => Integer outer radius value.
  // innerRadius => Integer inner radius value.
  // sortArcs => Controls sorting of Arcs by value.
  //              0 = No Sort.  Maintain original order.
  //              1 = Sort by arc value size.

  // Color Scale Handling...
  var colorScale = d3.scale.category20c();
  switch (colors)
  {
    case "colorScale10":
      colorScale = d3.scale.category10();
      break;
    case "colorScale20":
      colorScale = d3.scale.category20();
      break;
    case "colorScale20b":
      colorScale = d3.scale.category20b();
      break;
    case "colorScale20c":
      colorScale = d3.scale.category20c();
      break;
    default:
      colorScale = d3.scale.category20c();
  };

  var width = 1100;
  var height = 1100;

  var typeMouseOver = function() {

    var thisObject = d3.select(this);
    var typeValue = thisObject.attr("type_value");
    var strippedTypeValue = typeValue.replace(/ /g, "_");

    var pie1ArcsSelector = "." + "pie1-" + strippedTypeValue;
    var selectedArcs = d3.selectAll(pie1ArcsSelector);
    //document.writeln(pie1ArcsSelector);
    selectedArcs.style("fill", "Maroon");

    var pie2ArcsSelector = "." + "pie2-" + strippedTypeValue;
    var selectedArcs = d3.selectAll(pie2ArcsSelector);
    //document.writeln(pie2ArcsSelector);
    selectedArcs.style("fill", "Maroon");

    var pie3ArcsSelector = "." + "pie3-" + strippedTypeValue;
    var selectedArcs = d3.selectAll(pie3ArcsSelector);
    //document.writeln(pie3ArcsSelector);
    selectedArcs.style("fill", "Maroon");

    var legendBulletSelector = "." + "legendBullet-" + strippedTypeValue;
    var selectedBullet = d3.selectAll(legendBulletSelector);
    //document.writeln(legendBulletSelector);
    selectedBullet.style("fill", "Maroon");

    var nodeTextSelector = "." + "nodeText-" + strippedTypeValue;
    var selectedNodeText = d3.selectAll(nodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedNodeText.style("font", "bold 16px Arial")
    selectedNodeText.style("fill", "Maroon");

    var focalNodeSelector = "." + "focalNodeCircle";
    var focalNode = d3.selectAll(focalNodeSelector);
    var focalNodeType = focalNode.attr("type_value");
    //document.writeln(focalNodeSelector);
    if (typeValue == focalNodeType) {
      focalNode.style("fill", "Maroon");
      focalNode.style("stroke", "Maroon");
    };

    var focalNodeTextSelector = "." + "focalNodeText";
    var selectedFocalNodeText = d3.selectAll(focalNodeTextSelector);
    var focalNodeTextType = selectedFocalNodeText.attr("type_value");
    //document.writeln(pie3SliceSelector);
    if (typeValue == focalNodeTextType) {
      selectedFocalNodeText.style("fill", "Maroon");
    };

    var legendTextSelector = "." + "legendText-" + strippedTypeValue;
    var selectedLegendText = d3.selectAll(legendTextSelector);
    //document.writeln(legendBulletSelector);
    selectedLegendText.style("font", "bold 14px Arial")
    selectedLegendText.style("fill", "Maroon");

  };

  var typeMouseOut = function() {

    var thisObject = d3.select(this);
    var typeValue = thisObject.attr("type_value");
    var colorValue = thisObject.attr("color_value");
    var strippedTypeValue = typeValue.replace(/ /g, "_");

    var pie1ArcsSelector = "." + "pie1-" + strippedTypeValue;
    var selectedArcs = d3.selectAll(pie1ArcsSelector);
    //document.writeln(pie1ArcsSelector);
    selectedArcs.style("fill", colorValue);

    var pie2ArcsSelector = "." + "pie2-" + strippedTypeValue;
    var selectedArcs = d3.selectAll(pie2ArcsSelector);
    //document.writeln(pie2ArcsSelector);
    selectedArcs.style("fill", colorValue);

    var pie3ArcsSelector = "." + "pie3-" + strippedTypeValue;
    var selectedArcs = d3.selectAll(pie3ArcsSelector);
    //document.writeln(pie3ArcsSelector);
    selectedArcs.style("fill", colorValue);

    var legendBulletSelector = "." + "legendBullet-" + strippedTypeValue;
    var selectedBullet = d3.selectAll(legendBulletSelector);
    //document.writeln(legendBulletSelector);
    selectedBullet.style("fill", colorValue);

    var nodeTextSelector = "." + "nodeText-" + strippedTypeValue;
    var selectedNodeText = d3.selectAll(nodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedNodeText.style("font", "normal 16px Arial")
    selectedNodeText.style("fill", "Blue");

    var focalNodeSelector = "." + "focalNodeCircle";
    var focalNode = d3.selectAll(focalNodeSelector);
    var focalNodeType = focalNode.attr("type_value");
    //document.writeln(focalNodeSelector);
    if (typeValue == focalNodeType) {
      focalNode.style("fill", colorValue);
      focalNode.style("stroke", colorValue);
    };

    var focalNodeTextSelector = "." + "focalNodeText";
    var selectedFocalNodeText = d3.selectAll(focalNodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedFocalNodeText.style("fill", "Blue");

    var legendTextSelector = "." + "legendText-" + strippedTypeValue;
    var selectedLegendText = d3.selectAll(legendTextSelector);
    //document.writeln(legendBulletSelector);
    selectedLegendText.style("font", "normal 14px Arial")
    selectedLegendText.style("fill", "Black");

  };

  var sliceMouseOver = function() {

    var thisObject = d3.select(this);
    var indexValue = thisObject.attr("index_value");

    var pie1SliceSelector = "#" + "pie1-slice" + indexValue;
    var selectedArcs = d3.selectAll(pie1SliceSelector);
    //document.writeln(pie1SliceSelector);
    selectedArcs.style("fill", "DarkBlue");

    var pie2SliceSelector = "#" + "pie2-slice" + indexValue;
    var selectedArcs = d3.selectAll(pie2SliceSelector);
    //document.writeln(pie2SliceSelector);
    selectedArcs.style("fill", "DarkBlue");

    var pie3SliceSelector = "#" + "pie3-slice" + indexValue;
    var selectedArcs = d3.selectAll(pie3SliceSelector);
    //document.writeln(pie3SliceSelector);
    selectedArcs.style("fill", "DarkBlue");

    var nodeTextSelector = "#" + "pie3-node" + indexValue;
    var selectedNodeText = d3.selectAll(nodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedNodeText.style("font", "bold 16px Arial")
    selectedNodeText.style("fill", "DarkBlue");

    var focalNodeSelector = "." + "focalNodeCircle";
    var focalNode = d3.selectAll(focalNodeSelector);
    //document.writeln(focalNodeSelector);
    focalNode.style("fill", "DarkBlue");
    focalNode.style("stroke", "DarkBlue");

    var focalNodeTextSelector = "." + "focalNodeText";
    var selectedFocalNodeText = d3.selectAll(focalNodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedFocalNodeText.style("fill", "DarkBlue");

  };

  var sliceMouseOut = function() {

    var thisObject = d3.select(this);
    var indexValue = thisObject.attr("index_value");
    var colorValue = thisObject.attr("color_value");

    var pie1SliceSelector = "#" + "pie1-slice" + indexValue;
    var selectedArcs = d3.selectAll(pie1SliceSelector);
    //document.writeln(pie1SliceSelector);
    selectedArcs.style("fill", colorValue);

    var pie2SliceSelector = "#" + "pie2-slice" + indexValue;
    var selectedArcs = d3.selectAll(pie2SliceSelector);
    //document.writeln(pie2SliceSelector);
    selectedArcs.style("fill", colorValue);

    var pie3SliceSelector = "#" + "pie3-slice" + indexValue;
    var selectedArcs = d3.selectAll(pie3SliceSelector);
    //document.writeln(pie3SliceSelector);
    selectedArcs.style("fill", colorValue);

    var nodeTextSelector = "#" + "pie3-node" + indexValue;
    var selectedNodeText = d3.selectAll(nodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedNodeText.style("font", "normal 16px Arial")
    selectedNodeText.style("fill", "Blue");

    var focalNodeSelector = "." + "focalNodeCircle";
    var focalNode = d3.selectAll(focalNodeSelector);
    var focalNodeColorValue = focalNode.attr("color_value");
    //document.writeln(focalNodeSelector);
    focalNode.style("fill", focalNodeColorValue);
    focalNode.style("stroke", focalNodeColorValue);

    var focalNodeTextSelector = "." + "focalNodeText";
    var selectedFocalNodeText = d3.selectAll(focalNodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedFocalNodeText.style("fill", "Blue");

  };

  var focalNodeMouseOver = function() {

    var focalNodeSelector = "." + "focalNodeCircle";
    var focalNode = d3.selectAll(focalNodeSelector);
    //document.writeln(focalNodeSelector);
    focalNode.style("fill", "DarkBlue");
    focalNode.style("stroke", "DarkBlue");

    var focalNodeTextSelector = "." + "focalNodeText";
    var selectedFocalNodeText = d3.selectAll(focalNodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedFocalNodeText.style("font", "Bold 20px Arial")
    selectedFocalNodeText.style("fill", "DarkBlue");

  };

  var focalNodeMouseOut = function() {

    var focalNodeSelector = "." + "focalNodeCircle";
    var focalNode = d3.selectAll(focalNodeSelector);
    var focalNodeColorValue = focalNode.attr("color_value");
    //document.writeln(focalNodeSelector);
    focalNode.style("fill", focalNodeColorValue);
    focalNode.style("stroke", focalNodeColorValue);

    var focalNodeTextSelector = "." + "focalNodeText";
    var selectedFocalNodeText = d3.selectAll(focalNodeTextSelector);
    //document.writeln(pie3SliceSelector);
    selectedFocalNodeText.style("font", "Bold 16px Arial")
    selectedFocalNodeText.style("fill", "Blue");

  };

  var color_hash = [];

  // Create a hash that maps colors to types...
  nodeSet.forEach(function(d, i) {
    color_hash[d.type] = d.type;
    //document.writeln(color_hash[d.type]);
  });

  function keys(obj)
    {
      var keys = [];
  
      for(var key in obj)
      {

        if(obj.hasOwnProperty(key))
        {
          keys.push(key);
        }
      }
    return keys;
  }

  var sortedKeys = keys(color_hash).sort();

  sortedKeys.forEach(function(d, i) {
    color_hash[d] = colorScale(i);
    //document.writeln(color_hash[d]);
  });
  // Add colors to nodes...
  nodeSet.forEach(function(d,i) {
    d.color = color_hash[d.type];
    //document.writeln(d.type);
  });

  var svgCanvas = d3.select(selectString)
    .append("svg:svg")
      .data([nodeSet])
      .attr("width", width)
      .attr("height", height) 
    .append("svg:g")
      .attr("class", "focalNodeCanvas")
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")")

// Start 1st Pie...
  var arc1 = d3.svg.arc()
      .innerRadius(width/8 - 20)
      .outerRadius(width/8);

  var pie1 = d3.layout.pie()
      .value(function(d) { return 1; } );

  var arcs1 = svgCanvas.selectAll("g.slice1")
      .data(pie1)
    .enter().append("svg:g")
      .attr("class", "slice1")
    .append("svg:a")
      .attr("xlink:href", function(d) { return d.data.hlink; });

  arcs1.append("svg:path")
      .attr("fill", function(d) {return d.data.color; } )
      .attr("type_value", function(d) {return d.data.type; } )
      .attr("index_value", function(d, i) {return i; } )
      .attr("id", function(d, i) {return "pie1-slice" + i; } )
      .attr("color_value", function(d) {return d.data.color; } )
  .attr("class", function(d, i) {
  var str = d.data.type;
  var strippedString = str.replace(/ /g, "_")
  return "pie1-" + strippedString; })
      .style("stroke", "White")
      .attr("stroke-width", "2")
      .attr("d", arc1)
      .on('mouseover', sliceMouseOver)
  .on("mouseout", sliceMouseOut);

// Start 2nd Pie...
  var arc2 = d3.svg.arc()
      .innerRadius(width/8 + 5)
      .outerRadius(width/3.25 - 35);

  var pie2 = d3.layout.pie()
      .value(function(d) { return 1; } );

  var arcs2 = svgCanvas.selectAll("g.slice2")
      .data(pie2)
    .enter().append("svg:g")
      .attr("class", "slice2")
    .append("svg:a")
      .attr("xlink:href", function(d) { return d.data.hlink; });

  arcs2.append("svg:path")
      .attr("fill", function(d) {return d.data.color; } )
      .style("fill-opacity", .25)
      .attr("type_value", function(d) {return d.data.type; } )
      .attr("index_value", function(d, i) {return i; } )
      .attr("id", function(d, i) {return "pie2-slice" + i; } )
      .attr("color_value", function(d) {return d.data.color; } )
  .attr("class", function(d, i) {
  var str = d.data.type;
  var strippedString = str.replace(/ /g, "_")
  return "pie2-" + strippedString; })
      .style("stroke", "White")
      .attr("stroke-width", "2")
      .attr("d", arc2)
      .on('mouseover', sliceMouseOver)
      .on("mouseout", sliceMouseOut);

// Start 3rd Pie...
  var arc3 = d3.svg.arc()
      .innerRadius(width/3.25 - 30)
      .outerRadius(width/3.25 - 10);

  var pie3 = d3.layout.pie()
      .value(function(d) { return 1; } );

  var arcs3 = svgCanvas.selectAll("g.slice3")
      .data(pie3)
    .enter().append("svg:g")
      .attr("class", "slice3")
    .append("svg:a")
      .attr("xlink:href", function(d) { return d.data.hlink; });

  arcs3.append("svg:path")
      .attr("fill", function(d) {return d.data.color; } )
      .attr("type_value", function(d) {return d.data.type; } )
      .attr("index_value", function(d, i) {return i; } )
      .attr("id", function(d, i) {return "pie3-slice" + i; } )
      .attr("color_value", function(d) {return d.data.color; } )
  .attr("class", function(d, i) {
  var str = d.data.type;
  var strippedString = str.replace(/ /g, "_")
  return "pie3-" + strippedString; })
      .attr("stroke-width", "2")
      .style("stroke", "White")
      .attr("d", arc3)
      .on('mouseover', sliceMouseOver)
      .on("mouseout", sliceMouseOut);

  // Add link names to the arcs, translated to the arc centroid and rotated.
  arcs3.filter(function(d) {
    return d.endAngle - d.startAngle > .2; }).append("svg:text")
      .attr("dy", ".35em")
      //.attr("dx", "-20px")
      .attr("dx", function(d) {
        var a = angle(d, 0, 0);
        return a < 0 ? "70px" : "-70px";
      })
      .attr("text-anchor", function(d) {
        var a = angle(d, 0, 0);
        return a < 0 ? "end" : "start";
      })
      .attr("transform", function(d) { //set text'ss origin to the centroid
        //we have to make sure to set these before calling arc.centroid
        d.innerRadius = (width/8); // Set Inner Coordinate
        d.outerRadius = (width/4); // Set Outer Coordinate
        return "translate(" + arc2.centroid(d) + ")rotate(" + angle(d, -90, 90) + ")";
      })
      .style("fill", "Black")
      .style("font", "normal 16px Arial")
      .text(function(d) { return d.data.relName; });

  // Add node names to the arcs, translated to the arc centroid and rotated.
  arcs3.filter(function(d) {
    return d.endAngle - d.startAngle > .2; }).append("svg:text")
      .attr("dy", "5px")
      .attr("dx", function(d) {
        var a = angle(d, 0,0);
        return a < 0 ? "15px" : "-15px";
      })
      .attr("text-anchor", function(d) {
        var a = angle(d, 0, 0);
        return a <= 0 ? "start" : "end";
      })
      .attr("type_value", function(d) {return d.data.type; } )
      .attr("index_value", function(d, i) {return i; } )
      .attr("id", function(d, i) {return "pie3-node" + i; } )
      .attr("color_value", function(d) {return d.data.color; } )
  .attr("class", function(d, i) {
  var str = d.data.type;
  var strippedString = str.replace(/ /g, "_")
  return "nodeText-" + strippedString; })
      .attr("transform", function(d) { //set text's origin to the centroid
        // Make sure to set these before calling arc.centroid
        d.innerRadius = (height/2); // Set Inner Coordinate
        d.outerRadius = (height/2); // Set Outer Coordinate
        return "translate(" + arc3.centroid(d) + ")rotate(" + angle(d, -90, 90) + ")";
      })
      .style("fill", "Blue")
      .style("font", "normal 16px Arial")
      .text(function(d) { return d.data.name; })
      .on('mouseover', sliceMouseOver)
      .on("mouseout", sliceMouseOut)
    .append("svg:a")
      .attr("xlink:href", function(d) { return d.data.hlink; });

  // Updated Angle Calculation Function...
  function angle(d, offset, threshold) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI + offset;
    return a > threshold ? a - 180 : a;
  }

  // Print Legend Title...
  svgCanvas.append("text").attr("class","region")
      .text("Color Keys for Data Types...")
      .attr("x", -1*(width/2 - 10))
      .attr("y", (-height/7*3))
        .style("fill", "Black")
        .style("font", "bold 16px Arial")
      .attr("text-anchor","start");

  // Plot the bullet circles...
  svgCanvas.selectAll("circle")
      .data(sortedKeys).enter().append("svg:circle") // Append circle elements
      .attr("cx", -1*(width/2 - 25))
      .attr("cy", function(d, i) { return (i*20-height/7*3 + 20); } )
      .attr("stroke-width", ".5")
      .style("fill", function(d, i) { return color_hash[d]; })
      .attr("r", 6)
      .attr("color_value", function(d, i) { return color_hash[d]; })
      .attr("type_value", function(d, i) { return d; })
      .attr("index_value", function(d, i) { return "index-" + i; })
  .attr("class", function(d) {
  var str = d;
  var strippedString = str.replace(/ /g, "_")
  return "legendBullet-" + strippedString; })
      .on('mouseover', typeMouseOver)
      .on("mouseout", typeMouseOut);

  // Plot the center node circle...
  // Note: Issue w/ selecting circles requires this circle to be drawn after legend bullet circles
  svgCanvas.selectAll("#focalNodeCanvas")
      .data(focalNode)
.enter().append("svg:a")
      .attr("xlink:href", function(d) { return d.hlink; })
    .append("svg:circle") // Append circle element
      .attr("x", width/2)
      .attr("y", height/2)
      .attr("stroke-width", "8")
      .style("stroke", function(d, i) { return color_hash[d.type]; })
      .style("fill", function(d, i) { return color_hash[d.type]; })
      .style("fill-opacity", .25)
      .attr("type_value", function(d) {return d.type; } )
      .attr("color_value", function(d, i) { return color_hash[d.type]; })
      .attr("class", "focalNodeCircle")
      .attr("r", height/8-30)
      .on('mouseover', focalNodeMouseOver)
      .on("mouseout", focalNodeMouseOut);

  // Add focalNode text...
  svgCanvas.selectAll("a.focalNode_link")
  .data(focalNode)
.enter().append("svg:a")
      .attr("xlink:href", function(d) { return d.hlink; })
      .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dx", 2)
        .attr("dy", 7)
        .attr("type_value", function(d) {return d.type; } )
        .attr("class", "focalNodeText")
        .style("fill", "Blue")
        .style("font", "bold 16px Arial")
        .attr("text-anchor","middle")
        .text(function(d) { return d.name; })
        .on('mouseover', focalNodeMouseOver)
        .on("mouseout", focalNodeMouseOut);

  // Create legend text that acts as label keys...
  svgCanvas.selectAll("a.legend_link")
      .data(sortedKeys) // Instruct to bind dataSet to text elements
    .enter().append("svg:a") // Append legend elements
      .append("text")
        .attr("text-anchor", "center")
        .attr("x", -1*(width/2 - 40))
        .attr("y", function(d, i) { return (i*20-height/7*3 + 20); } )
        .attr("dx", 0)
        .attr("dy", "4px") // Controls padding to place text in alignment with bullets
        .text(function(d) { return d;})
        .attr("color_value", function(d, i) { return color_hash[d]; })
        .attr("type_value", function(d, i) { return d; })
        .attr("index_value", function(d, i) { return "index-" + i; })
    .attr("class", function(d) {
          var str = d;
          var strippedString = str.replace(/ /g, "_")
          return "legendText-" + strippedString; })
        .style("fill", "Black")
        .style("font", "normal 14px Arial")
        .on('mouseover', typeMouseOver)
        .on("mouseout", typeMouseOut);

};
