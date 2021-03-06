( function () {

    window.addEventListener('load', init);
    //d3.select(window).on('load', init);

    function init() {
        console.log('barplot');
        var svg = d3.select("#barplot"),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("dk_temp.csv", function (d) {
            d.metANN = +d.metANN;
            return d;
        }, function (error, data) {
            if (error) throw error;

            x.domain(data.map(function (d) {
                return d.YEAR;
            }));
            y.domain([0, d3.max(data, function (d) {
                return d.metANN;
            })]);


            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(-12," + (height + 20) + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-90)")
                .style("font-size", "105%");
            //.call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("d")));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end");

            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.YEAR);
                })
                .attr("y", function (d) {
                    return y(d.metANN);
                })
                .attr("width", x.bandwidth())
                .attr("height", function (d) {
                    return height - y(d.metANN);
                });

            // text label for the y axis
            d3.select("#barplot").append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Meteorological Annual Mean");


            // text label for the x axis
            d3.select("#barplot").append("text")

                .attr("y", height - (padding / 4))
                .attr("x", width / 2)
                .style("text-anchor", "middle")
                .text("Year");
        });
    }
})()
