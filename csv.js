d3.select(window).on('load', init);

function init()
{

    //Width and height
    var w = 500;
    var h = 100;

    d3.csv(
        'tempBuc.csv',
        function(error, buch_data)
        {
            if (error) throw error;

            console.log(buch_data);


            // Scale functions:

            var xScale = d3.scaleLinear()
                .domain([
                    d3.min(buch_data, function(d)
                {

                    return +d.YEAR;

                }),
                    d3.max(buch_data, function(d)
                {

                    return +d.YEAR;

                })])
                .range([0, w]);


            var yScale = d3.scaleLinear()
                .domain([0, d3.max(buch_data, function(d)
                {

                    return +d.metANN;

                })])
                .range([0, h]);


            //Create SVG element
            var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);


            //Create circles
            svg.selectAll("circle")
                .data(buch_data)
                .enter()
                .append("circle")
                .attr("cx", function(d) {
                    return xScale(+d.YEAR);
                })
                .attr("cy", function(d) {
                    return yScale(+d.metANN);
                })
                .attr("r", function(d) {
                    return 3;
                });



        });



}
