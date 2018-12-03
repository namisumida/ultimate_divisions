/////////////////////////////////////////////////////////////////////////////
// SVG 1: Throws attempted
var svg1 = d3.select("#svg-throwsattempted");
var dataset1_throws = ["Short/mid down", "Swing", "Dump", "Huck", "Upside-down"];
var dataset1_mens = [51, 30, 10, 8, 1];
var dataset1_mixed = [52, 30, 8, 9, 1];
var dataset1_womens = [52, 32, 10, 7, 0.5];
var colors1 = [green, blue, pink, orange, coral];
var w1 = document.getElementById("svg-throwsattempted").getBoundingClientRect().width;
var h1 = document.getElementById("svg-throwsattempted").getBoundingClientRect().height;
var w_spacing1 = 10;
var left1 = 25;
var top1 = 30;
var w_pieSpace1 = (w1-w_spacing1*4)/3;
var w_pie1 = w_pieSpace1*.8;
var outerRadius1 = w_pie1/2;
svg1.selectAll("division_labels1")
    .data(dataset_divisions)
    .enter()
    .append("text")
    .attr("class", "division_labels")
    .attr("x", function(d) {
      if (d=="mens") {
        return left1 + w_spacing1 + w_pieSpace1/2;
      }
      else if (d=="mixed") {
        return left1 + w_spacing1*2 + w_pieSpace1*1.5;
      }
      else { return left1 + w_spacing1*3 + w_pieSpace1*2.5; }
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
var pie1 = d3.pie();
var arc1 = d3.arc()
             .innerRadius(0)
             .outerRadius(outerRadius1);
var mensArcs1 = svg1.selectAll("g.arc1")
                    .data(pie1(dataset1_mens))
                    .enter()
                    .append("g")
                    .attr("class", "arc")
                    .attr("transform", "translate(" + (left1+w_spacing1+w_pieSpace1/2) + ", " + (top1+40 + w_pie1/2) + ")");
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
var mixedArcs1 = svg1.selectAll("g.arc2")
                      .data(pie1(dataset1_mixed))
                      .enter()
                      .append("g")
                      .attr("class", "arc")
                      .attr("transform", "translate(" + (left1+w_spacing1+w_pieSpace1*1.5) + ", " + (top1+40 + w_pie1/2) + ")");
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
var womensArcs1 = svg1.selectAll("g.arc3")
                      .data(pie1(dataset1_womens))
                      .enter()
                      .append("g")
                      .attr("class", "arc")
                      .attr("transform", "translate(" + (left1+w_spacing1+w_pieSpace1*2.5) + ", " + (top1+40 + w_pie1/2) + ")");
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
svg1.append("text")
   .attr("class", "axis_labels")
   .text("Short/mid down")
   .attr("x", 260)
   .attr("y", 220)
   .call(wrap, 50);
svg1.append("text")
   .attr("class", "axis_labels")
   .text("Swing")
   .attr("x", 40)
   .attr("y", 210)
   .call(wrap, 50);
svg1.append("text")
   .attr("class", "axis_labels")
   .text("Dump")
   .attr("x", 50)
   .attr("y", 110)
   .call(wrap, 50);
svg1.append("text")
   .attr("class", "axis_labels")
   .text("Huck")
   .attr("x", 110)
   .attr("y", 70)
   .call(wrap, 50);
svg1.append("text")
   .attr("class", "axis_labels")
   .text("Upside-down")
   .attr("x", 190)
   .attr("y", 45)
   .call(wrap, 50);
// SVG 2: Completion rates of throws
var svg2 = d3.select("#svg-completionrates");
var dataset2 = [{division:"mens", throw:"All throws", rate:.78 }, {division:"mens",throw:"Dump", rate:.99}, {division:"mens",throw:"Swing", rate:.97},
                {division:"mens",throw:"Short/mid down", rate:.93}, {division:"mens", throw:"Upside-down", rate:.8}, {division:"mens", throw:"Huck", rate:.53},
                {division:"mixed", throw:"all", rate:.77}, {division:"mixed",throw:"dump", rate:.98}, {division:"mixed",throw:"swing", rate:.97},
                {division:"mixed", throw:"down", rate:.92}, {division:"mixed",throw:"over", rate:.79}, {division:"mixed",throw:"huck", rate:.53},
                {division:"womens", throw:"all", rate:.74}, {division:"womens",throw:"dump", rate:.98}, {division:"womens",throw:"swing", rate:.95},
                {division:"womens", throw:"down", rate:.88}, {division:"womens",throw:"over", rate:.71}, {division:"womens",throw:"huck", rate:.48}];
var w2 = document.getElementById("svg-completionrates").getBoundingClientRect().width;
var h2 = document.getElementById("svg-completionrates").getBoundingClientRect().height;
var w_labels2 = 100;
var w_spacing2 = 30;
var h_spacing2 = 5;
var w_bar2 = (w2-w_labels2-w_spacing2*3)/3;
var h_bar2 = (h2-50-h_spacing2*5)/6;
var xScale2 = d3.scaleLinear()
                .domain([0,1])
                .range([10, w_bar2]);
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
    .attr("x", w_labels2+15)
    .attr("y", function(d,i) {
      return 50 + (i%6+1)*(h_bar2 + h_spacing2)-h_bar2/2;
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
       return w_labels2 + w_spacing2;
     }
     else if (d.division=="mixed") {
       return w_labels2 + w_spacing2*2 + w_bar2;
     }
     else { return w_labels2 + w_spacing2*3 + w_bar2*2; }
   })
   .attr("y", function(d,i) {
     return 50 + i%6*(h_bar2 + h_spacing2);
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
        return w_labels2 + w_spacing2 + xScale2(d.rate) - 10;
      }
      else if (d.division=="mixed") {
        return w_labels2 + w_spacing2*2 + w_bar2 +xScale2(d.rate) - 10;
      }
      else { return w_labels2 + w_spacing2*3 + w_bar2*2 +xScale2(d.rate) - 10; }
    })
    .attr("y", function(d,i) {
      return 50 + (i%6+1)*(h_bar2 + h_spacing2)-h_bar2/2;
    })
    .text(function(d) {
      return d3.format(".0%")(d.rate);
    })
    .style("text-anchor", "end");
//////////////////////////////////////////////////////////////////////////////
// SVG 3: Scored throws
var svg3 = d3.select("#svg-scoredthrows");
var dataset3 = [{division:"mens",throw:"Short/mid down", rate:.54, net:.54}, {division:"mens", throw:"Huck", rate:.39, net:.93}, {division:"mens", throw:"Upside-down", rate:.04, net:.97}, {division:"mens",throw:"Swing", rate:.02, net:1},
                {division:"mixed", throw:"down", rate:.58, net:.58}, {division:"mixed",throw:"huck", rate:.36, net:.94},{division:"mixed",throw:"over", rate:.05, net:.99},{division:"mixed",throw:"swing", rate:.01, net:1},
                {division:"womens", throw:"down", rate:.77, net:.77}, {division:"womens",throw:"huck", rate:.19, net:.96},{division:"womens",throw:"over", rate:.01, net:.97},{division:"womens",throw:"swing", rate:.03, net:1}];
var w3 = document.getElementById("svg-scoredthrows").getBoundingClientRect().width;
var h3 = document.getElementById("svg-scoredthrows").getBoundingClientRect().height;
var w_labels3 = 100;
var w_spacing3 = 30;
var w_bar3 = (w3-w_labels3-w_spacing3*3)/3;
var h_bar3 = h3 - 50;
var yScale3 = d3.scaleLinear()
                .domain([0,1])
                .range([3,h_bar3])
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
      if (d=="mens") {
        return "MEN'S"
      }
      else if (d=="mixed") {
        return "MIXED"
      }
      else { return "WOMEN'S"; }
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
      return 50+yScale3(d.net-d.rate/2);
    })
    .text(function(d) {
      return d.throw;
    })
    .call(wrap, 90)
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
      if (d.throw=="down" | d.throw=="Short/mid down") {
        return green;
      }
      else if (d.throw=="huck" | d.throw=="Huck") {
        return orange;
      }
      else if (d.throw=="over" | d.throw=="Upside-down") {
        return coral;
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
     return 50+yScale3(d.net-d.rate/2);
   })
   .text(function(d) {
     return d3.format(".0%")(d.rate);
   })
   .style("text-anchor", "middle");

/////////////////////////////////////////////////////////////////////////////
var svg4 = d3.select("#svg-turnovers");
var dataset4 = [{division:"mens", rate:.33, avg:2.2, max:11},
                {division:"mixed", rate:.35, avg:2.3, max:7},
                {division:"womens", rate:.37, avg:2.8, max:10}];
var w4 = document.getElementById("svg-turnovers").getBoundingClientRect().width;
var h4 = document.getElementById("svg-turnovers").getBoundingClientRect().height;
var w_labels4 = 80;
var w_division4 = 95;
var h_spacing4 = 10;
var h_pie4 = (h4-h_spacing4*2)/3;
var w_pie4 = w4-w_division4-w_labels4-20;
svg4.selectAll("division_labels4")
    .data(dataset_divisions)
    .enter()
    .append("text")
    .attr("x", 5)
    .attr("y", function(d,i) {
      return h_pie4*i+h_pie4/2;
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
svg4.selectAll("avg_label4")
    .data(dataset4)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", w_division4+w_pie4+20)
    .attr("y", function(d,i) {
      return h_pie4*i+h_pie4/2-20;
    })
    .text(function(d) {
      if (d.division=="mens") {
        return "Average per point: " + d3.format(.00)(d.avg);
      }
      else { return "Average: " + d3.format(.00)(d.avg); }
    })
    .call(wrap, w_labels4)
    .style("text-anchor", "middle");
svg4.selectAll("max_label4")
    .data(dataset4)
    .enter()
    .append("text")
    .attr("class", "data_labels")
    .attr("x", w_division4+w_pie4+20)
    .attr("y", function(d,i) {
      return h_pie4*i+h_pie4/2+20;
    })
    .text(function(d) {
      if (d.division=="mens") {
        return "Maximum per point: " + d3.format(.00)(d.avg);
      }
      else { return "Maximum: " + d3.format(.00)(d.avg); }
    })
    .call(wrap, w_labels4)
    .style("text-anchor", "middle");

/////////////////////////////////////////////////////////////////////////////
var svg5 = d3.select("#svg-fieldpos");
var dataset5 = [{division:"mens", full:.56, btwn:.35, endzone:.09},
                {division:"mixed", full:.57, btwn:.37, endzone:.06},
                {division:"womens", full:.42, btwn:.53, endzone:.05}];
var w5 = document.getElementById("svg-fieldpos").getBoundingClientRect().width;
var h5 = document.getElementById("svg-fieldpos").getBoundingClientRect().height;
var top5 = 35;
var h_spacing5 = 10;
var w_label5 = 95;
var w_field5 = (w5-w_label5-10);
var h_field5 = (h5-top5-h_spacing5*2);
var h_pie5 = h_field5/3;
svg5.append("text")
    .attr("x", w_label5+w_field5/5)
    .attr("y", top5)
    .text("Full field")
    .attr("class", "axis_labels");
svg5.append("text")
    .attr("x", w_label5+w_field5/2)
    .attr("y", top5)
    .text("Between full field and end zone")
    .attr("class", "axis_labels");
svg5.append("text")
    .attr("x", w_label5+w_field5*(4/5))
    .attr("y", top5)
    .text("End zone")
    .attr("class", "axis_labels");
svg5.append("line")
    .attr("x1", w_label5+w_field5/5)
    .attr("x2", w_label5+w_field5/5)
    .attr("y1", top5+15)
    .attr("y2", top5+15+h_field5)
    .style("stroke", "black");
svg5.append("line")
    .attr("x1", w_label5+w_field5/2)
    .attr("x2", w_label5+w_field5/2)
    .attr("y1", top5+15)
    .attr("y2", top5+15+h_field5)
    .style("stroke", "black");
svg5.append("line")
    .attr("x1", w_label5+w_field5*(4/5))
    .attr("x2", w_label5+w_field5*(4/5))
    .attr("y1", top5+15)
    .attr("y2", top5+15+h_field5)
    .style("stroke", "black");
svg5.append("rect")
    .attr("x", w_label5)
    .attr("y", top5+15)
    .attr("height", h_field5)
    .attr("width", w_field5)
    .style("fill", "none")
    .style("stroke", "black")
svg5.selectAll("division_labels5")
    .data(dataset_divisions)
    .enter()
    .append("text")
    .attr("x", 5)
    .attr("y", function(d,i) {
      return top5+15+h_pie5*i+h_pie5/2;
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
