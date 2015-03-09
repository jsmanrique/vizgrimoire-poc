/* ========================================================================
 * script.js v0.0.1
 * Main JS
 * ========================================================================
 * Copyright 2014 Jose Manrique Lopez de la Fuente
 * Licensed under MIT (../LICENSE)
 * ======================================================================== */


function getWidgetTemplate() {
    return $.get('/resources/templates/grimoire-widget.mst');
}

$(document).ready(function(){
    
    $('[data-toggle="tooltip"]').tooltip()
    
    $( "#from" ).datepicker({
        defaultDate: "-1y",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function( selectedDate ) {
            $( "#to" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#to" ).datepicker({
        defaultDate: "+0d",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function( selectedDate ) {
            $( "#from" ).datepicker( "option", "maxDate", selectedDate );
        }
    });
    
    var gwidgets = $('.grimoire-widget');
    
    $.each(gwidgets, function(){
        
        var el = $(this);
        var title = el.attr('data-title');
        var help = el.attr('data-help');
        getWidgetTemplate().done(function(template){
            var widget_skel = Mustache.to_html(template, {widget_title : title, widget_help: help});
            el.html(widget_skel);
            $('[data-toggle="popover"]').popover();
        });
    });
    
});