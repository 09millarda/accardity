import * as React from 'react';
import ItemCategoryWizardSelectBox from './ItemCategoryWizardSelectBox';
import { IReduxState, IEbayCategoryModel, IConditionModel } from 'src/App/index';
import { getFilterHistorySummary, getChildCategories, categoryLevelAltered, addCategoryLevelValue, createFilter } from 'src/App/redux/actions/filterActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoadingSquare } from 'src/Components/LoadingSquare';

interface IFormStateProps {
  isFetchingFilterHistory: boolean;
  categoryHeirarchyValues: string[];
  categoryModels: IEbayCategoryModel[][];
  ebayConditions: IConditionModel[];
}

interface IFormDispatchProps {
  fetchFilterHistory: (categoryId: number, filterString: string, conditions: number[], daysBack: number) => void;
  getChildCategories: (categoryId: number, level: number) => void;
  alterCategories: (level: number) => void;
  addCategoryLevelValue: (categoryName: string, level: number) => void;
  createFilter: (filterName: string, categories: number[], keywords: string, conditions: number[], period: number) => void;
}

type IFormProps = IFormStateProps & IFormDispatchProps;

interface IFormState {
  filterName: string;
  keywords: string;
  historicalPeriod: number;
  filterNameError: string;
  keywordsError: string;
  historicalPeriodError: string;
  categoryError: string;
  conditionError: string;
  ebayConditions: string[];
  selectedConditions: string[];
}

class Form extends React.Component<IFormProps, IFormState> {
  public constructor(props: IFormProps) {
    super(props);

    this.state = {
      filterName: '',
      historicalPeriod: 90,
      keywords: '',
      filterNameError: '',
      historicalPeriodError: '',
      keywordsError: '',
      categoryError: '',
      conditionError: '',
      ebayConditions: [],
      selectedConditions: []
    };
  }

  public componentDidMount() {
    this.props.getChildCategories(-1, 0);
    this.setState({
      ebayConditions: this.props.ebayConditions.map((c) => c.name)
    });
  }

  public render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card-box" style={{paddingBottom: '0px'}}>
            <h4 className="m-t-0 header-title">Create a new filter</h4>
            <p className="text-muted m-b-30 font-14">Field marked with an asterisk (*) are required.</p>
            <hr/>
            <div className="row">
              <div className="col-12">
                <div className="p-20">
                  <form className="form-horizontal" role="form" onSubmit={this.calculateReport} noValidate={true}>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">Filter Name</label>
                      <div className="col-10">
                        <input type="text" className={this.state.filterNameError.length === 0 ? 'form-control' : 'form-control parsley-error'} value={this.state.filterName} onChange={this.changeFilterName} />
                        {
                          this.state.filterNameError.length > 0 &&
                          <ul className="parsley-errors-list filled">
                            <li className="parsley-required">{this.state.filterNameError}</li>
                          </ul>
                        }
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">Item Category Wizard</label>
                      <div className="col-10">
                        <div className="row">
                          <div className="col-3">
                            <ItemCategoryWizardSelectBox
                              datalistId="createFilterDataListCategory1"
                              categoryLevel={0}
                            />
                            {
                              this.state.categoryError.length > 0 &&
                              <ul className="parsley-errors-list filled">
                                <li className="parsley-required">{this.state.categoryError}</li>
                              </ul>
                            }
                          </div>
                          <div className="col-3">
                            <ItemCategoryWizardSelectBox
                              datalistId="createFilterDataListCategory2"
                              categoryLevel={1}
                            />
                          </div>
                          <div className="col-3">
                            <ItemCategoryWizardSelectBox
                              datalistId="createFilterDataListCategory3"
                              categoryLevel={2}
                            />
                          </div>
                          <div className="col-3">
                            <ItemCategoryWizardSelectBox
                              datalistId="createFilterDataListCategory4"
                              categoryLevel={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">
                        Keyword Builder
                      </label>
                      <div className="col-10">
                        <textarea className={this.state.keywordsError.length === 0 ? 'form-control' : 'form-control parsley-error'} rows={3} value={this.state.keywords} onChange={this.changeKeywords} />
                        {
                          this.state.keywordsError.length > 0 &&
                          <ul className="parsley-errors-list filled">
                            <li className="parsley-required">{this.state.keywordsError}</li>
                          </ul>
                        }
                      </div>
                    </div>
                    <div className="form-group row">
                        <label className="col col-form-label">
                          Condition
                        </label>
                        <div className="col-10">
                          {
                            this.conditionSelector()
                          }
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">Historical Period (Days)</label>
                      <div className="col-10">
                        <div className="row">
                          <div className="col-3">
                            <input type="number" className={this.state.historicalPeriodError.length === 0 ? 'form-control' : 'form-control parsley-error'} max={365} min={30} value={this.state.historicalPeriod} onChange={this.changeHistoricalPeriod} />
                            {
                              this.state.historicalPeriodError.length > 0 &&
                              <ul className="parsley-errors-list filled">
                                <li className="parsley-required">{this.state.historicalPeriodError}</li>
                              </ul>
                            }
                            <span className="help-block">
                              <small>Minimum = 30 days, maximum = 365 days</small>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className="col-10">
                        <button className="btn btn-primary mr-3" disabled={this.props.isFetchingFilterHistory}>Calculate Report</button>
                        <button className="btn btn-danger" onClick={this.resetForm}>Reset Filter</button>
                        {
                          this.props.isFetchingFilterHistory &&
                          <LoadingSquare />
                        }
                      </div>
                      <div className="col-2">
                        <button className="btn btn-success float-right" onClick={this.saveFilter}>Save Filter</button>
                      </div>             
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private conditionSelector = (): JSX.Element => {
    const main = (
      <div className="row">
        <div className="col-6">
          <label>Unselected</label>
          <div className={`ms-list ${this.state.conditionError.length > 0 ? 'parsley-error' : ''}`}>
            {
              this.state.ebayConditions.map((c, i)  => 
                <div className="ms-elem-selectable noselect" onClick={this.toggleCondition} key={i} style={{display: this.state.selectedConditions.indexOf(c) > -1 ? 'none' : 'block'}}>{c}</div>
              )
            }
          </div>
          {
            this.state.conditionError.length > 0 &&
            <ul className="parsley-errors-list filled">
              <li className="parsley-required">{this.state.conditionError}</li>
            </ul>
          }
        </div>
        <div className="col-6">
          <label>Selected</label>
          <div className={`ms-list ${this.state.conditionError.length > 0 ? 'parsley-error' : ''}`}>
            {
              this.state.ebayConditions.map((c, i)  => 
                <div className="ms-elem-selectable noselect" onClick={this.toggleCondition} key={i} style={{display: this.state.selectedConditions.indexOf(c) > -1 ? 'block' : 'none'}}>{c}</div>
              )
            }
          </div>
        </div>
      </div>
    );

    return main;
  }

  private toggleCondition = (e: React.MouseEvent<HTMLElement>) => {
    const value = e.currentTarget.innerHTML;
    const selectedConditions = this.state.selectedConditions.slice();
    if (selectedConditions.indexOf(value) > -1) {
      selectedConditions.splice(selectedConditions.indexOf(value), 1);
    } else {
      selectedConditions.push(value);
    }
    
    this.setState({
      selectedConditions,
      conditionError: ''
    });
  }

  private resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    this.setState({
      filterName: '',
      filterNameError: '',
      historicalPeriod: 90,
      historicalPeriodError: '',
      keywords: '',
      keywordsError: '',
      categoryError: '',
      conditionError: '',
      selectedConditions: []
    });

    this.props.addCategoryLevelValue('', 0);
    this.props.alterCategories(0);    
  }

  private changeFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      filterName: e.target.value,
      filterNameError: ''
    });
  }

  private changeHistoricalPeriod = (e: React.ChangeEvent<HTMLInputElement>) => {
    let period: number = 0;
    try {
      period = parseInt(e.target.value, 10);
    }
    catch (e) {
      period = 0;
    }

    this.setState({
      historicalPeriod: period,
      historicalPeriodError: ''
    });
  }

  private changeKeywords = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      keywords: e.target.value,
      keywordsError: ''
    });
  }

  private validateForm = (): boolean => {
    let error: boolean = false;

    if (this.state.filterName.length === 0) {
      this.setState({
        filterNameError: 'You must enter a filter name'
      });
      error = true;
    }

    if (this.state.keywords.length === 0) {
      this.setState({
        keywordsError: 'You must enter something'
      });
      error = true;
    }

    if (isNaN(this.state.historicalPeriod) || this.state.historicalPeriod < 30 || this.state.historicalPeriod > 365) {
      this.setState({
        historicalPeriodError: 'Historical period must be between 90 and 365 days'
      });
      error = true;
    }

    const categoryLevel = this.props.categoryHeirarchyValues.length - 1;
    const categoryLevelCategories = this.props.categoryModels[categoryLevel];
    let category: IEbayCategoryModel | undefined;

    if (this.props.categoryHeirarchyValues[categoryLevel] == null || categoryLevelCategories == null) {
      this.setState({
        categoryError: 'You must select a category id'
      });
      error = true;
    } else {
      category = categoryLevelCategories.find((c) => c.categoryName !== this.props.categoryHeirarchyValues[categoryLevel]);
      if (categoryLevelCategories == null || category == null) {
        this.setState({
          categoryError: 'You must set a valid ebay category'
        });
        error = true;
      }
    }

    if (this.state.selectedConditions.length === 0) {
      this.setState({
        conditionError: 'You must select at least on category'
      });
      error = true;
    }

    return error;
  }

  private getCategory = (): IEbayCategoryModel | undefined => {
    const categoryLevel = this.props.categoryHeirarchyValues.length - 1;
    const categoryLevelCategories = this.props.categoryModels[categoryLevel];

    if (categoryLevelCategories == null) {
      return undefined;
    }

    const category = categoryLevelCategories.find((c) => c.categoryName !== this.props.categoryHeirarchyValues[categoryLevel]);

    return category;
  }

  private getConditionsAsNumbers = (): number[] => {
    const conditionsAsNumbers = this.state.selectedConditions.map((c) => {
      const model = this.props.ebayConditions.find((cm) => cm.name === c);

      if (model) {
        return model.id;
      }

      return -1;
    });

    return conditionsAsNumbers;
  }

  private calculateReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const category = this.getCategory();
    if (!this.validateForm() && category) {
      const conditionsAsNumbers = this.getConditionsAsNumbers();

      this.props.fetchFilterHistory(category.categoryID, this.state.keywords, conditionsAsNumbers, this.state.historicalPeriod);
    };
  }

  private saveFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const category = this.getCategory();
    if (!this.validateForm() && category) {
      const conditionsAsNumbers = this.getConditionsAsNumbers();

      this.props.createFilter(this.state.filterName, [1000], this.state.keywords, conditionsAsNumbers, this.state.historicalPeriod);
    }
  } 
}

const mapStateToProps = (state: IReduxState): IFormStateProps => {
  return {
    isFetchingFilterHistory: state.filterState.createFilterState.isFetchingFilterHistorySummary,
    categoryHeirarchyValues: state.filterState.createFilterState.ebayCategoryWizardValues,
    categoryModels: state.filterState.createFilterState.ebayCategoryHierarchy,
    ebayConditions: state.common.ebayItemConditions
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IFormDispatchProps => {
  return {
    fetchFilterHistory: (categoryId: number, filterString: string, conditions: number[], daysBack: number) => dispatch<any>(getFilterHistorySummary(categoryId, filterString, conditions, daysBack)),
    getChildCategories: (categoryId: number, level: number) => dispatch<any>(getChildCategories(categoryId, level)),
    alterCategories: (level: number) => dispatch<any>(categoryLevelAltered(level)),
    addCategoryLevelValue: (categoryName: string, level: number) => dispatch<any>(addCategoryLevelValue(categoryName, level)),
    createFilter: (filterName: string, categories: number[], keywords: string, conditions: number[], period: number) => dispatch<any>(createFilter(filterName, categories, keywords, conditions, period))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);