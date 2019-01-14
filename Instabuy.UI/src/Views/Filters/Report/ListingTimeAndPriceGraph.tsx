import * as React from 'react';
import { IEbayItem } from 'src/App/index';
import { london, dateTimeFormat } from 'src/App/common/moment-formats';
import * as moment from 'moment-timezone';
import ReactEcharts, { EventMap } from 'echarts-for-react';
import '../../../App/assets/js/echarts-dark.js';

interface IListingTimeAndPriceGraphProps {
  sdItems: IEbayItem[]
}

class ListingTimeAndPriceGraph extends React.PureComponent<IListingTimeAndPriceGraphProps> {
  private hoveredItem: IEbayItem | null = null;

  public render() {
    return (
      <div className="col-12">
        <label className="form-control-label">Listing Sale Times & Prices</label>
        <div style={{width: '100%', height: '10px'}} />
        <ReactEcharts
          theme={'dark'}
          option={this.getOptions()}
          onEvents={this.getOnEvents()}
        />
      </div>
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
        left: 10,
        top: 10,
        right: 50,
        bottom: 45,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const item: IEbayItem = params.data.extra.item;

          const dateTime = moment.tz(item.listingInfo.endTime, london);
          const tooltip = `
            <div style="max-width: 250px">
              <p>${dateTime.format(dateTimeFormat)} (${dateTime.format('ddd')})</p>
              <img src="${item.galleryUrl}" style="display: inline-block; width: 100px; margin-right: 8px;" />
              <div style="display: inline-block;">
                <p style="margin: 0px; font-weight: 600;">Sell Price: £${item.sellingStatus.convertedCurrentPrice.value.toFixed(2)}</p>
                <p style="margin: 0px;">Shipping Cost: £${item.shippingInfo.shippingServiceCost ? item.shippingInfo.shippingServiceCost.value.toFixed(2) : '0.00'}</p>
                <p style="margin: 0px;"><i>Total Cost: £${this.getTotalCost(item).toFixed(2)}</i></p>
              </div>
            </div>
          `;

          return tooltip;
        },
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
          data: this.props.sdItems.map((i) => {
            const dateTime = moment.tz(i.listingInfo.endTime, london);
            return {
              name: dateTime.format('YYYY/MM/DD'),
              value: [
                dateTime.format('YYYY/MM/DDTHH:mm:ss'),
                this.getTotalCost(i)
              ],
              extra: {
                item: i
              }
            }
          }),
          type: 'line',
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
      }]
    }
  };

  private getOnEvents = (): EventMap => ({
    'click': (e) => {
      if (this.hoveredItem) {
        window.open(`https://www.ebay.co.uk/itm/${this.hoveredItem.itemId}`, '_blank');
      }
    },
    'mousemove': (e) => {
      if (e.componentType === 'series') {
        this.hoveredItem = e.data.extra.item
      }
    }
  });

  private getTotalCost = (item: IEbayItem): number => {
    return parseFloat((item.sellingStatus.convertedCurrentPrice.value + (item.shippingInfo.shippingServiceCost ? item.shippingInfo.shippingServiceCost.value : 0)).toFixed(2))
  }
}

export default ListingTimeAndPriceGraph;