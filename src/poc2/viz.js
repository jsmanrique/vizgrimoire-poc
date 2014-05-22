// Vizualization module

Viz = (function () {
    var fillNumericValue = function(container, value) {
        v = +value;
        if (v > 999) {
            container.html(Math.floor(v / 1000)+'.'+Math.floor(Math.floor(v / 100)%10)+'K');
        } else {
            container.html(value);
        }
    };
    var drawEvolChart = function(container, value, height){
        var graphContainer = $('<div/>').addClass('graphContainer');
        container.append(graphContainer);
        graphContainer.height(height-60);

        var options = {
            xaxis: {
                //mode: 'time',
                //timeformat: '%d'
            },
            yaxis: {
                min: 0,
                noTicks: 3,
                autoscale: false
            },
            legend: {
                show: true,
                position: 'nw',
                margin: 10
            },
            grid: {
                verticalLines: false,
                color: '#999',
                outlineWidth: 1,
                outline: 's'
            },
            mouse: {
                track: true,
                //trackFormatter: function(obj){d = new Date(+obj.x); return d.toLocaleDateString() +' : '+ obj.y;},
                position: 'n'
            },
            selection : {
                mode : 'xy'
            }
        };
        // Drawing the chart
        Flotr.draw (graphContainer[0],value,options);

        // Selection event listener
        Flotr.EventAdapter.observe(graphContainer[0], 'flotr:select', function(area){
            //console.log(area);
            // Chart redraw with new boundaries
            Flotr.draw(graphContainer[0], value,{
                xaxis : {
                    min : area.x1,
                    max : area.x2,
                    //mode : 'time'
                },
                yaxis : {
                    min : area.y1,
                    max : area.y2,
                    noTicks: 2,
                    autoscale: false
                },
                legend: {
                    show: true,
                    position: 'nw',
                },
                grid: {
                    verticalLines: true,
                    color: '#999',
                    outlineWidth: 1,
                    outline: 's'
                },
                mouse: {
                    track: true,
                    //trackFormatter: function(obj){d = new Date(+obj.x); return d.toLocaleDateString() +' : '+ obj.y;},
                    position: 'n'
                },
                lines: {
                    show: true,
                },
                points: {
                    show: true,
                },
                selection : {
                    mode : 'xy'
                }
            });
        });

        // Click event listener
        Flotr.EventAdapter.observe(graphContainer[0], 'flotr:click', function(point){
            //console.log(point);
            // Chart redraw with original data
            Flotr.draw(graphContainer[0], value, options);
        });
    };

    var drawDemographyChart = function(container, value, height){
        //container.append('<img src="holder.js/100%x100%">');
        var labels = [];
        var data = [];

        $.each(value, function(index){
            labels.push([index+1, value[index][1]]);
            data.push([value[index][0], index+1]);
        });

        console.log("l:"+labels);
        console.log("d:"+data);

        var graphContainer = $('<div/>').addClass('graphContainer');
        graphContainer.height(height - 60);
        container.append(graphContainer);

        var options = {
            xaxis: {
                min: 0,
                noTicks: 4,
                autoscale: false,
                color: '#999',
            },
            yaxis : {
                ticks: labels,
                //ticks: [],
                color: '#999',
                min : null,
                autoscaleMargin : 1
            },
            grid: {
                horizontalLines: false,
                verticalLines: true,
                color: '#ccc',
                outlineWidth: 1,
                outline: 'w'
            },
            mouse: {
                track: true,
                trackFormatter: function(obj){return obj.x;},
                relative: true,
            },
            bars: {
                show: true,
                horizontal: true,
                barWidth: 0.5,
                fill: true,
                fillColor: null
            },
        };

        Flotr.draw(graphContainer[0], data, options);
    };

    var drawRankTable = function (container, data_source) {
        $.get('/templates/rank.mst', function(template) {
            var rank_content = Mustache.to_html(template, {data_source : data_source});
            container.append(rank_content);
        });
    };

    return {
        fillNumericValue : fillNumericValue,
        drawEvolChart : drawEvolChart,
        drawDemographyChart : drawDemographyChart,
        drawRankTable : drawRankTable
    };

})();