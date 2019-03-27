import * as React from 'react';
import { IReduxState, IEbayCategoryModel, IConditionModel, ContextDispatch, IFilterCreateFormData, IEbayItem } from 'src/App/index';
import { connect } from 'react-redux';
import EbayItemCategoryWizard from 'src/Components/EbayItemCategoryWizard/EbayItemCategoryWizard';
import { getDataUrl } from 'src/App/common/endpointControl';

interface IFormStateProps {
  ebayConditions: IConditionModel[];
}

interface IFormInheritedProps {
  dispatch: ContextDispatch;
  formInfo: IFilterCreateFormData;
  isFetching: boolean;
  formChanged: boolean;
}

export type IFormProps = IFormStateProps & IFormInheritedProps;

interface IFormState {
  keywords: string;
  category: IEbayCategoryModel | null;
  selectedCategories: IEbayCategoryModel[];
  priceMin?: number;
  priceMax?: number;
  feedbackScoreMin?: number;
  priceMinError: string;
  priceMaxError: string;
  feedbackScoreMinError: string;
  filterNameError: string;
  keywordsError: string;
  categoryError: string;
  conditionError: string;
  ebayConditions: string[];
  selectedConditions: string[];
  binOnly: boolean;
}

class Form extends React.Component<IFormProps, IFormState> {
  private itemCategoryWizardRef: React.RefObject<EbayItemCategoryWizard>;

  public constructor(props: IFormProps) {
    super(props);

    this.state = {
      selectedCategories: [],
      category: null,
      keywords: '',
      filterNameError: '',
      keywordsError: '',
      categoryError: '',
      conditionError: '',
      ebayConditions: [],
      selectedConditions: [],
      priceMinError: '',
      priceMaxError: '',
      feedbackScoreMinError: '',
      binOnly: false
    };

    this.itemCategoryWizardRef = React.createRef<EbayItemCategoryWizard>();
  }

  public componentDidMount() {
    this.setState({
      ebayConditions: this.props.ebayConditions.map((c) => c.name),
      keywords: this.props.formInfo.keywords,
      feedbackScoreMin: this.props.formInfo.minUserFeedback,
      priceMax: this.props.formInfo.priceMax,
      priceMin: this.props.formInfo.priceMin,
      selectedConditions: this.getConditionsAsModels(this.props.formInfo.conditions).map((c) => c.name),
      binOnly: this.props.formInfo.binOnly,
      selectedCategories: this.props.formInfo.categories
    });
  }

  public render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card-box" style={{paddingBottom: '0px'}}>
            <h4 className="m-t-0 header-title">Filter Builder</h4>
            <p className="text-muted m-b-30 font-14">Field marked with an asterisk (*) are required.</p>
            <hr/>
            <div className="row">
              <div className="col-12">
                <div className="p-20">
                  <form className="form-horizontal" role="form" onSubmit={this.calculateReport} noValidate={true}>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">Category *</label>
                      <div className="col-10">
                        <EbayItemCategoryWizard
                          depth={4}
                          categoryChanged={this.categoryUpdated}
                          ref={this.itemCategoryWizardRef}
                          defaultValues={this.props.formInfo.categories}
                        />
                        {
                          this.state.categoryError.length > 0 &&
                          <ul className="parsley-errors-list filled">
                            <li className="parsley-required">{this.state.categoryError}</li>
                          </ul>
                        }
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">
                        Keywords *
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
                        <label className="col-2 col-form-label">
                          Condition(s) *
                        </label>
                        <div className="col-10">
                          {
                            this.conditionSelector()
                          }
                        </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">
                        Price Range (£)
                      </label>
                      <div className="col-10">
                        <div className="row">
                          <div className="col-3">
                            <label>Min Price</label>
                            <input onChange={this.changeMinPrice} type="number" step="0.01" className={this.state.priceMinError.length === 0 ? 'form-control' : 'form-control parsley-error'} value={this.state.priceMin || ''} />
                          </div>
                          <div className="col-3">
                            <label>Max Price</label>
                            <input onChange={this.changeMaxPrice} type="number" step="0.01" className={this.state.priceMaxError.length === 0 ? 'form-control' : 'form-control parsley-error'} value={this.state.priceMax || ''} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            {
                              this.state.priceMinError.length > 0 &&
                              <ul className="parsley-errors-list filled">
                                <li className="parsley-required">{this.state.priceMinError}</li>
                              </ul>
                            }
                            {
                              this.state.priceMaxError.length > 0 &&
                              <ul className="parsley-errors-list filled">
                                <li className="parsley-required">{this.state.priceMaxError}</li>
                              </ul>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">
                        Min. User Feedback
                      </label>
                      <div className="col-10">
                        <div className="row">
                          <div className="col-3">
                            <input onChange={this.changeMinFeedbackScore} type="number" step="1" className={this.state.feedbackScoreMinError.length === 0 ? 'form-control' : 'form-control parsley-error'} value={this.state.feedbackScoreMin || ''} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            {
                              this.state.feedbackScoreMinError.length > 0 &&
                              <ul className="parsley-errors-list filled">
                                <li className="parsley-required">{this.state.feedbackScoreMinError}</li>
                              </ul>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-2 col-form-label">B.I.N. Only</label>
                      <div className="col-10">
                        <input type="checkbox" onChange={this.changeBinOnly} />
                      </div>
                    </div>
                    <div className="row" style={{marginTop: '30px'}}>
                      <div className="col-10">
                        <button className="btn btn-primary mr-3" disabled={this.props.isFetching || !this.props.formChanged}>Calculate Report</button>
                        <button className="btn btn-danger" onClick={this.resetForm}>Reset Filter</button>
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

  private formDidChange() {
    this.props.dispatch({
      type: 'FormChanged'
    });
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
                <div className="ms-elem-selectable ms-elem-remove noselect" onClick={this.toggleCondition} key={i} style={{display: this.state.selectedConditions.indexOf(c) > -1 ? 'block' : 'none'}}>{c}</div>
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

    this.formDidChange()
  }

  private resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    this.props.dispatch({
      type: 'ResetForm'
    });

    this.setState({
      filterNameError: '',
      keywords: '',
      keywordsError: '',
      categoryError: '',
      conditionError: '',
      selectedConditions: [],
      priceMax: undefined,
      priceMaxError: '',
      priceMin: undefined,
      category: null,
      priceMinError: '',
      feedbackScoreMin: undefined,
      feedbackScoreMinError: ''
    });

    this.formDidChange()

    if (this.itemCategoryWizardRef.current) {
      this.itemCategoryWizardRef.current.clearDataLists();
    }
  }

  private changeBinOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      binOnly: e.target.checked
    });

    this.formDidChange();
  }

  private changeMinFeedbackScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      feedbackScoreMin: parseFloat(e.target.value),
      feedbackScoreMinError: ''
    });

    this.formDidChange()
  }

  private changeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      priceMin: parseFloat(e.target.value),
      priceMinError: '',
      priceMaxError: ''
    });

    this.formDidChange()
  }

  private changeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      priceMax: parseFloat(e.target.value),
      priceMaxError: '',
      priceMinError: ''
    });

    this.formDidChange()
  }

  private changeKeywords = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      keywords: e.target.value,
      keywordsError: ''
    });

    this.formDidChange()
  }

  private validateForm = (): boolean => {
    let error: boolean = false;

    if (this.state.category == null) {
      this.setState({
        categoryError: 'You must enter a valid category'
      });

      this.formDidChange()
      error = true;
    }

    if (this.state.keywords.length === 0) {
      this.setState({
        keywordsError: 'You must enter something'
      });

      this.formDidChange()
      error = true;
    }

    if (this.state.feedbackScoreMin && this.state.feedbackScoreMin < 0) {
      this.setState({
        feedbackScoreMinError: 'This value must be greater or equal to 0'
      });

      error = true;
      this.formDidChange()
    }

    if (this.state.selectedConditions.length === 0) {
      this.setState({
        conditionError: 'You must select at least on category'
      });

      this.formDidChange()
      error = true;
    }

    if (this.state.priceMax && this.state.priceMin && this.state.priceMin > this.state.priceMax) {
      this.setState({
        priceMaxError: 'Max Price must be greater or equal to Min Price',
        priceMinError: ' '
      });

      this.formDidChange()
      error = true;
    }

    return error;
  }

  private getConditionsAsModels = (conditionIds: number[]): IConditionModel[] => {
    const conditions = this.props.ebayConditions.filter((c) => conditionIds.indexOf(c.id) > -1);

    return conditions;
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

  private calculateReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.validateForm()) {
      this.props.dispatch({
        type: 'FetchResponseItems'
      });

      const conditionsAsNumbers = this.getConditionsAsNumbers();

      const url = await getDataUrl();
      const res = await fetch(`${url}/ebay/history?categoryId=${this.state.category ? this.state.category.categoryID : -1}&filterString=${encodeURIComponent(this.state.keywords)}&conditions=${conditionsAsNumbers.join(',')}${this.state.priceMin != null ? `&priceMin=${this.state.priceMin}` : ''}${this.state.priceMax != null ? `&priceMax=${this.state.priceMax}` : ''}${this.state.feedbackScoreMin != null ? `&minFeedbackScore=${this.state.feedbackScoreMin}` : ''}`);
      const items: IEbayItem[] = await res.json();

      this.props.dispatch({
        type: 'SetResponseItems',
        items: items.reverse()
      });

      let categories: IEbayCategoryModel[] = [];
      
      if (this.itemCategoryWizardRef.current) {
        categories = this.itemCategoryWizardRef.current.getAllCategories();
      }

      this.props.dispatch({
        type: 'SubmitForm',
        binOnly: this.state.binOnly,
        conditions: conditionsAsNumbers,
        categories,
        minUserFeedback: this.state.feedbackScoreMin,
        keywords: this.state.keywords,
        priceMax: this.state.priceMax,
        priceMin: this.state.priceMin
      });
    };
  }
  
  private categoryUpdated = (category: IEbayCategoryModel | null) => {
    this.setState({
      category,
      categoryError: ''
    });

    this.formDidChange()
  }
}

const mapStateToProps = (state: IReduxState): IFormStateProps => {
  return {
    ebayConditions: state.common.ebayItemConditions
  };
};

export default connect<IFormStateProps, {}, IFormInheritedProps>(mapStateToProps, () => ({}))(Form);