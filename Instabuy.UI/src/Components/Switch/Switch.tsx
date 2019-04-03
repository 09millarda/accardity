import * as React from 'react';
import Switchery from 'switchery';

interface IProps {
  color: string;
  onChange: (isChecked: boolean) => void;
  default?: boolean;
}

class Switch extends React.PureComponent<IProps> {
  private ref: React.RefObject<HTMLInputElement>;
  public constructor(props: IProps) {
    super(props);

    this.ref = React.createRef<HTMLInputElement>();
  }

  public componentDidMount() {
    if (this.ref.current) {
      // tslint:disable-next-line:no-unused-expression
      new Switchery(this.ref.current, {
        color: this.props.color
      });
      const target = this.ref.current;
      this.ref.current.addEventListener('click', () => alert(target.checked));
    }
  }

  public render() {
    if (this.props.default != null && this.props.default === false) {
      return (
        <input ref={this.ref} type="checkbox" className="js-switch" checked={false} onChange={this.onChange} />
      );  
    }
    return (
      <input ref={this.ref} type="checkbox" className="js-switch" checked={true} onChange={this.onChange} />
    );
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert('test');
    this.props.onChange(e.target.checked);
  }
}

export default Switch;