
$(document).ready(function(){

    // Setting div height
    var full_height = Math.floor($(document).height()) - 150;
    var one_half = Math.floor(full_height/2);
    var one_third = Math.floor(full_height/3);
    var two_third = 2 * one_third;

    $('.one-half').children().height(one_half);
    $('.full-height').children().height(full_height);
    $('.one-third').children().height(one_third);
    $('.two-third').children().height(two_third);

    // PROTO for another idea (index2.html)
    // var rdsi = $('.row.data-source-info');
    // var hdsi = Math.floor(($(document).height() - 30*rdsi.length) / rdsi.length);
    // rdsi.children().height(hdsi);

    // PROTO for new row heights idea (to make it similar to bootstrap col width definition)
    var r1 = Math.floor($(document).height() / 10);
    for (var i=1; i<11; i++){
        $('.row.r-'+i).children().height(r1*i-15*i);
    }

    // Adding spinner icons
    var w = $('.widget');
    var divspinner = $('<div/>').css('text-align','center');
    var spin = $('<i/>').addClass('fa fa-icon fa-spinner fa-5x fa-spin text-muted');
    divspinner.append(spin);
    w.append(divspinner);

    // Set project level
    // var dl = document.location;
    // console.log(dl);
    // console.log(dl.pathname);
    var projects = $.getJSON('/data/projects.json');

    projects.done(function(p){
        $('#ProjectName').html('<a href="/index.html">'+p.project_long_name+'</a>');
        $('title').html(p.project_long_name + ' dashboard by Bitergia');
        p.sp_number = p.projects.length;
        $.each(p.projects, function(index,p){
            p.sp_number = p.projects.length;
        });
        $.get('/templates/projectsmapmenu.mst', function(t){
            var sp_menu_content = Mustache.to_html(t,p);
            $('#sp').html(sp_menu_content);
        });
        $.get('/templates/projectsmaptree.mst', function(t){
            var sp_tree_content = Mustache.to_html(t,p, {moreprojects: t});
            $('#projectsmap').html(sp_tree_content);
        });
    });

    // Getting metrics
    var metrics = $.getJSON('/data/metrics.json');

    metrics.done(function(m){

        // Filling .metric.numeric
        var numeric_metrics_containers = $('.metric.numeric');
        $.each(numeric_metrics_containers, function(i){
            var data_source = $(this).attr('data-source');

            Viz.fillNumericValue($(this), m[data_source].val);
        });

        // Filling widgets frames
        $.get('/templates/widget.mst', function(t){
            var w = $('.widget');
            $.each(w, function(){
                var dt = $(this).attr('data-type');
                var ds = $(this).attr('data-source');
                var title = m[ds].long_name;
                var zoomable = false;
                if ($(this).attr('data-type')=='chart' || $(this).attr('data-type')=='evol') {
                    zoomable = true;
                }
                var w_content = Mustache.to_html(t, {widget_title: title, data_source: ds, zoom: zoomable, data_type: dt});
                $(this).html(w_content);

                // Filling widgets with data
                var pb = $(this).find('.panel-body');
                pb.height($(this).parents('.row').height()-45);
                switch (true) {
                    case (pb.attr('data-type')=='evol'):
                        Viz.drawEvolChart(pb, m[ds].val);
                        break;
                    case (pb.attr('data-type')=='demography'):
                        //pb.height($(this).parents('.row').height()-50);
                        Viz.drawDemographyChart(pb, m[ds].val);
                        break;
                    case (pb.attr('data-type')=='tops'):
                        Viz.drawTopsTable(pb, m[ds].val);
                        break;
                    case (pb.attr('data-type')=='listdata'):
                        Viz.drawMultiData(pb, m[ds]);
                        break;
                }

                // Modals
                $(this).find('.modal').on('shown.bs.modal', function (e) {
                    console.log(e);
                    var c = $(this).find('.modal-body');
                    c.height(two_third);
                    Viz.drawEvolChart(c, m[ds].val.evol);
                });
            });
        });
    });
});