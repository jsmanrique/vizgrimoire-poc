var metrics = {
    "scm_total_contributors" : {
        "long_name": "Total contributors",
        "desc": "Total number of contributors to the source code",
        "value": "74"
    },
    "scm_total_commits" : {
        "long_name": "Total commits",
        "desc": "Total number of commits to the source code",
        "value": "12523"
    },
    "scm_contributors" : {
        "long_name": "Contributors",
        "desc": "Contributors to the source code",
        "value": [[1,1],[2,5],[3,3],[4,7],[5,5]]
    },
    "scm_commits" : {
        "long_name": "Commits",
        "desc": "Commits to the source code",
        "value": [[1,10],[2,65],[3,40],[4,110],[5,60]]
    },
    "scm_demography" : {
        "long_name": "Demography",
        "desc": "Developers demography",
        "value": [[5, "1 year", 1],[2, "2 years"]]
    },
    "scm_companies" : {
        "long_name": "Companies",
        "desc": "Companies contributing to the source code"
    },
    "scm_repositories" : {
        "long_name": "Repositories",
        "desc": "Repositories containing source code"
    },
    "top_developers" : {
        "long_name": "Top developers",
        "desc": "Top developers"
    },
    "top_scm_companies" : {
        "long_name": "Top companies",
        "desc": "Commits to the source code"
    },
};

$(document).ready(function(){

    var full_height = Math.floor($(document).height()) - 140;
    var one_half = Math.floor(full_height/2);
    var one_third = Math.floor(full_height/3);
    var two_third = 2 * one_third;

    $('.one-half').children().height(one_half);
    $('.full-height').children().height(full_height);
    $('.one-third').children().height(one_third);
    $('.two-third').children().height(two_third);

    // Another idea (not working):
    // $.each($('.half-height'), function(index){
    //      var h = $(this).parent().height();
    //      console.log(h);
    //      $(this).children().height(Math.floor(h/2));
    // });

    // Filling .metric.numeric
    var numeric_metrics_containers = $('.metric.numeric');
    $.each(numeric_metrics_containers, function(index){
        var data_source = $(this).attr('data-source');
        Viz.fillNumericValue($(this), metrics[data_source].value);
    });

    $.get('/templates/widget.mst', function(template){
        var widgtes = $('.widget');

        $.each(widgtes, function(index){
            var data_source = $(this).attr('data-source');
            var title = metrics[data_source].long_name;
            var widget_content = Mustache.to_html(template, {widget_title : title, data_source : data_source});
            $(this).html(widget_content);

            // Filling widget with its associated data
            var chart = $(this).find('.chart');
            console.log(chart);
            switch (true) {
                case ($(this).hasClass('evol')):
                    Viz.drawEvolChart(chart, [metrics[data_source].value], $(this).height());
                    break;
                case ($(this).hasClass('demography')):
                    Viz.drawDemographyChart(chart, metrics[data_source].value, $(this).height());
                    break;
                case ($(this).hasClass('rank')):
                    Viz.drawRankTable(chart, data_source);
                    break;
            }

            // Modal for bigger charts
            $(this).find('.modal').on('shown.bs.modal', function (e) {
                var ds = $(this).find('.modal-body').attr('data-source');
                var v = metrics[ds].value;
                var c = $(this).find('.modal-body');
                Viz.drawEvolChart(c, v, two_third);
            });
        });
    });
});