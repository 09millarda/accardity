import React, { PureComponent } from 'react';
import { IEbayItem } from 'src/App/index';
import * as moment from 'moment-timezone';
import { london } from 'src/App/common/moment-formats';
import ReactEcharts from 'echarts-for-react';

interface ISalesPerDayProps {
  itemsByDay: Map<string, IEbayItem[]>;
}

class SalesPerDay extends PureComponent<ISalesPerDayProps> {
  public render() {
    const avgSalesPerWeekday = this.getDayGrouped();

    return (
      <div className="col-12">
        <div className="row">
          <div className="col-12">
            <h4 style={{marginBottom: '15px'}}>Avg. Sales Per Day Of Week</h4>
          </div>
          <div className="col-4">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Weekday</th>
                    <th>Sales (avg.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>{avgSalesPerWeekday[1]}</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>{avgSalesPerWeekday[2]}</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>{avgSalesPerWeekday[3]}</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>{avgSalesPerWeekday[4]}</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>{avgSalesPerWeekday[5]}</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>{avgSalesPerWeekday[6]}</td>
                  </tr>
                  <tr>
                    <td>Sunday</td>
                    <td>{avgSalesPerWeekday[0]}</td>
                  </tr>
                  <tr>
                    <th>Average</th>
                    <th>{(avgSalesPerWeekday.reduce((t, n) => t + n, 0) / 7).toFixed(2)}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-8">
              <ReactEcharts
                theme={'dark'}
                option={this.getOptions(avgSalesPerWeekday)}
                style={{
                  height: '100%'
                }}
              />
            </div>
        </div>
      </div>
    );
  }

  private getDayGrouped = (): number[] => {
    const daysMapping: Array<{
      dayOfWeek: number;
      itemsPerDayPerWeek: IEbayItem[][];
    }> = [
      {
        dayOfWeek: 0,
        itemsPerDayPerWeek: []
      },
      {
        dayOfWeek: 1,
        itemsPerDayPerWeek: []
      },
      {
        dayOfWeek: 2,
        itemsPerDayPerWeek: []
      },
      {
        dayOfWeek: 3,
        itemsPerDayPerWeek: []
      },
      {
        dayOfWeek: 4,
        itemsPerDayPerWeek: []
      },
      {
        dayOfWeek: 5,
        itemsPerDayPerWeek: []
      },
      {
        dayOfWeek: 6,
        itemsPerDayPerWeek: []
      }
    ];
  
    // 0 = Sunday, 6 = Saturday
    this.props.itemsByDay.forEach((val, key) => {
      const dayOfWeekNumber = moment.tz(key, london).weekday();
      const dayOfWeek = daysMapping.find((m) => m.dayOfWeek === dayOfWeekNumber);
  
      if (dayOfWeek) {
        dayOfWeek.itemsPerDayPerWeek.push(val);
      }
    });
  
    const avgSalesPerWeekday: number[] = [
      parseFloat((daysMapping[0].itemsPerDayPerWeek.reduce((t, m) => t + m.length, 0) / daysMapping[0].itemsPerDayPerWeek.length).toFixed(2)),
      parseFloat((daysMapping[1].itemsPerDayPerWeek.reduce((t, m) => t + m.length, 0) / daysMapping[1].itemsPerDayPerWeek.length).toFixed(2)),
      parseFloat((daysMapping[2].itemsPerDayPerWeek.reduce((t, m) => t + m.length, 0) / daysMapping[2].itemsPerDayPerWeek.length).toFixed(2)),
      parseFloat((daysMapping[3].itemsPerDayPerWeek.reduce((t, m) => t + m.length, 0) / daysMapping[3].itemsPerDayPerWeek.length).toFixed(2)),
      parseFloat((daysMapping[4].itemsPerDayPerWeek.reduce((t, m) => t + m.length, 0) / daysMapping[4].itemsPerDayPerWeek.length).toFixed(2)),
      parseFloat((daysMapping[5].itemsPerDayPerWeek.reduce((t, m) => t + m.length, 0) / daysMapping[5].itemsPerDayPerWeek.length).toFixed(2)),
      parseFloat((daysMapping[6].itemsPerDayPerWeek.reduce((t, m) => t + m.length, 0) / daysMapping[6].itemsPerDayPerWeek.length).toFixed(2))
    ];

    return avgSalesPerWeekday;
  }

  private getOptions = (avgSalesPerWeekday: number[]) => {
    const graphOptions = {
      color: ['#3bafda'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '40px',
        right: '50px',
        bottom: '3%',
        top: '10px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Avg. Sales Per Day',
          type: 'bar',
          barWidth: '60%',
          data: [
            avgSalesPerWeekday[1],
            avgSalesPerWeekday[2],
            avgSalesPerWeekday[3],
            avgSalesPerWeekday[4],
            avgSalesPerWeekday[5],
            avgSalesPerWeekday[6],
            avgSalesPerWeekday[0],
          ],
          markLine: {
            data: [
              {
                type: 'average',
                name: 'average',
                lineStyle: {
                  color: '#6c757d'
                }
              }
            ]
          }
        }
      ]
    };

    return graphOptions;
  }
}

export default SalesPerDay;