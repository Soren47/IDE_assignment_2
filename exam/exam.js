d3.select(window).on('load', init);

function init() {


    var svg = d3.select("svg");

    var projection = d3.geoMercator();
    var path = d3.geoPath().projection(projection);

    d3.json("https://unpkg.com/world-atlas@1/world/50m.json", function(error, world)
    {
        if (error) throw error;

        svg.append("g")
            .selectAll("path")
            .data(topojson.feature(world, world.objects.countries).features)
            .enter().append("path")
            .attr("d", path);

    });


}
