var metrics = {
    "scm_contributors" : {
        "long_name": "Contributors",
        "desc": "Contributors to the source code"
    },
    "scm_commits" : {
        "long_name": "Commits",
        "desc": "Commits to the source code"
    },
    "scm_demography" : {
        "long_name": "Demography",
        "desc": "Developers demography"
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
    var half_height = Math.floor(full_height/2);
    var one_third = Math.floor(full_height/3);
    var two_third = 2 * one_third;

    $('.half-height').children().height(half_height);
    $('.full-height').children().height(full_height);
    $('.one-third').children().height(one_third);
    $('.two-third').children().height(two_third);

    // Another idea (not working):
    // $.each($('.half-height'), function(index){
    //      var h = $(this).parent().height();
    //      console.log(h);
    //      $(this).children().height(Math.floor(h/2));
    // });

    $.get('/templates/widget.mst', function(template){
        var widgtes = $('.widget');

        $.each(widgtes, function(index){
            var data_source = $(this).attr('data-source');
            console.log(metrics[data_source].long_name);
            var title = metrics[data_source].long_name;
            var widget_content = Mustache.to_html(template, {widget_title : title});
            $(this).html(widget_content);
            if ($(this).hasClass('evol')) {
                var chart = $(this).find('.chart');
                chart.append('<img src="holder.js/100%x100%">');
            }
            if ($(this).hasClass('demography')) {
                var chart = $(this).find('.chart');
                chart.append('<img src="holder.js/100%x100%">');
            }
            if ($(this).hasClass('rank')) {
                var chart = $(this).find('.chart');
                $.get('/templates/rank.mst', function(template) {
                    var rank_content = Mustache.to_html(template, {data_source : data_source});
                    chart.append(rank_content);
                });
            }
        });
    });

});