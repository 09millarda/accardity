import * as React from 'react';
import { IHistoricalEbayItemInfo } from 'src/App/index';
import ReactEcharts from 'echarts-for-react';
import { london } from 'src/App/common/moment-formats';
import * as moment from 'moment-timezone';

interface ISalesInheritedProps {
  historicalItems: IHistoricalEbayItemInfo[];
}

type ISalesProps = ISalesInheritedProps;

class SalesGraph extends React.Component<ISalesProps> {
  public render() {
    return (
      <ReactEcharts
        theme={'dark'}
        option={this.getOptions()}
        style={{height: '300px', width: '100%'}}
      />
    );
  }

  private getOptions = () => {
    return {
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          start: 0,
          end: 100,
          background: '#5A6576',
          dataBackground: {
            areaStyle: {
              color: '#001228'
            }
          }
        }
      ],
      grid: {
        left: '10%',
        top: 5,
        right: '10%',
        bottom: 75
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.props.historicalItems.map((i) => {
          const dateTime = moment.tz(i.end, london);
          return {
            name: dateTime.format('YYYY/MM/DD'),
            value: [
              dateTime.format('YYYY/MM/DDTHH:mm:ss'),
              parseFloat(i.sellPrice.toString()).toFixed(2)
            ],
            extra: {
              listingTitle: i.title,
              secondsListed: moment.duration(moment.tz(i.end, london).diff(moment.tz(i.start, london))).asSeconds(),
              sellPrice: i.sellPrice
            }
          }
        }),
        type: 'line'
      }]
    }
  };
}

export default SalesGraph;