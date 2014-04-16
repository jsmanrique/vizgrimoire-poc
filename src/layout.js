var sources = {
    "data_sources": [
        {
            "name": "scm",
            "long_name": "Source code management",
            "icon": "code",
            "activity_name": "commits"
        },
        {
            "name": "its",
            "long_name": "Issue tracking system",
            "icon": "bug",
            "activity_name": "issues"
        },
        {
            "name": "crs",
            "long_name": "Code review",
            "icon": "ticket",
            "activity_name": "reviews"
        },
        {
            "name": "mls",
            "long_name": "Mailing lists",
            "icon": "evenlope",
            "activity_name": "emails"
        },
        {
            "name": "irc",
            "long_name": "IRC",
            "icon": "comment",
            "activity_name": "chats"
        }
    ]
};

var scm_contributors_evol_panel = {
    "panel_name": "Contributors",
    "chart_type": "evolution",
    "data-source": "scm_contributors"
};

var scm_activity_evol_panel = {
    "panel_name": "Activity",
    "chart_type": "evolution",
    "data-source": "scm_activity"
};

$(document).ready(function(){
    var half_height = Math.floor((window.screen.availHeight - window.screen.availTop-220)/2);
    console.log(half_height);
    $('.half-height').height(half_height);
    $('.chart').height(half_height-100);
    $('.rank').height(half_height-100);

    // TEMPLATES RENDERING
    // menu
    var menu_tmpl = $("#menu-template").html();
    var menu_content = Mustache.to_html(menu_tmpl, sources);
    $("#main-menu").html(menu_content);

    // tabs
    var tabs_tmpl = $("#tabs-template").html();
    var tabs_header_content = Mustache.to_html(tabs_tmpl, sources);
    $("#data-sources-tabs").html(tabs_header_content);
    // panes
    var panes_tmpl = $("#tabs-panes-template").html();
    var panes_content = Mustache.to_html(panes_tmpl, sources);
    $("#data-sources-panes").html(panes_content);
    // set active tab & pane and control switching
    $("#data-sources-tabs li").first().addClass("active");
    $("#data-sources-panes div").first().addClass("active");
    $('#data-sources-tabs a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    // widgets
    var widgets_tmpl = $("#metric-widget-template").html();
    var contributors_widget_content = Mustache.to_html(widgets_tmpl, scm_contributors_evol_panel);
    $("#scm_contributors_evol").html(contributors_widget_content);

    var activity_widget_content = Mustache.to_html(widgets_tmpl, scm_activity_evol_panel);
    $("#scm_activity_evol").html(activity_widget_content);
});