import { Layout } from 'antd';
import React from 'react';
import style from './basic.module.less';
import Navigation from '../../components/basic/navigation';
import MainRightLayout from '../mainRightLayout/mainRightLayout';
import Home from '../../pages/home/home';
import Setting from '../../pages/setting/setting';
import User from '../../pages/user/user';
import Search from '../../pages/search/search';
// import { MessageOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route } from "react-router-dom";
const { Sider } = Layout;
class Basic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opacity: 1.0 };
  }
  joinMainRight(mainRight) {
    this.setState()
  }
  render() {
    return (
      <Router>
        <div>
          <Layout className={style.customLayout}>
            <Sider className={style.basicSide} width="66px">
              <Navigation joinMainRight={(mainRight)=>this.joinMainRight(mainRight)}></Navigation>
            </Sider>
            <MainRightLayout>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />

            <Route path="/setting" component={Setting} />
            <Route path="/user" component={User} />
            <Route path="/search" component={Search} />
            </MainRightLayout>
          </Layout>
        </div>
        </Router>
    );
  }
}
export default Basic;
