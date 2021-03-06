$(document).ready(function(){
                loadData();
                buildMap();
                loadDataTable();
                $("#tophat-dropdown").click(function(){
                 $("#tophat ul").toggle();
                })
            })
  
           var householdTypes = [];
           var average = [];
           var couples = [];
           var female = [];
           var races = [];
           var male = [];
           var percentRace = [];
           var levels = [];
           var percentEducation = [];
           var years = [];
           var percentYear = [];
           var htmlTable = [];
           var state = [];
           var statePop = [];
           var insecurePercent = [];
           var insecurePop = [];
           var vinsecurePercent = [];
           var vinsecurePop = [];

            function loadData () {
                $.ajax({
                    url: 'data/charts.xml',
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml){
                        parseData(xml)
                    }
                });             
            };
           
           function parseData (xml) {
                $(xml).find("household").each(function(index){
                    householdTypes.push($(this).attr("name"));
                    average.push(parseFloat($(this).find("average").text()));
                    couples.push(parseFloat($(this).find("couple").text()));
                    male.push(parseFloat($(this).find("male").text()));
                    female.push(parseFloat($(this).find("female").text()));
                });
                $(xml).find("race").each(function(index){
                    races.push($(this).attr("name"));
                    percentRace.push(parseFloat($(this).find("percent").text()));
                });
                $(xml).find("level").each(function(index){
                    levels.push($(this).attr("name"));
                    percentEducation.push(parseFloat($(this).find("percent").text()));
                });
                $(xml).find("year").each(function(index){
                    years.push($(this).find("yearnumber").text());
                    percentYear.push(parseFloat($(this).find("percent").text()));
                });
                buildInitialChart();
           };
            
                function buildInitialChart () {
                               $('#family').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: ' '
                    },
                    xAxis: {
                        categories: householdTypes
                    },
                    yAxis: {
                        title: {
                            text: 'Percent'
                        }
                    },
                    series: [{
                        name: 'Average',
                        data: average,
                        color: '#FEE5AC'
                    }, {
                        name: 'Couples',
                        data: couples,
                        color: '#FCDC51'
                    }, {
                        name: 'Single Females',
                        data: female,
                        color: '#CD6600'
                    }, {
                        name: 'Single Males',
                        data: male,
                        color: '#FFB00F'
                    }]
                });
                buildChart();
                } //builds family structure chart on page load
                //this and the shown.bs.tab functions make sure that the charts load with the right sizing
            
    function buildChart() {
 $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) { //loads charts when data-tab clicked on
        $('#family').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: ' '
                    },
                    xAxis: {
                        categories: householdTypes
                    },
                    yAxis: {
                        title: {
                            text: 'Percent'
                        }
                    },
                    series: [{
                        name: 'Average',
                        data: average,
                        color: '#FEE5AC'
                    }, {
                        name: 'Couples',
                        data: couples,
                        color: '#FCDC51'
                    }, {
                        name: 'Single Females',
                        data: female,
                        color: '#CD6600'
                    }, {
                        name: 'Single Males',
                        data: male,
                        color: '#FFB00F'
                    }]
                });
    });
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
         $('#race').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: ' '
                    },
                    
                    xAxis: {
                        categories: races
                    },
                    yAxis: {
                        title: {
                            text: 'Percent'
                        }
                    },
                    series: [{
                                name: 'Percent',
                        data: percentRace
                    }],
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                                bar: {
                                                color: "#EE9A49"
                                }
                    }
                });
    });
         $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('#education').highcharts({
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: ' '
                    },
                    
                    xAxis: {
                        categories: levels
                    },
                    yAxis: {
                        title: {
                            text: 'Percent'
                        }
                    },
                    series: [{
                                name: 'Percent',
                        data: percentEducation
                    }],
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                                bar: {
                                                color: "#EE9A49"
                                }
                    }
                });
        });
         
        $('#line-graph').highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: ' '
                },
                
                xAxis: {
                    categories: years
                },
                yAxis: {
                    title: {
                        text: 'Percent'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false,
                        color: "#EE9A49"
                    }
                },
                series: [{
                    data: percentYear
                }],
                legend: {
                         enabled: false
                 }
            });
     };

            
            
    function buildMap() {

                $.getJSON('data/map.json', function (data) {
            
                    // Make codes uppercase to match the map data
                    $.each(data, function () {
                        this.code = this.code.toUpperCase();
                    });
            
                    // Instanciate the map
                    $('#map1').highcharts('Map', {
            
                        chart : {
                            borderWidth : 1
                        },
            
                        title : {
                            text : ''
                        },
               
                        legend: {
                            layout: 'horizontal',
                            borderWidth: 0,
                            floating: true,
                            verticalAlign: 'top',
                            y: -13
                        },
            
                        mapNavigation: {
                            enabled: true,
                            enableMouseWheelZoom: false,
                            buttonOptions: {
                                align: 'right'
                            }
                        },
            
                        colorAxis: {
                            min: 5,
                            max: 25,
                            stops: [
                                [0, '#FBEAA5'],
                                [0.25, '#FCDC51'],
                                [0.5, '#F7B935'],
                                [0.75, '#F18A26'],
                                [1, '#D16228']
                            ],
                            tickInterval: 5
                            
                        },
                        
            
                        series : [{
                            animation: {
                                duration: 1000
                            },
                            data : data,
                            mapData: Highcharts.maps['countries/us/us-all'],
                            joinBy: ['postal-code', 'code'],
                            dataLabels: {
                                enabled: false,

                            },
                            name: 'Percent of Households',
                            states: {
                                hover: {
                                                color: '#D43D1A',
                                                borderColor: 'gray'
                                }
                            },
                            tooltip: {
                                pointFormat: '{point.code}: {point.value}'
                            }
                        }]
                    });
                });
           };
        
        function loadDataTable() {
            $.ajax({
                    url: 'data/datatable.xml',
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml){
                        parseDataTable(xml)
                    }
                });
        };
        
        function parseDataTable(xml) {
            $(xml).find("tablestate").each(function(index){
                htmlTable += "<tr><td></td>"
                htmlTable += "<td>" + $(this).find("state").text() + "</td>"
                htmlTable += "<td>" + $(this).find("population").text() + "</td>"
                htmlTable += "<td>" + $(this).find("insecurepercent").text() + "</td>"
                htmlTable += "<td>" + $(this).find("insecurepop").text() + "</td>"
                htmlTable += "<td>" + $(this).find("vinsecurepercent").text() + "</td>"
                htmlTable += "<td>" + $(this).find("vinpop").text() + "</td></tr>"
            })
            buildDataTable();
        };
        
        function buildDataTable() {
            $("#data-table-body").html(htmlTable);
            $('#data-table').DataTable({
                responsive: {
                details: {
                    type: 'column',
                    target: 'tr'
                
                                }
                },
                columnDefs: [ {
                className: 'control',
                orderable: false,
                targets:   0
                } ],
                order: [ 1, 'asc' ]
            });
        }
        

