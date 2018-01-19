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


    //Function to aid creation of map legends
    function legendary(legend, type, nestedData) {

        //expects [x,y,colour] for each element of data list
        if (type === 'circle') {
            d3.select(legend)
                .selectAll('circle')
                .data(nestedData)
                .enter()
                .append('circle')
                .attr('r',10)
                .attr('cx', function(d) {return d[0]})
                .attr('cy', function(d) {return d[1]})
                .style('fill',function(d) {return d[2]});}

        //expects [x,y,rx,rotate] for each element of data list
        else if (type === 'rect') {
            d3.select(legend)
                .selectAll('rect')
                .data(nestedData)
                .enter()
                .append('rect')
                .attr('width',20)
                .attr('height',20)
                .attr('fill','none')
                .style('stroke','black')
                .style('stroke-width',3)
                .attr('x', function(d) {return d[0]})
                .attr('y', function(d) {return d[1]})
                .attr('rx', function(d) {return d[2]})
                .attr('transform', function(d) {
                    if (d[3] === 'rotate') {
                       return "rotate(45, " + (d[0]+10) + "," + (d[1]+10) +")"}});}

        //expects [x,y,text] for each element of data list
        else if (type === 'text') {
            d3.select(legend)
                .selectAll('text')
                .data(nestedData)
                .enter()
                .append('text')
                .attr('x',  function(d) {return d[0]})
                .attr('y',  function(d) {return d[1]})
                .text(function (d) {return d[2]});}
        }

    //Legend for 1st map, Nasal Consonants
    var offset = 15;
    legendary('#explain1','circle', [[25,offset+=25,'Red'],[25,offset+=25,'Black']]);
    var offset = -5;
    legendary('#explain1','text',[[5,offset+=25,'Nasal Consonants'],[45,offset+=26,'Absent'],[45,offset+=25,'Present']]);

    //Legend for 2nd map, Nasal Vowels
    var offset = 15;
    legendary('#explain2','circle', [[25,offset+=25,'Red'],[25,offset+=25,'Black']]);
    legendary('#explain2','rect',[[15, offset+=45,150,''],[15,offset+=27,0,'']]);
    var offset = -5;
    legendary('#explain2','text',[[5,offset+=25,'Nasal Vowels'],[45,offset+=26,'Present'],[45,offset+=25,'Absent'],
        [5,offset+=30,'Oral Vowels'],[45,offset+=25,'Present'],[45,offset+=25,'Absent']]);
    //Legend for 3rd map, OV or VO and Post- or Prepositions
    var offset = 15;
    legendary('#explain3','circle', [[25,offset+=25,'Red'],[25,offset+=25,'Black']]);
    legendary('#explain3','rect',[[15, offset+=50,150,''],[15,offset+=27,0,'']]);
    var offset = -5;
    legendary('#explain3','text',[[5,offset+=25,'Word order Verb-Object / Object-Verb'],[45,offset+=25,'VO'],
        [45,offset+=25,'OV'], [5,offset+=35,'Order of Adposition and Noun Phrase'],
        [45,offset+=25,'Postpositional (no prepositions)'],[45,offset+=25,'Prepositional']]);

    //Legend for 4th map, Consonants and Vowels
    var offset = 15;
    legendary('#explain4','circle', [[25,offset+=25,'Indigo'],[25,offset+=25,'Chartreuse'],[25,offset+=25,'Red'],
        [25,offset+=25,'Yellow'],[25,offset+=25,'Black']]);
    legendary('#explain4','rect',[[15, offset+=50,150,''],[15,offset+=30,0,''],[15,offset+=33,0,'rotate']]);
    var offset = -4;
    legendary('#explain4','text',[[5,offset+=25,'Consonant Amount'],[45,offset+=25,'Small'],[45,offset+= 25,'Moderately Small'],
        [45,offset+=25,'Average'], [45,offset+=25,'Moderately Large'],[45,offset+=25,'Large'], [5,offset+=35,'Distinct Vowel Amount'],
        [45,offset+=25,'Small (2-4)'],[45,offset+=30,'Average (5-6)'],[45,offset+=33,'Large (7-14)']]);

    //Legend for 5th map, Language Families
    var offset = 15;
    legendary('#explain5','circle', [[25,offset+=25,'Black'],[25,offset+=25,'Green']]);

    // The interactivity of this legend prevents the use of the 'legendary' function
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

    function zoom_map_points() {
        // Change size of shapes:
        d3.select("#worldMap").selectAll("rect")
            .attr("width", function() {
                // the value that it is before zoom. Not actually needed :D
                //var orig_val = d3.select(this).attr("width");
                // 1.5 is the first width and height.

                if (current_zoom_mult !== 1) {
                    return 1.5 / ( current_zoom_mult * 0.3);
                }
                else {
                    return 1.5;
                }

            })
            .attr("height", function() {

                if (current_zoom_mult !== 1) {
                    return 1.5 / ( current_zoom_mult * 0.3);
                }
                else {
                    return 1.5;
                }
            });
    }

    // Making the maps
    var svg2 = d3.select("#worldMap")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom()
            .scaleExtent([0.55, 60])
            .translateExtent([[-125, -160], [width + 22, height + 252]]) //limits of panning to fit edges of map
            .on("zoom", function () {
                svg2.attr("transform", d3.event.transform);
                current_zoom_mult = d3.event.transform.k;
                zoom_map_points();
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

                            else if (feature === 'No Nasal Vowels') {
                                if (d["10A Vowel Nasalization"] === '2 Contrast absent')  {return d}}
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
                        else return 0;// makes large voc square (to be diamond)
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

                    new_x = d3.event.clientX;
                    new_y = d3.event.clientY;

                    d3.select(".viz2")
                        .select(".tooltip")
                        .style('visibility', 'visible')
                        .text("Language: " + d.Name + "; "+ "Familiy: " + d.family);
                    d3.select(".viz2")
                        .select(".tooltip")
                        .style('left', ( d3.event.pageX - 350) + 'px')
                        .style('top', ( d3.event.pageY - 630) + 'px')

                })
                .on("mouseout", function(){
                    d3.select(".viz2")
                        .select(".tooltip")
                        .style('visibility', 'hidden');
                });


            if (filter_type === "nothing") {

                circles.on("click", function(d) {

                    var clicked_fam = d["family"];


                    //Legend to Family map, interactive part
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
                circles.on("click", null);
            }
            circles.exit().remove();

            zoom_map_points();
        });
    }

    d3.selectAll('.legend')
        .style('display', 'none');
    d3.select('#explain5')
        .style('display', 'unset');
    d3.selectAll('.text')
        .style('display', 'none');
    d3.select('#text5')
        .style('display', 'block');

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
                    .style('display', 'block');}}

                break;

            case '1':   {if(filter_type = "n_vowels") {
                draw_typo_circles();
                d3.select('#explain2')
                    .style('display', 'unset');
                d3.select('#text2')
                    .style('display', 'block');}}

                break;

            case '2':   { if(filter_type = "word_order_post_pre_pos") {
                draw_typo_circles();
                d3.select('#explain3')
                    .style('display', 'unset');
                d3.select('#text3')
                    .style('display', 'block');}}

                break;

            case '3':   { if(filter_type = "vow_cons_vocab") {
                draw_typo_circles();
                d3.selectAll('.legend')
                    .style('display', 'none');
                d3.select('#explain4')
                    .style('display', 'unset');
                d3.selectAll('.text')
                    .style('display', 'none');
                d3.select('#text4')
                    .style('display', 'block');
                d3.select("#feats")
                    .style('visibility', 'visible')}}

                break;

            case '4':   { if(filter_type = "nothing") {
                draw_typo_circles();
                d3.select('#explain5')
                    .style('display', 'unset');
                d3.select('#text5')
                    .style('display', 'block');
                draw_typo_circles();}}
        }
    }
}
