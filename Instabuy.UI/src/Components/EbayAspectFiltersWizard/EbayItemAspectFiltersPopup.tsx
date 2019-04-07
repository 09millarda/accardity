import * as React from 'react';
import { IEbayAspectContainer, ISelectedAspectValues, IAspectValue } from 'src/App/index';
import Switch from "react-switch";

interface IProps {
  aspectName: string;
  aspectContainer: IEbayAspectContainer;
  selectedAspects: ISelectedAspectValues[];
  updateSelected: (aspectName: string, values: string[]) => void;
}

interface IState {
  selectedAspects: string[];
  aspectFilter: string;
}

class EbayItemAspectFiltersPopup extends React.PureComponent<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      selectedAspects: props.selectedAspects.map(aspect => aspect.aspectValueName),
      aspectFilter: ''
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      selectedAspects: nextProps.selectedAspects.map(aspect => aspect.aspectName)
    });
  }

  public render() {
    return (
      <div className="card card-body">
        <h3 className="card-title">{this.props.aspectName}</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="col-form-group">Filter Aspects:</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter aspect"
                  value={this.state.aspectFilter}
                  // tslint:disable-next-line:jsx-no-lambda
                  onChange={(e) => this.setState({aspectFilter: e.target.value})}
                  style={{maxWidth: '300px'}}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <label className="col-form-group">Controls</label>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.updateSelected}>Update</button>
              <button className="btn btn-danger m-l-10" onClick={this.clearSelected}>Clear</button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-sm">
            <tbody>
              {this.getTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  private updateSelected = () => {
    this.props.updateSelected(this.props.aspectName, this.state.selectedAspects);
  }

  private clearSelected = () => {
    this.setState({
      selectedAspects: []
    });
  }

  private getTable = (): JSX.Element[] => {
    const rows: JSX.Element[] = [];
    const aspects = this.props.aspectContainer.aspects.filter(aspect => aspect.name.toUpperCase().startsWith(this.state.aspectFilter.toUpperCase()));

    const colCount = 6;
    const rowCount = Math.ceil(this.props.aspectContainer.aspects.length / colCount);
    for (let i = 0; i < rowCount; i++) {
      const scopedAspects = aspects.slice(i * colCount, (i * colCount) + colCount);
      rows.push(
        <tr key={i}>
          {
            this.getRow(scopedAspects)
          }
        </tr>
      )
    }

    return rows;
  }

  private getRow = (aspects: IAspectValue[]): JSX.Element[] => {
    const tds: JSX.Element[] = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < aspects.length; i++) {
      tds.push(
        <td key={i}>
          <label className="mt-3">{aspects[i].name} (Count: {aspects[i].count})</label>
          <br/>
          <Switch
            checked={this.state.selectedAspects.find(aspect => aspect === aspects[i].name) != null}
            // tslint:disable-next-line:jsx-no-lambda
            onChange={(isCheck) => this.updateCheckState(aspects[i].name)}
            onColor={"#3bafda"}
          />
        </td>
      )
    }

    return tds;
  }

  private updateCheckState(aspectName: string) {
    const selectedStates = this.state.selectedAspects.slice();
    if (this.state.selectedAspects.find(aspect => aspect === aspectName) != null) {
      const index = selectedStates.findIndex(aspect => aspect === aspectName);
      selectedStates.splice(index, 1);
    } else {
      selectedStates.push(aspectName);
    }

    this.setState({
      selectedAspects: selectedStates
    });
  }
}

export default EbayItemAspectFiltersPopup;