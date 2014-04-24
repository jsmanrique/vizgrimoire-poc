$(document).ready(function(){
    
    var projects_data = $.getJSON('data/projects.json');
    
    projects_data.done(function(data){
        $.get('templates/listprojects.mst', function(template){
            var list_projects_content = Mustache.render(template, data, {sub_projects: template});
            $("#projects-list").html(list_projects_content);
        });
    });
});