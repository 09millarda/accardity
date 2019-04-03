import * as React from 'react';
import { WithContext as Tags } from 'react-tag-input';

interface IProps {
  setTags: (tags: string[]) => void;
}

interface IState {
  tags: string[];
}

class TagsInput extends React.PureComponent<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      tags: []
    };
  }

  public render() {
    return (
      <Tags
        handleAddition={this.handleAddition}
        handleDelete={this.handleDeletion}
      />
    );
  }

  private handleAddition = (t: any) => {
    if (this.state.tags.indexOf(t.text) === -1) {
      const tags = this.state.tags.slice();
      tags.push(t.text);
      this.setState({
        tags
      });
    }
  };

  private handleDeletion = (t: any) => {
    if (this.state.tags.indexOf(t.text) > -1) {
      const tags = this.state.tags.slice();
      tags.splice(this.state.tags.indexOf(t.text), 1);
      this.setState({
        tags
      });
    }
  }
}

export default TagsInput;