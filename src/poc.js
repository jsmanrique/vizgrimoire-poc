    var d = new Date();
    var
        d1 = [],
        d2 = [],
        d3 = [['google',50], ['apple',20],['motorola',20], ['nokia', 10], ['blackberry',5]],
        point,
        i;
    for (i = 0; i < 100; i++) {
        point1 = [new Date(d.getTime() + (24 * 60 * 60 * 1000) * i).getTime(), Math.ceil(Math.random() * 10) + (i + 1)];
        point2 = [new Date(d.getTime() + (24 * 60 * 60 * 1000) * i).getTime(), Math.ceil(Math.random() * i)];
        d1.push(point1);
        d2.push(point2);
    }

    var generic_options = {
        xaxis: {
            mode: 'time',
            timeformat: '%d'
        },
        yaxis: {
            min: null,
            noTicks: 2,
            autoscale: false
        },
        legend: {
            show: true,
            position: 'nw',
            margin: 10
        },
        grid: {
            verticalLines: false,
            color: '#ccc',
            outlineWidth: 1,
            outline: 's'
        },
        mouse: {
            track: true,
            relative: true
        }
    };

    $(document).ready(function(){
        //set panel-body and chart height
        //var screen_availheight = Math.ceil(window.screen.availHeight);
        //console.log(screen_availheight);
        //$('.panel-body').height(screen_availheight);
        //$('.chart').height(screen_availheight-30);

        //var half_height = Math.floor($('.half-height').parents('div').height()/2);
        var half_height = Math.floor((window.screen.availHeight - window.screen.availTop-220)/2);
        console.log(half_height);
        $('.half-height').height(half_height);
        $('.chart').height(half_height-100);
        $('.rank').height(half_height-100);

       // drawchart function
        var drawchart = function(container) {
            Flotr.draw(
                container,
                [
                    {data:d1, label: 'd1', lines:{show:true}},
                    {data:d2, label: 'd2', bars:{show:true}},
                ],
                generic_options);
        };

        // data2csv function
        // var data2csv = function (data) {
        //     t = '';
        //     for (var i = 0; i < data.length; i++){
        //         for (j = 0; j < data[0].length; j++) {
        //             t = t + data[i][j];
        //             if (j < data[0].length-1) {
        //                 t = t +',';
        //             } else {
        //                 t = t +'\n';
        //             };
        //         };
        //     };
        //     return(t)
        // };

        var charts = $('.chart');
        for (var i = 0; i < charts.length; i++) {
            drawchart($('.chart')[i]);
        //     var t = '';
        //     for (var j = 0; j < d1.length; j++) {
        //         t = t + '<tr><td>'+d1[j][0]+'</td><td>'+d1[j][1]+'</td></tr>';
        //     };
        //     $('.chart')[i].nextElementSibling.innerHTML = t;
        }

        // redraw on resize
        $(window).resize(function(){
            for (var i = 0; i < charts.length; i++) {
                drawchart($('.chart')[i]);
            }
        });

        // download data
        function download(filename, text) {
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', filename);
            pom.click();
        }

    //events handler
    //show header
    // $('.panel').mouseover(function(){
    //     var panelheader = $(this).children('.panel-heading');
    //     panelheader.removeClass('hidden');
    //     panelheader.addClass('show');
    // });
    // $('.panel').mouseout(function(){
    //     var panelheader = $(this).children('.panel-heading');
    //     panelheader.removeClass('show');
    //     panelheader.addClass('hidden');
    // });
    //toggle chart/table view
    $('.toggleview').click(function(){
        var chart = $(this).parents('.panel').children('.panel-body').children('.chart');
        chart.toggleClass('show');
        chart.toggleClass('hidden');
        var table = $(this).parents('.panel').children('.panel-body').children('table');
        table.toggleClass('hidden');
        table.toggleClass('show');
        $(this).children('.fa-table').toggleClass('fa-bar-chart-o');
        $(this).children('.fa-bar-chart-o').toggleClass('fa-table');
    });

    //download
    $('.download').click(function(){
        var modaldownload = $(this).parents('.panel').children('.modal-download');
        var mbody = modaldownload.children().children().children('.modal-body');
        t = data2csv(d1);
        //for (var i = 0; i < d1.length; i++){
        //    t = t + d1[i][0]+','+d1[i][1]+'\n';
        //};
        mbody.append('<pre>'+t+'</pre>');
        modaldownload.modal('show');
    });
    $('.downloaddata').click(function(){
        text = d1;
        download('data.csv',text);
    });

    //share
    $('.share').click(function(){
        console.log('share clicked');
        var modalshare = $(this).parents('.panel').children('.modal-share');
        modalshare.modal('show');
    });

    //help
    $('.help').click(function(){
        console.log('help clicked');
        var modalhelp = $(this).parents('.panel').children('.modal-help');
        modalhelp.modal('show');
    });

    });