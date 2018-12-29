var bodyWidth;
// SVG 1: Throws attempted
var svg1 = d3.select("#svg-throwsattempted");
var dataset1_throws = ["Short/mid down", "Swing", "Dump", "Huck", "Upside-down"];
var dataset1_mens = [51, 30, 10, 8, 1];
var dataset1_mixed = [52, 30, 8, 9, 1];
var dataset1_womens = [52, 31, 10, 7, 0.2];
var colors1 = [green, blue, pink, orange, coral];
var w1 = document.getElementById("svg-throwsattempted").getBoundingClientRect().width;
var w_spacing1 = 10;
var top1 = 20;
var h_labels1 = 50;
var w_pieSpace1 = (w1-w_spacing1*4)/3;
var w_pie1 = w_pieSpace1*.8;
var outerRadius1 = w_pie1/2;
var mensArcs1, womensArcs1, mixedArcs1, pie1, arc1, legend;
var currentHeight1 = w_pieSpace1+h_labels1+top1; // get current height of graphic
document.getElementById("svg-throwsattempted").style.height = (currentHeight1) + "px";

function chart1_setup() {
  svg1.selectAll("division_labels1")
      .data(dataset_divisions)
      .enter()
      .append("text")
      .attr("class", "division_labels")
      .attr("x", function(d) {
        if (d=="mens") {
          return w_spacing1 + w_pieSpace1/2;
        }
        else if (d=="mixed") {
          return w_spacing1*2 + w_pieSpace1*1.5;
        }
        else { return w_spacing1*3 + w_pieSpace1*2.5; }
      })
      .attr("y", top1+10)
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
  pie1 = d3.pie();
  arc1 = d3.arc()
           .innerRadius(0)
           .outerRadius(outerRadius1);
  mensArcs1 = svg1.selectAll("g.arc1")
                  .data(pie1(dataset1_mens))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + (w_spacing1+w_pieSpace1/2) + ", " + (top1+30 + w_pie1/2) + ")");
  mensArcs1.append("path")
           .style("fill", function(d,i) {
             return colors1[i];
           })
           .attr("d", arc1);
  mensArcs1.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d,i) {
             if (i==4) {
               return arc1.centroid(d)[0]+10;
             }
             else if (i>1) {
               return arc1.centroid(d)[0]*1.5
             }
             else { return arc1.centroid(d)[0]; }
           })
           .attr("y", function(d,i) {
             if (i>1) {
               return arc1.centroid(d)[1]*1.5
             }
             else { return arc1.centroid(d)[1]; }
           })
           .text(function(d) {
             return d.value + "%";
           });
  mixedArcs1 = svg1.selectAll("g.arc2")
                    .data(pie1(dataset1_mixed))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + (w_spacing1*2+w_pieSpace1*1.5) + ", " + (top1+30 + w_pie1/2) + ")");
  mixedArcs1.append("path")
            .style("fill", function(d,i) {
             return colors1[i];
            })
            .attr("d", arc1);
  mixedArcs1.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "data_labels")
            .attr("x", function(d,i) {
              if (i==4) {
                return arc1.centroid(d)[0]+10;
              }
              else if (i>1) {
                return arc1.centroid(d)[0]*1.5
              }
              else { return arc1.centroid(d)[0]; }
            })
            .attr("y", function(d,i) {
              if (i>1) {
                return arc1.centroid(d)[1]*1.5
              }
              else { return arc1.centroid(d)[1]; }
            })
            .text(function(d) {
             return d.value + "%";
           });
  womensArcs1 = svg1.selectAll("g.arc3")
                    .data(pie1(dataset1_womens))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + (w_spacing1*3+w_pieSpace1*2.5) + ", " + (top1+30 + w_pie1/2) + ")");
  womensArcs1.append("path")
             .style("fill", function(d,i) {
               return colors1[i];
             })
             .attr("d", arc1);
  womensArcs1.append("text")
             .attr("text-anchor", "middle")
             .attr("class", "data_labels")
             .attr("x", function(d,i) {
               if (i==4) {
                 return arc1.centroid(d)[0]+10;
               }
               else if (i>1) {
                 return arc1.centroid(d)[0]*1.5
               }
               else { return arc1.centroid(d)[0]; }
             })
             .attr("y", function(d,i) {
               if (i>1) {
                 return arc1.centroid(d)[1]*1.5
               }
               else { return arc1.centroid(d)[1]; }
             })
             .text(function(d) {
               if (d.value>1) {
                 return d.value + "%";
               }
               else { return "<1%"; }
             });
  legend = svg1.append("g")
               .attr("id", "legend1")
               .attr("transform", "translate("+ (w_spacing1) + ","+ (top1+10+w_pieSpace1)+")");
  legend.selectAll("legendRect")
        .data([0,1,2,3,4])
        .enter()
        .append("rect")
        .attr("class", "legendRect1")
        .attr("x", function(d,i) {
          if (w1>=568) {
            return w_spacing1 + 120*i;
          }
          else {
            return w_spacing1 + 70*i;
          }
        })
        .attr("y", 10)
        .attr("width", 7)
        .attr("height", 7)
        .style("fill", function(d,i) {
          return colors1[i];
        });
  legend.selectAll("legendText")
        .data(["Short/ mid down", "Swing", "Dump", "Huck", "Upside- down"])
        .enter()
        .append("text")
        .attr("class", "axis_labels")
        .attr("id", "legendText1")
        .attr("x", function(d,i) {
          if (w1>=568) {
            return w_spacing1 + 120*i + 12;
          }
          else {
            return w_spacing1 + 70*i + 12;
          }
        })
        .attr("y", 17)
        .text(function(d) {
          return d;
        })
        .call(wrap, 60)
        .style("text-anchor", "start");
}; // end chart 1 setup
function chart1_resize() {
  w1 = document.getElementById("svg-throwsattempted").getBoundingClientRect().width;
  w_pieSpace1 = (w1-w_spacing1*4)/3;
  w_pie1 = w_pieSpace1*.8;
  outerRadius1 = w_pie1/2;
  currentHeight1 = w_pieSpace1+h_labels1+top1; // get current height of graphic
  document.getElementById("svg-throwsattempted").style.height = (currentHeight1) + "px";

  svg1.selectAll(".division_labels")
      .attr("x", function(d) {
        if (d=="mens") {
          return w_spacing1 + w_pieSpace1/2;
        }
        else if (d=="mixed") {
          return w_spacing1*2 + w_pieSpace1*1.5;
        }
        else { return w_spacing1*3 + w_pieSpace1*2.5; }
      });
  pie1 = d3.pie();
  arc1 = d3.arc()
           .innerRadius(0)
           .outerRadius(outerRadius1);
  mensArcs1.attr("transform", "translate(" + (w_spacing1+w_pieSpace1/2) + ", " + (top1+30 + w_pie1/2) + ")");
  mensArcs1.select("path")
           .attr("d", arc1);
  mensArcs1.select("text")
           .attr("x", function(d,i) {
             if (i==4) {
               return arc1.centroid(d)[0]+10;
             }
             else if (i>1) {
               return arc1.centroid(d)[0]*1.5
             }
             else { return arc1.centroid(d)[0]; }
           })
           .attr("y", function(d,i) {
             if (i>1) {
               return arc1.centroid(d)[1]*1.5
             }
             else { return arc1.centroid(d)[1]; }
           });
  mixedArcs1.attr("transform", "translate(" + (w_spacing1*2+w_pieSpace1*1.5) + ", " + (top1+30 + w_pie1/2) + ")");
  mixedArcs1.select("path")
            .attr("d", arc1);
  mixedArcs1.select("text")
            .attr("x", function(d,i) {
              if (i==4) {
                return arc1.centroid(d)[0]+10;
              }
              else if (i>1) {
                return arc1.centroid(d)[0]*1.5
              }
              else { return arc1.centroid(d)[0]; }
            })
            .attr("y", function(d,i) {
              if (i>1) {
                return arc1.centroid(d)[1]*1.5
              }
              else { return arc1.centroid(d)[1]; }
            });
  womensArcs1.attr("transform", "translate(" + (w_spacing1*3+w_pieSpace1*2.5) + ", " + (top1+30 + w_pie1/2) + ")");
  womensArcs1.select("path")
             .attr("d", arc1);
  womensArcs1.select("text")
             .attr("x", function(d,i) {
               if (i==4) {
                 return arc1.centroid(d)[0]+10;
               }
               else if (i>1) {
                 return arc1.centroid(d)[0]*1.5
               }
               else { return arc1.centroid(d)[0]; }
             })
             .attr("y", function(d,i) {
               if (i>1) {
                 return arc1.centroid(d)[1]*1.5
               }
               else { return arc1.centroid(d)[1]; }
             });
  legend.attr("transform", "translate("+ (w_spacing1) + ","+ (top1+10+w_pieSpace1)+")");
  legend.selectAll(".legendRect1")
        .attr("x", function(d,i) {
          if (w1>=568) {
            return w_spacing1 + 120*i;
          }
          else {
            return w_spacing1 + 70*i;
          }
        });
  legend.selectAll("#legendText1")
        .attr("x", function(d,i) {
          if (w1>=568) {
            return w_spacing1 + 120*i + 12;
          }
          else {
            return w_spacing1 + 70*i + 12;
          }
        })
        .attr("y", 17)
        .text(function(d) {
          return d;
        })
        .call(wrap, 60);
}; // end chart 1 resize

// SVG 2: Completion rates of throws
var svg2 = d3.select("#svg-completionrates");
var dataset2 = [{division:"mens", throw:"All throws", rate:.91 }, {division:"mens",throw:"Dump", rate:.99}, {division:"mens",throw:"Swing", rate:.97},
                {division:"mens",throw:"Short/mid down", rate:.93}, {division:"mens", throw:"Huck", rate:.53},
                {division:"mixed", throw:"all", rate:.91}, {division:"mixed",throw:"dump", rate:.98}, {division:"mixed",throw:"swing", rate:.97},
                {division:"mixed", throw:"down", rate:.92}, {division:"mixed",throw:"huck", rate:.53},
                {division:"womens", throw:"all", rate:.88}, {division:"womens",throw:"dump", rate:.98}, {division:"womens",throw:"swing", rate:.95},
                {division:"womens", throw:"down", rate:.88}, {division:"womens",throw:"huck", rate:.48}];
var w2 = document.getElementById("svg-completionrates").getBoundingClientRect().width;
var h2 = document.getElementById("svg-completionrates").getBoundingClientRect().height;
if (w2>=568) {
  var w_labels2 = 100;
}
else { var w_labels2 = 75; }
var w_spacing2 = 10;
var h_spacing2 = 5;
var left2 = 5;
var w_bar2 = (w2-w_labels2-w_spacing2*3)/3;
var h_bar2 = (h2-50-h_spacing2*5)/5;
var xScale2 = d3.scaleLinear()
                .domain([0,1])
                .range([10, w_bar2]);
function chart2_setup() {
  svg2.selectAll("division_labels2")
      .data(dataset_divisions)
      .enter()
      .append("text")
      .attr("class", "division_labels")
      .attr("x", function(d) {
        if (d=="mens") {
          return w_labels2 + w_spacing2 + w_bar2/2;
        }
        else if (d=="mixed") {
          return w_labels2 + w_spacing2*2 + w_bar2*1.5;
        }
        else { return w_labels2 + w_spacing2*3 + w_bar2*2.5; }
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
  svg2.selectAll("axis_labels2")
      .data(dataset2)
      .enter()
      .filter(function(d) { return d.division=="mens"; })
      .append("text")
      .attr("class", "axis_labels")
      .attr("x", w_labels2+left2)
      .attr("y", function(d,i) {
        return 50 + (i%5+1)*(h_bar2 + h_spacing2)-h_bar2/2;
      })
      .text(function(d) {
        return d.throw;
      })
      .style("text-anchor", "end");
  svg2.selectAll("bar2")
     .data(dataset2)
     .enter()
     .append("rect")
     .attr("class", "bar2")
     .attr("x", function(d) {
       if (d.division=="mens") {
         return w_labels2+left2+w_spacing2;
       }
       else if (d.division=="mixed") {
         return w_labels2 + w_spacing2*2 + w_bar2;
       }
       else { return w_labels2 + w_spacing2*3 + w_bar2*2; }
     })
     .attr("y", function(d,i) {
       return 50 + i%5*(h_bar2 + h_spacing2);
     })
     .attr("width", function(d) {
       return xScale2(d.rate);
     })
     .attr("height", h_bar2);
   svg2.selectAll("data_labels2")
      .data(dataset2)
      .enter()
      .append("text")
      .attr("class", "data_labels")
      .attr("x", function(d) {
        if (d.division=="mens") {
          return w_labels2 + w_spacing2 + xScale2(d.rate) - 5;
        }
        else if (d.division=="mixed") {
          return w_labels2 + w_spacing2*2 + w_bar2 +xScale2(d.rate) - 5;
        }
        else { return w_labels2 + w_spacing2*3 + w_bar2*2 +xScale2(d.rate) - 5; }
      })
      .attr("y", function(d,i) {
        return 50 + (i%5+1)*(h_bar2 + h_spacing2)-h_bar2/2;
      })
      .text(function(d) {
        return d3.format(".0%")(d.rate);
      })
      .style("text-anchor", "end");
}; // end chart2 setup
function chart2_resize() {
  w2 = document.getElementById("svg-completionrates").getBoundingClientRect().width;
  w_bar2 = (w2-w_labels2-w_spacing2*3)/3;
  xScale2 = d3.scaleLinear()
              .domain([0,1])
              .range([10, w_bar2]);
  if (w2>=568) {
    w_labels2 = 100;
  }
  else { w_labels2 = 75; }
  svg2.selectAll(".division_labels")
      .attr("x", function(d) {
        if (d=="mens") {
          return w_labels2 + w_spacing2 + w_bar2/2;
        }
        else if (d=="mixed") {
          return w_labels2 + w_spacing2*2 + w_bar2*1.5;
        }
        else { return w_labels2 + w_spacing2*3 + w_bar2*2.5; }
      });
  svg2.selectAll(".axis_labels")
      .attr("x", w_labels2+left2);
  svg2.selectAll(".bar2")
       .attr("x", function(d) {
         if (d.division=="mens") {
           return w_labels2+left2+w_spacing2;
         }
         else if (d.division=="mixed") {
           return w_labels2 + w_spacing2*2 + w_bar2;
         }
         else { return w_labels2 + w_spacing2*3 + w_bar2*2; }
       })
       .attr("width", function(d) {
         return xScale2(d.rate);
       });
   svg2.selectAll(".data_labels")
        .attr("x", function(d) {
          if (d.division=="mens") {
            return w_labels2 + w_spacing2 + xScale2(d.rate) - 5;
          }
          else if (d.division=="mixed") {
            return w_labels2 + w_spacing2*2 + w_bar2 +xScale2(d.rate) - 5;
          }
          else { return w_labels2 + w_spacing2*3 + w_bar2*2 +xScale2(d.rate) - 5; }
        });
}; // end resize chart 2
//////////////////////////////////////////////////////////////////////////////
// SVG 3: Scored throws
var svg3 = d3.select("#svg-scoredthrows");
var dataset3 = [{division:"mens",throw:"Short/ mid down", rate:.58, net:.58}, {division:"mens", throw:"Huck", rate:.34, net:.92}, {division:"mens", throw:"Upside- down", rate:.04, net:.96}, {division:"mens",throw:"Swing", rate:.03, net:.99}, {division:"mens",throw:"Callahan", rate:.005, net:1},
                {division:"mixed", throw:"down", rate:.57, net:.57}, {division:"mixed",throw:"huck", rate:.36, net:.93},{division:"mixed",throw:"over", rate:.04, net:.97},{division:"mixed",throw:"swing", rate:.03, net:.996},{division:"mixed",throw:"callahan", rate:.004, net:1},
                {division:"womens", throw:"down", rate:.72, net:.72}, {division:"womens",throw:"huck", rate:.25, net:.97},{division:"womens",throw:"over", rate:.004, net:.98},{division:"womens",throw:"swing", rate:.02, net:1}];
var w3 = document.getElementById("svg-scoredthrows").getBoundingClientRect().width;
var h_section3 = document.getElementById("svgSection-scoredthrows").getBoundingClientRect().height;

if (w3>=238) {
  var h3 = h_section3*.87;
}
else if (w3>=201) {
  var h3 = h_section3*.83;
} else {
  var h3 = h_section3*.76;
};
var bottom3 = 5;

if (bodyWidth>=600) {
  var w_labels3 = 100;
}
else { var w_labels3=60; }

if (w3 >= 300) {
  var w_spacing3 = 30;
}
else { var w_spacing3 = 10; }
var w_bar3 = (w3-w_labels3-w_spacing3*3)/3;
var h_bar3 = h3 - 50 - bottom3;
var yScale3 = d3.scaleLinear()
                .domain([0,1])
                .range([3,h_bar3]);

function chart3_setup() {
  svg3.selectAll("division_labels3")
      .data(dataset_divisions)
      .enter()
      .append("text")
      .attr("class", "division_labels")
      .attr("x", function(d) {
        if (d=="mens") {
          return w_labels3 + w_bar3/2;
        }
        else if (d=="mixed") {
          return w_labels3 + w_bar3*1.5 + w_spacing3
        }
        else { return w_labels3 + w_bar3*2.5 + w_spacing3*2; }
      })
      .attr("y", 30)
      .text(function(d) {
        if (w3 >= 250) {
          if (d=="mens") {
            return "MEN'S"
          }
          else if (d=="mixed") {
            return "MIXED"
          }
          else { return "WOMEN'S"; }
        }
        else {
          if (d=="mens") {
            return "M"
          }
          else if (d=="mixed") {
            return "X"
          }
          else { return "W"; }
        }
      })
      .style("text-anchor", "middle");
  svg3.selectAll("axis_labels3")
      .data(dataset3)
      .enter()
      .filter(function(d) { return d.division=="mens"; })
      .append("text")
      .attr("class", "axis_labels")
      .attr("x", w_labels3-10)
      .attr("y", function(d,i) {
        if (bodyWidth>=600) {
          if (d.throw=="Huck" | d.throw=="Short/ mid down") {
            return 50+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Upside- down") {
            return 45+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Swing") {
            return 48+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Callahan") {
            return 55+yScale3(d.net-d.rate/2);
          }
        }
        else {
          if (d.throw=="Huck" | d.throw=="Short/ mid down") {
            return 50+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Upside- down") {
            return 35+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Swing") {
            return 50+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Callahan") {
            return 55+yScale3(d.net-d.rate/2);
          }
        }
      })
      .text(function(d) {
        return d.throw;
      })
      .call(wrap, w_labels3-10)
      .style("text-anchor", "end");
  svg3.selectAll("bar3")
      .data(dataset3)
      .enter()
      .append("rect")
      .attr("class", "bar3")
      .attr("x", function(d) {
        if (d.division=="mens") {
          return w_labels3;
        }
        else if (d.division == "mixed") {
          return w_labels3 + w_bar3 + w_spacing3;
        }
        else {
          return w_labels3 + w_bar3*2 + w_spacing3*2;
        }
      })
      .attr("y", function(d,i) {
        return 45+yScale3(d.net-d.rate);
      })
      .attr("width", w_bar3)
      .attr("height", function(d) {
        return yScale3(d.rate)
      })
      .style("fill", function(d) {
        if (d.throw=="down" | d.throw=="Short/ mid down") {
          return green;
        }
        else if (d.throw=="huck" | d.throw=="Huck") {
          return orange;
        }
        else if (d.throw=="over" | d.throw=="Upside- down") {
          return coral;
        }
        else if (d.throw=="callahan" | d.throw=="Callahan") {
          return pink;
        }
        else { return blue; }
      })
  svg3.selectAll("data_labels3")
     .data(dataset3)
     .enter()
     .append("text")
     .attr("class", "data_labels")
     .attr("x", function(d) {
       if (d.division=="mens") {
         return w_labels3 + w_bar3/2;
       }
       else if (d.division == "mixed") {
         return w_labels3 + w_bar3 + w_spacing3 + w_bar3/2;
       }
       else {
         return w_labels3 + w_bar3*2 + w_spacing3*2 + w_bar3/2;
       }
     })
     .attr("y", function(d,i) {
       if (d.throw=="down" | d.throw=="huck" | d.throw=="Short/ mid down" | d.throw=="Huck") {
        return 50+yScale3(d.net-d.rate/2);
       }
       else if (d.throw=="Upside- down" | d.throw=="over") {
         return 45+yScale3(d.net-d.rate/2);
       }
       else if (d.throw=="Swing" | d.throw=="swing") {
         if (d.division=="womens") {
           return 52+yScale3(d.net-d.rate/2);
         }
         else { return 48+yScale3(d.net-d.rate/2); }
       }
       else if (d.throw=="Callahan" | d.throw=="callahan") {
         return 55+yScale3(d.net-d.rate/2);
       }
     })
     .text(function(d) {
       if (d.rate<0.01) {
         return "<1%";
       }
       else {return d3.format(".0%")(d.rate);}
     })
     .style("text-anchor", "middle");
}; // end chart 3 setup

function chart3_resize() {
  w3 = document.getElementById("svg-scoredthrows").getBoundingClientRect().width;
  bodyWidth = document.documentElement.clientWidth;
  // Width of labels
  if (bodyWidth>=600) {
    w_labels3 = 100;
  }
  else { w_labels3=60; }

  // spacing
  if (w3 >= 300) {
    w_spacing3 = 30;
  }
  else { w_spacing3 = 10; }
  w_bar3 = (w3-w_labels3-w_spacing3*3)/3;
  // height of svg
  h_section3 = document.getElementById("svgSection-scoredthrows").getBoundingClientRect().height;
  if (w3>=238) {
    h3 = h_section3*.87;
  }
  else if (w3>=201) {
    h3 = h_section3*.83;
  } else {
    h3 = h_section3*.76;
  };
  h_bar3 = h3 - 50 - bottom3;
  yScale3 = d3.scaleLinear()
              .domain([0,1])
              .range([3,h_bar3]);

  svg3.selectAll(".division_labels")
      .attr("x", function(d) {
        if (d=="mens") {
          return w_labels3 + w_bar3/2;
        }
        else if (d=="mixed") {
          return w_labels3 + w_bar3*1.5 + w_spacing3
        }
        else { return w_labels3 + w_bar3*2.5 + w_spacing3*2; }
      })
      .text(function(d) {
        if (w3 >= 250) {
          if (d=="mens") {
            return "MEN'S"
          }
          else if (d=="mixed") {
            return "MIXED"
          }
          else { return "WOMEN'S"; }
        }
        else {
          if (d=="mens") {
            return "M"
          }
          else if (d=="mixed") {
            return "X"
          }
          else { return "W"; }
        }
      });
  svg3.selectAll(".axis_labels")
      .attr("x", w_labels3-10)
      .attr("y", function(d,i) {
        if (bodyWidth>=600) {
          if (d.throw=="Huck" | d.throw=="Short/ mid down") {
            return 50+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Upside- down") {
            return 45+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Swing") {
            return 48+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Callahan") {
            return 55+yScale3(d.net-d.rate/2);
          }
        }
        else {
          if (d.throw=="Huck" | d.throw=="Short/ mid down") {
            return 50+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Upside- down") {
            return 35+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Swing") {
            return 50+yScale3(d.net-d.rate/2);
          }
          else if (d.throw=="Callahan") {
            return 55+yScale3(d.net-d.rate/2);
          }
        }
      })
      .text(function(d) {
        return d.throw;
      })
      .call(wrap, w_labels3-10);
  svg3.selectAll(".bar3")
      .attr("x", function(d) {
        if (d.division=="mens") {
          return w_labels3;
        }
        else if (d.division == "mixed") {
          return w_labels3 + w_bar3 + w_spacing3;
        }
        else {
          return w_labels3 + w_bar3*2 + w_spacing3*2;
        }
      })
      .attr("y", function(d,i) {
        return 45+yScale3(d.net-d.rate);
      })
      .attr("height", function(d) {
        return yScale3(d.rate)
      })
      .attr("width", w_bar3);
  svg3.selectAll(".data_labels")
       .attr("x", function(d) {
         if (d.division=="mens") {
           return w_labels3 + w_bar3/2;
         }
         else if (d.division == "mixed") {
           return w_labels3 + w_bar3 + w_spacing3 + w_bar3/2;
         }
         else {
           return w_labels3 + w_bar3*2 + w_spacing3*2 + w_bar3/2;
         }
       })
       .attr("y", function(d,i) {
         if (d.throw=="down" | d.throw=="huck" | d.throw=="Short/ mid down" | d.throw=="Huck") {
          return 50+yScale3(d.net-d.rate/2);
         }
         else if (d.throw=="Upside- down" | d.throw=="over") {
           return 45+yScale3(d.net-d.rate/2);
         }
         else if (d.throw=="Swing" | d.throw=="swing") {
           if (d.division=="womens") {
             return 52+yScale3(d.net-d.rate/2);
           }
           else { return 48+yScale3(d.net-d.rate/2); }
         }
         else if (d.throw=="Callahan" | d.throw=="callahan") {
           return 55+yScale3(d.net-d.rate/2);
         }
       });
}; // end chart 3 resize

/////////////////////////////////////////////////////////////////////////////
var svg4 = d3.select("#svg-turnovers");
var dataset4 = [{division:"mens", rate:.49, avg:2.2, max:11},
                {division:"mixed", rate:.53, avg:2.3, max:7},
                {division:"womens", rate:.59, avg:2.8, max:10}];
var w4 = document.getElementById("svg-turnovers").getBoundingClientRect().width;
var h4 = document.getElementById("svg-turnovers").getBoundingClientRect().height;
var top4 = 20;
var bottom4 = 20;
var w_labels4 = 60;
var w_division4 = 55;
var spacing4 = 10;
if (w4>=360) {
  left4 = 15;
  w_labels4 = 100;
} else {
  left4 = 0;
  w_labels4 = 60;
}
// figure out radius of pies
var h_pieSpace4 = (h4-top4-bottom4-spacing4*2)/3;
var w_pieSpace4 = w4-w_division4-w_labels4-spacing4*2;
if (h_pieSpace4<=w_pieSpace4) { // height is smaller; adjust width
  var pieSpace4 = h_pieSpace4;
} else { pieSpace4 = w_pieSpace4; }
var outerRadius4 = pieSpace4/2;
var mensArcs4, womensArcs4, mixedArcs4, arc4, pie4;
function chart4_setup() {
  svg4.selectAll("division_labels4")
      .data(dataset_divisions)
      .enter()
      .append("text")
      .attr("x", left4)
      .attr("y", function(d,i) {
        return top4 + (h_pieSpace4)*i + h_pieSpace4/2 + spacing4*i+1;
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
  pie4 = d3.pie().sort(null);
  arc4 = d3.arc()
           .innerRadius(0)
           .outerRadius(outerRadius4);
  mensArcs4 = svg4.selectAll("g.arc4")
                  .data(pie4([49,51]))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + (w_division4+spacing4+w_pieSpace4/2) + ", " + (top4+h_pieSpace4/2) + ")");
  mensArcs4.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc4);
  mensArcs4.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d) {
             return arc4.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc4.centroid(d)[1]
           })
           .text(function(d,i) {
             if (i==0) { return d.value + "%"; }
           });
  mixedArcs4 = svg4.selectAll("g.arc4")
                    .data(pie4([53,47]))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + (w_division4+spacing4+w_pieSpace4/2) + ", " + (spacing4+top4+h_pieSpace4*1.5) + ")");
  mixedArcs4.append("path")
             .style("fill", function(d,i) {
               if (i==0) { return coral; }
               else { return light_gray; }
             })
             .attr("d", arc4);
  mixedArcs4.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d) {
             return arc4.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc4.centroid(d)[1]
           })
           .text(function(d,i) {
             if (i==0) { return d.value + "%"; }
           });
  womensArcs4 = svg4.selectAll("g.arc4")
                    .data(pie4([59,41]))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + (w_division4+spacing4+w_pieSpace4/2) + ", " + (spacing4*2+top4+h_pieSpace4*2.5) + ")");
  womensArcs4.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc4);
  womensArcs4.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d) {
             return arc4.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc4.centroid(d)[1]
           })
           .text(function(d,i) {
             if (i==0) { return d.value + "%"; }
           });
  svg4.selectAll("avg_label4")
      .data(dataset4)
      .enter()
      .append("text")
      .attr("class", "data_labels")
      .attr("id", "avg_data_label4")
      .attr("x", w_division4 + spacing4*5 + w_pieSpace4) // need to fudge a bit because of the centered text
      .attr("y", function(d,i) {
        return top4 + h_pieSpace4*i + h_pieSpace4/2 + spacing4*i-20;
      })
      .text(function(d) {
        if (d.division=="mens") {
          return "Avg. per point: " + d3.format(.00)(d.avg);
        }
        else { return "Avg: " + d3.format(.00)(d.avg); }
      })
      .call(wrap, w_labels4)
      .style("text-anchor", "middle");
  svg4.selectAll("max_label4")
      .data(dataset4)
      .enter()
      .append("text")
      .attr("class", "data_labels")
      .attr("id", "max_data_label4")
      .attr("x", w_division4 + spacing4*5 + w_pieSpace4)
      .attr("y", function(d,i) {
        return top4 + h_pieSpace4*i + h_pieSpace4/2 + spacing4*i+20;
      })
      .text(function(d) {
        if (d.division=="mens") {
          return "Max. per point: " + d3.format(.0)(d.max);
        }
        else { return "Max: " + d3.format(.0)(d.max); }
      })
      .call(wrap, w_labels4)
      .style("text-anchor", "middle");
}; // end chart 4 setup
function chart4_resize() {
  w4 = document.getElementById("svg-turnovers").getBoundingClientRect().width;
  h4 = document.getElementById("svg-turnovers").getBoundingClientRect().height;
  // figure out radius of pies
  h_pieSpace4 = (h4-top4-bottom4-spacing4*2)/3;
  w_pieSpace4 = w4-w_division4-w_labels4-spacing4*2;
  if (h_pieSpace4<=w_pieSpace4) { // height is smaller; adjust width
    pieSpace4 = h_pieSpace4;
  } else { pieSpace4 = w_pieSpace4; }
  outerRadius4 = pieSpace4/2;

  if (w4>=360) {
    left4 = 15;
    w_labels4 = 100;
  } else {
    left4 = 0;
    w_labels4 = 60;
  }

  svg4.selectAll(".division_labels")
      .attr("x", left4)
      .attr("y", function(d,i) {
        return top4 + (h_pieSpace4)*i + h_pieSpace4/2 + spacing4*i+1;
      })
      .text(function(d) {
        if (d=="mens") {
          return "MEN'S"
        }
        else if (d=="mixed") {
          return "MIXED"
        }
        else { return "WOMEN'S"; }
      });
  pie4 = d3.pie().sort(null);
  arc4 = d3.arc()
           .innerRadius(0)
           .outerRadius(outerRadius4);
  mensArcs4.attr("transform", "translate(" + (w_division4+spacing4+w_pieSpace4/2) + ", " + (top4+h_pieSpace4/2) + ")");
  mensArcs4.select("path")
           .attr("d", arc4);
  mensArcs4.select("text")
           .attr("x", function(d) {
             return arc4.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc4.centroid(d)[1]
           });
  mixedArcs4.attr("transform", "translate(" + (w_division4+spacing4+w_pieSpace4/2) + ", " + (spacing4+top4+h_pieSpace4*1.5) + ")");
  mixedArcs4.select("path")
             .attr("d", arc4);
  mixedArcs4.select("text")
             .attr("x", function(d) {
               return arc4.centroid(d)[0]
             })
             .attr("y", function(d) {
               return arc4.centroid(d)[1]
             })
  womensArcs4.attr("transform", "translate(" + (w_division4+spacing4+w_pieSpace4/2) + ", " + (spacing4*2+top4+h_pieSpace4*2.5) + ")");
  womensArcs4.select("path")
             .attr("d", arc4);
  womensArcs4.select("text")
             .attr("x", function(d) {
               return arc4.centroid(d)[0]
             })
             .attr("y", function(d) {
               return arc4.centroid(d)[1]
             });
  svg4.selectAll("#avg_data_label4")
      .attr("x", w_division4 + spacing4*5 + w_pieSpace4) // need to fudge a bit because of the centered text
      .attr("y", function(d,i) {
        return top4 + h_pieSpace4*i + h_pieSpace4/2 + spacing4*i-20;
      })
      .text(function(d) {
        if (d.division=="mens") {
          return "Avg. per point: " + d3.format(.00)(d.avg);
        }
        else { return "Avg: " + d3.format(.00)(d.avg); }
      })
      .call(wrap, w_labels4);
  svg4.selectAll("#max_data_label4")
      .attr("x", w_division4 + spacing4*5 + w_pieSpace4)
      .attr("y", function(d,i) {
        return top4 + h_pieSpace4*i + h_pieSpace4/2 + spacing4*i+20;
      })
      .text(function(d) {
        if (d.division=="mens") {
          return "Max. per point: " + d3.format(.0)(d.max);
        }
        else { return "Max: " + d3.format(.0)(d.max); }
      })
      .call(wrap, w_labels4);
}; // end chart 4 resize
/////////////////////////////////////////////////////////////////////////////
var svg5 = d3.select("#svg-fieldpos");
var w5 = document.getElementById("svg-fieldpos").getBoundingClientRect().width;
var h5 = document.getElementById("svg-fieldpos").getBoundingClientRect().height;
var top5 = 35;
var h_spacing5 = 10;
if (bodyWidth>=600) {
  var w_label5 = 95;
}
else { var w_label5 = 75; }
var w_field5 = (w5-w_label5-10);
var h_field5 = (h5-top5-h_spacing5*2);
var outerRadius5 = (h_field5-40)/3/2;
var dataset5 = [{division:"mens", full:59, btwn:33, endzone:8},
                {division:"mixed", full:58, btwn:36, endzone:6},
                {division:"womens", full:45, btwn:51, endzone:4}];
var arc5_full_mens, arc5_full_womens, arc5_full_mixed, arc5_btwn_mens, arc5_btwn_womens, arc5_btwn_mixed, arc5_endzone_mens, arc5_endzone_womens, arc5_endzone_mixed;
function chart5_setup() {
  // labels
  svg5.append("text")
      .attr("x", w_label5+w_field5/5)
      .attr("y", top5)
      .text("Full field")
      .attr("class", "axis_labels")
      .attr("id", "full_axis_label5");
  svg5.append("text")
      .attr("x", w_label5+w_field5/2)
      .attr("y", function() {
        if (w5<=316) { return top5-15; }
        else { return top5-5; }
      })
      .text("Between full field and end zone")
      .attr("class", "axis_labels")
      .attr("id", "btwn_axis_label5")
      .call(wrap, d3.min([w_field5*2/6,100]));
  svg5.append("text")
      .attr("x", w_label5+w_field5*(4/5))
      .attr("y", top5)
      .text("End zone")
      .attr("class", "axis_labels")
      .attr("id", "end_axis_label5");
  svg5.append("line")
      .attr("x1", w_label5+w_field5/5)
      .attr("x2", w_label5+w_field5/5)
      .attr("y1", top5+15)
      .attr("y2", top5+15+h_field5)
      .style("stroke", "black")
      .attr("id", "full_line5");
  svg5.append("line")
      .attr("x1", w_label5+w_field5/2)
      .attr("x2", w_label5+w_field5/2)
      .attr("y1", top5+15)
      .attr("y2", top5+15+h_field5)
      .style("stroke", "black")
      .attr("id", "btwn_line5");
  svg5.append("line")
      .attr("x1", w_label5+w_field5*(4/5))
      .attr("x2", w_label5+w_field5*(4/5))
      .attr("y1", top5+15)
      .attr("y2", top5+15+h_field5)
      .style("stroke", "black")
      .attr("id", "end_line5");
  svg5.append("rect")
      .attr("x", w_label5)
      .attr("y", top5+15)
      .attr("height", h_field5)
      .attr("width", w_field5)
      .style("fill", "none")
      .style("stroke", "black")
      .attr("id", "fieldRect5")
  svg5.selectAll("division_labels5")
      .data(dataset_divisions)
      .enter()
      .append("text")
      .attr("x", 5)
      .attr("y", function(d,i) {
        return top5+15+10*(i+1)+outerRadius5*(2*i+1);
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
  var pie5 = d3.pie().sort(null);
  var arc5 = d3.arc()
               .innerRadius(0)
               .outerRadius(outerRadius5);
  arc5_full_mens = svg5.selectAll("g.arc5")
                        .data(pie5([dataset5[0].full,(100-dataset5[0].full)]))
                        .enter()
                        .append("g")
                        .attr("class", "arc")
                        .attr("transform", "translate(" + (w_label5+w_field5/5) + ", " + (top5+outerRadius5+25) + ")");
  arc5_full_mens.append("path")
                 .style("fill", function(d,i) {
                   if (i==0) { return coral; }
                   else { return light_gray; }
                 })
                 .attr("d", arc5);
  arc5_full_mens.append("text")
                 .attr("text-anchor", "middle")
                 .attr("class", "data_labels")
                 .attr("x", function(d) {
                   return arc5.centroid(d)[0]
                 })
                 .attr("y", function(d) {
                   return arc5.centroid(d)[1]
                 })
                 .text(function(d,i) {
                   if (i==0) { return d.value + "%"; }
                 })
                 .style("font-size", "12");
  arc5_full_mixed = svg5.selectAll("g.arc5")
                        .data(pie5([dataset5[1].full,(100-dataset5[1].full)]))
                        .enter()
                        .append("g")
                        .attr("class", "arc")
                        .attr("transform", "translate(" + (w_label5+w_field5/5) + ", " + (top5+outerRadius5*3+35) + ")");
  arc5_full_mixed.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc5);
  arc5_full_mixed.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d) {
             return arc5.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc5.centroid(d)[1]
           })
           .text(function(d,i) {
             if (i==0) { return d.value + "%"; }
           })
           .style("font-size", "12");
  arc5_full_womens = svg5.selectAll("g.arc5")
                          .data(pie5([dataset5[2].full,(100-dataset5[2].full)]))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + (w_label5+w_field5/5) + ", " + (top5+outerRadius5*5+45) + ")");
  arc5_full_womens.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc5);
  arc5_full_womens.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d) {
             return arc5.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc5.centroid(d)[1]
           })
           .text(function(d,i) {
             if (i==0) { return d.value + "%"; }
           })
           .style("font-size", "12");
  // btwn full and endzone
  arc5_btwn_mens = svg5.selectAll("g.arc5")
                        .data(pie5([dataset5[0].btwn,(100-dataset5[0].btwn)]))
                        .enter()
                        .append("g")
                        .attr("class", "arc")
                        .attr("transform", "translate(" + (w_label5+w_field5/2) + ", " + (top5+outerRadius5+25) + ")");
  arc5_btwn_mens.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc5);
  arc5_btwn_mens.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d) {
             return arc5.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc5.centroid(d)[1]
           })
           .text(function(d,i) {
             if (i==0) { return d.value + "%"; }
           })
           .style("font-size", "12");
  arc5_btwn_mixed = svg5.selectAll("g.arc5")
                        .data(pie5([dataset5[1].btwn,(100-dataset5[1].btwn)]))
                        .enter()
                        .append("g")
                        .attr("class", "arc")
                        .attr("transform", "translate(" + (w_label5+w_field5/2) + ", " + (top5+outerRadius5*3+35) + ")");
  arc5_btwn_mixed.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc5);
  arc5_btwn_mixed.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d) {
             return arc5.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc5.centroid(d)[1]
           })
           .text(function(d,i) {
             if (i==0) { return d.value + "%"; }
           })
           .style("font-size", "12");
  arc5_btwn_womens = svg5.selectAll("g.arc5")
                          .data(pie5([dataset5[2].btwn,(100-dataset5[2].btwn)]))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + (w_label5+w_field5/2) + ", " + (top5+outerRadius5*5+45) + ")");
  arc5_btwn_womens.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc5);
  arc5_btwn_womens.append("text")
           .attr("text-anchor", "middle")
           .attr("class", "data_labels")
           .attr("x", function(d) {
             return arc5.centroid(d)[0]
           })
           .attr("y", function(d) {
             return arc5.centroid(d)[1]
           })
           .text(function(d,i) {
             if (i==0) { return d.value + "%"; }
           })
           .style("font-size", "12");
  // end zone
  arc5_endzone_mens = svg5.selectAll("g.arc5")
                          .data(pie5([dataset5[0].endzone,(100-dataset5[0].endzone)]))
                          .enter()
                          .append("g")
                          .attr("class", "arc")
                          .attr("transform", "translate(" + (w_label5+w_field5*4/5) + ", " + (top5+outerRadius5+25) + ")");
  arc5_endzone_mens.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc5);
  arc5_endzone_mixed = svg5.selectAll("g.arc5")
                            .data(pie5([dataset5[1].endzone,(100-dataset5[1].endzone)]))
                            .enter()
                            .append("g")
                            .attr("class", "arc")
                            .attr("transform", "translate(" + (w_label5+w_field5*4/5) + ", " + (top5+outerRadius5*3+35) + ")");
  arc5_endzone_mixed.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc5);
  arc5_endzone_womens = svg5.selectAll("g.arc5")
                            .data(pie5([dataset5[2].endzone,(100-dataset5[2].endzone)]))
                            .enter()
                            .append("g")
                            .attr("class", "arc")
                            .attr("transform", "translate(" + (w_label5+w_field5*4/5) + ", " + (top5+outerRadius5*5+45) + ")");
  arc5_endzone_womens.append("path")
           .style("fill", function(d,i) {
             if (i==0) { return coral; }
             else { return light_gray; }
           })
           .attr("d", arc5);

  svg5.append("text")
      .attr("text-anchor", "middle")
      .attr("class", "data_labels")
      .attr("id", "mens_end_text")
      .attr("x", w_label5+w_field5*4/5+10)
      .attr("y", top5+outerRadius5+15)
      .text("9%")
      .style("font-size", "12");
  svg5.append("text")
      .attr("text-anchor", "middle")
      .attr("class", "data_labels")
      .attr("id", "mixed_end_text")
      .attr("x", w_label5+w_field5*4/5+10)
      .attr("y", top5+outerRadius5*3+25)
      .text("6%")
      .style("font-size", "12");
  svg5.append("text")
      .attr("text-anchor", "middle")
      .attr("class", "data_labels")
      .attr("id", "womens_end_text")
      .attr("x", w_label5+w_field5*4/5+10)
      .attr("y", top5+outerRadius5*5+35)
      .text("5%")
      .style("font-size", "12");
}; // end chart 5 setup
function chart5_resize() {
  bodyWidth = document.documentElement.clientWidth;
  w5 = document.getElementById("svg-fieldpos").getBoundingClientRect().width;
  w_field5 = (w5-w_label5-10);

  if (bodyWidth>=600) {
    w_label5 = 95;
  }
  else { w_label5 = 75; }

  // labels
  svg5.select("#full_axis_label5")
      .attr("x", w_label5+w_field5/5)
      .attr("y", top5)
      .text("Full field")
      .call(wrap, outerRadius5*2);
  svg5.select("#btwn_axis_label5")
      .attr("x", w_label5+w_field5/2)
      .attr("y", function() {
        if (w5<=316) { return top5-15; }
        else { return top5-5; }
      })
      .text("Between full field and end zone")
      .call(wrap, d3.min([w_field5*2/6,100]));
  svg5.select("#end_axis_label5")
      .attr("x", w_label5+w_field5*(4/5))
      .attr("y", top5)
      .text("End zone")
      .call(wrap, outerRadius5*2);
  svg5.select("#full_line5")
      .attr("x1", w_label5+w_field5/5)
      .attr("x2", w_label5+w_field5/5);
  svg5.select("#btwn_line5")
      .attr("x1", w_label5+w_field5/2)
      .attr("x2", w_label5+w_field5/2);
  svg5.select("#end_line5")
      .attr("x1", w_label5+w_field5*(4/5))
      .attr("x2", w_label5+w_field5*(4/5));
  svg5.select("#fieldRect5")
      .attr("x", w_label5)
      .attr("width", w_field5);
  arc5_full_mens.attr("transform", "translate(" + (w_label5+w_field5/5) + ", " + (top5+outerRadius5+25) + ")");
  arc5_full_mixed.attr("transform", "translate(" + (w_label5+w_field5/5) + ", " + (top5+outerRadius5*3+35) + ")");
  arc5_full_womens.attr("transform", "translate(" + (w_label5+w_field5/5) + ", " + (top5+outerRadius5*5+45) + ")");
  arc5_btwn_mens.attr("transform", "translate(" + (w_label5+w_field5/2) + ", " + (top5+outerRadius5+25) + ")");
  arc5_btwn_mixed.attr("transform", "translate(" + (w_label5+w_field5/2) + ", " + (top5+outerRadius5*3+35) + ")");
  arc5_btwn_womens.attr("transform", "translate(" + (w_label5+w_field5/2) + ", " + (top5+outerRadius5*5+45) + ")");
  arc5_endzone_mens.attr("transform", "translate(" + (w_label5+w_field5*4/5) + ", " + (top5+outerRadius5+25) + ")");
  arc5_endzone_mixed.attr("transform", "translate(" + (w_label5+w_field5*4/5) + ", " + (top5+outerRadius5*3+35) + ")");
  arc5_endzone_womens.attr("transform", "translate(" + (w_label5+w_field5*4/5) + ", " + (top5+outerRadius5*5+45) + ")");

  svg5.select("#mens_end_text")
      .attr("x", w_label5+w_field5*4/5+10);
  svg5.select("#mixed_end_text")
      .attr("x", w_label5+w_field5*4/5+10);
  svg5.select("#womens_end_text")
      .attr("x", w_label5+w_field5*4/5+10);

}; // end chart 5 resize
////////////////////////////////////////////////////////////////////////////////
function init() {
  // set up all charts
  chart1_setup();
  chart2_setup();
  chart3_setup();
  chart4_setup();
  chart5_setup();

  // setup event listener to handle window resize
  window.addEventListener('resize', function() {
    chart1_resize();
    chart2_resize();
    chart3_resize();
    chart4_resize();
    chart5_resize();
  });
}; // end resize function

init();
