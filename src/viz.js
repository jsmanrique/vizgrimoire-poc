// data mocks //
var d = new Date();
var contributors = [], d1 = [], d2 = [], d3 = [], d4 = [], d5 = [], activity = [];
var developers = ['james', 'john', 'mary', 'ada', 'mark'];
var companies = ['bizviz', 'prototypes', 'datas', 'riskybiz', 'ranges'];

for (var i = 0; i < 100; i++) {
    // day backwards
    day = new Date(d.getTime() - (1000*60*60*24*7)*i).getTime();
    //console.log(day);
    contributors.push([day, Math.floor(Math.random()*5)+1]);
    d1.push([day, Math.floor(Math.random()*10)]);
    d2.push([day, Math.floor(Math.random()*10)]);
    d3.push([day, Math.floor(Math.random()*10)]);
    d4.push([day, Math.floor(Math.random()*10)]);
    d5.push([day, Math.floor(Math.random()*10)]);
    activity.push([day, d1[i][1]+d2[i][1]+d3[i][1]+d4[i][1]+d5[i][1]]);
}

var companies_activity = [];
var sum1 = 0;
for (var i = 0; i < 100; i++){
    sum1 = sum1 + d1[i][1];
}
companies_activity.push([sum1,1]);
var sum2 = 0;
for (var i = 0; i < 100; i++){
    sum2 = sum2 + d2[i][1];
}
companies_activity.push([sum2,2]);
var sum3 = 0;
for (var i = 0; i < 100; i++){
    sum3 = sum3 + d3[i][1];
}
companies_activity.push([sum3,3]);
var sum4 = 0;
for (var i = 0; i < 100; i++){
    sum4 = sum4 + d4[i][1];
}
companies_activity.push([sum4,4]);
var sum5 = 0;
for (var i = 0; i < 100; i++){
    sum5 = sum5 + d5[i][1];
}
companies_activity.push([sum5,5]);

var companies_labels = [];
for (var i = 0; i < 5; i++){
    companies_labels.push([i+1, companies[i]]);
}

var data = {
    "scm_contributors": contributors,
    "scm_activity": activity,
    "scm_developers": [
        {
            "name": developers[1],
            "company": companies[1],
            "activity_evol": d1,
            "activity": sum1,
            "active": false
        },
        {
            "name": developers[2],
            "company": companies[2],
            "activity_evol": d2,
            "activity": sum2,
            "active": true,
        },
        {
            "name": developers[3],
            "company": companies[3],
            "activity_evol": d3,
            "activity": sum3,
            "active": false
        },
        {
            "name": developers[4],
            "company": companies[4],
            "activity_evol": d4,
            "activity": sum4,
            "active": true
        },
        {
            "name": developers[5],
            "company": companies[5],
            "activity_evol": d5,
            "activity": sum5,
            "active": true
        }
    ]
};

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

$(document).ready(function(){
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
        console.log(labels);
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
    
    // widgets
    var widgets = $.get('templates/metric-widget.mst');
    
    widgets.done(function (template){
        var contributors_widget_content = Mustache.to_html(template, scm_contributors_evol_panel);
        console.log($("#scm_contributors_evol"));
        $("#scm_contributors_evol").html(contributors_widget_content);
        
        var activity_widget_content = Mustache.to_html(template, scm_activity_evol_panel);
        $("#scm_activity_evol").html(activity_widget_content);
        
        var evolutionChartsContainers = $("[data-figure-type='evolution']");
        
        var h = $('.half-height').height();
        $('.chart').height(h-100);
        $('.rank').height(h-100);
        
        $.each(evolutionChartsContainers, function(index, container){
            var source = $(this).attr('data-source');
            drawEvolChart(container, [data[source]]);
        });
    });

    // draw demographic charts
    var barChartsContainers = $("[data-figure-type='demography']");

    for (i = 0; i < barChartsContainers.length; i++){
        drawHorizontalBarsChart(barChartsContainers[i], [companies_activity], companies_labels);
    }

});