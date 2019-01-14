import * as React from 'react';
import { london } from 'src/App/common/moment-formats';
import * as moment from 'moment-timezone';
import { IEbayItem } from 'src/App/index';

interface IRoiTableInheritedProps {
  items: IEbayItem[];
  refreshItem: (itemId: number) => void;
}

type RoiTableProps = IRoiTableInheritedProps;

class RoiTable extends React.Component<RoiTableProps> {
  public render() {
    
    return (
      <div className="table-responsive" style={{marginTop: '10px'}}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Leading Image</th>
              <th>Title</th>
              <th>Summary</th>
              <th>Total Price (£)</th>
              <th>Listing Duration</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.items.map((item, i) => {
                return (
                  <tr key={i}>
                    <td><img src={item.galleryUrl} /></td>
                    <td>{item.title}</td>
                    <td>A subtitle</td>
                    <td>{item.sellingStatus.convertedCurrentPrice.value}</td>
                    <td>{moment.tz(item.listingInfo.endTime, london).diff(moment.tz(item.listingInfo.startTime, london), 'hour')} hrs</td>
                    <td><button className="btn btn-danger btn-sm" data-itemId={item.itemId} onClick={this.removeItem}>Remove</button></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }

  private removeItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    const itemId = target.getAttribute('data-itemId');

    if (itemId == null) {
      return;
    }

    this.props.refreshItem(parseInt(itemId, 10));
  }
}

export default RoiTable;