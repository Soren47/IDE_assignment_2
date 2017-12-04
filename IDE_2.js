d3.select(window).on('load', init);

function init() {


    d3.csv('tempBuc.csv', function(mydata)
    {
        var svg = d3.select('svg');
        var width = parseFloat(svg.node().style.width);
        var height = parseFloat(svg.node().style.height);

        var padding = 30;

        var xScale = d3.scaleLinear()
            .domain([1900,
                d3.max(mydata,
                    function(d){
                        return d.YEAR;
                    })])
            .range([padding,width-padding]);

        var yScale = d3.scaleLinear()
            .domain([d3.min(mydata,
                function(d){
                    return d.metANN;
                }),
                d3.max(mydata,
                    function(d){
                        return d.metANN;
                    })])
            .range([height-padding, padding]);

        d3.select("#plotarea")
            .selectAll("circle")
            .data(mydata)
            .enter()
            .append("circle")
            .attr("r", "5px")
            .attr("cx", function(d){
                return ""+xScale(d.YEAR)+"px";
            })
            .attr("cy", function(d){
                return ""+yScale(d.metANN)+"px";
            });

        d3.select("#plotarea")
            .append('g')
            .attr('transform', 'translate(0,' + (height - padding) + ')')
            .call(d3.axisBottom(xScale).ticks(10));
        d3.select("#plotarea")
            .append('g')
            .attr('transform', 'translate('+padding+', 0)')
            .call(d3.axisLeft(yScale));

        // text label for the y axis
        d3.select("#plotarea").append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Temperature");




    });




}