import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import '../../../App/assets/js/echarts-dark.js';
import { IEbayItem, IReduxState } from 'src/App/index.js';
import * as moment from 'moment-timezone';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const Handle = Slider.Handle;

const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
}

interface IReportStateProps {
  isFetchingFilterSummary: boolean;
  filterHistorySummary: IEbayItem[];
}

type IReportProps = IReportStateProps;

interface IReportState {
  standardDeviation: number;
  standardDeviationMultiplier: number;
  _meanPrice: number;
  meanPrice: number;
  maxPrice: number;
  minPrice: number;
  sdItems: IEbayItem[];
  echartsRef?: any;
}

class Report extends React.Component<IReportProps, IReportState> {
  public constructor(props: IReportProps) {
    super(props);

    this.state = {
      standardDeviation: 0,
      standardDeviationMultiplier: 1,
      _meanPrice: 0,
      sdItems: [],
      maxPrice: 0,
      minPrice: 0,
      meanPrice: 0
    };
  }

  public componentDidMount() {
    this.calculateStatistics();
  }

  public render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card-box" style={{paddingBottom: '0px'}}>
            <h4 className="m-t-0 header-title">Filter Report</h4>
            <hr/>
            <div className="row">
              <div className="col-12">
                <div className="p-20" style={{paddingTop: '0px'}}>
                  <div className="row">
                    <div className="col-2">
                      <label className="form-control-label">Standard Deviation Multiplier</label>
                    </div>
                    <div className="col-10">
                      <h4>Standard Deviation: <span>{this.state.standardDeviation} ({((this.state.sdItems.length / this.props.filterHistorySummary.length) * 100).toFixed(2)}%)</span></h4>
                      <input className="form-control" type="number" onChange={this.changeDeviationMultiple} value={this.state.standardDeviationMultiplier} min={0} max={5} step={0.01} style={{width: '70px', display: 'inline-block'}} />
                      <Slider
                        style={{
                          maxWidth: '400px',
                          width: '100%',
                          display: 'inline-block',
                          marginLeft: '15px'
                        }}
                        min={0}
                        max={5}
                        value={this.state.standardDeviationMultiplier}
                        handle={handle}
                        step={0.01}                        
                        railStyle={{
                          background: '#E0E3E8'
                        }}
                        trackStyle={{
                          background: 'rgb(249, 88, 140)'
                        }}
                        handleStyle={{
                          background: 'rgb(237, 85, 101)',
                          borderColor: 'rgb(237, 85, 101)'
                        }}
                        onChange={this.changeDeviationMultiplierSlider}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="row" style={{marginTop: '25px'}}>
                    <div className="col-12" style={{textAlign: 'center'}}>
                      <div className="reportStat">
                        <h4>Mean Price:</h4><br/>
                        <h2 className="muted" style={{fontWeight: 300}}>£{this.state.meanPrice.toFixed(2)}</h2>
                      </div>
                      <div className="reportStat">
                        <h4>Max Price:</h4><br/>
                        <h2 className="muted" style={{fontWeight: 300}}>£{this.state.maxPrice.toFixed(2)}</h2>
                      </div>
                      <div className="reportStat">
                        <h4>Min Price:</h4><br/>
                        <h2 className="muted" style={{fontWeight: 300}}>£{this.state.minPrice.toFixed(2)}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <label className="form-control-label">Listing Sale Times & Prices</label>
                      <div style={{width: '100%', height: '10px'}} />
                      <ReactEcharts
                        theme={'dark'}
                        option={this.getOptions()}
                        ref={this.getEchartsRef}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="row">                        
                    <div className="col-12">
                      <label className="form-control-label">Statistical Breakdown</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getEchartsRef = (ref: any) => {
    this.setState({
      echartsRef: ref
    });
  }

  private changeDeviationMultiple = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);

    if (val >= 0 && val <= 5) {
      this.setState({
        standardDeviationMultiplier: val
      });
      this.interpolateStandardDeviation(val);
    }
  }

  private changeDeviationMultiplierSlider = (value: number) => {
    this.setState({
      standardDeviationMultiplier: value
    });
    this.interpolateStandardDeviation(value);
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
          formatter: (params: any) => {
            params = params[0];

            const date = new Date(params.name);
            const tooltip = `
              <div style="max-width: 250px">
                <h4 style="word-break: break-all; width: 240px;">${params.data.extra.listingTitle}</h4>
                <p>${date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()} : £${params.value[1]}</p>
                <p>Listed for: ${Math.floor(params.data.extra.secondsListed / (3600 * 24))}d ${(params.data.extra.hoursListed % (3600 * 24)) % 3600}h</p>             
                <img src="${params.data.extra.imageUrl}" width="100" />
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
          data: this.state.sdItems.map((i) => {
            const dateTime = moment.tz(i.listingInfo.endTime, 'Europe/London');
            return {
              name: dateTime.format('YYYY/MM/DD'),
              value: [
                dateTime.format('YYYY/MM/DDTHH:mm:ss'),
                parseFloat(i.sellingStatus.currentPrice.value.toString()).toFixed(2)
              ],
              extra: {
                listingTitle: i.title,
                imageUrl: i.galleryUrl,
                secondsListed: moment.duration(moment.tz(i.listingInfo.endTime, 'Europe/London').diff(moment.tz(i.listingInfo.startTime, 'Europe/London'))).asSeconds(),
                sellPrice: i.sellingStatus.convertedCurrentPrice.value
              }
            }
          }),
          type: 'line'
      }]
    }
  }

  private calculateStatistics = () => {
    if (this.props.filterHistorySummary.length === 0) {
      this.setState({
        standardDeviation: 0,
        _meanPrice: 0,
        maxPrice: 0,
        minPrice: 0,
        sdItems: [],
        meanPrice: 0
      });
      return;
    }

    const pricesArr = this.props.filterHistorySummary.map((i) => i.sellingStatus.currentPrice.value);
    const meanPrice = pricesArr.reduce((s, c) => s + c) / this.props.filterHistorySummary.length;
    const variance = pricesArr.reduce((s, c) => s + Math.pow((c - meanPrice), 2)) / this.props.filterHistorySummary.length;
    const sd = parseFloat(Math.sqrt(variance).toFixed(2));

    this.setState({
      _meanPrice: meanPrice,
      standardDeviation: sd
    });

    this.interpolateStandardDeviation(this.state.standardDeviationMultiplier, sd, meanPrice);
  }

  private interpolateStandardDeviation = (multipler: number, sd?: number, meanPrice?: number) => {
    sd = sd ? sd : this.state.standardDeviation;
    const meanSd = meanPrice ? meanPrice : this.state._meanPrice;
    const meanOffset = sd * multipler;
    const sdItems = this.props.filterHistorySummary.filter((i) => i.sellingStatus.currentPrice.value <= meanSd + meanOffset && i.sellingStatus.currentPrice.value >= meanSd - meanOffset);
    const pricesArr = sdItems.map((i) => i.sellingStatus.currentPrice.value);
    const mean = pricesArr.length > 0 ? pricesArr.reduce((s, c) => s + c) / pricesArr.length : 0;

    this.setState({
      sdItems,      
      maxPrice: pricesArr.length > 0 ? Math.max(...pricesArr) : 0,
      minPrice: pricesArr.length > 0 ? Math.min(...pricesArr) : 0,
      meanPrice: mean
    });
  }
}

const mapStateToProps = (state: IReduxState): IReportStateProps => {
  return {
    filterHistorySummary: state.filterState.createFilterState.filterHistorySummary,
    isFetchingFilterSummary: state.filterState.createFilterState.isFetchingFilterHistorySummary
  };
};

export default connect(mapStateToProps)(Report);