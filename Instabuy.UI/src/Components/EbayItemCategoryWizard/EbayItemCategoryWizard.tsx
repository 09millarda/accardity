import * as React from 'react';
import ItemCategoryWizardSelectBox from 'src/Views/Filters/Create/ItemCategoryWizardSelectBox';
import { IEbayCategoryModel } from 'src/App/index';
import { getDataUrl } from 'src/App/common/endpointControl';

interface IEbayItemCategoryWizardInheritedProps {
  depth: number;
  defaultValues: IEbayCategoryModel[];
  categoryChanged?: (categories: IEbayCategoryModel[]) => void;
}

type EbayItemCategoryWizardProps = IEbayItemCategoryWizardInheritedProps;

interface IEbayItemCategoryWizardState {
  wizardSelectBoxes: JSX.Element[];
  wizardSelectBoxRefs: Array<React.RefObject<ItemCategoryWizardSelectBox>>;
}

class EbayItemCategoryWizard extends React.PureComponent<EbayItemCategoryWizardProps, IEbayItemCategoryWizardState> {
  public constructor(props: EbayItemCategoryWizardProps) {
    super (props);

    const wizardBoxes: JSX.Element[] = [];
    const wizardBoxRefs: Array<React.RefObject<ItemCategoryWizardSelectBox>> = [];
    for (let i = 0; i < this.props.depth; i++) {
      const wizardBoxRef = React.createRef<ItemCategoryWizardSelectBox>();
      wizardBoxes.push(
        <div className="col-3">
          <ItemCategoryWizardSelectBox
            level={i}
            key={i}
            onCurrentCategoryChange={this.onValueChange}
            ref={wizardBoxRef}
          />
        </div>
      );
      wizardBoxRefs.push(wizardBoxRef);
    }

    this.state = {
      wizardSelectBoxRefs: wizardBoxRefs,
      wizardSelectBoxes: wizardBoxes
    };
  }

  public async componentDidMount() {
    this.resetWizard();
    for (let i = 0; i < this.props.defaultValues.length; i++) {
      const ref = this.state.wizardSelectBoxRefs[i];
      if (ref != null && ref.current) {
        const defaultValue = this.props.defaultValues[i];

        ref.current.setState({
          currentCategory: defaultValue,
          inputVal: defaultValue.categoryName
        });
      }
    }

    const lastCategory = this.props.defaultValues[this.props.defaultValues.length - 1];
    if (lastCategory != null) {
      await this.fetchChildCategories(this.props.defaultValues.length, lastCategory.categoryID);
    } else {
      await this.fetchChildCategories(0, -1);
    }    
  }

  public async componentWillReceiveProps(nextProps: EbayItemCategoryWizardProps) {
    const refs = this.state.wizardSelectBoxRefs;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];

      if (ref.current) {
        if (nextProps.defaultValues[i]) {
          const category = nextProps.defaultValues[i];
          ref.current.setState({
            currentCategory: category,
            inputVal: category.categoryName
          });
        } else {
          ref.current.setState({
            currentCategory: null,
            inputVal: '',
            dataList: []
          });
        }
      }
    }

    const lastCategory = nextProps.defaultValues[nextProps.defaultValues.length - 1];
    if (lastCategory != null) {
      if (!lastCategory.leafCategory) {
        await this.fetchChildCategories(nextProps.defaultValues.length, lastCategory.categoryID);
      }      
    } else {
      await this.fetchChildCategories(0, -1);
    }
  }

  public render() {
    return (
      <div className="row">
        {
          this.state.wizardSelectBoxes
        }
      </div>
    );
  }

  public resetWizard = () => {
    this.state.wizardSelectBoxRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.setState({
          dataList: [],
          inputVal: '',
          currentCategory: null
        });
      }
    });

    this.fetchChildCategories(0, -1);
  }

  public setDataListAndClearValue = (index: number, dataList: IEbayCategoryModel[]) => {
    const ref = this.state.wizardSelectBoxRefs[index];

    if (ref != null && ref.current) {
      ref.current.setState({
        dataList,
        inputVal: '',
        currentCategory: null
      });
    }
  }

  public getAllCategories = (): IEbayCategoryModel[] => {
    const categories: IEbayCategoryModel[] = [];

    this.state.wizardSelectBoxRefs.forEach((ref) => {
      if (ref.current && ref.current.state.currentCategory != null) {
        categories.push(ref.current.state.currentCategory);
      }
    });

    return categories;
  }

  private fetchChildCategories = async (forIndex: number, parentCategoryId: number) => {
    const url = await getDataUrl();
    const res = await fetch(`${url}/ebay/category/${parentCategoryId}`);
    const dataList: IEbayCategoryModel[] = await res.json();

    this.setDataListAndClearValue(forIndex, dataList);
  }

  private resetWizardAfterIndex(index: number) {
    index++;
    for (let i = index; i < this.props.depth; i++) {
      this.setDataListAndClearValue(i, []);
    }
  }

  private onValueChange = async (fromIndex: number, category: IEbayCategoryModel | null) => {
    this.resetWizardAfterIndex(fromIndex);
    if (fromIndex < this.props.depth && category) {
      if (this.props.categoryChanged) {
        const categories = this.getAllCategories();
        categories.push(category);
        this.props.categoryChanged(categories);
      }
    }
  }
}

export default EbayItemCategoryWizard;