
$(document).ready(function(){

    var full_height = Math.floor($(document).height()) - 150;
    var one_half = Math.floor(full_height/2);
    var one_third = Math.floor(full_height/3);
    var two_third = 2 * one_third;

    $('.one-half').children().height(one_half);
    $('.full-height').children().height(full_height);
    $('.one-third').children().height(one_third);
    $('.two-third').children().height(two_third);

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
        $.get('templates/widget.mst', function(t){
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
                pb.height($(this).height-60);
                switch (true) {
                    case (pb.attr('data-type')=='evol'):
                        Viz.drawEvolChart(pb, m[ds].val);
                        break;
                    case (pb.attr('data-type')=='demography'):
                        Viz.drawDemographyChart(pb, m[ds].val);
                        break;
                    case (pb.attr('data-type')=='tops'):
                        Viz.drawTopsTable(pb, m[ds].val);
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