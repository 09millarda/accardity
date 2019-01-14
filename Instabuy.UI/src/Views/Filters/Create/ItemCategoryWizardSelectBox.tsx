import * as React from 'react';
import { IEbayCategoryModel } from 'src/App/index';
import { guid } from 'src/App/common/guid';

interface IItemCategoryWizardSelectBoxInheritedProps {
  level: number;
  onValueChange: (fromIndex: number, category: IEbayCategoryModel | null) => void;
  defaultValue: IEbayCategoryModel | null;
}

type ItemCategoryWizardSelectBoxProps = IItemCategoryWizardSelectBoxInheritedProps;

interface ItemCategoryWizardSelectBoxState {
  dataListId: string;
  dataList: IEbayCategoryModel[];
  selectedValue: string;
}

class ItemCategoryWizardSelectBox extends React.Component<ItemCategoryWizardSelectBoxProps, ItemCategoryWizardSelectBoxState> {
  public constructor(props: ItemCategoryWizardSelectBoxProps) {
    super(props);

    this.state = {
      dataListId: guid(),
      dataList: [],
      selectedValue: ''
   };
  }

  public componentDidMount() {
    this.setState({
      selectedValue: this.props.defaultValue ? this.props.defaultValue.categoryName : ''
    });
  }

  public render() {
    const categoryValues = this.state.dataList.map((c, i) => <option key={i} value={c.categoryName}>{c.categoryID}</option>);

    return (
      <div>
        <input type="text" className="form-control" list={this.state.dataListId} disabled={categoryValues.length === 0} value={this.state.selectedValue} onChange={this.onCategoryChange} />
        <datalist id={this.state.dataListId}>
          {categoryValues}
        </datalist>
      </div>
    );
  }

  public getSelectedValue = (): IEbayCategoryModel | null => {
    const category = this.state.dataList.find((i) => i.categoryName === this.state.selectedValue);

    return category || null;
  }

  public setDataList = (dataList: IEbayCategoryModel[]) => {
    this.setState({
      dataList,
      selectedValue: ''
    });
  }

  private onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const category = this.state.dataList.find((i) => i.categoryName === value);
    this.props.onValueChange(this.props.level, category ? category : null);

    this.setState({
      selectedValue: value
    });
  }
}

export default ItemCategoryWizardSelectBox;