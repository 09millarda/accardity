import * as React from 'react';
import { Moment } from 'moment-timezone';
import { dateTimeFormat } from 'src/App/common/moment-formats';
import Enabled from 'src/Components/StatusTags/Enabled';
import Disabled from 'src/Components/StatusTags/Disabled';

interface IRowProps {
  index: number;
  name: string;
  category: number;
  executionCount: number;
  created: Moment;
  active: boolean;
  filterId: number;
  click: (filterId: number) => void;
}

class Row extends React.Component<IRowProps> {
  public render() {
    return (
      <tr onClick={this.clickRow}>
        <td className={this.props.index % 2 === 0 ? 'footable-even' : 'footable-odd'}>{this.props.name}</td>
        <td className={this.props.index % 2 === 0 ? 'footable-even' : 'footable-odd'}>{this.props.category}</td>
        <td className={this.props.index % 2 === 0 ? 'footable-even' : 'footable-odd'}>{this.props.executionCount}</td>
        <td className={this.props.index % 2 === 0 ? 'footable-even' : 'footable-odd'}>{this.props.created.format(dateTimeFormat)}</td>
        <td className={this.props.index % 2 === 0 ? 'footable-even' : 'footable-odd'}>{this.props.active ? <Enabled /> : <Disabled />}</td>
      </tr>
    );
  }

  private clickRow = () => {
    this.props.click(this.props.filterId);
  }
}

export default Row;