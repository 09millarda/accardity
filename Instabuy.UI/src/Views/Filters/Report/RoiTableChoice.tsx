import * as React from 'react';
import { IEbayItem, IEbayItemFull, IReduxState } from 'src/App/index';
import * as moment from 'moment-timezone';
import { london } from 'src/App/common/moment-formats';
import { getMultipleItems } from 'src/App/redux/actions/filterActions';
import { connect } from 'react-redux';

interface IRoiTableChoiceInheritedProps {
  items: IEbayItem[];
  setItemInvalid: (itemId: number) => void;
  setItemValid: (itemId: number) => void;
  meanPrice: number;
}

interface IRoiTableChoiceStateProps {
  fullItems: IEbayItemFull[];
}

interface IRoiTableChoiceDispatchProps {
  getMultipleItems: (itemIds: number[]) => void;
}

type RoiTableChoiceProps = IRoiTableChoiceInheritedProps & IRoiTableChoiceStateProps & IRoiTableChoiceDispatchProps;

class RoiTableChoice extends React.Component<RoiTableChoiceProps> {
  public constructor(props: RoiTableChoiceProps) {
    super(props);
  }

  public componentDidMount() {
    window.onkeydown = this.lrListener;

    this.getFullItems(this.props.items, this.props.fullItems);
  }

  public componentWillReceiveProps(nextProps: RoiTableChoiceProps) {
    this.getFullItems(nextProps.items, nextProps.fullItems);
  }

  public componentWillUnmount() {
    window.onkeydown = null;
  }

  public render() {
    return (
      <div className="report-table">
        <div className="table-header">Leading Image</div>
        <div className="table-header">Title</div>
        <div className="table-header">Total Price (£)</div>
        <div className="table-header">Listing Info</div>
        <div className="table-header">Listing Duration</div>
        {/* Body */}
        {
          this.props.items.length > 0 &&
          this.props.items.map((item, i) => {
            const fullItem = this.props.fullItems.find((j) => j.itemId === parseInt(item.itemId, 10));
            const bgColor = i % 2 === 0 ? 'transparent' : '#303b44';

            return (
              <React.Fragment key={i}>
                <div style={{background: bgColor}} className="table-cell"><img src={item.galleryUrl} /></div>
                <div style={{background: bgColor}} className="table-cell"><p>{item.title}</p></div>
                <div style={{background: bgColor}} className="table-cell">
                  £{(item.sellingStatus.convertedCurrentPrice.value + (item.shippingInfo.shippingServiceCost ? item.shippingInfo.shippingServiceCost.value : 0)).toFixed(2)}
                  <br />
                  <span className="badge badge-primary">+ {this.calculateProfit(item).toFixed(2)}</span>
                  <br />
                  <span className="badge badge-success">+ {this.calculateProfitExclFees(item).toFixed(2)}</span>
                </div>
                <div style={{background: bgColor}} className="table-cell">
                  <b>Listing Type: </b>{item.listingInfo.listingType}<br />
                  <b>BIN Available: </b> {item.listingInfo.buyItNowAvailable ? 'true' : 'false'}<br />
                  <b>Returns Accepted: </b> {item.returnsAccepted ? 'true' : 'false'}<br />
                  <b>Top Rated Listing: </b> {item.topRatedListing ? 'true' : 'false'}
                </div>
                <div style={{background: bgColor}} className="table-cell">{moment.tz(item.listingInfo.endTime, london).diff(moment.tz(item.listingInfo.startTime, london), 'hour')} hrs</div>
                <div style={{gridColumn: '1/-1', background: bgColor}}>
                  {
                    !fullItem &&
                    <p style={{padding: '0px 0.75rem', background: bgColor}}>Loading Detail...</p>
                  }
                  {
                    fullItem &&
                    <div style={{padding: '0px 0.75rem'}}>
                      <div dangerouslySetInnerHTML={{
                        __html: fullItem.description
                      }} />
                    </div>
                  }
                </div>
              </ React.Fragment>
            );
          })
        }
        {
          this.props.items.length === 0 &&
          <div className="table-cell" style={{gridColumn: '1/-1'}}>There are no more listings</div>
        }
      </div>
    );
  }

  private getFullItems = (listItems: IEbayItem[], fullItems: IEbayItemFull[]) => {
    const itemIdsToFetch: number[] = [];

    for (const item of listItems) {
      if (fullItems.find((i) => i.itemId === parseInt(item.itemId, 10)) == null) {
        itemIdsToFetch.push(parseInt(item.itemId, 10));
      }
    }

    if (itemIdsToFetch.length > 0) {
      this.props.getMultipleItems(itemIdsToFetch);
    }
  }

  private calculateProfit = (item: IEbayItem): number => {
    const total = item.sellingStatus.convertedCurrentPrice.value + (item.shippingInfo.shippingServiceCost ? item.shippingInfo.shippingServiceCost.value : 0);
    let ebayFees = total * 0.1;
    ebayFees = ebayFees > 250 ? 250 : ebayFees;
    const paypalFees = total * 0.034 + 0.2;
    const totalFees = ebayFees + paypalFees;

    return this.props.meanPrice - (total + totalFees);
  }

  private calculateProfitExclFees = (item: IEbayItem): number => {
    const total = item.sellingStatus.convertedCurrentPrice.value + (item.shippingInfo.shippingServiceCost ? item.shippingInfo.shippingServiceCost.value : 0);

    return this.props.meanPrice - total;
  }

  private lrListener = (e: KeyboardEvent) => {
    const firstItem = this.props.items[0];

    if (!firstItem) {
      return;
    }

    switch (e.keyCode) {
      // left
      case 37:
        this.props.setItemInvalid(parseInt(firstItem.itemId, 10));
        break;
      // right
      case 39:
        this.props.setItemValid(parseInt(firstItem.itemId, 10));
        break;
      default:
        break;
    }
  }
}

const mapStateToProps = (state: IReduxState): IRoiTableChoiceStateProps => {
  return {
    fullItems: state.filterState.createFilterState.items
  };
};

const mapDispatchToProps = (dispatch: any): IRoiTableChoiceDispatchProps => {
  return {
    getMultipleItems: (itemIds: number[]) => dispatch(getMultipleItems(itemIds))
  };
};

export default connect<IRoiTableChoiceStateProps, IRoiTableChoiceDispatchProps, IRoiTableChoiceInheritedProps>(mapStateToProps, mapDispatchToProps)(RoiTableChoice);