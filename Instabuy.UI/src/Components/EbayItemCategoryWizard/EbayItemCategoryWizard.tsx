import * as React from 'react';
import ItemCategoryWizardSelectBox from 'src/Views/Filters/Create/ItemCategoryWizardSelectBox';
import { IEbayCategoryModel } from 'src/App/index';
import { getDataUrl } from 'src/App/common/endpointControl';
import { FilterCreateContext } from 'src/App/contexts/FilterCreateContext';

interface IEbayItemCategoryWizardInheritedProps {
  depth: number;
  defaultValues: IEbayCategoryModel[];
  categoryChanged?: (category: IEbayCategoryModel | null) => void;
}

type EbayItemCategoryWizardProps = IEbayItemCategoryWizardInheritedProps;

interface IEbayItemCategoryWizardState {
  wizardBoxes: JSX.Element[];
  wizardBoxRefs: Array<React.RefObject<ItemCategoryWizardSelectBox>>;
}

class EbayItemCategoryWizard extends React.PureComponent<EbayItemCategoryWizardProps, IEbayItemCategoryWizardState> {
  public constructor(props: EbayItemCategoryWizardProps) {
    super (props);

    const wizardBoxes: JSX.Element[] = [];
    const wizardBoxRefs: Array<React.RefObject<ItemCategoryWizardSelectBox>> = [];
    for (let i = 0; i < props.depth; i++) {
      const ref = React.createRef<ItemCategoryWizardSelectBox>();
      const defaultValue = this.props.defaultValues[i];
      wizardBoxes.push((
        <FilterCreateContext.Consumer>
          {
            ({dispatch, refinedFilterHistory}) => {
              const filter = refinedFilterHistory[refinedFilterHistory.length - 1];
              return (
                <ItemCategoryWizardSelectBox ref={ref} level={i} key={i} dispatch={dispatch} dataList={filter.formData.categoryDataLists[i] || [] } onValueChange={this.onValueChange} defaultValue={defaultValue} />
              );
            }
          }
        </FilterCreateContext.Consumer>
      ));
      wizardBoxRefs.push(ref);
    }

    this.state = {
      wizardBoxes,
      wizardBoxRefs
    };
  }

  public async componentDidMount() {
    if (this.props.depth > 0 && this.props.defaultValues.length === 0) {
      await this.fetchChildCategories(0, -1);
    }
  }

  public render() {
    return (
      <div className="row">
        {
          this.state.wizardBoxes.map((e, i) => {
            return (
              <div key={i} className="col-3">
                {e}
              </div>
            );
          })
        }
      </div>
    );
  }

  public clearDataLists = () => {
    for (let i = 0; i < this.props.depth; i++) {
      const ref = this.state.wizardBoxRefs[i];

      if (ref.current) {
        ref.current.setDataList([]);
      }
    }

    this.fetchChildCategories(0, -1);
  }

  public setDataList = (index: number, dataList: IEbayCategoryModel[]) => {
    const ref = this.state.wizardBoxRefs[index];

    if (!ref.current) {
      return;
    }

    ref.current.setDataList(dataList);
  }

  public getAllCategories = (): IEbayCategoryModel[] => {
    const categories: IEbayCategoryModel[] = [];

    for (const ref of this.state.wizardBoxRefs) {
      if (ref.current) {
        const category = ref.current.getSelectedValue();

        if (category) {
          categories.push(category);
        }
      }
    }

    return categories;
  }

  private fetchChildCategories = async (forIndex: number, parentCategoryId: number) => {
    const url = await getDataUrl();
    const res = await fetch(`${url}/ebay/category/${parentCategoryId}`);
    const dataList: IEbayCategoryModel[] = await res.json();

    this.setDataList(forIndex, dataList);
  }

  private resetWizardAfterIndex(index: number) {
    index++;
    for (let i = index; i < this.props.depth; i++) {
      this.setDataList(i, []);
    }
  }

  private onValueChange = async (fromIndex: number, category: IEbayCategoryModel | null) => {
    this.resetWizardAfterIndex(fromIndex);
    if (fromIndex < this.props.depth && category) {
      if (!category.leafCategory) {
        await this.fetchChildCategories(++fromIndex, category.categoryID);
      }
    }

    if (this.props.categoryChanged) {
      if (fromIndex > 0 && !category) {
        fromIndex--;
        const ref = this.state.wizardBoxRefs[fromIndex];

        if (ref.current) {
          const parentCategory = ref.current.getSelectedValue();
          if (parentCategory) {
            category = parentCategory;
          }
        }
      }

      this.props.categoryChanged(category || null);
    }
  }
}

export default EbayItemCategoryWizard;