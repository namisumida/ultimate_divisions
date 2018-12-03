/////////////////////////////////////////////////////////////////////////////
var svg6 = d3.select("#svg-conversionrate");
var dataset6 = [{division:"mens", hold:.8, single:.61},
                {division:"mixed", hold:.78, single:.51},
                {division:"womens", hold:.78, single:.5}];
var w6 = document.getElementById("svg-conversionrate").getBoundingClientRect().width;
var w_label6 = 40;
var w_spacing6 = 10;
var w_circle6 = (w6-w_label6-w_spacing6)/3;
var max_r = w_circle6/2;
svg6.selectAll("division_labels6")
    .data(dataset_divisions)
    .enter()
    .append("text")
    .attr("class", "division_labels")
    .attr("x", function(d) {
      if (d=="mens") {
        return w_circle6/2;
      }
      else if (d=="mixed") {
        return w_label6 + w_spacing6 + w_circle6*1.5;
      }
      else { return w_label6 + w_spacing6*2 + w_circle6*2.5; }
    })
    .attr("y", 30)
    .text(function(d) {
      if (d=="mens") {
        return "MEN'S"
      }
      else if (d=="mixed") {
        return "MIXED"
      }
      else { return "WOMEN'S"; }
    })
    .style("text-anchor", "middle");
svg6.selectAll("single_circles6")
    .data(dataset6)
    .enter()
    .append("circle")
    .attr("class", "single_circles")
    .attr("cx", function(d) {
      if (d.division=="mens") {
        return w_circle6/2;
      }
      else if (d.division=="mixed") {
        return w_label6 + w_spacing6 + w_circle6*1.5;
      }
      else { return w_label6 + w_spacing6*2 + w_circle6*2.5; }
    })
    .attr("cy", function(d) {
      return 20 + max_r + (max_r - (max_r * d.single));
    })
    .attr("r", function(d) {
      return max_r*d.single;
    })
    .style("fill", coral);
svg6.selectAll("hold_circles")
    .data(dataset6)
    .enter()
    .append("circle")
    .attr("class", "circles")
    .attr("cx", function(d) {
      if (d.division=="mens") {
        return w_circle6/2;
      }
      else if (d.division=="mixed") {
        return w_label6 + w_spacing6 + w_circle6*1.5;
      }
      else { return w_label6 + w_spacing6*2 + w_circle6*2.5; }
    })
    .attr("cy", function(d) {
      return 20 + max_r + (max_r - (max_r * d.hold));
    })
    .attr("r", function(d) {
      return max_r*d.hold;
    })
    .style("stroke-dasharray", ("2, 3"));
svg6.selectAll("single_text")
    .data(dataset6)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", function(d) {
      if (d.division=="mens") {
        return w_circle6/2;
      }
      else if (d.division=="mixed") {
        return w_label6 + w_spacing6 + w_circle6*1.5;
      }
      else { return w_label6 + w_spacing6*2 + w_circle6*2.5; }
    })
    .attr("y", function(d) {
      return 20 + max_r + (max_r - (max_r * d.single));
    })
    .text(function(d) {
      return d3.format(".0%")(d.single);
    });
svg6.selectAll("hold_text")
    .data(dataset6)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", function(d) {
      if (d.division=="mens") {
        return w_circle6/2;
      }
      else if (d.division=="mixed") {
        return w_label6 + w_spacing6 + w_circle6*1.5;
      }
      else { return w_label6 + w_spacing6*2 + w_circle6*2.5; }
    })
    .attr("y", function(d) {
      return max_r + (max_r - 2*(max_r * d.hold))+45;
    })
    .text(function(d) {
      return d3.format(".0%")(d.hold);
    });
svg6.append("text")
    .attr("class", "axis_labels")
    .text("Offensive holds")
    .attr("x", w_circle6-20)
    .attr("y", max_r-10)
    .style("text-anchor", "start")
svg6.append("text")
    .attr("class", "axis_labels")
    .text("Single- possession scores")
    .attr("x", w_circle6-20)
    .attr("y", 1.75*max_r)
    .call(wrap, 90)
    .style("text-anchor", "start")
    .style("fill", coral);

/////////////////////////////////////////////////////////////////////////////
var svg7 = d3.select("#svg-perfectconversion");
var dataset7 = [{division:"mens", lose:.71, win:.76},{division:"mixed", lose:.66, win:.73},{division:"womens", lose:.56, win:.64}];
var w7 =document.getElementById("svg-perfectconversion").getBoundingClientRect().width;
var h7 = document.getElementById("svg-perfectconversion").getBoundingClientRect().height;
var h_label = 5;
var h_spacing7 = 10;
var h_dots7 = (h7 - h_spacing7*3)/3;
var xScale7 = d3.scaleLinear()
                .domain([0,1])
                .range([100, w7-80])
svg7.selectAll("division_labels7")
    .data(dataset_divisions)
    .enter()
    .append("text")
    .attr("x", 5)
    .attr("y", function(d,i) {
      return h_label+(i+1)*h_dots7;
    })
    .text(function(d) {
      if (d=="mens") {
        return "MEN'S"
      }
      else if (d=="mixed") {
        return "MIXED"
      }
      else { return "WOMEN'S"; }
    })
    .attr("class", "division_labels");
svg7.selectAll("lines")
    .data(dataset_divisions)
    .enter()
    .append("line")
    .attr("class", "xLine")
    .attr("x1", xScale7(0))
    .attr("x2", xScale7(1))
    .attr("y1", function(d,i) {
      return h_label+(i+1)*h_dots7;
    })
    .attr("y2", function(d,i) {
      return h_label+(i+1)*h_dots7;
    });
svg7.selectAll("winDots7")
    .data(dataset7)
    .enter()
    .append("circle")
    .attr("class", "winDots")
    .attr("cx", function(d) {
      return xScale7(d.win);
    })
    .attr("cy", function(d,i) {
      return h_label+(i+1)*h_dots7;
    })
    .attr("r", 6)
    .style("fill", coral);
svg7.selectAll("loseDots7")
    .data(dataset7)
    .enter()
    .append("circle")
    .attr("class", "loseDots")
    .attr("cx", function(d) {
      return xScale7(d.lose);
    })
    .attr("cy", function(d,i) {
      return h_label+(i+1)*h_dots7;
    })
    .attr("r", 6)
    .style("fill", blue);
svg7.selectAll("winLabel7")
    .data(dataset7)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", function(d) {
      return xScale7(d.win);
    })
    .attr("y", function(d,i) {
      return h_label+20+(i+1)*h_dots7;
    })
    .text(function(d) {
      return d3.format(".0%")(d.win);
    })
    .style("fill", coral);
svg7.selectAll("loseLabel7")
    .data(dataset7)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", function(d) {
      return xScale7(d.lose);
    })
    .attr("y", function(d,i) {
      return h_label+20+(i+1)*h_dots7;
    })
    .text(function(d) {
      return d3.format(".0%")(d.lose);
    })
    .style("fill", blue);
svg7.append("text")
    .attr("class", "axis_labels")
    .text("Losing teams")
    .attr("x", xScale7(.71))
    .attr("y", 45)
    .style("text-anchor", "end")
    .style("fill", blue)
    .style("font-family", "radnika-bold");
svg7.append("text")
    .attr("class", "axis_labels")
    .text("Winning teams")
    .attr("x", xScale7(.76))
    .attr("y", 45)
    .style("text-anchor", "start")
    .style("fill", coral)
    .style("font-family", "radnika-bold");
svg7.append("text")
    .attr("class", "axis_labels")
    .text("Winning- Losing diff")
    .attr("x", xScale7(1)+10)
    .attr("y", 25)
    .style("text-anchor", "start")
    .call(wrap, 70)
    .style("font-family", "radnika-bold");
svg7.selectAll("diffLabel7")
    .data(dataset7)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", xScale7(1)+45)
    .attr("y", function(d,i) {
      return h_label+(i+1)*h_dots7+5;
    })
    .text(function(d) {
      return d3.format(".0%")(d.win-d.lose);
    })
    .style("text-anchor", "middle");
svg7.append("text")
    .attr("class", "axis_labels")
    .attr("x", xScale7(0))
    .attr("y", h_label+h_dots7+15)
    .text("0%")
    .style("fill", "gray")
    .style("text-anchor", "start");
svg7.append("text")
    .attr("class", "axis_labels")
    .attr("x", xScale7(1))
    .attr("y", h_label+h_dots7+15)
    .text("100%")
    .style("fill", "gray")
    .style("text-anchor", "end");
