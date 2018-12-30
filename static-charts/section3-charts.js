var bodyWidth = document.documentElement.clientWidth;
/////////////////////////////////////////////////////////////////////////////
var svg8 = d3.select("#svg-dline");
var dataset8 = [{division:"mens", possessed:.58, scores:.4},
                {division:"mixed", possessed:.58, scores:.42},
                {division:"womens", possessed:.66, scores:.4}];
var w8 = document.getElementById("svg-dline").getBoundingClientRect().width;
if (w8>=520) {
  var w_label8 = 40;
}
else { var w_label8 = 30;}
var w_spacing8 = 10;
var w_circle8 = (w8-w_label8-w_spacing8)/3;
var max_r = w_circle8/2;
var currentHeight = w_circle8+20 // get current height of graphic
document.getElementById("svg-dline").style.height = (currentHeight) + "px";
function chart8_setup() {
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
      .attr("y", function() {
        if (w8>=510) { return 40; }
        else { return 20; }
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
      .style("fill", blue);
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
      .attr("id", "scores_text")
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
      .attr("id", "possessed_text")
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
        return max_r + (max_r - 2*(max_r * d.possessed))+16;
      })
      .text(function(d) {
        return d3.format(".0%")(d.possessed);
      });
  svg8.append("text")
      .attr("class", "axis_labels")
      .attr("id", "possessed_axis_label")
      .text(function() {
        if (w8>=368) { return "D-line points in which they gain possession"; }
        else { return "D-line had-disc points"; }
      })
      .attr("x", 2*max_r*.58+w_label8 + w_spacing8)
      .attr("y", function() {
        if (w8>=435) {
          return max_r;
        }
        else { return max_r-5; }
      })
      .style("text-anchor", "start")
      .call(wrap, .16*w8)
  svg8.append("text")
      .attr("class", "axis_labels")
      .attr("id", "scored_axis_label")
      .text("D-line scores")
      .attr("x", 2*max_r*.58+w_label8 + w_spacing8)
      .attr("y", function() {
        if (w8>=435) {
          return 1.8*max_r;
        }
        else { return 1.8*max_r+10; }
      })
      .call(wrap, .16*w8)
      .style("text-anchor", "start")
      .style("fill", blue);
}; // end chart 8 setup
function chart8_resize() {
  w8 = document.getElementById("svg-dline").getBoundingClientRect().width;
  w_circle8 = (w8-w_label8-w_spacing8)/3;
  max_r = w_circle8/2;
  if (w8>=520) {
    w_label8 = 40;
  }
  else { w_label8 = 30;}

  currentHeight = w_circle8+20 // get current height of graphic
  document.getElementById("svg-dline").style.height = (currentHeight) + "px";

  svg8.selectAll(".division_labels")
      .attr("x", function(d) {
        if (d=="mens") {
          return w_circle8/2;
        }
        else if (d=="mixed") {
          return w_label8 + w_spacing8 + w_circle8*1.5;
        }
        else { return w_label8 + w_spacing8*2 + w_circle8*2.5; }
      })
      .attr("y", function() {
        if (w8>=510) { return 40; }
        else { return 20; }
      });
  svg8.selectAll(".scores_circles")
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
      });
  svg8.selectAll(".circles")
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
      });
  svg8.selectAll("#scores_text")
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
      });
  svg8.selectAll("#possessed_text")
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
        return max_r + (max_r - 2*(max_r * d.possessed))+17;
      });
  svg8.select("#possessed_axis_label")
      .text(function() {
        if (w8>=368) { return "D-line points in which they gain possession"; }
        else { return "D-line had-disc points"; }
      })
      .attr("x", 2*max_r*.58+w_label8 + w_spacing8)
      .attr("y", function() {
        if (w8>=435) {
          return max_r;
        }
        else { return max_r-5; }
      })
      .call(wrap, .16*w8)
  svg8.select("#scored_axis_label")
      .attr("x", 2*max_r*.58+w_label8 + w_spacing8)
      .attr("y", function() {
        if (w8>=435) {
          return 1.8*max_r;
        }
        else { return 1.8*max_r+10; }
      })
      .text("D-line scores")
      .call(wrap, .16*w8);
}; // end chart8 resize

/////////////////////////////////////////////////////////////////////////////
var svg9 = d3.select("#svg-odlines");
var dataset9 = [{division:"mens", dline:.7, oline:.81},
                {division:"mixed", dline:.73, oline:.78},
                {division:"womens", dline:.6, oline:.78}];
var w9 = document.getElementById("svg-odlines").getBoundingClientRect().width;
var h9 = document.getElementById("svg-odlines").getBoundingClientRect().height;
var h_label = 5;
var h_spacing9 = 10;
var w_diff9 = 70;
if (bodyWidth>=600) {
  var w_division9 = 100;
}
else { var w_division9 = 75; }
var h_dots9 = (h9 - h_spacing9*3)/3;
var xScale9 = d3.scaleLinear()
                .domain([0,1])
                .range([w_division9, w9-w_diff9])
function chart9_setup() {
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
      .style("fill", blue);
  svg9.selectAll("oLabel9")
      .data(dataset9)
      .enter()
      .append("text")
      .attr("class", "data_labels")
      .attr("id", "oLabel9")
      .attr("x", function(d) {
        return xScale9(d.oline);
      })
      .attr("y", function(d,i) {
        return h_label+20+(i+1)*h_dots9;
      })
      .text(function(d) {
        return d3.format(".0%")(d.oline);
      })
      .style("fill", coral)
      .style("text-anchor", function(d) {
        if (w9 < 680) {
          if (d.division=="mixed") {
            return "start";
          }
        }
        else { return "middle"; }
      });
  svg9.selectAll("dLabel9")
      .data(dataset9)
      .enter()
      .append("text")
      .attr("class", "data_labels")
      .attr("id", "dLabel9")
      .attr("x", function(d) {
        return xScale9(d.dline);
      })
      .attr("y", function(d,i) {
        return h_label+20+(i+1)*h_dots9;
      })
      .text(function(d) {
        return d3.format(".0%")(d.dline);
      })
      .style("fill", blue)
      .style("text-anchor", function(d) {
        if (w9 < 680) {
          if (d.division=="mixed") {
            return "end";
          }
        }
        else { return "middle"; }
      });
  svg9.append("text")
      .attr("class", "axis_labels")
      .attr("id", "dline_axis_labels")
      .text("D-lines")
      .attr("x", xScale9(.7))
      .attr("y", 45)
      .style("text-anchor", "middle")
      .style("fill", blue)
      .style("font-family", "radnika-bold")
      .style("text-anchor", function(d) {
        if (w9 < 680) {
          return "end";
        }
        else { return "middle"; }
      });
  svg9.append("text")
      .attr("class", "axis_labels")
      .attr("id", "oline_axis_labels")
      .text("O-lines")
      .attr("x", xScale9(.8))
      .attr("y", 45)
      .style("text-anchor", "middle")
      .style("fill", coral)
      .style("font-family", "radnika-bold")
      .style("text-anchor", function(d) {
        if (w9 < 680) {
          return "start";
        }
        else { return "middle"; }
      });
  svg9.append("text")
      .attr("class", "axis_labels")
      .attr("id", "diff_axis_labels9")
      .text(function() {
        if (w9>=390) { return "O-line- D-line diff"; }
        else { return "Diff"}
      })
      .attr("x", xScale9(1)+w_diff9/2)
      .attr("y", function() {
        if (w9>=390) { return 30; }
        else { return 40; }
      })
      .call(wrap, w_diff9-10)
      .style("text-anchor", "middle")
      .style("font-family", "radnika-bold");
  svg9.selectAll("diffLabel9")
      .data(dataset9)
      .enter()
      .append("text")
      .attr("class", "data_labels")
      .attr("id", "diffLabel9")
      .attr("x", xScale9(1)+35)
      .attr("y", function(d,i) {
        return h_label+(i+1)*h_dots9+5;
      })
      .text(function(d) {
        return d3.format(".0%")(d.oline-d.dline);
      })
      .style("text-anchor", "middle");
  svg9.append("text")
      .attr("class", "axis_labels")
      .attr("id", "zero_label9")
      .attr("x", xScale9(0))
      .attr("y", h_label+h_dots9+15)
      .text("0%")
      .style("fill", "gray")
      .style("text-anchor", "start")
      .style("font-size", function() {
        if (bodyWidth>=600) {
          return 10;
        }
        else { return 9; }
      });
  svg9.append("text")
      .attr("class", "axis_labels")
      .attr("id", "hundred_label9")
      .attr("x", xScale9(1))
      .attr("y", h_label+h_dots9+15)
      .text("100%")
      .style("fill", "gray")
      .style("text-anchor", function() {
        if (w9>=380) { return "end"; }
        else { return "middle"; }
      })
      .style("font-size", function() {
        if (bodyWidth>=600) {
          return 10;
        }
        else { return 9; }
      });
}; // end chart9 setup
function chart9_resize() {
  bodyWidth = document.documentElement.clientWidth;
  w9 = document.getElementById("svg-odlines").getBoundingClientRect().width;
  if (bodyWidth>=600) {
    var w_division9 = 100;
  }
  else { var w_division9 = 75; }
  xScale9 = d3.scaleLinear()
                  .domain([0,1])
                  .range([w_division9, w9-w_diff9]);
  svg9.selectAll(".xLine")
      .attr("x1", xScale9(0))
      .attr("x2", xScale9(1));
  svg9.selectAll(".oDots")
      .attr("cx", function(d) {
        return xScale9(d.oline);
      });
  svg9.selectAll(".dDots")
      .attr("cx", function(d) {
        return xScale9(d.dline);
      });
  svg9.selectAll("#oLabel9")
      .attr("x", function(d) {
        return xScale9(d.oline);
      })
      .style("text-anchor", function(d) {
        if (w9 < 680) {
          if (d.division=="mixed") {
            return "start";
          }
        }
        else { return "middle"; }
      });
  svg9.selectAll("#dLabel9")
      .attr("x", function(d) {
        return xScale9(d.dline);
      })
      .style("text-anchor", function(d) {
        if (w9 < 680) {
          if (d.division=="mixed") {
            return "end";
          }
        }
        else { return "middle"; }
      });
  svg9.select("#dline_axis_labels")
      .attr("x", xScale9(.7))
      .style("text-anchor", function(d) {
        if (w9 < 680) {
          return "end";
        }
        else { return "middle"; }
      });
  svg9.select("#oline_axis_labels")
      .attr("x", xScale9(.8))
      .style("text-anchor", function(d) {
        if (w9 < 680) {
          return "start";
        }
        else { return "middle"; }
      });

  svg9.select("#diff_axis_labels9")
      .text(function() {
        if (w9>=390) { return "O-line- D-line diff"; }
        else { return "Diff"}
      })
      .attr("x", xScale9(1)+w_diff9/2)
      .attr("y", function() {
        if (w9>=390) { return 30; }
        else { return 40; }
      })
      .call(wrap, w_diff9-20);
  svg9.selectAll("#diffLabel9")
      .attr("x", xScale9(1)+35);
  svg9.select("#zero_label9")
      .attr("x", xScale9(0))
      .style("font-size", function() {
        if (bodyWidth>=600) {
          return 10;
        }
        else { return 9; }
      });
  svg9.select("#hundred_label9")
      .attr("x", xScale9(1))
      .style("font-size", function() {
        if (bodyWidth>=600) {
          return 10;
        }
        else { return 9; }
      })
      .style("text-anchor", function() {
        if (w9>=380) { return "end"; }
        else { return "middle"; }
      });
}; // end chart 9 resize
////////////////////////////////////////////////////////////////////////////////
function init() {
  // set up all charts
  chart8_setup();
  chart9_setup();

  // setup event listener to handle window resize
  window.addEventListener('resize', function() {
    chart8_resize();
    chart9_resize();
  });
}; // end resize function

init();
