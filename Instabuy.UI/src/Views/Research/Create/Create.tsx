import * as React from 'react';
import BreadcrumbBar from 'src/Layout/BreadcrumbBar/BreadcrumbBar';
import EbayFiltersForm from 'src/Components/FilterForm/EbayFiltersForm';
import { IResearchFilterFormData } from 'src/App/index';

interface IState {
  history: IResearchFilterFormData[];
}

class Create extends React.PureComponent<{}, IState> {
  private formRef: React.RefObject<EbayFiltersForm>;
  public constructor(props: {}) {
    super(props);
    
    this.state = {
      history: [{
        ukListedOnly: false,
        shipToUkOnly: true,
        authorisedSellersOnly: false,
        bestOfferOnly: false,
        gbpCurrencyOnly: false,
        charityListingsOnly: false,
        excludeAutoPay: false,
        featuredOnly: false,
        freeShippingOnly: false,
        getItFastOnly: false,
        hideDuplicateItems: false,
        binOnly: false,
        categories: [],
        excludedCategories: [],
        keywords: '',
        returnsAcceptedOnly: false,
        feedbackMax: '',
        feedbackMin: '',
        priceMax: '',
        priceMin: '',
        selectedConditions: [],
        topRatedSellerOnly: false
      }]
    };

    this.formRef = React.createRef<EbayFiltersForm>();
  }

  public render() {
    const filter = this.state.history.slice()[this.state.history.length - 1];
    return (
      <div className="container-fluid">
        <BreadcrumbBar
          title={'Create Research Filter'}
          breadcrumbItems={[
            {
              name: 'Home',
              to: '/'
            },
            {
              name: 'Research',
              to: '/research'
            },
            {
              name: 'Create',
              to: ''
            }
          ]}
        />
        <div className="row">
          <div className="col-xl-6">
            <div className="card-box">
              <div className="row">
                <div className="col-12">
                  {
                    this.state.history.length > 1 &&
                    <button className="btn btn-sm btn-dark mb-3" onClick={this.goBack}>Undo</button>
                  }
                </div>
              </div>
              <EbayFiltersForm
                ref={this.formRef}
                originalFilter={filter}
              />
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-primary mt-3" onClick={this.submitForm}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private submitForm = () => {
    if (this.formRef.current) {
      const formData = this.formRef.current.state;
      const normalisedForm: IResearchFilterFormData = {
        authorisedSellersOnly: formData.authorisedSellersOnly,
        bestOfferOnly: formData.bestOfferOnly,
        binOnly: formData.binOnly,
        categories: formData.categories,
        charityListingsOnly: formData.charityListingsOnly,
        excludeAutoPay: formData.excludeAutoPay,
        excludedCategories: formData.excludedCategories.split(',').map((c) => c.trim()),
        featuredOnly: formData.featuredOnly,
        freeShippingOnly: formData.freeShippingOnly,
        gbpCurrencyOnly: formData.gbpCurrencyOnly,
        getItFastOnly: formData.getItFastOnly,
        hideDuplicateItems: formData.hideDuplicateItems,
        keywords: formData.keywords,
        priceMax: formData.priceMax,
        priceMin: formData.priceMin,
        returnsAcceptedOnly: formData.returnsAcceptedOnly,
        selectedConditions: formData.selectedConditions,
        shipToUkOnly: formData.shipToUkOnly,
        topRatedSellerOnly: formData.topRatedSellerOnly,
        ukListedOnly: formData.ukListedOnly,
        feedbackMax: formData.feedbackMax,
        feedbackMin: formData.feedbackMin
      };
      this.updateFilter(normalisedForm);
    }
  }

  private goBack = () => {
    if (this.state.history.length > 1) {
      const history = this.state.history.slice();
      history.pop();

      this.setState({
        history
      });
    }
  }

  private updateFilter = (filter: IResearchFilterFormData) => {
    const history = this.state.history.slice();
    history.push(filter);

    this.setState({
      history
    });
  }
}

export default Create;