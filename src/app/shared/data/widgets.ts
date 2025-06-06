import { ChartDataset, ChartOptions, ChartType } from "chart.js";
// import { Color, Label } from "ng2-charts";

// Area Chart
export const AreaChartOptions: ChartOptions = {
    maintainAspectRatio: false,
    plugins:{
      legend: {
        display: false,
        labels: {
          //display: false
        }
      },
    },
    responsive: true,
  
    scales: {
        xAxes:  {
            grid: {
                color: 'transparent',
                // zeroLineColor: 'transparent'
            },
            ticks: {
                // fontSize: 2,
                // fontColor: 'transparent'
            }
        },
        yAxes:  {
            display:false,
            ticks: {
                display: false,
            }
        }
    },
    // title: {
    //     display: false,
    // },
    elements: {
        line: {
            borderWidth: 1
        },
        point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
        }
    }

  };
  // export const AreaChartLabels: Label[] =['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  export const AreaChartType: ChartType = 'line';
  export const AreaChartData: ChartDataset[] = [
    {
        label: 'Market value',
        data: [30, 70, 30, 100, 50, 130, 100, 140],
    }
  ];

  export const AreaChartData1: ChartDataset[] = [
    {
        label: 'Market value',
        data: [24, 18, 28, 21, 32, 28,30],
    }
  ];

  export const AreaChartData2: ChartDataset[] = [
    {
        label: 'Market value',
        data: [30, 70, 30, 100, 50, 130, 100, 140],
    }
  ];

  export const AreaChartData3: ChartDataset[] = [
    {
        label: 'Market value',
        data: [24, 18, 28, 21, 32, 28,30],
    }
  ];

