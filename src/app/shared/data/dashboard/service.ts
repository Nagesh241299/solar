import { ChartDataset, ChartOptions, ChartType } from "chart.js";
// import { Label, Color, MultiDataSet } from "ng2-charts";

export const StatusData = {

    series: [{
        name: 'Page Views',
        type: 'bar',
        barMaxWidth: 7,
        data: [1453, 3425, 7654, 3245, 4532, 5643, 7635, 5465, 6754, 5432, 5435, 6545],
        itemStyle: {
              normal: {
                  barBorderRadius: [50, 50, 0, 0] ,
              }
        }
    }, {
        name: 'New Visitors',
		type:"bar",
        barMaxWidth: 7,
        data: [1123, 2435, 5463, 1245, 3245, 4534, 5435, 3452, 5432, 3452, 2564, 3456 ],
        itemStyle: {
            normal: {
                barBorderRadius: [50, 50, 0, 0] ,
            }
        }
    }],

    colors: ['#4454c3', '#f72d66','#cedbfd'],

    chart: {
        height: 285,
        type: 'bar',
        toolbar: {
            show: true,
			showContent: true,
			alwaysShowContent: true,
			triggerOn: 'mousemove',
			trigger: 'axis',
			axisPointer:
			{
				label: {
					show: true,
				}
			}
        },
        fontFamily: 'Nunito, sans-serif',
    },

    plotOptions: {
        bar: {
            dataLabels: {
                enabled: false
            },
            columnWidth: '42%',
            endingShape: 'rounded',
        }
    },

    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 1,
        endingShape: 'rounded',
        colors: ['transparent'],
    },
    responsive: [{
        breakpoint: 576,
        options: {
            stroke: {
                show: true,
                width: 1,
                endingShape: 'rounded',
                colors: ['transparent'],
            },
        },

    }],

    xaxis: {
        categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisLine: {
            lineStyle: {
                color: 'rgba(67, 87, 133, .09)'
            }
        },
        axisLabel: {
			fontSize: 10,
			color: '#8e9cad'
        }

    },
    yaxis:{
        splitLine: {
        lineStyle: {
          color: 'rgba(67, 87, 133, .09)'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(67, 87, 133, .09)'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#8e9cad'
      }},
    fill: {
        opacity: 1
    },
    legend: {
        show: false,
        floating: true,
        position: 'top',
        horizontalAlign: 'left',

    },

    tooltip: {
        y: {
            formatter: function (val:string) {
                return "$ " + val + " thousands";
            }
        }
    }
};

export const ApexSparklines1 = {
    series: [{
        data: [6,2,8,4,3,8,1,3,6,5,9,2],

    }],
    colors: ['#5e2dd8'],
    chart: {
        type: 'bar',
        widht: 250,
        height: 40,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '80%',
        }
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                }
            }
        },
        marker: {
            show: true
        }
    }
};

export const ApexSparklines2 = {
    series: [{
        data: [9,2,8,1,4,8,9,8,2,1]
    }],
    colors: ['#f9a300'],
    chart: {
        type: 'bar',
        widht: 250,
        height: 40,
        sparkline: {
            enabled: true
        }

    },
    plotOptions: {
        bar: {
            columnWidth: '80%',
        }
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                }
            }
        },
        marker: {
            show: true
        }
    }
};

// Doughnut
// export let doughnutChartLabels: Label[] = ["Very Satisfied", "satisfied", "Unsatisfied"];
// export let doughnutChartData: MultiDataSet = [
  // [45, 25, 20]
// ];
export const doughnutChartType: ChartType = 'doughnut';
// export let doughnutChartColors: Color[] = [
    // {
    //     backgroundColor: ['#0774f8', '#d43f8d', '#09ad95' ],
		// hoverBackgroundColor: ['#436bf1', '#d43f8d', '#09ad95']
    // }
// ];

export const barChartOptions1: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // tooltips: {
    //     mode: 'index',
    //     titleFontSize: 12,
    //     titleFontColor: '#000',
    //     bodyFontColor: '#000',
    //     backgroundColor: '#fff',
    //     cornerRadius: 3,
    //     intersect: false,
    // },
    plugins:{
    legend: {
        display: false,
        labels: {
            usePointStyle: true,
            // fontFamily: 'Montserrat',
        },
    },
  },
    scales: {
        xAxes: {
            ticks: {
                // fontColor: "#77778e",

                },
            display: true,
            grid: {
                display: true,
                color: 'rgba(119, 119, 142, 0.2)',
                // drawBorder: false
            },
            // scaleLabel: {
            //     display: false,
            //     labelString: 'Month',
            //     fontColor: 'rgba(0,0,0,0.8)'
            // }
        },
        yAxes: {
            ticks: {
                // fontColor: "#77778e",
                },
            display: true,
            grid: {
                display: true,
                color: 'rgba(119, 119, 142, 0.2)',
                // bordercolor: false
            },
            // scales: {
            //     display: false,
            //     labelString: 'sales',
            //     fontColor: '#77778e'
            // }
        }
    },
    // title: {
    //     display: false,
    //     text: 'Normal Legend'
    // }
};
// export let barChartLabels1: Label[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const barChartType1: ChartType = 'bar';
export const barChartLegend1 = true;

export const barChartData1: ChartDataset[] = [
    {
        label: 'Total Revenue',
        data: [15, 18, 12, 14, 10, 15, 7, 14, 18, 12, 14, 10],
        backgroundColor:'#d43f8d',
        hoverBackgroundColor: '#d43f8d',
        hoverBorderWidth: 2,
        hoverBorderColor: '#d43f8d',
        barPercentage:0.5
     },
    {
        label: 'Total Cost',
        data: [10, 14, 10, 15, 9, 14, 15, 19, 14, 10, 15, 9],
        backgroundColor: '#0774f8',
        hoverBackgroundColor:'#0774f8',
        hoverBorderWidth: 2,
        hoverBorderColor: '#0774f8',
        barPercentage:0.5
     },
];
