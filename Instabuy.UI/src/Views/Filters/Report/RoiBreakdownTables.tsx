import * as React from 'react';
import { IEbayItem } from 'src/App/index';
import RoiTableChoice from './RoiTableChoice';
import RoiTable from './RoiTable';

interface IRoiTableInheritedProps {
  items: IEbayItem[];
  meanPrice: number;
}

type RoiTableProps = IRoiTableInheritedProps;

interface IRoiTableState {
  removedItemIds: number[];
  validItemIds: number[];
  allItemsPageNumber: number;
  removedItemsPageNumber: number;
  tabNumber: number;
}

class RoiTableView extends React.Component<RoiTableProps, IRoiTableState> {
  public constructor(props: RoiTableProps) {
    super(props);

    this.state = {
      removedItemIds: [],
      validItemIds: [],
      allItemsPageNumber: 0,
      removedItemsPageNumber: 0,
      tabNumber: 0
    };
  }

  public render() {
    return (
      <div style={{marginTop: '10px'}}>
        <ul className="nav nav-tabs tabs-bordered">
          <li className="nav-item">
            <a onClick={this.setTabNumberTo0} href="#" data-toggle="tab" aria-expanded="false" className="nav-link active show">Hot Or Not ({this.getRemainingItems().length})</a>
          </li>
          <li className="nav-item">
            <a onClick={this.setTabNumberTo1} href="#" data-toggle="tab" aria-expanded="false" className="nav-link">Accepted Items ({this.getAcceptedItems().length})</a>
          </li>
          <li className="nav-item">
            <a onClick={this.setTabNumberTo2} href="#" data-toggle="tab" aria-expanded="false" className="nav-link">Rejected Items ({this.getRejectedItems().length})</a>
          </li>
          <li style={{flexGrow: 1}}>
            <button className="btn btn-link pull-right refresh-btn" style={{marginRight: '13px', fontSize: '1.3em'}}><i className="fa fa-refresh pull-right" onClick={this.refreshTables} /></button>
            <button className="btn btn-primary pull-right w-lg btn-sm">Submit Data</button>
          </li>
        </ul>
        {
          this.state.tabNumber === 0 &&
          <RoiTableChoice
            items={this.getRemainingItems().slice(0, 10)}
            meanPrice={this.props.meanPrice}
            setItemInvalid={this.setItemInvalid}
            setItemValid={this.setItemValid}
          />
        }
        {
          this.state.tabNumber === 1 &&
          <RoiTable
            items={this.getAcceptedItems()}
            refreshItem={this.refreshItem}
          />
        }
        {
          this.state.tabNumber === 2 &&
          <RoiTable
            items={this.getRejectedItems()}
            refreshItem={this.refreshItem}
          />
        }        
      </div>
    );
  }

  private refreshTables = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLDivElement;
    target.classList.add('click-refresh');
    this.setState({
      removedItemIds: [],
      validItemIds: []
    });
    setTimeout(() => target.classList.remove('click-refresh'), 300);
  }

  private setTabNumberTo0 = () => {
    this.setState({
      tabNumber: 0
    });
  }

  private setTabNumberTo1 = () => {
    this.setState({
      tabNumber: 1
    });
  }

  private setTabNumberTo2 = () => {
    this.setState({
      tabNumber: 2
    });
  }

  private sortItems = (items: IEbayItem[]): IEbayItem[] => {
    return items.sort((a, b) => (a.sellingStatus.convertedCurrentPrice.value + (a.shippingInfo.shippingServiceCost ? a.shippingInfo.shippingServiceCost.value : 0)) - (b.sellingStatus.convertedCurrentPrice.value + (b.shippingInfo.shippingServiceCost ? b.shippingInfo.shippingServiceCost.value : 0)));
  }

  private getRemainingItems = (): IEbayItem[] => {
    let items = this.props.items.filter((i) => this.state.removedItemIds.indexOf(parseInt(i.itemId, 10)) === -1);
    items = items.filter((i) => this.state.validItemIds.indexOf(parseInt(i.itemId, 10)) === -1);
    items = this.sortItems(items);

    return items;
  }

  private getAcceptedItems = (): IEbayItem[] => {
    let items = this.props.items.filter((i) => this.state.validItemIds.indexOf(parseInt(i.itemId, 10)) !== -1);
    items = this.sortItems(items);

    return items;
  }

  private getRejectedItems = (): IEbayItem[] => {
    let items = this.props.items.filter((i) => this.state.removedItemIds.indexOf(parseInt(i.itemId, 10)) !== -1);
    items = this.sortItems(items);

    return items;
  }

  private refreshItem = (itemId: number) => {
    const validItemIds = this.state.validItemIds.slice();
    const removedItemIds = this.state.removedItemIds.slice();

    let index = validItemIds.indexOf(itemId);
    if (index !== -1) {
      validItemIds.splice(index, 1);
    }

    index = removedItemIds.indexOf(itemId);
    if (index !== -1) {
      removedItemIds.splice(index, 1);
    }

    this.setState({
      removedItemIds,
      validItemIds
    });
  }

  private setItemValid = (itemId: number) => {
    if (this.state.validItemIds.indexOf(itemId) === -1) {
      const validItems = this.state.validItemIds.slice();
      validItems.push(itemId);

      this.setState({
        validItemIds: validItems
      });
    }
  }

  private setItemInvalid = (itemId: number) => {
    if (this.state.removedItemIds.indexOf(itemId) === -1) {
      const removedItems = this.state.removedItemIds.slice();
      removedItems.push(itemId);

      this.setState({
        removedItemIds: removedItems
      });
    }
  }
}

export default RoiTableView;