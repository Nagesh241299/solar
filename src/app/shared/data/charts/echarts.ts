import { EChartsOption } from "echarts/types/dist/echarts";

//Echart (line Chart)
export const echartLineOption: EChartsOption = {

    grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25',
    },
    tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer:
        {
            label: {
                show: false,

            }
        },

    },
    xAxis: {
        data: ['2014', '2015', '2016', '2017', '2018'],
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
    },
    series: [
        {
            name: 'sales',
            type: 'line',
            smooth: true,
            data: [12, 25, 12, 35, 12, 38],
            color: ['#6259ca']
        },
        {
            name: 'Profit',
            type: 'line',
            smooth: true,
            data: [8, 12, 28, 10, 10, 12],
            color: ['#53caed']
        }
    ],

};
//combined line and bar chart
export const echartLineBarOption: EChartsOption = {
    grid: {
        top: '10',
        right: '0',
        bottom: '57',
        left: '25'
    },
    tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer: {
            label: {
                show: false,
            }
        }
    },
    xAxis: {
        data: ['2014', '2015', '2016', '2017', '2018'],
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#5e2dd8'
        },

    },
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLine: {
            show:true,
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#5e2dd8'
        }
    },
    series: [
        {
            name: 'sales',
            type: 'bar',
            data: [10, 15, 9, 18, 10, 15]
        },
        {
            name: 'profit',
            type: 'line',
            smooth: true,
            data: [8, 5, 25, 10, 10]
        },
        {
            name: 'growth',
            type: 'bar',
            data: [10, 14, 10, 15, 9, 25]
        }
    ],
    legend:{
        show : true,
        left: 'center',
        top: 'bottom', 
    },
    color: ['#5e2dd8', '#09ad95', '#d43f8d',]
};

//Horizontal line chart
// export let echartHorizontalLineChart: EChartsOption = {
//     grid: {
//         top: '6',
//         right: '0',
//         bottom: '17',
//         left: '32',
//     },
//     tooltip: {
//         show: true,
//         showContent: true,
//         alwaysShowContent: true,
//         triggerOn: 'mousemove',
//         trigger: 'axis',
//         axisPointer:
//         {
//             label: {
//                 show: false,
//             }
//         }
//     },
//     xAxis: {
//         type: 'value',
//         axisLine: {
//             lineStyle: {
//                 color: 'rgba(119, 119, 142, 0.2)'
//             }
//         },
//         axisLabel: {
//             fontSize: 10,
//             color: '#77778e'
//         }
//     },
//     yAxis: {
//         type: 'category',
//         data: ['2014', '2015', '2016', '2017', '2018'],
//         splitLine: {
//             lineStyle: {
//                 color: 'rgba(119, 119, 142, 0.2)'
//             }
//         },
//         axisLine: {
//             lineStyle: {
//                 color: 'rgba(119, 119, 142, 0.2)'
//             }
//         },
//         axisLabel: {
//             fontSize: 10,
//             color: '#77778e'
//         }
//     },
//     series: [
//         {
//             name: 'sales',
//             type: 'line',
//             smooth: true,
//             data: [12, 25, 12, 35, 12, 38],
//             color: ['#6259ca']
//         },
//         {
//             name: 'Profit',
//             type: 'line',
//             smooth: true,
//             data: [8, 12, 28, 10, 10, 12],
//             color: ['#53caed']
//         }
//     ],
//     color: ['#6259ca', '#53caed',]
// }
//Combined Horizontal line  and bar chart
// export let echartHorizontalLineBarChart: EChartsOption = {
//     grid: {
//         top: '6',
//         right: '0',
//         bottom: '17',
//         left: '32',
//     },
//     tooltip: {
//         show: true,
//         showContent: true,
//         alwaysShowContent: true,
//         triggerOn: 'mousemove',
//         trigger: 'axis',
//         axisPointer:
//         {
//             label: {
//                 show: false,
//             }
//         }
//     },
//     xAxis: {
//         type: 'value',
//         axisLine: {
//             lineStyle: {
//                 color: 'rgba(119, 119, 142, 0.2)'
//             }
//         },
//         axisLabel: {
//             fontSize: 10,
//             color: '#77778e'
//         }
//     },
//     yAxis: {
//         type: 'category',
//         data: ['2014', '2015', '2016', '2017', '2018'],
//         splitLine: {
//             lineStyle: {
//                 color: 'rgba(119, 119, 142, 0.2)'
//             }
//         },
//         axisLine: {
//             lineStyle: {
//                 color: 'rgba(119, 119, 142, 0.2)'
//             }
//         },
//         axisLabel: {
//             fontSize: 10,
//             color: '#77778e'
//         }
//     },
//     series: [
//         {
//             name: 'sales',
//             type: 'bar',
//             data: [10, 15, 9, 18, 10, 15]
//         },
//         {
//             name: 'profit',
//             type: 'line',
//             smooth: true,
//             data: [8, 5, 25, 10, 10]
//         },
//         {
//             name: 'growth',
//             type: 'bar',
//             data: [10, 14, 10, 15, 9, 25]
//         }
//     ],
//     color: ['#6259ca', '#01b8ff', '#53caed',]
// }
//stacked bar chart

export const echartStackedBarChart: EChartsOption = {
    grid: {
        top: '6',
        right: '0',
        bottom: '17',
        left: '25',
    },
    tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer:
        {
            label: {
                show: false,
            }
        }
    },
    xAxis: {
        data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
    },
    series: [
        {
            name: 'sales',
            type: 'bar',
            stack: 'Stack',
            data: [14, 18, 20, 14, 29, 21, 25, 14, 24]
        },
        {
            name: 'Profit',
            type: 'bar',
            stack: 'Stack',
            data: [12, 14, 15, 50, 24, 24, 10, 20, 30]
        }
    ],
    color: ['#6259ca', '#53caed']

};
export const dataAttributes2: EChartsOption = {

  grid: {
    top: '20',
    right: '0',
    bottom: '17',
    left: '25',
},
tooltips:{
  mode: 'index',
  titleFontSize: 12,
  titleFontColor: '#000',
  bodyFontColor:"#000",
  backgroundColor: '#fff',
  cornerRadius: 3,
  intersect: false
},

xAxis: {
     data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov"],

    axisLine: {
        lineStyle: {
            color: 'rgba(67, 87, 133, .09)',

        },
        show:true,
    },

    axisLabel: {
        fontSize: 10,
        color: '##77778e'
    }
},
yAxis: {
  // data:["0","50","100","150",],
    splitLine: {
        lineStyle: {
            color: 'rgba(67, 87, 133, .09)'
        },
        show:true

    },

    axisLine: {
        lineStyle: {
            color: 'rgba(67, 87, 133, .09)'
        }
    },
    axisLabel: {
        fontSize: 10,
        color: '##77778e'
    }
},

series: [
    {
        name: 'sales',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 4
          },
        data: [0, 20, 0, 100, 50, 130, 100, 140, 50, 0, 100, 50, 130, 100]
    },
],
color: ['#0774f8'],
tooltip:{
    show:true
},
};
export const echartLineOption2: EChartsOption = {

  grid: {
      top: '0',
      right: '30',
// bottom:'10',
      left: '10',
      height:"180",

  },
  show:false,
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  legend: {
    data: ['leads'],
    show:false
},
  xAxis: {
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun" ,"Aug", "Sep"],
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show:false
      },
      axisLabel: {
          fontSize: 12,
          color: '#5f6d7a',

      }
  },
  yAxis: {
      splitLine: {
          lineStyle: {
              color: 'rgba(255, 255, 255,1)'
          }
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
show:false
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show:false
      },

  },
  series: [{
  name: 'jan',
  type: 'bar',
  barWidth:15,
  stack: 'Stack',
  data: [16, 14, 12, 14, 16, 15, 12, 14, 18, 10],

  color:'#09ad95'
},
],
  color: [ '#09ad95'],

};

//Horizontal stacked bar chart
export const echartHoriStackedBarChart: EChartsOption = {
    grid: {
        top: '6',
        right: '10',
        bottom: '17',
        left: '32',
    },
    tooltip: {
        show: true,
        showContent: true,
        alwaysShowContent: true,
        triggerOn: 'mousemove',
        trigger: 'axis',
        axisPointer:
        {
            label: {
                show: false,
            }
        }
    },
    xAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
    },
    yAxis: {
        type: 'category',
        data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        splitLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(119, 119, 142, 0.2)'
            }
        },
        axisLabel: {
            fontSize: 10,
            color: '#77778e'
        }
    },
    series: [
        {
            name: 'sales',
            type: 'bar',
            stack: 'Stack',
            data: [14, 18, 20, 14, 29, 21, 25, 14, 24]
          },
          {
            name: 'Profit',
            type: 'bar',
            stack: 'Stack',
            data: [12, 14, 15, 50, 24, 24, 10, 20 ,30]
          }
    ],
    color:[ '#6259ca', '#53caed']

};
export const echartHorizontalLineChart: EChartsOption = {
  valueAxis: {
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      splitArea: {
          show: true,
          areaStyle: {
              color: ['rgba(171, 167, 167,0.2)']
          }
      },
      splitLine: {
          lineStyle: {
              color: ['rgba(171, 167, 167,0.2)']
          }
      }
  },
  grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25',
  },
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a'
      }
  },
  yAxis: {
      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a'
      }
  },
  series: [{
  name: 'total profit',
  type: 'bar',
  barMaxWidth: 30,
  data:[15, 18, 12, 14, 10, 15, 7, 14],
},  {
  name: 'Total sales',
  type: 'bar',
  barMaxWidth: 30,
  data: [10, 14, 10, 15, 9, 14, 15, 20],
}],
  color: ['#d43f8d', '#0774f8' ]
};

export const dataAttributes4: EChartsOption = {
  grid: {
      top: '6',
      right: '0',
      left: '-50',
      // bottom: '17',
      // left: '25',
borderWidth:4

  },
  height:'130',
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  smooth: true,
  lineStyle:{
    width:4
  },
  data: [30, 70, 30, 100, 50, 130, 100, 140],
    color: ['#d43f8d']
}]};

export const dataAttributes5: EChartsOption = {
  grid: {
      top: '6',
      right: '0',
      // bottom: '17',
      left: '-50',
borderWidth:4

  },
  height:'130',
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  smooth: true,
  lineStyle:{
    width:4
  },
  data: [30, 70, 30, 100, 50, 130, 100, 140],
    color: ['#09ad95']
}]};

export const echartHorizontalLineChart1: EChartsOption = {
  valueAxis: {
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      splitArea: {
          show: true,
          areaStyle: {
              color: ['rgba(171, 167, 167,0.2)']
          }
      },
      splitLine: {
          lineStyle: {
              color: ['rgba(171, 167, 167,0.2)']
          }
      }
  },
  grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25',
  },
  tooltip: {
    show:true,
    //   trigger: 'axis',
    //   position: ['35%', '32%'],
  },
  xAxis: {
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Aug","Sep","Oct","Nov","Dec"],
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a'
      }
  },
  yAxis: {
      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a'
      }
  },
  series: [{
  name: 'total revenue',
  type: 'bar',
  barMaxWidth: 10,
  data: [15, 18, 12, 14, 10, 15, 7, 14, 18, 12, 14, 10,7,14,18,12,14,10],
},  {
  name: 'Total cost',
  type: 'bar',
  barMaxWidth: 10,
  data: [10, 14, 10, 15, 9, 14, 15, 19, 14, 10, 15, 9,15,19,14,10,15,9],
}],
  color: ['#d43f8d', '#0774f8' ]
};
export const echartHorizontalLineBarChart: EChartsOption = {
  grid: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '-38',
      height:'370'
  },
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
      data: ['0','0','2011', '2011', '2012', '2012', '2013', '2013'],
      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',
          },
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show:false
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show:false
      }
  },
  yAxis: {
    // data: ['0', '5000', '10000', '150000', '20000'],

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a'
      }
  },
  series: [{
  name: 'sales',
  type: 'line',
  smooth: true,
  data: [2666, 2778, 4912, 3767, 6810, 15670, 4820, 15073, 10687, 8432],

  color: ['#0774f8']
}, {
  name: 'Profit',
  type: 'line',
  smooth: true,
  // size: 10,
  data: [2666, 2294, 1969, 13597, 1914, 4293, 3795, 5967, 4460, 5713],
  color: ['#d43f8d']
}],
colors: ['#0774f8', '#d43f8d'],
};
export const dataAttributes6: EChartsOption = {
  height:130,
  grid: {
      top: '6',
      right: '0',
      bottom: '-17',
      left: '-20',
borderWidth:4

  },

  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  smooth: true,
  lineStyle: {
  width: 4
  },
  data: [30, 70, 30, 100, 50, 130, 100, 140],
    color: ['#0774f8']
}]};
export const dataAttributes7: EChartsOption = {
  grid: {
      top: '6',
      right: '0',
      // bottom: '17',
      left: '-20',
borderWidth:4

  },
  height:'130',
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  lineStyle: {
    width: 4
    },
  smooth: true,
  data: [24, 18, 28, 21, 32, 28,30],
    color: ['#d43f8d']
}]};
export const dataAttributes8: EChartsOption = {
  grid: {
      top: '6',
      right: '0',
      // bottom: '17',
      left: '-20',
borderWidth:4

  },
  height:'130',
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  lineStyle: {
    width: 4
    },
  smooth: true,
  data: [30, 70, 30, 100, 50, 130, 100, 140],
  color: ['#09ac95']
}]};
export const dataAttributes9: EChartsOption = {
  grid: {
      top: '6',
      right: '0',
      // bottom: '17',
      left: '-20',
borderWidth:4

  },
  height:'130',
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',

          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  lineStyle: {
    width: 4
    }, 
  smooth: true,
  data: [24, 18, 28, 21, 32, 28,30],
    color: ['#f7b731']
}]};
export const dataAttributes10: EChartsOption = {
  grid: {
      top: '6',
      right: '0',
      // bottom: '17',
      left: '-20',
borderWidth:4

  },
  height:'130',
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  smooth: true,
  lineStyle: {
    width: 4
    },
  data: [24, 18, 28, 21, 32, 28,30],
    color: ['#f5334f']
}]};
export const dataAttributes11: EChartsOption = {
  grid: {
      top: '6',
      right: '0',
      // bottom: '17',
      left: '-20',
borderWidth:4

  },
  height:'130',
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  smooth: true,
  lineStyle: {
    width: 4
    },
  data: [30, 70, 30, 100, 50, 130, 100, 140],
    color: ['#f7b731']
}]};
export const dataAttributes12: EChartsOption = {
  grid: {
      top: '6',
      right: '0',
      // bottom: '17',
      left: '-20',
borderWidth:4

  },
  height:'130',
  tooltip: {
      trigger: 'axis',
      position: ['35%', '32%'],
  },
  xAxis: {
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
show:false,
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)',

          },
          show: false
      },
      axisLabel: {

        show: false
    }
  },
  yAxis: {

      splitLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          },
          show: false
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(171, 167, 167,0.2)'
          }
      },
      axisLabel: {
          fontSize: 10,
          color: '#5f6d7a',
          show: false
      }
  },

  series:[{
  name: 'data',
  type: 'line',
  smooth: true,
  lineStyle: {
    width: 4
    },
  data: [24, 18, 28, 21, 32, 28,30],
    color: ['#1fc874']
}]};
