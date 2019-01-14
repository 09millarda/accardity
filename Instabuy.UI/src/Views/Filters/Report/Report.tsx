import * as React from 'react';
import { IEbayItem, IReduxState } from 'src/App/index';
import * as moment from 'moment-timezone';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { london } from 'src/App/common/moment-formats';
import WithLoading from 'src/Components/LoadingHOC/WithLoading';
import 'src/App/common/mathExtensions';
import RoiSection from './RoiSection';
import ListingTimeAndPriceGraph from './ListingTimeAndPriceGraph';

interface IReportStateProps {
  isFetchingFilterSummary: boolean;
  filterHistorySummary: IEbayItem[];
}

type IReportProps = IReportStateProps;

interface IReportState {
  standardDeviation: number;
  standardDeviationMultiplier?: number;
  _meanPrice: number;
  meanPrice: number;
  maxPrice: number;
  minPrice: number;
  sdItems: IEbayItem[]
  m: number;
  c: number;
  minROI?: number;
}

class Report extends React.Component<IReportProps, IReportState> {
  public constructor(props: IReportProps) {
    super(props);

    this.state = {
      standardDeviation: 0,
      standardDeviationMultiplier: 1.5,
      _meanPrice: 0,
      sdItems: [],
      maxPrice: 0,
      minPrice: 0,
      meanPrice: 0,
      c: 0,
      m: 0,
      minROI: 0
    };
  }

  public componentDidMount() {
    if (this.props.filterHistorySummary.length > 0) {
      this.calculateStatistics(this.props.filterHistorySummary);
    }
  }

  public componentWillReceiveProps(nextProps: IReportProps) {
    if (nextProps.filterHistorySummary.length > 0) {
      this.calculateStatistics(nextProps.filterHistorySummary);
    }
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
                <WithLoading
                    loading={this.props.isFetchingFilterSummary}
                  >
                  <div className="p-20" style={{paddingTop: '0px'}}>
                    <div className="row">
                      <div className="col-12">
                        <h4>Standard Deviation: <span>{this.state.standardDeviation}</span></h4>
                        <input className="form-control" type="number" onBlur={this.updateSdMultiplier} onKeyDown={this.updateSdMultiplerOnEnter} min={0} max={5} step={0.01} style={{width: '70px', display: 'inline-block'}} defaultValue="1.5" />
                        <p style={{marginTop: '7px'}}>{this.state.sdItems.length} of {this.props.filterHistorySummary.length} items ({((this.state.sdItems.length / this.props.filterHistorySummary.length) * 100).toFixed(2)}%)</p>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
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
                      <ListingTimeAndPriceGraph sdItems={this.state.sdItems} />
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <button className="btn btn-link pull-right" style={{marginRight: '4px'}} onClick={this.downloadHistoricalItemsSummary}>Download JSON</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12" style={{textAlign: 'center'}}>
                        <div className="reportStat">
                          <h4>Weekly Trend:</h4><br/>
                          <h2 className="muted" style={{fontWeight: 300}}>£{(this.state.m * 86400 * 7).toFixed(2)}</h2>
                        </div>
                        <div className="reportStat">
                          <h4>Monthly Trend:</h4><br/>
                          <h2 className="muted" style={{fontWeight: 300}}>£{(this.state.m * 86400 * 30).toFixed(2)}</h2>
                        </div>
                        <div className="reportStat">
                          <h4>Quarterly Trend:</h4><br/>
                          <h2 className="muted" style={{fontWeight: 300}}>£{(this.state.m * 86400 * 90).toFixed(2)}</h2>
                        </div>
                      </div>
                    </div>
                    <RoiSection items={this.state.sdItems} />
                  </div>                  
                </WithLoading>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private downloadHistoricalItemsSummary = () => {
    const content = JSON.stringify(this.state.sdItems);
    const blob = new Blob([content], {type: 'octet/stream'});
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'ItemSummary.json';
    anchor.click();
    window.URL.revokeObjectURL(url);
    anchor.remove();
  }

  private updateSdMultiplier = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.length > 0 ? parseFloat(e.target.value) : 0;

    if ((this.state.standardDeviationMultiplier || 0) === val) {
      return;
    }

    if (val == null || (val >= 0 && val <= 5)) {
      this.setState({
        standardDeviationMultiplier: val
      });
    }
    
    this.interpolateStandardDeviation(this.props.filterHistorySummary, val || 0);
  }

  private updateSdMultiplerOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const target = e.target as HTMLInputElement;
      const val = target.value.length > 0 ? parseFloat(target.value) : 0;

      if ((this.state.standardDeviationMultiplier || 0) === val) {
        return;
      }

      if (val == null || (val >= 0)) {
        this.setState({
          standardDeviationMultiplier: val
        });
      }

      this.interpolateStandardDeviation(this.props.filterHistorySummary, val || 0);
    }
  }

  private calculateStatistics = (itemSummary: IEbayItem[]) => {
    if (itemSummary.length === 0) {
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

    const pricesArr = itemSummary.map((i) => i.sellingStatus.currentPrice.value);
    const meanPrice = pricesArr.reduce((s, c) => s + c) / itemSummary.length;
    const variance = pricesArr.reduce((s, c) => s + Math.pow((c - meanPrice), 2)) / itemSummary.length;
    const sd = parseFloat(Math.sqrt(variance).toFixed(2));

    this.setState({
      _meanPrice: meanPrice,
      standardDeviation: sd
    });

    this.interpolateStandardDeviation(itemSummary, this.state.standardDeviationMultiplier || 1, sd, meanPrice);
  }

  private interpolateStandardDeviation = async (itemSummary: IEbayItem[], multipler: number, sd?: number, meanPrice?: number) => {
    sd = sd ? sd : this.state.standardDeviation;
    const meanSd = meanPrice ? meanPrice : this.state._meanPrice;
    const meanOffset = sd * multipler;
    const sdItems = itemSummary.filter((i) => i.sellingStatus.currentPrice.value <= meanSd + meanOffset && i.sellingStatus.currentPrice.value >= meanSd - meanOffset);
    const pricesArr = sdItems.map((i) => i.sellingStatus.currentPrice.value);
    const mean = pricesArr.length > 0 ? pricesArr.reduce((s, c) => s + c) / pricesArr.length : 0;

    this.calculateRegression(sdItems);

    this.setState({
      sdItems, 
      maxPrice: pricesArr.length > 0 ? Math.max(...pricesArr) : 0,
      minPrice: pricesArr.length > 0 ? Math.min(...pricesArr) : 0,
      meanPrice: mean
    });
  }

  private calculateRegression(sdItems: IEbayItem[]) {
    if (sdItems.length > 0) {
      const firstDataItem = sdItems[0];
      const firstDate = moment.tz(firstDataItem.listingInfo.endTime, london);
      const coordData = sdItems.map((item): I2DCoord => {
        return {
          x: moment.tz(item.listingInfo.endTime, london).diff(firstDate, 'second'),
          y: item.sellingStatus.convertedCurrentPrice.value
        };
      });
      const mc = Math.LinearRegression(coordData);
      
      this.setState({
        m: mc.m,
        c: mc.c
      })
    } else {
      this.setState({
        m: 0,
        c: 0
      });
    }
  }
}

const mapStateToProps = (state: IReduxState): IReportStateProps => {
  return {
    filterHistorySummary: state.filterState.createFilterState.filterHistorySummary,
    isFetchingFilterSummary: state.filterState.createFilterState.isFetchingFilterHistorySummary
  };
};

export default connect(mapStateToProps)(Report);