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

$(document).ready(function(){
    var half_height = Math.floor($(document).height()/2);

    // TEMPLATES RENDERING
    // menu
    $.get('templates/side-menu.mst', function(template){
        var menu_content = Mustache.to_html(template, sources);
        $("#main-menu").html(menu_content);
    });

    // tabs
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