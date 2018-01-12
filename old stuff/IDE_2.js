( function () {

    window.addEventListener('load', init);
    //d3.select(window).on('load', init);

    function init() {

        console.log('scatterplot');
        d3.csv('tempBuc.csv', function (mydata) {
            var svg = d3.select('#scatterplot');
            var width = parseFloat(svg.node().style.width);
            var height = parseFloat(svg.node().style.height);

            var padding = 50;

            var xScale = d3.scaleLinear()
                .domain([1900,
                    d3.max(mydata,
                        function (d) {
                            return d.YEAR;
                        })])
                .range([padding, width - padding]);

            var yScale = d3.scaleLinear()
                .domain([7, 13])
                .range([height - padding, padding]);

            /*var yScale = d3.scaleLinear()
                .domain([d3.min(mydata,
                    function(d){
                        return d.metANN;
                    }),
                    d3.max(mydata,
                        function(d){
                            return d.metANN;
                        })])
                .range([height-padding, padding]);*/

            d3.select("#scatterplot")
                .selectAll("circle")
                .data(mydata)
                .enter()
                .append("circle")
                .attr("r", "3px")
                .attr("cx", function (d) {
                    return "" + xScale(d.YEAR) + "px";
                })
                .attr("cy", function (d) {
                    if ("" + yScale(d.metANN) === "NaN") {
                        console.log(d.metANN + " fjoller. og: " + d.YEAR);
                    }
                    return "" + yScale(d.metANN) + "px";
                });

            d3.select("#scatterplot")
                .append('g')
                .attr('transform', 'translate(0,' + (height - padding) + ')')
                .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")));

            d3.select("#scatterplot")
                .append('g')
                .attr('transform', 'translate(' + padding + ', 0)')
                .call(d3.axisLeft(yScale).ticks(7).tickFormat(d3.format("d")));

            // text label for the y axis
            d3.select("#scatterplot").append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Meteorological Annual Mean");


            // text label for the x axis
            d3.select("#scatterplot").append("text")

                .attr("y", height - (padding / 4))
                .attr("x", width / 2)
                .style("text-anchor", "middle")
                .text("Year");


        });

    }
})()