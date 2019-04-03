import * as React from "react";
import EbayItemCategoryWizard from "../EbayItemCategoryWizard/EbayItemCategoryWizard";
import { IEbayCategoryModel, IResearchFilterFormData } from "src/App/index";
import Switch from "react-switch";
import EbayItemAspectFiltersWizard from '../EbayAspectFiltersWizard/EbayItemAspectFiltersWizard';

interface IState {
  categories: IEbayCategoryModel[];
  category: IEbayCategoryModel | null;
  categoryError: string;
  keywords: string;
  keywordsError: string;
  selectedConditions: string[];
  conditionError: string;
  ebayConditions: string[];
  shipToUkOnly: boolean;
  bestOfferOnly: boolean;
  gbpCurrencyOnly: boolean;
  charityListingsOnly: boolean;
  excludeAutoPay: boolean;
  priceMin?: string;
  priceMax?: string;
  featuredOnly: boolean;
  showAdvanced: boolean;
  freeShippingOnly: boolean;
  getItFastOnly: boolean;
  hideDuplicateItems: boolean;
  topRatedSellerOnly: boolean;
  authorisedSellersOnly: boolean;
  returnsAcceptedOnly: boolean;
  ukListedOnly: boolean;
  excludedCategories: string;
  binOnly: boolean;
  feedbackMin?: string;
  feedbackMax?: string;
}

interface IProps {
  originalFilter: IResearchFilterFormData;
}

class EbayFiltersForm extends React.PureComponent<IProps, IState> {
  private itemCategoryWizardRef: React.RefObject<EbayItemCategoryWizard>;
  public constructor(props: IProps) {
    super(props);

    this.categoryUpdated = this.categoryUpdated.bind(this);

    this.state = {
      feedbackMax: this.props.originalFilter.feedbackMax,
      feedbackMin: this.props.originalFilter.feedbackMin,
      priceMax: this.props.originalFilter.priceMax,
      priceMin: this.props.originalFilter.priceMin,
      categories: this.props.originalFilter.categories,
      category: this.props.originalFilter.categories[this.props.originalFilter.categories.length - 1],
      categoryError: "",
      keywords: this.props.originalFilter.keywords,
      keywordsError: "",
      selectedConditions: this.props.originalFilter.selectedConditions,
      conditionError: "",
      binOnly: this.props.originalFilter.binOnly,
      excludedCategories: this.props.originalFilter.excludedCategories.join(','),
      ebayConditions: [
        "New",
        "New other (see details)",
        "New with defects",
        "Manufacture Refurbished",
        "Seller Refurbished",
        "Used",
        "Very Good",
        "Good",
        "Acceptable",
        "For parts or not working"
      ],
      shipToUkOnly: this.props.originalFilter.shipToUkOnly,
      bestOfferOnly: this.props.originalFilter.bestOfferOnly,
      showAdvanced: false,
      charityListingsOnly: this.props.originalFilter.charityListingsOnly,
      excludeAutoPay: this.props.originalFilter.excludeAutoPay,
      authorisedSellersOnly: this.props.originalFilter.authorisedSellersOnly,
      gbpCurrencyOnly: this.props.originalFilter.gbpCurrencyOnly,
      featuredOnly: this.props.originalFilter.featuredOnly,
      hideDuplicateItems: this.props.originalFilter.hideDuplicateItems,
      freeShippingOnly: this.props.originalFilter.freeShippingOnly,
      returnsAcceptedOnly: this.props.originalFilter.returnsAcceptedOnly,
      getItFastOnly: this.props.originalFilter.getItFastOnly,
      ukListedOnly: this.props.originalFilter.ukListedOnly,
      topRatedSellerOnly: this.props.originalFilter.topRatedSellerOnly
    };

    this.itemCategoryWizardRef = React.createRef<EbayItemCategoryWizard>();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      categories: nextProps.originalFilter.categories,
      category: nextProps.originalFilter.categories[nextProps.originalFilter.categories.length - 1],
      feedbackMax: nextProps.originalFilter.feedbackMax,
      feedbackMin: nextProps.originalFilter.feedbackMin,
      priceMax: nextProps.originalFilter.priceMax,
      priceMin: nextProps.originalFilter.priceMin,
      categoryError: "",
      keywords: nextProps.originalFilter.keywords,
      keywordsError: "",
      selectedConditions: nextProps.originalFilter.selectedConditions,
      conditionError: "",
      binOnly: nextProps.originalFilter.binOnly,
      excludedCategories: nextProps.originalFilter.excludedCategories.join(','),
      ebayConditions: [
        "New",
        "New other (see details)",
        "New with defects",
        "Manufacture Refurbished",
        "Seller Refurbished",
        "Used",
        "Very Good",
        "Good",
        "Acceptable",
        "For parts or not working"
      ],
      shipToUkOnly: nextProps.originalFilter.shipToUkOnly,
      bestOfferOnly: nextProps.originalFilter.bestOfferOnly,
      charityListingsOnly: nextProps.originalFilter.charityListingsOnly,
      excludeAutoPay: nextProps.originalFilter.excludeAutoPay,
      authorisedSellersOnly: nextProps.originalFilter.authorisedSellersOnly,
      gbpCurrencyOnly: nextProps.originalFilter.gbpCurrencyOnly,
      featuredOnly: nextProps.originalFilter.featuredOnly,
      hideDuplicateItems: nextProps.originalFilter.hideDuplicateItems,
      freeShippingOnly: nextProps.originalFilter.freeShippingOnly,
      returnsAcceptedOnly: nextProps.originalFilter.returnsAcceptedOnly,
      getItFastOnly: nextProps.originalFilter.getItFastOnly,
      ukListedOnly: nextProps.originalFilter.ukListedOnly,
      topRatedSellerOnly: nextProps.originalFilter.topRatedSellerOnly
    });
  }

  public render() {
    return (
      <>
        <h4 className="header-title m-t-0">Enter Filters</h4>
        <div className="row">
          <div className="col-12">
            <label className="mt-3">Category *</label>
            <EbayItemCategoryWizard
              depth={4}
              categoryChanged={this.categoryUpdated}
              ref={this.itemCategoryWizardRef}
              defaultValues={this.state.categories}
            />
            {this.state.categoryError.length > 0 && (
              <ul className="parsley-errors-list filled">
                <li className="parsley-required">{this.state.categoryError}</li>
              </ul>
            )}
          </div>
          <div className="col-12">
            <label className="mt-3">Aspect Filters - <span className="text-danger" style={{fontSize: '16px'}}><b>Altering Categories will reset all aspect filters</b></span></label>
            <EbayItemAspectFiltersWizard
              categoryId={this.state.category ? this.state.category.categoryID : undefined}
            />
          </div>
          <div className="col-12">
            <label className="mt-3">Keywords *</label>
            <textarea
              className={
                this.state.keywordsError.length === 0
                  ? "form-control"
                  : "form-control parsley-error"
              }
              rows={3}
              value={this.state.keywords}
              onChange={this.changeKeywords}
            />
            {this.state.keywordsError.length > 0 && (
              <ul className="parsley-errors-list filled">
                <li className="parsley-required">{this.state.keywordsError}</li>
              </ul>
            )}
          </div>
          <div className="col-12">
            <label className="mt-3">Condition(s) *</label>
            {this.conditionSelector()}
          </div>
          <div className="col-12 mt-3">
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <label>Min. Price</label><br/>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">£</span>
                      </div>
                      <input
                        style={{maxWidth: '100px'}}
                        type="number"
                        className="form-control"
                        min={0}
                        step={1}
                        value={this.state.priceMin}
                        // tslint:disable-next-line:jsx-no-lambda
                        onChange={(el) => this.setState({
                          priceMin: el.target.value
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <label>Max. Price</label><br/>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">£</span>
                      </div>
                      <input
                        style={{maxWidth: '100px'}}
                        type="number"
                        className="form-control"
                        min={0}
                        value={this.state.priceMax}
                        step={1}
                        // tslint:disable-next-line:jsx-no-lambda
                        onChange={(el) => this.setState({
                          priceMax: el.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <label>Min. Feedback</label><br/>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-user-circle" /></span>
                      </div>
                      <input
                        style={{maxWidth: '100px'}}
                        type="number"
                        className="form-control"
                        min={0}
                        step={1}
                        value={this.state.feedbackMin}
                        // tslint:disable-next-line:jsx-no-lambda
                        onChange={(el) => this.setState({
                          feedbackMin: el.target.value
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <label>Max. Feedback</label><br/>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-user-circle" /></span>
                      </div>
                      <input
                        style={{maxWidth: '100px'}}
                        type="number"
                        className="form-control"
                        min={0}
                        step={1}
                        value={this.state.feedbackMax}
                        // tslint:disable-next-line:jsx-no-lambda
                        onChange={(el) => this.setState({
                          feedbackMax: el.target.value
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <label className="mt-3">Buy It Now Only</label>
            <br/>
            <Switch
              checked={this.state.binOnly}
              // tslint:disable-next-line:jsx-no-lambda
              onChange={(isCheck) => this.setState({binOnly: isCheck})}
              onColor={"#3bafda"}
            />
          </div>
          <div className="col-12">
            <button
              className={
                this.state.showAdvanced
                  ? "btn btn-outline-light mt-3"
                  : "btn btn-light mt-3"
              }
              // tslint:disable-next-line:jsx-no-lambda
              onClick={() =>
                this.setState({ showAdvanced: !this.state.showAdvanced })
              }
            >
              {this.state.showAdvanced ? "Hide" : "Show"} Advanced Options
              <i
                className={
                  this.state.showAdvanced
                    ? "fa fa-caret-down m-l-10"
                    : "fa fa-caret-right m-l-10"
                }
              />
            </button>
            {this.state.showAdvanced && (
              <div className="table-responsive mt-3">
                <table className="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th>Filter Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>United Kingdom Listed Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ ukListedOnly: isChecked })
                          }
                          checked={this.state.ukListedOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Ship To United Kingdom Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ shipToUkOnly: isChecked })
                          }
                          checked={this.state.shipToUkOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Authorised Sellers Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ authorisedSellersOnly: isChecked })
                          }
                          checked={this.state.authorisedSellersOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Best Offer Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ bestOfferOnly: isChecked })
                          }
                          checked={this.state.bestOfferOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>GBP Currency Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ gbpCurrencyOnly: isChecked })
                          }
                          checked={this.state.gbpCurrencyOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Charity Listings Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ charityListingsOnly: isChecked })
                          }
                          checked={this.state.charityListingsOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Exclude Auto-Pay?</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ excludeAutoPay: isChecked })
                          }
                          checked={this.state.excludeAutoPay}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Featured Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ featuredOnly: isChecked })
                          }
                          checked={this.state.featuredOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Free Shipping Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ freeShippingOnly: isChecked })
                          }
                          checked={this.state.freeShippingOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Get It Fast Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ getItFastOnly: isChecked })
                          }
                          checked={this.state.getItFastOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Hide Duplicate Items</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ hideDuplicateItems: isChecked })
                          }
                          checked={this.state.hideDuplicateItems}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Top Rated Seller Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ topRatedSellerOnly: isChecked })
                          }
                          checked={this.state.topRatedSellerOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Returns Accepted Only</td>
                      <td>
                        <Switch
                          onColor={"#3bafda"}
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={isChecked =>
                            this.setState({ returnsAcceptedOnly: isChecked })
                          }
                          checked={this.state.returnsAcceptedOnly}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Exclude Categories (Category IDs)</td>
                      <td>
                        <input
                          type="text"
                          value={this.state.excludedCategories}
                          className="form-control"
                          placeholder="Seperate by ','"
                          // tslint:disable-next-line:jsx-no-lambda
                          onChange={(i) => this.setState({
                            excludedCategories: i.target.value
                          })}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  private changeKeywords = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      keywords: e.target.value,
      keywordsError: ""
    });
  };

  private categoryUpdated = (categories: IEbayCategoryModel[]) => {
    this.setState({
      categories,
      category: categories[categories.length - 1],
      categoryError: ""
    });
  };

  private conditionSelector = (): JSX.Element => {
    const main = (
      <div className="row">
        <div className="col-6">
          <label>Unselected</label>
          <div
            className={`ms-list ${
              this.state.conditionError.length > 0 ? "parsley-error" : ""
            }`}
          >
            {this.state.ebayConditions.map((c, i) => (
              <div
                className="ms-elem-selectable noselect"
                onClick={this.toggleCondition}
                key={i}
                style={{
                  display:
                    this.state.selectedConditions.indexOf(c) > -1
                      ? "none"
                      : "block"
                }}
              >
                {c}
              </div>
            ))}
          </div>
          {this.state.conditionError.length > 0 && (
            <ul className="parsley-errors-list filled">
              <li className="parsley-required">{this.state.conditionError}</li>
            </ul>
          )}
        </div>
        <div className="col-6">
          <label>Selected</label>
          <div
            className={`ms-list ${
              this.state.conditionError.length > 0 ? "parsley-error" : ""
            }`}
          >
            {this.state.ebayConditions.map((c, i) => (
              <div
                className="ms-elem-selectable ms-elem-remove noselect"
                onClick={this.toggleCondition}
                key={i}
                style={{
                  display:
                    this.state.selectedConditions.indexOf(c) > -1
                      ? "block"
                      : "none"
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return main;
  };

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
      conditionError: ""
    });
  };
}

export default EbayFiltersForm;
