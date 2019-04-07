import * as React from 'react';
import { getDataUrl } from 'src/App/common/endpointControl';
import { IEbayAspectContainer, ISelectedAspectValues, IEbayCategoryModel } from 'src/App/index';
import swal from 'sweetalert';
import EbayItemAspectFiltersPopup from './EbayItemAspectFiltersPopup';
import Modal from 'react-modal';

interface IProps {
  categories: IEbayCategoryModel[];
  selectedAspectFiltersUpdate: (aspects: ISelectedAspectValues[]) => void;
  defaultAspects: ISelectedAspectValues[];
}

interface IState {
  aspectContainers: IEbayAspectContainer[];
  isFetching: boolean;
  isModalOpen: boolean;
  activeAspectContainerIndex: number | null;
}

class EbayItemAspectFiltersWizard extends React.PureComponent<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      aspectContainers: [],
      isFetching: false,
      isModalOpen: false,
      activeAspectContainerIndex: null
    };
  }

  public componentDidMount() {
    if (this.props.categories.length > 1) {
      this.fetchAspectFilters(this.props.defaultAspects, this.props.categories);
    }
  }

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.categories.length > 1) {
      this.fetchAspectFilters(this.props.defaultAspects, nextProps.categories);
    }
  }

  public render() {
    if (this.props.categories.length < 2) {
      return (
        <p className="text-pink">You must select a second level category or above to use aspect filters</p>
      )
    }
    
    return (
      <div className="row">
        <div className="col-12">
          {/* tslint:disable-next-line:jsx-no-lambda */}
          <button onClick={() => this.fetchAspectFilters([], this.props.categories)} className="btn btn-light btn-sm" disabled={this.state.isFetching}>{this.state.isFetching ? 'Loading...' : 'Refresh Aspect Filters'}</button>
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
                      const selectedValues = this.props.defaultAspects.filter((a) => a.aspectName === aspect.aspectName);

                      return (
                        <tr key={i}>
                          <td>{aspect.aspectName}</td>
                          <td>{selectedValues.length === 0 ? '-' : selectedValues.map(v => v.aspectValueName).join(', ')}</td>
                          <td>
                            {/* tslint:disable-next-line:jsx-no-lambda */}
                            <button className="btn btn-light btn-sm" onClick={() => this.openModal(i)}>Manage</button>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              }
            </table>
          </div>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={{
            overlay: {
              background: 'rgba(0,0,0,0.4)',
              zIndex: 999
            },
            content: {
              zIndex: 999,
              padding: 0,
              background: 'none',
              border: 'none'
            }
          }}
        >
          {
            this.getModalContent()
          }
        </Modal>
      </div>
    );
  }

  private getModalContent = (): JSX.Element[] => {
    if (this.state.activeAspectContainerIndex == null) {
      return [];
    }

    const aspectSet = this.state.aspectContainers[this.state.activeAspectContainerIndex];
    const selectedAspects = this.props.defaultAspects.filter((aspect) => aspect.aspectName === aspectSet.aspectName);

    return [
      (
        <EbayItemAspectFiltersPopup
          aspectContainer={aspectSet}
          aspectName={aspectSet.aspectName}
          selectedAspects={selectedAspects}
          updateSelected={this.updateSelectedAspectValues}
        />
      )
    ];
  }

  private updateSelectedAspectValues = (aspectName: string, values: string[]) => {
    const selectedAspectNameValues: ISelectedAspectValues[] = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.props.defaultAspects.length; i++) {
      const aspect = this.props.defaultAspects[i];
      if (aspect.aspectName !== aspectName) {
        selectedAspectNameValues.push(aspect);
      }
    }

    for (const value of values) {
      selectedAspectNameValues.push({
        aspectName,
        aspectValueName: value
      });
    }

    this.setState({
      isModalOpen: false
    });

    this.props.selectedAspectFiltersUpdate(selectedAspectNameValues);
  }

  private openModal = (aspectContainerId: number) => {
    this.setState({
      activeAspectContainerIndex: aspectContainerId,
      isModalOpen: true
    });
  }

  private closeModal = () => {
    this.setState({
      activeAspectContainerIndex: null,
      isModalOpen: false
    });
  }

  private fetchAspectFilters = async (selectedAspects: ISelectedAspectValues[], categories: IEbayCategoryModel[]) => {
    const category = categories[categories.length - 1];
    if (category == null) {
      return;
    }

    this.setState({
      isFetching: true
    });
    const url = await getDataUrl();

    const body: Array<{ name: string; values: string[] }> = [];

    selectedAspects.forEach((aspect) => {
      const bodyItem = body.find(b => b.name === aspect.aspectName);
      if (bodyItem) {
        bodyItem.values.push(aspect.aspectValueName);
      } else {
        body.push({
          name: aspect.aspectName,
          values: [
            aspect.aspectValueName
          ]
        });
      }
    });
    
    const response = await fetch(`${url}/ebay/getAspectHistograms/${category.categoryID}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: "{ aspects: " + JSON.stringify(body) + "}"
    });

    this.setState({
      isFetching: false
    });

    if (response.status !== 200) {
      await swal({
        title: 'No Data',
        text: 'No aspect filters found for category: ' + category.categoryID,
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