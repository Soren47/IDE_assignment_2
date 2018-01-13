d3.select(window).on('load', init);

function init() {

var width = 800,
    height = 500;

var projection = d3.geoMercator()
    .center([50, 10]) //long and lat starting position
    .scale(150) //starting zoom position
    .rotate([10,0]); //where world split occurs

var svg = d3.select("#worldMap")
    .attr("width", width)
    .attr("height", height);

var path = d3.geoPath()
    .projection(projection);

//path
var g = svg.append("g");

// load and display the world and locations
d3.json("https://gist.githubusercontent.com/d3noob/5193723/raw/world-110m2.json", function(error, topology) {
    var world = g.selectAll("path")
        .data(topojson.object(topology, topology.objects.countries).geometries)
        .enter()
        .append("path")
        .attr("d", path)

});

//zoom and pan functionality
var zoom = d3.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")
            .attr("d", path.projection(projection));
    });
svg.call(zoom);

d3.csv("language.csv", function(d){
    d.latitude = parseFloat(d.latitude)
    d.longitude = parseFloat(d.longitude)
    return d;
}, function(data) {
    //console.log(data);
    //data[0]
    var group= d3.nest()
        .key(function(d){
            return d.family
        })
        .sortKeys(d3.ascending)
        .map(data)
    console.log(group);

    function draw_circles(filterdata){
        var circle = svg.selectAll("circle")
            //each row remembers the data and the id
            .data(filterdata,function(d){
                return d.iso_code;
            });
        circle
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return projection([d.longitude, d.latitude])[0];
            })
            .attr("cy", function(d) {
                return projection([d.longitude, d.latitude])[1];
            })
            .attr("r",2);
        circle
            .exit()
            .remove()
    }
    draw_circles(data)
    //console.log(projection([data[0].longitude, data[0].latitude]))
    //console.log(data[0])

    var language_selection = d3.select("#family")
        .selectAll("option")
        //turn the map into an array
        .data(group.entries())
        .enter()
        .append("option")
        .text(function (i) {
            return i.key;
        })

    var selected_element = d3.select("#family")
        .on("change", function(){

            //console.log(selected_element.property("value"));
            //console.log(group.get(selected_element.property("value")))
            draw_circles(group.get(selected_element.property("value")));


        })

    });

}
