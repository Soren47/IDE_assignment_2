d3.select(window).on('load', init);

// Field variables:
var filter_type;
var circles;

function init() {

    var width = 800,
        height = 500;

    var projection = d3.geoMercator()
        .center([50, 10]) //long and lat starting position
        .scale(150) //starting zoom position
        .rotate([10,0]); //where world split occurs

    var path = d3.geoPath()
        .projection(projection);

    /*
    var svg1 = d3.select("#worldMap1")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom()
            .scaleExtent([0.55, 30])
            .translateExtent([[-125, -160], [width + 22, height + 252]]) //limits of panning to fit edges of map
            .on("zoom", function () {
                svg1.attr("transform", d3.event.transform)
            })
        )
        .append("g");
    //path
    var g1 = svg1.append("g");
    // load and display the world and locations
    //d3.json("https://gist.githubusercontent.com/d3noob/5193723/raw/world-110m2.json", function(error, topology) {
    d3.json("data/world-110m2.json", function(error, topology) {
        var world = g1.selectAll("path")
            .data(topojson.object(topology, topology.objects.countries).geometries)
            .enter()
            .append("path")
            .attr("d", path)
    });
    */


    // Explaining shapes and colours
    var offset = 15;
    //var colours = ['Indigo','Chartreuse','Red','Yellow','Black'];
    d3.select('#explain4')
        .selectAll('circle')
        .data(['Indigo','Chartreuse','Red','Yellow','Black'])
        .enter()
        .append('circle')
        .attr('r',10)
        .style('fill',function(d) {return d})
        .attr('cx',25)
        .attr('cy', function(d) {;return offset += 25});

    d3.select('#explain4').append('rect').attr('width',20).attr('height',20).attr('fill','none').style('stroke','black')
        .style('stroke-width',3).attr('x',15).attr('y', function(d) {;return offset += 40}).attr('rx',150);

    d3.select('#explain4').append('rect').attr('width',20).attr('height',20).attr('fill','none').style('stroke','black')
        .style('stroke-width',3).attr('x',15).attr('y', function(d) {;return offset += 30}).attr('rx',0);

    d3.select('#explain4').append('rect').attr('width',20).attr('height',20).attr('fill','none').style('stroke','black')
        .style('stroke-width',3).attr('x',5).attr('y', function(d) {;return offset += 37}).attr('rx',0)
        .attr('transform',"rotate(45, " + (25) + "," + (offset+20) +")");

    var offset = -5;
    d3.select('#explain4').selectAll('text')
        .data(['Consonant Amount','Small','Moderately Small','Average','Moderately Large','Large',
            'Distinct Vowel Amount','Small (2-4)','Average (5-6)','Large (7-14)'])
        .enter()
        .append('text')
        .attr('x', function(d) {
            if (d === 'Consonant Amount') {return 5}
            else if (d === 'Distinct Vowel Amount') {return 5}
            else return 45})
        .attr('y', function(d) {
            if (d.endsWith(')')) {console.log(d);return offset += 28}
            else return offset += 25})
        .text(function (d) {return d});
    // Explaining shapes and colours
    var offset = 15;
    d3.select('#explain3')
        .selectAll('circle')
        .data(['Red','Black'])
        .enter()
        .append('circle')
        .attr('r',10)
        .style('fill',function(d) {return d})
        .attr('cx',25)
        .attr('cy', function(d) {;return offset += 25})

    d3.select('#explain3').append('rect').attr('width',20).attr('height',20).attr('fill','none').style('stroke','black')
        .style('stroke-width',3).attr('x',15).attr('y', function(d) {;return offset+= 40}).attr('rx',150);

    d3.select('#explain3').append('rect').attr('width',20).attr('height',20).attr('fill','none').style('stroke','black')
        .style('stroke-width',3).attr('x',15).attr('y', function(d) {;return offset += 30}).attr('rx',0);

    var offset = -5;
    d3.select('#explain3').selectAll('text')
        .data(['Word order VO / OV','VO','OV',
            'Order of Adposition and Noun Phrase','Postpositional (no prepositions)','Prepositional'])
        .enter()
        .append('text')
        .attr('x', function(d) {
            if (d === 'Word order VO / OV') {return 5}
            else if (d === 'Order of Adposition and Noun Phrase') {return 5}
            else return 45})
        .attr('y', function(d) {
            if (d.endsWith(')')) {console.log(d);return offset += 28}
            else return offset += 25})
        .text(function (d) {return d});

    var offset = 15;
    d3.select('#explain1')
        .selectAll('circle')
        .data(['Red','Black'])
        .enter()
        .append('circle')
        .attr('r',10)
        .style('fill',function(d) {return d})
        .attr('cx',25)
        .attr('cy', function(d) {;return offset += 25})

    var offset = -5;
    d3.select('#explain1').selectAll('text')
        .data(['Nasal Consonants','No','Yes'])
        .enter()
        .append('text')
        .attr('x', function(d) {
            if (d === 'Nasal consonants') {return 5}
            else return 45})
        .attr('y', function(d) {
            if (d.endsWith(')')) {console.log(d);return offset += 28}
            else return offset += 25})
        .text(function (d) {return d});



    var offset = 15;
    d3.select('#explain2')
        .selectAll('circle')
        .data(['Red','Black'])
        .enter()
        .append('circle')
        .attr('r',10)
        .style('fill',function(d) {return d})
        .attr('cx',25)
        .attr('cy', function(d) {;return offset += 25})

    d3.select('#explain2').append('rect').attr('width',20).attr('height',20).attr('fill','none').style('stroke','black')
        .style('stroke-width',3).attr('x',15).attr('y', function(d) {;return offset+= 40}).attr('rx',150);

    d3.select('#explain2').append('rect').attr('width',20).attr('height',20).attr('fill','none').style('stroke','black')
        .style('stroke-width',3).attr('x',15).attr('y', function(d) {;return offset += 30}).attr('rx',0);

    var offset = -5;
    d3.select('#explain2').selectAll('text')
        .data(['Nasal Vowels','No','Yes', 'Oral Vowels', 'Yes', 'No'])
        .enter()
        .append('text')
        .attr('x', function(d) {
            if (d === 'Nasal Vowels') {return 5}
            else if (d === 'Oral Vowels') {return 5}
            else return 45})
        .attr('y', function(d) {
            if (d.endsWith(')')) {console.log(d);return offset += 28}
            else return offset += 25})
        .text(function (d) {return d});


    //Family map legend, static section
    var offset = 15;
    d3.select('#explain5')
        .selectAll('circle')
        .data(['Black','Green'])
        .enter()
        .append('circle')
        .attr('r',10)
        .style('fill',function(d) {return d})
        .attr('cx',25)
        .attr('cy', function(d) {;return offset += 25})

    var offset = -5;
    d3.select('#explain5').selectAll('text')
        .data(['Same language familiy','No','Yes','Family name:', 'Select a language on map', '#Members of family:',''])
        .enter()
        .append('text')
        .attr('x', function(d) {
            if (d === 'Same language familiy') {return 5}
            else if (d.length === 2 | d.length === 3) {return 45}
            else return 10})
        .attr('y', function(d) {
            if (d.length === 2 | d.length === 3 | d.endsWith('y')) {return offset += 25}
            else return offset += 40})
        .text(function (d) {return d})
        .attr('id', function(d) {
            if (d.endsWith('p')) {return 'name5'}
            else if (d === '') {return 'count5'}
            else return 'none'})
        .style('font-style', function(d) {
            if (d.endsWith('p')) {return 'italic'}
            else return 'normal'});

    /*
    d3.csv("data/world-atlas-of-language-structures/language.csv", function(d) {
        d.latitude = parseFloat(d.latitude);
        d.longitude = parseFloat(d.longitude);
        return d;
    }, function(data) {
        var group = d3.nest()
            .key(function(d){
                return d.family
            })
            .sortKeys(d3.ascending)
            .map(data);
        function draw_circles(filterdata){
            var circle = svg1.selectAll("circle")
            //each row remembers the data and the id
                .data(filterdata,function(d){
                    return d.iso_code;
                });
            circle.enter()
                .append("circle")
                .attr("cx", function (d) {
                    return projection([d.longitude, d.latitude])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.longitude, d.latitude])[1];
                })
                .attr("r",1.5)
                .style('fill','none')
                .attr('stroke','black')
                .on("mouseover", function(d){
                    d3.select(".viz1")
                        .select(".tooltip")
                        .style('visibility', 'visible')
                        .text("Language: "+d.Name);
                    var y = d3.select(".viz1")
                        .select(".tooltip")
                        .node()
                        .getBoundingClientRect()
                        .height;
                    var x = d3.select(".viz1")
                        .select(".tooltip")
                        //get a DOM object from the d3 element
                        .node()
                        .getBoundingClientRect()
                        .width;
                    d3.select(".viz1")
                        .select(".tooltip")
                        .style('left', projection([d.longitude, d.latitude])[0] -x/2+ 'px')
                        .style('top', projection([d.longitude, d.latitude])[1]-y -8 + 'px')
                })
                .on("mouseout", function(){
                    d3.select(".tooltip")
                        .style('visibility', 'hidden');
                });
            circle
                .exit()
                .remove()
        }
        var circles = draw_circles(data);
        //console.log(projection([data[0].longitude, data[0].latitude]))
        //console.log(data[0])
        var language_selection = d3.select("#family")
            .selectAll("option")
            //turn the map into an array
            .data(['All'].concat(group.keys().sort()))
            .enter()
            .append("option")
            .text(function (d) {
                return d;
            });
        var selected_element = d3.select("#family")
            .on("change", function(){
                var family = selected_element.property("value");
                if (family === 'All') {
                    draw_circles(data);
                }
                else draw_circles(group.get(family));
            })
    });
    */


    // Making the second map of typology:

    var svg2 = d3.select("#worldMap2")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom()
            .scaleExtent([0.55, 60])
            .translateExtent([[-125, -160], [width + 22, height + 252]]) //limits of panning to fit edges of map
            .on("zoom", function () {
                svg2.attr("transform", d3.event.transform);
                console.log(d3.event.transform);

                // Change size of shapes:
                d3.select("#worldMap2").selectAll("rect")
                    .attr("width", function() {
                        // the value that it is before zoom. Not actually needed :D
                        //var orig_val = d3.select(this).attr("width");
                        // 1.5 is the first width and height.

                        return 1.5 / ( d3.event.transform.k * 0.3);
                    })
                    .attr("height", function() {

                        return 1.5 / ( d3.event.transform.k * 0.3);

                    });

            })
        )
        .append("g");


    var g2 = svg2.append("g");

    d3.json("data/world-110m2.json", function(error, topology) {
        var world = g2.selectAll("path")
            .data(topojson.object(topology, topology.objects.countries).geometries)
            .enter()
            .append("path")
            .attr("d", path)

    });






    function draw_typo_circles() {

        d3.csv("data/world-atlas-of-language-structures/language.csv", function (atlas_data) {

            console.log("Start: Filter type:");
            console.log(filter_type);



            circles = svg2.selectAll("rect")
                .data(atlas_data.filter(function (d) {

                    if (filter_type === "n_consonants") {

                        // Linguistic tendency: Almost all languages have nasal consonants.
                        // Show those without in another color.

                        if (d["18A Absence of Common Consonants"] !== "") {
                            // Only return the data point if it is a part of the study
                            // into the absense of consonants.
                            return d;

                        }

                    }

                    else if (filter_type === "n_vowels") {

                        // Linguistic UNI-directional tendency:
                        // If a language has nasal vowels, it also has oral vowels.

                        if (d["10A Vowel Nasalization"] !== "") {

                            return d;

                        }

                    }

                    else if (filter_type === "word_order_post_pre_pos") {

                        // Linguistic BI-directional tendency:
                        // If a language is OV it has POST positionals. If Vo it has PRE-positionals.
                        // Only a tendency - only MOST languages.

                        if (d["83A Order of Object and Verb"] !== "" && d["85A Order of Adposition and Noun Phrase"] !== "") {

                            if (!( d["83A Order of Object and Verb"].startsWith("3") ) ) {
                                // Only take OV and VO:

                                if ( d["85A Order of Adposition and Noun Phrase"].startsWith("1")
                                    || d["85A Order of Adposition and Noun Phrase"].startsWith("2") ) {
                                    // Onle take Postpositions and prepositions.

                                    return d;
                                }
                            }
                        }
                    }

                    else if (filter_type === "vow_cons_vocab") {

                        if (d['1A Consonant Inventories'] !== '') {

                            var feature = d3.select('#feats').property('value');

                            if (feature === 'All') {return d}

                            else if (feature === 'No Fricatives') {
                                if (d['18A Absence of Common Consonants'] === '3 No fricatives') {return d}}

                            else if (feature === 'No Nasal Consonants') {
                                if (d['18A Absence of Common Consonants'] === '4 No nasals' |
                                    d['18A Absence of Common Consonants'] === '5 No bilabials or nasals') {return d}}

                            else if (feature === 'No Bilabials') {
                                if (d['18A Absence of Common Consonants'] === '2 No bilabials' |
                                    d['18A Absence of Common Consonants'] === '5 No bilabials or nasals') {return d}}
                        }
                    }

                    else {
                        return d;
                    }

                }));


            circles.enter()
                .append("rect")
                .attr("class", function(d) {
                    return d.family;
                })
                .attr("width", 1.5)
                .attr("height", 1.5)
                .merge(circles)
                .attr("rx", function(d) {
                    // Make circle or square:
                    // 1.5 == circle. 0 == Square.
                    if (filter_type === "word_order_post_pre_pos") {
                        if ( d["85A Order of Adposition and Noun Phrase"].startsWith("1") ) {
                            // if post position: Circle:
                            return 1.5;
                        }
                        else {
                            // if pre position: square:
                            return 0;
                        }
                    }

                    else if (filter_type === "vow_cons_vocab") {

                        // Make circle or square:
                        // 1.5 == circle. 0 == Square.
                        if (d['2A Vowel Quality Inventories'] === '1 Small (2-4)') {
                            // make "small vowel voc" circle.
                            return 1.5;
                        }
                        else if (d['2A Vowel Quality Inventories'] === '2 Average (5-6)') {
                            // make "average vowel voc" squares..
                            return 0;
                        }
                        else return 0; //trying to rotate this instead // makes large voc square (to be diamond)

                    }

                    else {
                        return 1.5;
                    }
                })
                .attr("ry", function(d) {
                    // Make circle or square:
                    // 1.5 == circle. 0 == Square.
                    if (filter_type === "word_order_post_pre_pos") {
                        if ( d["85A Order of Adposition and Noun Phrase"].startsWith("1") ) {
                            // if post position: Circle:
                            return 1.5;
                        }
                        else {
                            // if pre position: square:
                            return 0;
                        }
                    }

                    else if (filter_type === "vow_cons_vocab") {

                        // Make circle or square:
                        // 1.5 == circle. 0 == Square.
                        if (d['2A Vowel Quality Inventories'] === '1 Small (2-4)') {
                            // make "small vowel voc" circle.
                            return 1.5;
                        }
                        else if (d['2A Vowel Quality Inventories'] === '2 Average (5-6)') {
                            // make "average vowel voc" squares..
                            return 0;
                        }
                        else return 0; //trying to rotate this instead // makes large voc square (to be diamond)

                    }

                    else {
                        return 1.5;
                    }
                })
                .attr("x", function (d) {
                    return projection([d["longitude"], d["latitude"]])[0];
                })
                .attr("y", function(d) {
                    return projection([d["longitude"], d["latitude"]])[1];
                })
                .style('fill', 'black')
                .style('fill-opacity', 0)
                .attr("stroke", function(d){
                    // Color according to filter type:

                    if (filter_type === "vow_cons_vocab") {

                        if (d['1A Consonant Inventories'] === '1 Small') {return 'Indigo';}
                        else if (d['1A Consonant Inventories'] === '2 Moderately small') {return 'Chartreuse';}
                        else if (d['1A Consonant Inventories'] === '3 Average') {return 'Red';}
                        else if (d['1A Consonant Inventories'] === '4 Moderately large') {return 'Yellow';}
                        else {return 'black';}

                    }

                    else if (filter_type === "n_consonants") {
                        // Color according to presence or absence of nasal consonants.

                        if (d["18A Absence of Common Consonants"].includes("nasal")) {

                            return "red";

                        }
                        else {
                            return "black";
                        }
                    }

                    else if (filter_type === "n_vowels") {

                        if (d["10A Vowel Nasalization"].includes("present")) {
                            // The language has nasal vowels.

                            return "red";
                        }
                        else {
                            return "black";
                        }

                    }

                    else if (filter_type === "word_order_post_pre_pos") {

                        if ( d["83A Order of Object and Verb"].startsWith("1") ) {
                            // If OV: Black:
                            return "black";
                        }
                        else {
                            // if VO: red:
                            return "red";
                        }

                    }

                    else {
                        // If no filter type:
                        return "black";

                    }


                })
                .attr("transform", function(d) {

                    if (filter_type === "vow_cons_vocab") {

                        if (d['2A Vowel Quality Inventories'] === '3 Large (7-14)') {
                            // make "large vowel voc" diamonds.

                            x = projection([d.longitude, d.latitude])[0];
                            y = projection([d.longitude, d.latitude])[1];
                            width = 1.5;

                            return "rotate(45, " + (x+width/2) + "," + (y+width/2) +")";
                        }
                        else {
                            return "rotate(0)";
                        }

                    }

                    else {
                        return "rotate(0)";
                    }

                })
                .on("mouseover", function(d) {

                    console.log( d3.event.clientX, d3.event.clientY );

                    new_x = d3.event.clientX;
                    new_y = d3.event.clientY;



                    d3.select(".viz2")
                        .select(".tooltip")
                        .style('visibility', 'visible')
                        .text("Language: " + d.Name + "; "+ "Familiy: " + d.family);
                    /*var y = d3.select(".viz2")
                        .select(".tooltip")
                        .node()
                        .getBoundingClientRect()
                        .height;
                    var x = d3.select(".viz2")
                        .select(".tooltip")
                        //get a DOM object from the d3 element
                        .node()
                        .getBoundingClientRect()
                        .width;*/
                    d3.select(".viz2")
                        .select(".tooltip")
                        /*.style('left', projection([d.longitude, d.latitude])[0] - x / 2 + 'px')
                        .style('top', projection([d.longitude, d.latitude])[1] - y - 8 + 'px')*/
                        .style('left', ( new_x - 220 ) + 'px')
                        .style('top', ( new_y - 240 ) + 'px')


                })
                .on("mouseout", function(){
                    d3.select(".viz2")
                        .select(".tooltip")
                        .style('visibility', 'hidden');
                });


            if (filter_type === "nothing") {

                circles.on("click", function(d) {

                    console.log("THIS          IS        RUN       APPARENTLY");
                    console.log(filter_type);

                    var clicked_fam = d["family"];


                    //Legend to Family map, was thinking to log clicked fam and family count to the info
                    var family_count = atlas_data.filter(function (d) {

                        if (d["family"] === clicked_fam) {
                            return d;
                        }
                    });

                    d3.select('#name5')
                        .attr('x',20)
                        .style('font-size',26)
                        .text(clicked_fam);

                    d3.select('#count5')
                        .attr('x',60)
                        .style('font-size',25)
                        .text(family_count.length);


                    //Changing colour of selected family
                    d3.selectAll("rect")
                        .attr("stroke", function(this_d){
                            // The class of a circle/square is the language's family name.
                            var selection_fam = this_d.family;

                            if (clicked_fam === selection_fam) {
                                family_count += 1;
                                return "green";
                            }
                            else {
                                return "black";
                            }

                        })
                        .style("fill-opacity", function(this_d) {
                            // The class of a circle/square is the language's family name.
                            var selection_fam = this_d.family;

                            if (clicked_fam === selection_fam) {
                                return 1;
                            }
                            else {
                                return 0;
                            }


                        })
                        .style("fill", function(this_d) {
                            // The class of a circle/square is the language's family name.
                            var selection_fam = this_d.family;

                            if (clicked_fam === selection_fam) {
                                return "green";
                            }
                            else {
                                return "black";
                            }


                        });

                });

            }

            else {
                console.log("THIS IS RUN IF FILTER TYPE IS NOT NOTHING");
                console.log(filter_type);

                circles.on("click", null);
            }



            circles.exit().remove();



        });

    }

    d3.selectAll('.legend')
        .style('display', 'none');
    d3.select('#explain5')
        .style('display', 'unset');
    d3.selectAll('.text')
        .style('display', 'none');
    d3.select('#text5')
        .style('display', 'unset');

    // Initialize map:
    filter_type = "nothing";
    draw_typo_circles();
    d3.select("#filt")
        .on("change", filterChange);
    draw_typo_circles();
    d3.select("#feats")
        .style('visibility', 'hidden')
        .on("change", draw_typo_circles);

    function filterChange() {

        //Hiding everything
        d3.selectAll('.legend')
            .style('display', 'none');
        d3.selectAll('.text')
            .style('display', 'none');
        d3.select("#feats")
            .style('visibility', 'hidden');

        var comboFilter = document.getElementById('filt');
        switch(comboFilter.value)

        {
            case '0':   {if(filter_type = "n_consonants") {
                draw_typo_circles();
                d3.select('#explain1')
                    .style('display', 'unset');
                d3.select('#text1')
                    .style('display', 'unset');}}

                break;

            case '1':   {if(filter_type = "n_vowels"){
                draw_typo_circles();
                d3.select('#explain2')
                    .style('display', 'unset');
                d3.select('#text2')
                    .style('display', 'unset');}}

                break;

            case '2':   { if(filter_type = "word_order_post_pre_pos")
            {
                draw_typo_circles();
                d3.select('#explain3')
                    .style('display', 'unset');
                d3.select('#text3')
                    .style('display', 'unset');}}

                break;

            case '3':   { if(filter_type = "vow_cons_vocab")
            {
                draw_typo_circles();
                d3.selectAll('.legend')
                    .style('display', 'none');
                d3.select('#explain4')
                    .style('display', 'unset');
                d3.selectAll('.text')
                    .style('display', 'none');
                d3.select('#text4')
                    .style('display', 'unset');
                d3.select("#feats")
                    .style('visibility', 'visible')}}

                break;

            case '4':   { if(filter_type = "nothing")
            {
                draw_typo_circles();
                d3.select('#explain5')
                    .style('display', 'unset');
                d3.select('#text5')
                    .style('display', 'unset');
                draw_typo_circles();}}

        }
    }
}
