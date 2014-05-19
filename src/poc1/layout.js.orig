var scm_contributors_evol_panel = {
    "panel_name": "Contributors",
    "chart_type": "evolution",
    "data_source": "scm_contributors"
};

var scm_activity_evol_panel = {
    "panel_name": "Activity",
    "chart_type": "evolution",
    "data_source": "scm_activity"
};

// END OF DATA MOCK //

<<<<<<< HEAD
var menu_render = function(data) {
    data.done(function(sources){
        console.log(sources.project_name);
=======
// data drawing //
// draw singe line or multiline evolution over time chart
var drawEvolChart = function(container, data) {        
    var options = {
        xaxis: {
            mode: 'time',
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
            trackFormatter: function(obj){d = new Date(+obj.x); return d.toLocaleDateString() +' : '+ obj.y;},
            position: 'n'
        },
        selection : {
            mode : 'xy'
        }
    };
    // Drawing the chart
    Flotr.draw (container,data,options);

    // Selection event listener
    Flotr.EventAdapter.observe(container, 'flotr:select', function(area){
            
        // Chart redraw with new boundaries
        Flotr.draw(container, data,{
            xaxis : {
                min : area.x1,
                max : area.x2,
                mode : 'time'
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
                verticalLines: false,
                color: '#999',
                outlineWidth: 1,
                outline: 's'
            },
            mouse: {
                track: true,
                trackFormatter: function(obj){d = new Date(+obj.x); return d.toLocaleDateString() +' : '+ obj.y;},
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
    Flotr.EventAdapter.observe(container, 'flotr:click', function(point){
        //console.log(point);
        // Chart redraw with original data
        Flotr.draw(container, data, options);
    });
};

var drawHorizontalBarsChart = function(container, data, labels){
    //console.log(labels);
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

    Flotr.draw(container, data, options);
};

$(document).ready(function(){
    var half_height = Math.floor($(document).height()/2);
    
    var data_sources = $.getJSON('data/data-sources.json');
    
    data_sources.done(function(sources) {
        //console.log(sources.project_name);

        // TEMPLATES RENDERING
        // menu
>>>>>>> 4ec39e147621658728adfed2df411ff09ba89ce1
        $.get('templates/side-menu.mst', function(template){
            var menu_content = Mustache.to_html(template, sources);
            $("#main-menu").html(menu_content);
        });
    });
};

var tabs_render = function(data) {
    var half_height = Math.floor($(document).height()/2);
    data.done(function(sources) {
        $.get('templates/data-sources-tabs.mst', function(template) {
            var tabs_header_content = Mustache.to_html(template, sources);
            $("#data-sources-tabs").html(tabs_header_content);
        });
        // panes
        $.get('templates/data-sources-panes.mst', function(template) {
            var panes_content = Mustache.to_html(template, sources);
            $("#data-sources-panes").html(panes_content);
            // set active tab & pane and control switching
            $("#data-sources-tabs li").first().addClass("active");
            $("#data-sources-panes div").first().addClass("active");
            $('#data-sources-tabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
            $('.half-height').height(half_height);
        });
    });
};

$(document).ready(function(){

    var data_sources = $.getJSON('data/data-sources.json');

    menu_render(data_sources);

    tabs_render(data_sources);

    console.log($('.metric_widget'));

<<<<<<< HEAD
=======
                var evolutionChartsContainers = $("[data-figure-type='evolution']");
                
                $.each(evolutionChartsContainers, function(index, container){
                    var source = $(this).attr('data-source');
                    //console.log(source);
                    var metrics = $.getJSON('data/scm-metrics.json');
                    metrics.done(function(data){
                        //console.log(data[source]);
                        var metric = $.getJSON(data[source]);
                        metric.done(function(content){
                            //console.log(content.data);
                            drawEvolChart(container, [content.data]);
                        });
                    });
                });
                
                var barChartsContainers = $("[data-figure-type='demography']");
                $.each(barChartsContainers, function(index, container) {
                    drawHorizontalBarsChart(container, [companies_activity], companies_labels);
                });
                
            });
        });        
    });
>>>>>>> 4ec39e147621658728adfed2df411ff09ba89ce1
});