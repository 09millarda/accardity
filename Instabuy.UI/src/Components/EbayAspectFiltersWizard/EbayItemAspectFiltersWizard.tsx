import * as React from 'react';
import { getDataUrl } from 'src/App/common/endpointControl';
import { IEbayAspectContainer, ISelectedAspectValues } from 'src/App/index';
import swal from 'sweetalert';

interface IProps {
  categoryId?: number;
}

interface IState {
  aspectContainers: IEbayAspectContainer[];
  isFetching: boolean;
  selectedAspectValues: ISelectedAspectValues[];
}

class EbayItemAspectFiltersWizard extends React.PureComponent<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      aspectContainers: [],
      selectedAspectValues: [],
      isFetching: false
    };
  }

  public render() {
    if (this.props.categoryId == null) {
      return (
        <p className="text-pink">You must select a category to use this feature</p>
      )
    }
    
    return (
      <div className="row">
        <div className="col-12">
          <button onClick={this.fetchAspectFilters} className="btn btn-light btn-sm" disabled={this.state.isFetching}>{this.state.isFetching ? 'Loading...' : 'Refresh Aspect Filters'}</button>
        </div>
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-sm table-hover mt-3">
              <thead>
                <tr>
                  <th>Aspect Name</th>
                  <th>Selected Values</th>
                  <th>Manage</th>
                </tr>
              </thead>
              {
                this.state.aspectContainers.length > 0 &&
                <tbody>
                  {
                    this.state.aspectContainers.map((aspect, i) => {
                      const selectedValues = this.state.selectedAspectValues.filter((a) => a.aspectName === aspect.aspectName);

                      const openMenu = () => this.openManageSelectedMenu(aspect.aspectName);
                      return (
                        <tr key={i}>
                          <td>{aspect.aspectName}</td>
                          <td>{selectedValues.length === 0 ? '-' : selectedValues.join(', ')}</td>
                          <td><button className="btn btn-sm light" onClick={openMenu}>Manage</button></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              }
            </table>
          </div>
        </div>      
      </div>
    );
  }

  private openManageSelectedMenu = async (aspectName: string) => {
    await swal({
      title: aspectName
    });
  }

  private fetchAspectFilters = async () => {
    const categoryId = this.props.categoryId;
    if (categoryId == null) {
      return;
    }

    if (this.state.aspectContainers.length > 0) {
      const swalRes = await swal({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'All current aspect filters will be reset',
        buttons: ['Continue', 'Cancel'],
        dangerMode: true
      });

      if (swalRes != null) {
        return;
      }
    }

    this.setState({
      aspectContainers: [],
      isFetching: true,
      selectedAspectValues: []
    });
    const url = await getDataUrl();
    const response = await fetch(`${url}/ebay/getAspectHistograms/${categoryId}`);

    this.setState({
      isFetching: false
    });

    if (response.status !== 200) {
      await swal({
        title: 'No Data',
        text: 'No aspect filters found for category: ' + this.props.categoryId,
        icon: 'error'
      });
      return;
    }

    const json: IEbayAspectContainer[] = await response.json();

    this.setState({
      aspectContainers: json
    });
  }
}

export default EbayItemAspectFiltersWizard;