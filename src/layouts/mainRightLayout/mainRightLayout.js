import { Layout } from 'antd';
import React from 'react';

class MainRightLayout extends React.Component {
  render() {
    return (
      <>
        <Layout>{this.props.children}</Layout>
      </>
    );
  }
}
export default MainRightLayout;
