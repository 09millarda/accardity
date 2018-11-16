import * as React from 'react';
import { IBreadcrumbItem } from 'src/App/index';
import { Link } from 'react-router-dom';

interface IBreadcrumbBarInheritedProps {
  breadcrumbItems: IBreadcrumbItem[];
  title: string;
}

type IBreadcrumbBarProps = IBreadcrumbBarInheritedProps;

class BreadcrumbBar extends React.Component<IBreadcrumbBarProps> {
  public render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-box">
            <h4 className="page-title">{this.props.title}</h4>
            {this.generateBreadcrumbJsx()}
            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  }

  private generateBreadcrumbJsx = (): JSX.Element => {
    const breadcrumbItemList = this.props.breadcrumbItems.map((b, i) => {
      // Active page
      if (i === this.props.breadcrumbItems.length - 1) {
        return (
          <li className="breadcrumb-item active" key={i}>
            {b.name}
          </li>
        );
      }

      return (
        <li className="breadcrumb-item" key={i}>
          <Link to={b.to}>{b.name}</Link>
        </li>
      );
    });

    return (
      <ol className="breadcrumb float-right">
        {breadcrumbItemList}
      </ol>
    );
  }
}

export default BreadcrumbBar;