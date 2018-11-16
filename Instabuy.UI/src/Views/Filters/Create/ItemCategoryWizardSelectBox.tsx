import * as React from 'react';
import { EbayCategoryLevel, IReduxState, IEbayCategoryModel } from 'src/App/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getChildCategories, addCategoryLevelValue, categoryLevelAltered } from 'src/App/redux/actions/filterActions';

interface IItemCategoryWizardSelectBoxStateProps {
  categoryWizardValues: string[];
  ebayCategoryModels: IEbayCategoryModel[][];
}

interface IItemCategoryWizardSelectBoxDispatchProps {
  getChildCategories: (categoryId: number, level: number) => void;
  setCategoryValue: (categoryName: string, level: number) => void;
  alterCategoryValue: (level: number) => void;
}

interface IItemCategoryWizardSelectBoxInheritedProps {
  categoryLevel: EbayCategoryLevel;
  datalistId: string;
}

type IItemCategoryWizardSelectBox = IItemCategoryWizardSelectBoxInheritedProps & IItemCategoryWizardSelectBoxStateProps & IItemCategoryWizardSelectBoxDispatchProps;

class ItemCategoryWizardSelectBox extends React.Component<IItemCategoryWizardSelectBox> {
  public render() {
    const categoryValues = this.props.ebayCategoryModels[this.props.categoryLevel] == null ? []
     : this.props.ebayCategoryModels[this.props.categoryLevel].map((c, i) => <option key={i} value={c.categoryName}>{c.categoryID}</option>);
    const inputValue = this.props.categoryWizardValues[this.props.categoryLevel];
    return (
      <div>
        <input type="text" className="form-control" list={this.props.datalistId} disabled={categoryValues.length === 0} value={inputValue || ''} onChange={this.onCategoryChange} />
        <datalist id={this.props.datalistId}>
          {categoryValues}
        </datalist>
      </div>
    );
  }

  private onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const categoryObj = this.props.ebayCategoryModels[this.props.categoryLevel].find((c) => c.categoryName === value);
    
    this.props.setCategoryValue(value, this.props.categoryLevel);
    if (categoryObj && !categoryObj.leafCategory && this.props.categoryLevel !== 3) {
      this.props.getChildCategories(categoryObj.categoryID, this.props.categoryLevel + 1);
    } else {
      this.props.alterCategoryValue(this.props.categoryLevel);
    }
  }
}

const mapStateToProps = (state: IReduxState): IItemCategoryWizardSelectBoxStateProps => {
  return {
    categoryWizardValues: state.filterState.createFilterState.ebayCategoryWizardValues,
    ebayCategoryModels: state.filterState.createFilterState.ebayCategoryHierarchy
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IItemCategoryWizardSelectBoxDispatchProps => {
  return {
    getChildCategories: (categoryId: number, level: number) => dispatch<any>(getChildCategories(categoryId, level)),
    setCategoryValue: (categoryName: string, level: number) => dispatch<any>(addCategoryLevelValue(categoryName, level)),
    alterCategoryValue: (level: number) => dispatch<any>(categoryLevelAltered(level))
  };
};

export default connect<IItemCategoryWizardSelectBoxStateProps, IItemCategoryWizardSelectBoxDispatchProps, IItemCategoryWizardSelectBoxInheritedProps>(mapStateToProps, mapDispatchToProps)(ItemCategoryWizardSelectBox);