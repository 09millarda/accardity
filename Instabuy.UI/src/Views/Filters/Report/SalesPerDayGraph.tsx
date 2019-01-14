import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { IEbayItem } from 'src/App/index';
import * as moment from 'moment-timezone';

interface ISalesPerDayGraph {
  firstDate: moment.Moment;
  itemsByDay: Map<string, IEbayItem[]>;
}

class SalesPerDayGraph extends PureComponent<ISalesPerDayGraph> {
  public render() {
    let days: number = 0;
    this.props.itemsByDay.forEach((v) => {
      days += v.length
    });
    return (
      <div className="col-12">
        <div className="row">
          <h4 style={{marginBottom: '15px'}}>Sales Per Day: <span style={{color: '#ddd'}}>Avg. {(days / this.props.itemsByDay.size).toFixed(2)}</span></h4>
        </div>
        <div className="row">
          <div className="col-12">
            <ReactEcharts
              theme={'dark'}
              option={this.getOptions()}
              style={{
                height: '100%',
                minHeight: '300px'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  private getOptions = () => {
    const data: any[] = [];

    let iteration: number = 0;
    this.props.itemsByDay.forEach((c) => {
      const dateTime = this.props.firstDate.clone().add(iteration, 'day');
      data.push({
        name: `${dateTime.format('YYYY-MM-DD')} (${dateTime.format('ddd')})`,
        value: [
          dateTime.format('YYYY/MM/DD'),
          c.length
        ]
      });

      iteration++;
    });

    const graphOptions = {
      grid: {
        left: '5%',
        top: 10,
        right: 50,
        bottom: 10,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        },
        formatter: (params: any) => {
          params = params[0];

          const tooltip = `
            <div style="max-width: 250px">
              <p style="margin-bottom: 0px">${params.data.name}</p>
              <p style="margin-top: 0px; margin-bottom: 5px;"><b>Items: ${params.data.value[1]}</b></p>
            </div>
          `;

          return tooltip;
        }
      },
      xAxis: [
        {
          type: 'time',
          boundaryGap: false
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          type: 'line',
          data,
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

export default SalesPerDayGraph;