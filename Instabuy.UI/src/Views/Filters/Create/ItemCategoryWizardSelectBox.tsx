import * as React from 'react';
import { IEbayCategoryModel } from 'src/App/index';
import { guid } from 'src/App/common/guid';

interface IItemCategoryWizardSelectBoxInheritedProps {
  onCurrentCategoryChange: (forIndex: number, category: IEbayCategoryModel | null) => void;
  level: number;
  defaultValue?: IEbayCategoryModel;
}

type ItemCategoryWizardSelectBoxProps = IItemCategoryWizardSelectBoxInheritedProps;

interface ItemCategoryWizardSelectBoxState {
  dataListId: string;
  currentCategory: IEbayCategoryModel | null;
  dataList: IEbayCategoryModel[];
  inputVal: string;
}

class ItemCategoryWizardSelectBox extends React.PureComponent<ItemCategoryWizardSelectBoxProps, ItemCategoryWizardSelectBoxState> {
  public constructor(props: ItemCategoryWizardSelectBoxProps) {
    super(props);

    this.state = {
      dataListId: guid(),
      currentCategory: this.props.defaultValue || null,
      dataList: [],
      inputVal: this.props.defaultValue ? this.props.defaultValue.categoryName : ''
    };
  }

  public render() {
    const categoryValues = this.state.dataList.map((c, i) => <option key={i} value={c.categoryName}>{c.categoryID}</option>);

    return (
      <div>
        <input
          type="text"
          className="form-control"
          list={this.state.dataListId}
          disabled={categoryValues.length === 0 && this.state.currentCategory == null && this.props.level !== 0}
          onChange={this.onCategoryChange}
          value={this.state.inputVal}
        />
        <datalist id={this.state.dataListId}>
          {categoryValues}
        </datalist>
      </div>
    );
  }

  private onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryName = e.target.value;
    const selectedCategory = this.state.dataList.find((i) => i.categoryName === categoryName);

    this.props.onCurrentCategoryChange(this.props.level, selectedCategory || null);
    this.setState({
      currentCategory: selectedCategory || null,
      inputVal: e.target.value
    });
  }
}

export default ItemCategoryWizardSelectBox;