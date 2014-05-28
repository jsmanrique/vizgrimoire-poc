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

    var drawEvolChart = function(container, val){
        var r = $('<div/>').addClass('row');
        if (val.periods) {
            var chart = $('<div/>').addClass('col-xs-9');
            var trends = $('<div/>').addClass('col-xs-3').addClass('trends');
            // $.get('/templates/trends.mst', function(t){
            //     var t_content = Mustache.to_html(t, val);
            //     trends.html(t_content);
            // });
            r.append(chart);
            r.append(trends);
            var data_chart = [val.evol];
            chart.height(container.height());
        } else {
            var chart = $('<div/>').addClass('col-xs-12');
            r.append(chart);
            var data_chart = [val];
            chart.height($(document).height()-250);
        }

        container.html(r);

        var options = {
            xaxis: {
                color: '#333',
                //mode: 'time',
                //timeformat: '%d'
            },
            yaxis: {
                color: '#333',
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
                //position: 'n',
                relative: true
            },
            selection : {
                mode : 'xy'
            }
        };
        // Drawing the chart
        Flotr.draw (chart[0],data_chart,options);

        // Selection event listener
        Flotr.EventAdapter.observe(chart[0], 'flotr:select', function(area){
            //console.log(area);
            // Chart redraw with new boundaries
            Flotr.draw(chart[0], data_chart,{
                xaxis : {
                    color: '#333',
                    min : area.x1,
                    max : area.x2,
                    //mode : 'time'
                },
                yaxis : {
                    color: '#333',
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
                    //position: 'n',
                    relative: true
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
        Flotr.EventAdapter.observe(chart[0], 'flotr:click', function(point){
            //console.log(point);
            // Chart redraw with original data
            Flotr.draw(chart[0], data_chart, options);
        });
    };

    var drawDemographyChart = function(container, val){

        var labels = [];
        var births = [];
        var deads = [];

        $.each(val, function(index){
            labels.push([index+1, val[index][2]]);
            births.push([val[index][0], index+1]);
            deads.push([val[index][1], index+1]);
        });

        var r = $('<div/>').addClass('row');
        var graphContainer = $('<div/>').addClass('col-xs-12');
        r.append(graphContainer);

        container.html(graphContainer);
        graphContainer.height(container.height());

        var options = {
            xaxis: {
                min: 0,
                noTicks: 4,
                autoscale: false,
                color: '#333',
            },
            yaxis : {
                ticks: labels,
                color: '#333',
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
                barWidth: 1,
                fill: true,
                fillColor: null
            },
        };

        Flotr.draw(graphContainer[0], [births, deads], options);
    };

    var drawTopsTable = function (container, val) {
        var r = $('<div/>').addClass('row');
        var topsContainer = $('<div/>').addClass('col-xs-12');
        r.append(topsContainer);
        container.append(r);
        $.get('/templates/tops.mst', function(t) {
            var tops_content = Mustache.to_html(t, val);
            topsContainer.append(tops_content);
            topsContainer.find($('li')).first().addClass("active");
            topsContainer.find($('.tab-pane')).first().addClass("active");
        });
    };

    var drawMultiData = function (container, val) {
        $.get('/templates/multidata.mst', function(t){
            var multidata_content = Mustache.to_html(t, val);
            container.html(multidata_content);

            // handlers for input[type]=check
            var checkall = container.find('.checkall');
            var check = container.find('.check');
            checkall.on('click', function(){
                check.attr('checked','checked');
            });
            check.on('click', function(){
                console.log(check.index($(this)));
                console.log($(this).val());
            });
        });

    };

    return {
        fillNumericValue : fillNumericValue,
        drawEvolChart : drawEvolChart,
        drawDemographyChart : drawDemographyChart,
        drawTopsTable : drawTopsTable,
        drawMultiData : drawMultiData
    };

})();