// Width and height
var margin = {top: 0, bottom: 10, right: 10, left: 10};
var w_numthrows = document.getElementById("svg-numthrows").getBoundingClientRect().width;
var h_numthrows = {svg: 350, head: 0 };
var h_mens = (h_numthrows.svg-margin.bottom)/3/2;
var h_mixed = ((h_numthrows.svg-margin.bottom*2)/3*(1.5));
var h_womens = ((h_numthrows.svg-margin.bottom*2)/3*2.5);
var w_label = 90; //width of MENS WOMENS MIXED label area
var radius = 8; // radius of all circles
var dataset, averages, xScale, main_circles, avg_circles, lines, data_labels,min_sub, max_sub, min, max;
var svg_numthrows = d3.select("#svg-numthrows")
                      .attr("width", w_numthrows)
                      .attr("height", h_numthrows.svg);

var default_color = d3.rgb(255,122,115);
var color1 = d3.rgb(160,223,167);
var color2 = d3.rgb(104,214,255);
var color3 = d3.rgb(255,186,102);

// convert data types for some columns
var rowConverter = function(d) {
  return {
    game_id: parseInt(d.game_id),
    division: d.division,
    throws: parseInt(d.throws),
    win_team: d.win_team,
    lose_team: d.lose_team,
    score: d.score,
    tournament: d.tournament,
    game_type: d.game_type,
    year: parseInt(d.year)
  };
};

// finding min and max
function find_minsub(sub_dataset) {
  min_sub = {all: d3.min(sub_dataset, function(d) { return d.throws; }),
         mens: d3.min(sub_dataset, function(d) {
                if (d.division=="mens") {
                  return d.throws;
                }}),
         womens: d3.min(sub_dataset, function(d) {
                if (d.division=="womens") {
                  return d.throws;
                }}),
         mixed: d3.min(sub_dataset, function(d) {
                if (d.division=="mixed") {
                  return d.throws;
                }})
        };
  return(min_sub);
} // end find min sub function

function find_maxsub(sub_dataset) {
  max_sub = {all: d3.max(sub_dataset, function(d) { return d.throws; }),
         mens: d3.max(sub_dataset, function(d) {
                if (d.division=="mens") {
                  return d.throws;
                }}),
         womens: d3.max(sub_dataset, function(d) {
                if (d.division=="womens") {
                  return d.throws;
                }}),
         mixed: d3.max(sub_dataset, function(d) {
                if (d.division=="mixed") {
                  return d.throws;
                }})
        };

  return(max_sub);
};

function setup() {
  // Create convenient mins and maxes
  min = {all: d3.min(dataset, function(d) { return d.throws; }),
          mens: d3.min(dataset, function(d) {
            if (d.division=="mens") {
              return d.throws;
            }}),
          womens: d3.min(dataset, function(d) {
            if (d.division=="womens") {
              return d.throws;
            }}),
          mixed: d3.min(dataset, function(d) {
            if (d.division=="mixed") {
              return d.throws;
            }})
          };
  var min_list = [min.mens, min.womens, min.mixed];
  max = {all: d3.max(dataset, function(d) { return d.throws; }),
         mens: d3.max(dataset, function(d) {
            if (d.division=="mens") {
              return d.throws;
            }}),
         womens: d3.max(dataset, function(d) {
            if (d.division=="womens") {
              return d.throws;
            }}),
         mixed: d3.max(dataset, function(d) {
            if (d.division=="mixed") {
              return d.throws;
            }})
          };
  var max_list = [max.mens, max.womens, max.mixed];

  // Create scale function
  xScale = d3.scaleLinear()
             .domain([min.all, max.all])
             .range([margin.left+w_label, w_numthrows-margin.right]);

  // Create labels for Men's, Mixed, Women's on left side
  var labels = svg_numthrows.append("g"); // Create a group

  labels.append("text")
         .attr("x", margin.left)
         .attr("y", h_mens+5)
         .text("MEN'S")
         .attr("class", "division_labels");

  labels.append("text")
         .attr("x", margin.left)
         .attr("y", h_mixed+5)
         .text("MIXED")
         .attr("class", "division_labels");

  labels.append("text")
         .attr("x", margin.left)
         .attr("y", h_womens+5)
         .text("WOMEN'S")
         .attr("class", "division_labels");

  // Create lines for MEN'S, MIXED, WOMEN'S
  lines = svg_numthrows.append("g");
  lines.style("stroke", "black")
       .style("opacity", 0.7); //styles that affect all lines

  // Men's line
  lines.append("line")
       .attr("id", "mens_line")
       .attr("x1", xScale(min.mens))
       .attr("x2", xScale(max.mens))
       .attr("y1", h_mens)
       .attr("y2", h_mens);

  // Mixed line
  lines.append("line")
       .attr("id", "mixed_line")
       .attr("x1", xScale(min.mixed))
       .attr("x2", xScale(max.mixed))
       .attr("y1", h_mixed)
       .attr("y2", h_mixed);

   // Women's line
   lines.append("line")
         .attr("id", "womens_line")
         .attr("x1", xScale(min.womens))
         .attr("x2", xScale(max.womens))
         .attr("y1", h_womens)
         .attr("y2", h_womens);

   // Add data labels - numbers of throws that are visible on main screen
   data_labels = svg_numthrows.selectAll("data_labels")
                               .data(dataset)
                               .enter()
                               .append("text")
                               .attr("class", "data_labels")
                               .text(function(d) {
                                 if ((d.division=="mens" & (d.throws==min.mens | d.throws==max.mens | d.game_id==0)) | // if it's min, max, or average
                                     (d.division=="mixed" & (d.throws==min.mixed | d.throws==max.mixed | d.game_id==0)) |
                                     (d.division=="womens" & (d.throws==min.womens | d.throws==max.womens | d.game_id==0))) {
                                   return d.throws;
                                 }
                               })
                               .attr("x", function(d) {
                                 return xScale(d.throws)
                               })
                               .attr("y", function(d) {
                                 if (d.division=="mens") {
                                   return h_mens+30;
                                 }
                                 else if (d.division=="mixed") {
                                   return h_mixed+30;
                                 }
                                 else {
                                   return h_womens+30;
                                 }
                               })
                               .style("fill", function(d) {
                                 if (d.game_id==0 & (d.year!=99)) {
                                     return "none";
                                 }
                                 else { return "black"; }
                               });

  // Outer circles for averages
  avg_circles = svg_numthrows.selectAll("avg_circles")
                             .data(averages)
                             .enter()
                             .append("circle")
                             .attr("cx", function(d) {
                                return xScale(d.throws);
                             })
                             .attr("cy", function(d) {
                                if (d.division=="mens") {
                                  return h_mens;
                                }
                                else if (d.division=="mixed") {
                                  return h_mixed;
                                }
                                else {
                                  return h_womens;
                                }
                             })
                             .attr("r", radius*1.5)
                             .style("fill", "none")
                             .style("stroke", function(d) {
                               if (d.year!=99) { // do not show the 2016 and 2017 ones
                                 return "none";
                               }
                               else { return default_color; }
                             });

  // Initially create all circles
  main_circles = svg_numthrows.selectAll("main_circles")
                               .data(dataset)
                               .enter()
                               .append("circle")
                               .attr("class", "main_circles");

  // Define things that all circles will have
  main_circles.attr("cx", function(d) {
                return xScale(d.throws)
              })
              .attr("cy", function(d) {
                if (d.division=="mens") {
                  return h_mens;
                }
                else if (d.division=="mixed") {
                  return h_mixed;
                }
                else {
                  return h_womens;
                }
              })
              .attr("r", radius)
              .style("fill", function(d) {
                if (d.game_id==0 & (d.year!=99)) { // do not show the 2016 and 2017 averages
                  return "none";
                }
                else { return default_color; }
              })
              .style("opacity", 0.75);

  // Hover for non-average circles
  main_circles.on("mouseover", function(d) { // on mouseover, see details
            d3.select(this).style("opacity", 1)

            var xPosition = parseFloat(d3.select(this).attr("cx"));
            var yPosition = parseFloat(d3.select(this).attr("cy"));

            // Create a tooltip - info about game
            svg_numthrows.append("text")
                .attr("id", "tooltip1")
                .attr("class", "tooltips")
                .attr("x", xPosition)
                .attr("y", yPosition+48)
                .style("text-anchor", function() {
                  if (xPosition < (w_numthrows - margin.right - 100)) { // if not near the right margin
                    if (xPosition < (margin.left + w_label) + 100) { // if near the left margin...
                      return "start";
                    }
                    else { return "middle"; } // else it's somewhere in the middle of the graphic
                  }
                  else if (xPosition >= (w_numthrows - margin.right - 100)) { // near the right margin
                    return "end";
                  }
                })
                .text(function() {
                  if (d.game_id==0) {
                    if (d.year==2016) {
                      return "2016 Average";
                    }
                    else if (d.year==2017) {
                      return "2017 Average";
                    }
                    else { return "Average of all games"; }
                  }
                  else {
                    return d.year + " " + d.tournament + " " + d.game_type;
                  }
                });
            svg_numthrows.append("text")
                .attr("class", "tooltips")
                .attr("x", xPosition)
                .attr("y", yPosition+60)
                .style("text-anchor", function() {
                  if (xPosition < (w_numthrows - margin.right - 100)) { // if not near the right margin
                    if (xPosition < (margin.left + w_label) + 100) { // if near the left margin...
                      return "start";
                    }
                    else { return "middle"; } // else it's somewhere in the middle of the graphic
                  }
                  else if (xPosition >= (w_numthrows - margin.right - 100)) { // near the right margin
                    return "end";
                  }
                })
                .text(function() {
                  if (d.game_id!=0) {
                    return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
                  }
                });

            // other data labels on that line disappear
            svg_numthrows.append("rect")
                         .attr("id", "label_background")
                         .attr("x", w_label+margin.left-10)
                         .attr("y", yPosition+15)
                         .attr("width", w_numthrows-(w_label+margin.left-10))
                         .attr("height", 20)
                         .style("fill", "white");

            // add temp data label
            svg_numthrows.append("text")
                         .text(d.throws)
                         .attr("id", "temp_datalabels")
                         .attr("class", "data_labels")
                         .attr("x", xPosition)
                         .attr("y", yPosition+30)
                         .style("font-weight", "bold");
          }) // end on mouseover
          .on("mouseout", function() {
              d3.selectAll(".tooltips").remove();
              d3.select("#temp_datalabels").remove();
              d3.select("#label_background").remove();
              d3.select(this)
                .style("fill", default_color)
                .style("opacity", 0.75);
          }); // end on mouseout

  // Option container positioning
  if (document.body.clientWidth >= 750) {
    document.getElementById("options-container").style.left = document.body.clientWidth*.6 + "px";
  }
  else {
    document.getElementById("options-container").style.left = document.body.clientWidth*.75 + "px";
  }
}; // end setup function

function resize() {
  w_numthrows = document.getElementById("svg-numthrows").getBoundingClientRect().width;

  // Create scale function
  xScale = d3.scaleLinear()
             .domain([min.all, max.all])
             .range([margin.left+w_label, w_numthrows-margin.right]);

  // Men's line
  lines.select("#mens_line")
       .attr("x1", xScale(min.mens))
       .attr("x2", xScale(max.mens));

  // Mixed line
  lines.select("#mixed_line")
       .attr("x1", xScale(min.mixed))
       .attr("x2", xScale(max.mixed));

   // Women's line
   lines.select("#womens_line")
         .attr("x1", xScale(min.womens))
         .attr("x2", xScale(max.womens));

   // Add data labels - numbers of throws that are visible on main screen
   data_labels.attr("x", function(d) {
                 return xScale(d.throws)
               });

  // Outer circles for averages
  avg_circles.attr("cx", function(d) {
                return xScale(d.throws);
             });

  // Define things that all circles will have
  main_circles.attr("cx", function(d) {
                return xScale(d.throws)
              });

  // Hover for non-average circles
  main_circles.on("mouseover", function(d) { // on mouseover, see details
                d3.select(this).style("opacity", 1)

                var xPosition = parseFloat(d3.select(this).attr("cx"));
                var yPosition = parseFloat(d3.select(this).attr("cy"));

                // Create a tooltip - info about game
                svg_numthrows.append("text")
                    .attr("id", "tooltip1")
                    .attr("class", "tooltips")
                    .attr("x", xPosition)
                    .attr("y", yPosition+48)
                    .style("text-anchor", function() {
                      if (xPosition < (w_numthrows - margin.right - 100)) { // if not near the right margin
                        if (xPosition < (margin.left + w_label) + 100) { // if near the left margin...
                          return "start";
                        }
                        else { return "middle"; } // else it's somewhere in the middle of the graphic
                      }
                      else if (xPosition >= (w_numthrows - margin.right - 100)) { // near the right margin
                        return "end";
                      }
                    })
                    .text(function() {
                      if (d.game_id==0) {
                        if (d.year==2016) {
                          return "2016 Average";
                        }
                        else if (d.year==2017) {
                          return "2017 Average";
                        }
                        else { return "Average of all games"; }
                      }
                      else {
                        return d.year + " " + d.tournament + " " + d.game_type;
                      }
                    });
                svg_numthrows.append("text")
                    .attr("class", "tooltips")
                    .attr("x", xPosition)
                    .attr("y", yPosition+60)
                    .style("text-anchor", function() {
                      if (xPosition < (w_numthrows - margin.right - 100)) { // if not near the right margin
                        if (xPosition < (margin.left + w_label) + 100) { // if near the left margin...
                          return "start";
                        }
                        else { return "middle"; } // else it's somewhere in the middle of the graphic
                      }
                      else if (xPosition >= (w_numthrows - margin.right - 100)) { // near the right margin
                        return "end";
                      }
                    })
                    .text(function() {
                      if (d.game_id!=0) {
                        return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
                      }
                    });

                // other data labels on that line disappear
                svg_numthrows.append("rect")
                             .attr("id", "label_background")
                             .attr("x", w_label+margin.left-10)
                             .attr("y", yPosition+15)
                             .attr("width", w_numthrows-(w_label+margin.left-10))
                             .attr("height", 20)
                             .style("fill", "white");

                // add temp data label
                svg_numthrows.append("text")
                             .text(d.throws)
                             .attr("id", "temp_datalabels")
                             .attr("class", "data_labels")
                             .attr("x", xPosition)
                             .attr("y", yPosition+30)
                             .style("font-weight", "bold");
              }) // end on mouseover
              .on("mouseout", function() {
                  d3.selectAll(".tooltips").remove();
                  d3.select("#temp_datalabels").remove();
                  d3.select("#label_background").remove();
                  d3.select(this)
                    .style("fill", default_color)
                    .style("opacity", 0.75);
              }); // end on mouseout

  // Option container positioning
  if (document.body.clientWidth >= 750) {
    document.getElementById("options-container").style.left = document.body.clientWidth*.6 + "px";
  }
  else {
    document.getElementById("options-container").style.left = document.body.clientWidth*.75 + "px";
  }

}; // end resize

function init() {
  setup();
  window.addEventListener('resize', resize);
}; // end init()

// Import data and run everything on this data
d3.csv("interactive-charts/numThrows/numThrows.csv", rowConverter, function(data) {

  // Copy data into global dataset
  dataset = data;

  // Create averages dataset (for additional circles and labels)
  averages = dataset.filter(function(d) {
    return d.game_id==0;
  })

  init();

  // INTERACTIVITY
  // Filtering options
  d3.selectAll("#input")
    .on("change", function() {

      // Uncheck all checkboxes
      d3.selectAll(".checkbox_year")
        .property("checked", false);

      // Find subset
      var selection = d3.select(this).node().value; //selection value
      var selection_subset;

      // make sure default mouseout is the default color -- issues arise when you check and then go straight into filtering
      main_circles.on("mouseout", function() {
                      d3.selectAll(".tooltips").remove();
                      d3.select("#temp_datalabels").remove();
                      d3.select("#label_background").remove();
                      d3.select(this)
                        .style("fill", default_color)
                        .style("opacity", 0.75);
                  });

      if (selection==2016 | selection==2017 | selection=="within" | selection=="over") {

        // Determine selection subset
        if (selection == 2016 | selection==2017) {
          selection_subset = dataset.filter(function(d) {
            return d.year==selection;
          })
        }
        else if (selection=="within" | selection=="over") {
          selection_subset = dataset.filter(function(d) {
            var split_score = d.score.split("-")
            var win_score = split_score[0]
            var lose_score = split_score[1]
            if (selection=="within") {
              return win_score-lose_score<=2;
            }
            else {
              return win_score-lose_score>2;
            }
          })
        } // end function that determines selection_subset

        // Do not show check checkboxes
        d3.selectAll("#checkboxes")
          .property("disabled", true)
          .style("visibility", "hidden");

        document.getElementById("highlight-label").style.color="white"; // remove highlight text

        min_sub = find_minsub(selection_subset); // find the subset with minimums
        max_sub = find_maxsub(selection_subset); // find the subset with maximums

        // remove circles from other year
        main_circles.style("fill", function(d) {
                      if (selection_subset.includes(d)) {
                        return default_color;
                      }
                      else { return "none"; }
                    })

        // Average circles/labels
        avg_circles.style("stroke", function(d) {
                      if (selection_subset.includes(d)) {
                        return default_color;
                      }
                      else { return "none"; }
                    });

        // update lines
        lines.select("#mens_line")
             .attr("x1", xScale(min_sub.mens))
             .attr("x2", xScale(max_sub.mens));

        lines.select("#mixed_line")
             .attr("x1", xScale(min_sub.mixed))
             .attr("x2", xScale(max_sub.mixed));

        lines.select("#womens_line")
             .attr("x1", xScale(min_sub.womens))
             .attr("x2", xScale(max_sub.womens));

        // Data labels
        data_labels.text(function(d) {
                      if ((d.division=="mens" & (d.throws==min_sub.mens | d.throws==max_sub.mens | d.game_id==0)) | // if it's min, max, or average
                         (d.division=="mixed" & (d.throws==min_sub.mixed | d.throws==max_sub.mixed | d.game_id==0)) |
                         (d.division=="womens" & (d.throws==min_sub.womens | d.throws==max_sub.womens | d.game_id==0))) {
                       return d.throws;
                     }
                   })
                   .style("fill", function(d) {
                     if (selection_subset.includes(d)) {
                       return "black";
                     }
                     else { return "none";}
                   });

     } // end if years

     else { // else, it's all games

        // Allow checkbox usage
        d3.selectAll("#checkboxes")
          .property("disabled", false)
          .style("visibility", "visible");

        document.getElementById("highlight-label").style.color="black";

        // circles
        main_circles.style("fill", function(d) {
                      if (d.game_id==0) {
                        if (d.year!=99) {
                          return "none";
                        }
                        else { return default_color; }
                      }
                      else { return default_color; }
                    });

        // average circles
        avg_circles.style("stroke", function(d) {
                     if (d.year!=99) {
                       return "none";
                     }
                     else { return default_color; }
                    });

        // lines
        lines.select("#mens_line")
             .attr("x1", xScale(min.mens))
             .attr("x2", xScale(max.mens));

        lines.select("#mixed_line")
             .attr("x1", xScale(min.mixed))
             .attr("x2", xScale(max.mixed));

        lines.select("#womens_line")
             .attr("x1", xScale(min.womens))
             .attr("x2", xScale(max.womens));

        // Data labels return to normal
        data_labels.style("fill", function(d) {
                      if (d.game_id==0 &(d.year!=99)) {
                         return "none";
                      }
                      else { return "black"; }
                    })
                    .text(function(d) {
                      if ((d.division=="mens" & (d.throws==min.mens | d.throws==max.mens | d.game_id==0)) | // if it's min, max, or average
                          (d.division=="mixed" & (d.throws==min.mixed | d.throws==max.mixed | d.game_id==0)) |
                          (d.division=="womens" & (d.throws==min.womens | d.throws==max.womens | d.game_id==0))) {
                        return d.throws;
                      }
                    });
      }; // end of else
  }); // end on filtering

  // Checkboxes
  var hover_year = 0;
  function update_checkboxes() {

    // Get info on current setting
    hover_year = d3.select(this).node().value; // record the year that's clicked

    // Set fill color
    var fill = "";
    if (hover_year==2016) { fill = color1; }
    else if (hover_year==2017 ){ fill = color2; }
    else { fill = color3; }

    if (d3.select(this).property("checked")) { // If the current checkbox is checked...
      // Calculate min/max specific for the year
      var sub_dataset = dataset.filter(function(d) {
                          return d.year==hover_year;
                        });
      // FInd min and max
      min_sub = find_minsub(dataset.filter(function(d) {
                              return d.year==hover_year;
                            })); // find the subset with minimums
      max_sub = find_maxsub(dataset.filter(function(d) {
                              return d.year==hover_year;
                            })); // find the subset with maximum

      // Change color of existing circles
      main_circles.filter(function(d) {
                    return d.year==hover_year;
                  })
                  .style("fill", fill)
                  .style("opacity", 0.75)
                  .on("mouseout", function(d) {
                   d3.selectAll(".tooltips").remove();
                   d3.select("#temp_datalabels").remove();
                   d3.select("#label_background").remove();
                   d3.select(this).style("fill", fill)
                                  .style("opacity", 0.75)
                  });
      // Average circles appear
      avg_circles.filter(function(d) {
                    return d.year==hover_year;
                  })
                  .style("stroke", fill);

      // Data labels
      data_labels.filter(function(d) { // only show the "new" average
                    return d.year==hover_year & d.game_id==0;
                  })
                  .style("fill", fill);
      data_labels.filter(function(d) { // don't show the universal average data label
                    return d.game_id==0 & d.year==99;
                  })
                  .style("fill", "none");

    } // end if statement
    else { // if it's not checked

     // Don't show the small circles for the 2016 and 2017 averages
     main_circles.filter(function(d) {
                   return d.year==hover_year;
                 })
                 .style("fill", function(d) {
                   if (d.game_id==0) {
                       return "none";
                   }
                   else { return default_color; }
                 })
                 .on("mouseout", function() {
                     d3.selectAll(".tooltips").remove();
                     d3.select("#temp_datalabels").remove();
                     d3.select("#label_background").remove();
                     d3.select(this)
                       .style("fill", default_color)
                       .style("opacity", 0.75);
                 });
     // Don't show the outer average circle
     avg_circles.filter(function(d) {
                  return d.year==hover_year;
                })
                .style("stroke", "none");

     // Data labels return to normal
     data_labels.style("fill", function(d) {
                   if (d.game_id==0 &(d.year!=99)) {
                      return "none";
                   }
                   else { return 'black'; }
                 })
                 .text(function(d) {
                   if ((d.division=="mens" & (d.throws==min.mens | d.throws==max.mens | d.game_id==0)) | // if it's min, max, or average
                       (d.division=="mixed" & (d.throws==min.mixed | d.throws==max.mixed | d.game_id==0)) |
                       (d.division=="womens" & (d.throws==min.womens | d.throws==max.womens | d.game_id==0))) {
                     return d.throws;
                   }
                 });
    } // end else statement
  } // end edit checkboxes function

  d3.select("#checkbox_2016")
    .on("change", update_checkboxes);

  d3.select("#checkbox_2017")
    .on("change", update_checkboxes);

  d3.select("#checkbox_2018")
    .on("change", update_checkboxes);

}); // end d3.csv
