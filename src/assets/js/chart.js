$(function() {
	"use strict";

    /*LIne-Chart */
    var ctx = document.getElementById("chartLine").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"],
            datasets: [{
                label: 'Profits',
                data: [100, 420, 210, 420, 210, 320, 350],
                borderWidth: 2,
                backgroundColor: 'transparent',
                borderColor: '#5e2dd8',
                borderWidth: 3,
                lineTension:0.3,
                pointBackgroundColor: '#ffffff',
                pointRadius: 2
            }, {
                label: 'Expenses',
                data: [450, 200, 350, 250, 480, 200, 400],
                borderWidth: 2,
                backgroundColor: 'transparent',
                borderColor: '#d43f8d',
                borderWidth: 3,
                lineTension:0.3,
                pointBackgroundColor: '#ffffff',
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                x: {
                    ticks: {
                        color: "#9ba6b5",
                    },
                    display: true,
                    grid: {
                        color: 'rgba(119, 119, 142, 0.2)'
                    }
                },
                y: {
                    ticks: {
                        color: "#9ba6b5",
                    },
                    display: true,
                    grid: {
                        color: 'rgba(119, 119, 142, 0.2)'
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Thousands',
                        fontColor: 'rgba(119, 119, 142, 0.2)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#adb5bd'
                    }
                }
            }
        }
    });

    /* Bar-Chart1 */
    var ctx = document.getElementById("chartBar1").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            datasets: [{
                label: 'Sales',
                data: [200, 450, 290, 367, 256, 543, 345, 290, 367],
                borderWidth: 2,
                backgroundColor: '#5e2dd8',
                borderColor: '#5e2dd8',
                borderWidth: 2.0,
                pointBackgroundColor: '#ffffff',

            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: true
            },
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                        stepSize: 150,
                        color: "#9ba6b5",
                    },
                    grid: {
                        color: 'rgba(119, 119, 142, 0.2)'
                    }
                },
                x: {
                    barPercentage: 0.4,
                    barValueSpacing: 0,
                    barDatasetSpacing: 0,
                    barRadius: 0,
                    ticks: {
                        display: true,
                        color: "#9ba6b5",
                    },
                    grid: {
                        display: false,
                        color: 'rgba(119, 119, 142, 0.2)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#adb5bd'
                    }
                }
            }
        }
    });

    /* Bar-Chart2*/
    var ctx = document.getElementById("chartBar2");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [{
                label: "Data1",
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: "#5e2dd8",
                borderWidth: "0",
                backgroundColor: "#5e2dd8"
            }, {
                label: "Data2",
                data: [28, 48, 40, 19, 86, 27, 90],
                borderColor: "#d43f8d",
                borderWidth: "0",
                backgroundColor: "#d43f8d"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    barPercentage: 0.4,
                    barValueSpacing: 0,
                    barDatasetSpacing: 0,
                    barRadius: 0,
                    ticks: {
                        color: "#9ba6b5",
                    },
                    grid: {
                        color: 'rgba(119, 119, 142, 0.2)'
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true,
                        color: "#9ba6b5",
                    },
                    grid: {
                        color: 'rgba(119, 119, 142, 0.2)'
                    },
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#adb5bd'
                    }
                }
            }
        }
    });

    /* Area Chart*/
    var ctx = document.getElementById("chartArea");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            datasets: [{
                label: "Data1",
                borderColor: "#5e2dd8",
                borderWidth: "3",
                lineTension:0.3,
                backgroundColor: "rgba(94, 45, 216, .1)",
                fill: true,
                data: [22, 44, 67, 43, 76, 45, 12]
            }, {
                label: "Data2",
                borderColor: "rgba(212, 63, 141 ,0.9)",
                borderWidth: "3",
                lineTension:0.3,
                backgroundColor: "rgba(212, 63, 141, 0.7)",
                pointHighlightStroke: "rgba(212, 63, 141 ,1)",
                fill: true,
                data: [16, 32, 18, 26, 42, 33, 44]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                x: {
                    ticks: {
                        color: "#9ba6b5",
                    },
                    grid: {
                        color: 'rgba(119, 119, 142, 0.2)'
                    }
                },
                yAxes: {
                    ticks: {
                        beginAtZero: true,
                        color: "#9ba6b5",
                    },
                    grid: {
                        color: 'rgba(119, 119, 142, 0.2)'
                    },
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#adb5bd'
                    }
                }
            }
        }
    });

    /* Pie Chart*/
    var datapie = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
            data: [20, 20, 30, 5, 25],
            backgroundColor: ['#5e2dd8', '#d43f8d', '#09ad95', '#f7b731', '#f82649']
        }]
    };
    var optionpie = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#adb5bd'
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    /* Doughbut Chart*/
    var ctx6 = document.getElementById('chartPie');
    var myPieChart6 = new Chart(ctx6, {
        type: 'doughnut',
        data: datapie,
        options: optionpie,
        grid: "transparent",
        
    });

    /* Pie Chart*/
    var ctx7 = document.getElementById('chartDonut');
    var myPieChart7 = new Chart(ctx7, {
        type: 'pie',
        data: datapie,
        options: optionpie,
        borderColor: '#000',
    });

    /* Radar chart*/
  /* Radar chart*/
	var ctx = document.getElementById("chartRadar");
	var myChart = new Chart(ctx, {
		type: 'radar',
		data: {
			labels: [

				["Eating", "Dinner"],
				["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running",

			],
			datasets: [{

				label: "Data1",
				data: [65, 59, 66, 45, 56, 55, 40],
				borderColor: "rgba(113, 76, 190, 0.9)",
				borderWidth: "1",
				backgroundColor: "rgba(113, 76, 190, 0.5)"
			}, {
				label: "Data2",
				data: [28, 12, 40, 19, 63, 27, 87],
				borderColor: "rgba(235, 111, 51,0.8)",
				borderWidth: "1",
				backgroundColor: "rgba(235, 111, 51,0.4)"
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
             plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#adb5bd'
                    }
                }
            },
			scales: {
				r: {
				  grid: {
					color: 'rgba(171, 167, 167,0.2)'
				  }
				}
			  },
              
		}
	});
    /* polar chart */
    var ctx = document.getElementById("chartPolar");
    var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            datasets: [{
                data: [18, 15, 9, 6, 19],
                backgroundColor: ['#5e2dd8', '#d43f8d', '#09ad95', '#f7b731', '#f82649'],
                hoverBackgroundColor: ['#5e2dd8', '#d43f8d', '#09ad95', '#f7b731', '#f82649'],
                borderColor: 'transparent',
            }],
            labels: ["Data1", "Data2", "Data3", "Data4"]
        },
        options: {
            scale: {
                grid: {
                    color: '#fff'
                },
                grid: {
                    color: '#fff'
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#adb5bd'
                    },
                }
            }
        }
    });

});