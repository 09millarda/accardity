import * as React from 'react';
import { IEbayItem } from 'src/App/index';
import RoiTableView from './RoiBreakdownTables';

interface IRoiSectionInheritedProps {
  items: IEbayItem[];
}

type RoiSectionProps = IRoiSectionInheritedProps;

interface IRoiSectionState {
  minROI?: number;
  minRoiExclFees: number;
  roiItems: IEbayItem[];
  meanPrice: number;
}

class RoiSection extends React.Component<RoiSectionProps, IRoiSectionState> {
  public constructor(props: RoiSectionProps) {
    super(props);

    this.state = {
      minROI: 0,
      minRoiExclFees: 0,
      roiItems: [],
      meanPrice: 0
    }
  }

  public componentDidMount() {
    this.filterRoiItems(this.props.items, this.state.minROI || 0);
  }

  public componentDidUpdate(nextProps: RoiSectionProps) {
    if (nextProps.items.length !== this.props.items.length) {
      this.filterRoiItems(nextProps.items, this.state.minROI || 0);
    }
  }

  public render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4 title="Based off of mean price">Min R.O.I.</h4>
          <div style={{display: 'inline-block', marginRight: '20px'}}>
            <div className="input-group" style={{width: '125px'}}>
              <div className="input-group-prepend">
                <span className="input-group-text">£</span>
              </div>
              <input type="number" className="form-control" min="0" step="0.01" onBlur={this.changeMinROI} onKeyDown={this.changeMinROIOnEnter} defaultValue="0.00" />
            </div>
            <label style={{marginTop: '3px'}}>Inc. eBay fees</label>
          </div>
          <div style={{display: 'inline-block'}}>
            <div className="input-group" style={{width: '125px'}}>
              <div className="input-group-prepend">
                <span className="input-group-text">£</span>
              </div>
              <input type="number" className="form-control" min="0" step="0.01" disabled={true} value={this.state.minRoiExclFees.toFixed(2)} />
            </div>
            <label style={{marginTop: '3px'}}>Excl. eBay fees</label>
          </div>
          <p style={{marginTop: '7px'}}><span className="emphasize">{this.state.roiItems.length}</span> of <span className="emphasize">{this.props.items.length}</span> listings had a £{(this.state.minROI || 0).toFixed(2)} or greater R.O.I. (<span className="emphasize">{(100 * this.state.roiItems.length / this.props.items.length).toFixed(2)}%</span>)</p>
        </div>
        <div className="col-12">
          <RoiTableView items={this.state.roiItems} meanPrice={this.state.meanPrice} />
        </div>
      </div>
    );
  }

  private changeMinROI = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.length > 0 ? parseFloat(e.target.value) : 0;

    this.setState({
      minROI: val
    });

    this.filterRoiItems(this.props.items, val);
  }

  private changeMinROIOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const target = e.target as HTMLInputElement;
      const val = target.value.length > 0 ? parseFloat(target.value) : 0;

      this.setState({
        minROI: val
      });

      this.filterRoiItems(this.props.items, val);
    }
  }

  private filterRoiItems(allItems: IEbayItem[], minRoi: number) {
    const meanPrice = allItems.reduce((t, n) => t + n.sellingStatus.convertedCurrentPrice.value, 0) / allItems.length;
    const roiItems = allItems.filter((i) => {
      const itemCost = i.sellingStatus.convertedCurrentPrice.value;
      const shippingCost = i.shippingInfo.shippingServiceCost ? i.shippingInfo.shippingServiceCost.value : 0;      
      const totalItemCost = itemCost + shippingCost;

      let ebayFees = totalItemCost * 0.1;
      ebayFees = ebayFees > 250 ? 250 : ebayFees;
      const paypalFees = totalItemCost * 0.034 + 0.2;      
      const totalFees = ebayFees + paypalFees;

      const total = totalItemCost + totalFees;

      return meanPrice - total >= minRoi;
    });
    this.setState({
      roiItems,
      meanPrice,
      minRoiExclFees: minRoi + (meanPrice * 0.1) + (meanPrice * 0.034 + 0.2)
    });
  }
}

export default RoiSection;