var bodyWidth = document.documentElement.clientWidth;
/////////////////////////////////////////////////////////////////////////////
var svg6 = d3.select("#svg-conversionrate");
var dataset6 = [{division:"mens", hold:.81, single:.61},
                {division:"mixed", hold:.78, single:.51},
                {division:"womens", hold:.78, single:.5}];
var w6 = document.getElementById("svg-conversionrate").getBoundingClientRect().width;
if (w6>=520) {
  var w_label6 = 40;
}
else { var w_label6 = 30;}
var w_spacing6 = 10;
var w_circle6 = (w6-w_label6-w_spacing6)/3;
var max_r = w_circle6/2;
var currentHeight = w_circle6+20 // get current height of graphic
document.getElementById("svg-conversionrate").style.height = (currentHeight) + "px";
function chart6_setup() {
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
      .attr("y", function() {
        if (w6>=720) {
          return 40;
        }
        else { return 30; }
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
      .attr("id", "single_label6")
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
      .attr("id", "hold_label6")
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
        return max_r + (max_r - 2*(max_r * d.hold))+40;
      })
      .text(function(d) {
        return d3.format(".0%")(d.hold);
      });
  svg6.append("text")
      .attr("class", "axis_labels")
      .attr("id", "hold_axis_label6")
      .text("Offensive holds")
      .attr("x", 2*max_r*.73+w_label6)
      .attr("y", function() {
        if (w6>=435) {
          return max_r;
        }
        else { return max_r-5; }
      })
      .style("text-anchor", "start")
      .call(wrap, .12*w6)
  svg6.append("text")
      .attr("class", "axis_labels")
      .attr("id", "single_axis_label6")
      .text("Single- possession scores")
      .attr("x", 2*max_r*.73+w_label6)
      .attr("y", function() {
        if (w6>=435) {
          return 1.8*max_r;
        }
        else { return 1.8*max_r; }
      })
      .call(wrap, .12*w6)
      .style("text-anchor", "start")
      .style("fill", coral);
}; // end chart6 setup
function chart6_resize() {
  w6 = document.getElementById("svg-conversionrate").getBoundingClientRect().width;
  w_circle6 = (w6-w_label6-w_spacing6)/3;
  max_r = w_circle6/2;
  currentHeight = w_circle6+20 // get current height of graphic
  document.getElementById("svg-conversionrate").style.height = (currentHeight) + "px";
  if (w6>=520) {
    w_label6 = 40;
  } else { w_label6 = 30;}

  svg6.selectAll(".division_labels")
      .attr("x", function(d) {
        if (d=="mens") {
          return w_circle6/2;
        }
        else if (d=="mixed") {
          return w_label6 + w_spacing6 + w_circle6*1.5;
        }
        else { return w_label6 + w_spacing6*2 + w_circle6*2.5; }
      })
      .attr("y", function() {
        if (w6>=720) {
          return 40;
        }
        else { return 30; }
      });
  svg6.selectAll(".single_circles")
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
      });
  svg6.selectAll(".circles")
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
      });
  svg6.selectAll("#single_label6")
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
      });
  svg6.selectAll("#hold_label6")
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
        return max_r + (max_r - 2*(max_r * d.hold))+40;
      });
  svg6.select("#hold_axis_label6")
      .text("Offensive holds")
      .attr("x", 2*max_r*.73+w_label6)
      .attr("y", function() {
        if (w6>=435) {
          return max_r;
        }
        else { return max_r-5; }
      })
      .call(wrap, .12*w6);
  svg6.select("#single_axis_label6")
      .text("Single- possession scores")
      .attr("x", 2*max_r*.73+w_label6)
      .attr("y", function() {
        if (w6>=435) {
          return 1.8*max_r;
        }
        else { return 1.8*max_r; }
      })
      .call(wrap, .12*w6);
}; // end chart6 resize
/////////////////////////////////////////////////////////////////////////////
var svg7 = d3.select("#svg-perfectconversion");
var dataset7 = [{division:"mens", lose:.71, win:.76},
                {division:"mixed", lose:.73, win:.66},
                {division:"womens", lose:.56, win:.64}];
var w7 = document.getElementById("svg-perfectconversion").getBoundingClientRect().width;
var h7 = document.getElementById("svg-perfectconversion").getBoundingClientRect().height;
var h_label = 5;
var h_spacing7 = 10;
var w_diff7 = 70;
if (bodyWidth>=600) {
  var w_division7 = 100;
}
else { var w_division7 = 75; }
var h_dots7 = (h7 - h_spacing7*3)/3;
var xScale7 = d3.scaleLinear()
                .domain([0,1])
                .range([w_division7, w7-w_diff7])

function chart7_setup() {
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
      .style("fill", orange);
  if (w7 >= 550) { // if width is greater than 550, then don't need to wrap
    svg7.append("text")
        .attr("class", "axis_labels")
        .attr("id", "losing_avg_label")
        .text("Losing teams")
        .attr("x", xScale7(.71))
        .attr("y", 35)
        .style("text-anchor", "end")
        .style("fill", orange)
        .style("font-family", "radnika-bold");
    svg7.append("text")
        .attr("class", "axis_labels")
        .attr("id", "winning_avg_label")
        .text("Winning teams")
        .attr("x", xScale7(.76))
        .attr("y", 35)
        .style("text-anchor", "start")
        .style("fill", coral)
        .style("font-family", "radnika-bold");
    svg7.selectAll("winLabel7")
        .data(dataset7)
        .enter()
        .append("text")
        .attr("class", "data_labels")
        .attr("id", "winLabel7")
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
        .attr("id", "loseLabel7")
        .attr("x", function(d) {
          return xScale7(d.lose);
        })
        .attr("y", function(d,i) {
          return h_label+20+(i+1)*h_dots7;
        })
        .text(function(d) {
          return d3.format(".0%")(d.lose);
        })
        .style("fill", orange);
  }
  else {
    svg7.append("text")
        .attr("class", "axis_labels")
        .attr("id", "losing_avg_label")
        .text("Losing teams")
        .attr("x", xScale7(.71))
        .attr("y", 25)
        .call(wrap, 50)
        .style("text-anchor", "end")
        .style("fill", orange)
        .style("font-family", "radnika-bold");
    svg7.append("text")
        .attr("class", "axis_labels")
        .attr("id", "winning_avg_label")
        .text("Winning teams")
        .attr("x", xScale7(.76))
        .attr("y", 25)
        .call(wrap, 50)
        .style("text-anchor", "start")
        .style("fill", coral)
        .style("font-family", "radnika-bold");
    svg7.selectAll("winLabel7")
        .data(dataset7)
        .enter()
        .append("text")
        .attr("class", "data_labels")
        .attr("id", "winLabel7")
        .attr("x", function(d) {
          return xScale7(d.win);
        })
        .attr("y", function(d,i) {
          return h_label+20+(i+1)*h_dots7;
        })
        .text(function(d) {
          return d3.format(".0%")(d.win);
        })
        .style("fill", coral)
        .style("text-anchor", function(d) {
          if (d.division=="mixed") {
            return "end";
          }
          else { return "start"; }
        });
    svg7.selectAll("loseLabel7")
        .data(dataset7)
        .enter()
        .append("text")
        .attr("class", "data_labels")
        .attr("id", "loseLabel7")
        .attr("x", function(d) {
          return xScale7(d.lose);
        })
        .attr("y", function(d,i) {
          return h_label+20+(i+1)*h_dots7;
        })
        .text(function(d) {
          return d3.format(".0%")(d.lose);
        })
        .style("fill", orange)
        .style("text-anchor", function(d) {
          if (d.division=="mixed") {
            return "start";
          }
          else { return "end"; }
        });
  }; // end else
  svg7.append("text")
      .attr("class", "axis_labels")
      .attr("id", "diff_axis_label7")
      .text("Winning- Losing diff")
      .attr("x", xScale7(1)+10)
      .attr("y", 25)
      .style("text-anchor", "start")
      .call(wrap, w_diff7)
      .style("font-family", "radnika-bold");
  svg7.selectAll("diffLabel7")
      .data(dataset7)
      .enter()
      .append("text")
      .attr("class", "data_labels")
      .attr("id", "diffLabel7")
      .attr("x", xScale7(1)+35)
      .attr("y", function(d,i) {
        return h_label+(i+1)*h_dots7+5;
      })
      .text(function(d) {
        return d3.format(".0%")(d.win-d.lose);
      })
      .style("text-anchor", "middle");
  svg7.append("text")
      .attr("class", "axis_labels")
      .attr("id", "zero_label7")
      .attr("x", xScale7(0))
      .attr("y", h_label+h_dots7+15)
      .text("0%")
      .style("fill", "gray")
      .style("text-anchor", "start")
      .style("font-size", function() {
        if (bodyWidth>=600) {
          return 10;
        }
        else { return 9; }
      });
  svg7.append("text")
      .attr("class", "axis_labels")
      .attr("id", "hundred_label7")
      .attr("x", xScale7(1))
      .attr("y", h_label+h_dots7+15)
      .text("100%")
      .style("fill", "gray")
      .style("text-anchor", "end")
      .style("font-size", function() {
        if (bodyWidth>=600) {
          return 10;
        }
        else { return 9; }
      });
}; // end chart7 setup
function chart7_resize() {
  bodyWidth = document.documentElement.clientWidth;
  w7 = document.getElementById("svg-perfectconversion").getBoundingClientRect().width;
  if (bodyWidth>=600) {
    var w_division7 = 100;
  }
  else { var w_division7 = 75; }
  xScale7 = d3.scaleLinear()
              .domain([0,1])
              .range([w_division7, w7-w_diff7])
  svg7.selectAll(".xLine")
      .attr("x1", xScale7(0))
      .attr("x2", xScale7(1));
  svg7.selectAll(".winDots")
      .attr("cx", function(d) {
        return xScale7(d.win);
      });
  svg7.selectAll(".loseDots")
      .attr("cx", function(d) {
        return xScale7(d.lose);
      });
  if (w7 >= 550) { // if width is greater than 550, then don't need to wrap
    svg7.select("#losing_avg_label")
        .text("Losing teams")
        .attr("x", xScale7(.71))
        .attr("y", 35);
    svg7.select("#winning_avg_label")
        .text("Winning teams")
        .attr("x", xScale7(.76))
        .attr("y", 35);
    svg7.selectAll("#winLabel7")
        .attr("x", function(d) {
          return xScale7(d.win);
        })
        .style("text-anchor", "middle");
    svg7.selectAll("#loseLabel7")
        .attr("x", function(d) {
          return xScale7(d.lose);
        })
        .style("text-anchor", "middle");
  } // end if statement
  else {
    svg7.select("#losing_avg_label")
        .text("Losing teams")
        .attr("x", xScale7(.71))
        .attr("y", 25)
        .call(wrap, 50);
    svg7.select("#winning_avg_label")
        .text("Winning teams")
        .attr("x", xScale7(.76))
        .attr("y", 25)
        .call(wrap, 50);
    svg7.selectAll("#winLabel7")
        .attr("x", function(d) {
          return xScale7(d.win);
        })
        .style("text-anchor", function(d) {
          if (d.division=="mixed") {
            return "end";
          }
          else { return "start"; }
        });
    svg7.selectAll("#loseLabel7")
        .attr("x", function(d) {
          return xScale7(d.lose);
        })
        .style("text-anchor", function(d) {
          if (d.division=="mixed") {
            return "start";
          }
          else { return "end"; }
        });
  }; // end else
  svg7.select("#diff_axis_label7")
      .text("Winning- Losing diff")
      .attr("x", xScale7(1)+10)
      .attr("y", 25)
      .style("text-anchor", "start")
      .call(wrap, w_diff7);
  svg7.selectAll("#diffLabel7")
      .attr("x", xScale7(1)+35);
  svg7.select("#zero_label7")
      .attr("x", xScale7(0))
      .style("font-size", function() {
        if (bodyWidth>=600) {
          return 10;
        }
        else { return 9; }
      });
  svg7.select("#hundred_label7")
      .attr("x", xScale7(1))
      .style("font-size", function() {
        if (bodyWidth>=600) {
          return 10;
        }
        else { return 9; }
      });
}; // end chart 7 resize

////////////////////////////////////////////////////////////////////////////////
function init() {
  // set up all charts
  chart6_setup();
  chart7_setup();

  // setup event listener to handle window resize
  window.addEventListener('resize', function() {
    chart6_resize();
    chart7_resize();
  });
}; // end resize function

init();
