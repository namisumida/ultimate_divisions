/////////////////////////////////////////////////////////////////////////////
var svg8 = d3.select("#svg-dline");
var dataset8 = [{division:"mens", possessed:.58, scores:.4},
                {division:"mixed", possessed:.58, scores:.41},
                {division:"womens", possessed:.66, scores:.4}];
var w8 = document.getElementById("svg-dline").getBoundingClientRect().width;
var w_label8 = 40;
var w_spacing8 = 10;
var w_circle8 = (w8-w_label8-w_spacing8)/3;
var max_r = w_circle8/2;
svg8.selectAll("division_labels8")
    .data(dataset_divisions)
    .enter()
    .append("text")
    .attr("class", "division_labels")
    .attr("x", function(d) {
      if (d=="mens") {
        return w_circle8/2;
      }
      else if (d=="mixed") {
        return w_label8 + w_spacing8 + w_circle8*1.5;
      }
      else { return w_label8 + w_spacing8*2 + w_circle8*2.5; }
    })
    .attr("y", 40)
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
svg8.selectAll("scores_circles8")
    .data(dataset8)
    .enter()
    .append("circle")
    .attr("class", "scores_circles")
    .attr("cx", function(d) {
      if (d.division=="mens") {
        return w_circle8/2;
      }
      else if (d.division=="mixed") {
        return w_label8 + w_spacing8 + w_circle8*1.5;
      }
      else { return w_label8 + w_spacing8*2 + w_circle8*2.5; }
    })
    .attr("cy", function(d) {
      return max_r + (max_r - (max_r * d.scores));
    })
    .attr("r", function(d) {
      return max_r*d.scores;
    })
    .style("fill", green);
svg8.selectAll("possessed_circles")
    .data(dataset8)
    .enter()
    .append("circle")
    .attr("class", "circles")
    .attr("cx", function(d) {
      if (d.division=="mens") {
        return w_circle8/2;
      }
      else if (d.division=="mixed") {
        return w_label8 + w_spacing8 + w_circle8*1.5;
      }
      else { return w_label8 + w_spacing8*2 + w_circle8*2.5; }
    })
    .attr("cy", function(d) {
      return max_r + (max_r - (max_r * d.possessed));
    })
    .attr("r", function(d) {
      return max_r*d.possessed;
    })
    .style("stroke-dasharray", ("2, 3"));
svg8.selectAll("scores_text")
    .data(dataset8)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", function(d) {
      if (d.division=="mens") {
        return w_circle8/2;
      }
      else if (d.division=="mixed") {
        return w_label8 + w_spacing8 + w_circle8*1.5;
      }
      else { return w_label8 + w_spacing8*2 + w_circle8*2.5; }
    })
    .attr("y", function(d) {
      return max_r + (max_r - (max_r * d.scores));
    })
    .text(function(d) {
      return d3.format(".0%")(d.scores);
    });
svg8.selectAll("possessed_text")
    .data(dataset8)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", function(d) {
      if (d.division=="mens") {
        return w_circle8/2;
      }
      else if (d.division=="mixed") {
        return w_label8 + w_spacing8 + w_circle8*1.5;
      }
      else { return w_label8 + w_spacing8*2 + w_circle8*2.5; }
    })
    .attr("y", function(d) {
      return max_r + (max_r - 2*(max_r * d.possessed))+20;
    })
    .text(function(d) {
      return d3.format(".0%")(d.possessed);
    });
svg8.append("text")
    .attr("class", "axis_labels")
    .text("D-line points in which they gained possession")
    .attr("x", w_circle8-40)
    .attr("y", max_r)
    .style("text-anchor", "start")
    .call(wrap, 100)
svg8.append("text")
    .attr("class", "axis_labels")
    .text("D-line scores")
    .attr("x", w_circle8-40)
    .attr("y", 1.8*max_r)
    .call(wrap, 100)
    .style("text-anchor", "start")
    .style("fill", green);

/////////////////////////////////////////////////////////////////////////////
var svg9 = d3.select("#svg-odlines");
var dataset9 = [{division:"mens", dline:.7, oline:.8},
                {division:"mixed", dline:.71, oline:.78},
                {division:"womens", dline:.6, oline:.78}];
var w9 = document.getElementById("svg-odlines").getBoundingClientRect().width;
var h9 = document.getElementById("svg-odlines").getBoundingClientRect().height;
var h_label = 5;
var h_spacing9 = 10;
var h_dots9 = (h9 - h_spacing9*3)/3;
var xScale9 = d3.scaleLinear()
                .domain([0,1])
                .range([100, w9-80])
svg9.selectAll("division_labels9")
    .data(dataset_divisions)
    .enter()
    .append("text")
    .attr("x", 5)
    .attr("y", function(d,i) {
      return h_label+(i+1)*h_dots9;
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
svg9.selectAll("lines")
    .data(dataset_divisions)
    .enter()
    .append("line")
    .attr("class", "xLine")
    .attr("x1", xScale9(0))
    .attr("x2", xScale9(1))
    .attr("y1", function(d,i) {
      return h_label+(i+1)*h_dots9;
    })
    .attr("y2", function(d,i) {
      return h_label+(i+1)*h_dots9;
    });
svg9.selectAll("oDots9")
    .data(dataset9)
    .enter()
    .append("circle")
    .attr("class", "oDots")
    .attr("cx", function(d) {
      return xScale9(d.oline);
    })
    .attr("cy", function(d,i) {
      return h_label+(i+1)*h_dots9;
    })
    .attr("r", 6)
    .style("fill", coral);
svg9.selectAll("dDots9")
    .data(dataset9)
    .enter()
    .append("circle")
    .attr("class", "dDots")
    .attr("cx", function(d) {
      return xScale9(d.dline);
    })
    .attr("cy", function(d,i) {
      return h_label+(i+1)*h_dots9;
    })
    .attr("r", 6)
    .style("fill", green);
svg9.selectAll("oLabel9")
    .data(dataset9)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", function(d) {
      return xScale9(d.oline);
    })
    .attr("y", function(d,i) {
      return h_label+20+(i+1)*h_dots9;
    })
    .text(function(d) {
      return d3.format(".0%")(d.oline);
    })
    .style("fill", coral);
svg9.selectAll("dLabel9")
    .data(dataset9)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", function(d) {
      return xScale9(d.dline);
    })
    .attr("y", function(d,i) {
      return h_label+20+(i+1)*h_dots9;
    })
    .text(function(d) {
      return d3.format(".0%")(d.dline);
    })
    .style("fill", green);
svg9.append("text")
    .attr("class", "axis_labels")
    .text("D-lines")
    .attr("x", xScale9(.7))
    .attr("y", 45)
    .style("text-anchor", "middle")
    .style("fill", green)
    .style("font-family", "radnika-bold");
svg9.append("text")
    .attr("class", "axis_labels")
    .text("O-lines")
    .attr("x", xScale9(.8))
    .attr("y", 45)
    .style("text-anchor", "middle")
    .style("fill", coral)
    .style("font-family", "radnika-bold");
svg9.append("text")
    .attr("class", "axis_labels")
    .text("O-line- D-line diff")
    .attr("x", xScale9(1)+10)
    .attr("y", 25)
    .style("text-anchor", "start")
    .call(wrap, 70)
    .style("font-family", "radnika-bold");
svg9.selectAll("diffLabel9")
    .data(dataset9)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", xScale9(1)+40)
    .attr("y", function(d,i) {
      return h_label+(i+1)*h_dots9+5;
    })
    .text(function(d) {
      return d3.format(".0%")(d.oline-d.dline);
    })
    .style("text-anchor", "middle");
svg9.append("text")
    .attr("class", "axis_labels")
    .attr("x", xScale9(0))
    .attr("y", h_label+h_dots9+15)
    .text("0%")
    .style("fill", "gray")
    .style("text-anchor", "start");
svg9.append("text")
    .attr("class", "axis_labels")
    .attr("x", xScale9(1))
    .attr("y", h_label+h_dots9+15)
    .text("100%")
    .style("fill", "gray")
    .style("text-anchor", "end");
