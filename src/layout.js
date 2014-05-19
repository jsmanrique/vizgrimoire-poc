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

var menu_render = function(data) {
    data.done(function(sources){
        console.log(sources.project_name);
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

});