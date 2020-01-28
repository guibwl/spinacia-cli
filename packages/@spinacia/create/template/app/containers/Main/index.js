import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OstLoading } from 'ost-ui';
import { Connect } from './connect';
import './style.less';
import SPINACIA from './SPINACIA.svg';
import pkg from '../../../package.json';
import Version from './components/Version';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    const { actions } = this.props;
    actions.initMainPage();
  }

   abc = async () => {
     console.log(1);

     import('../../../package.json').then(
       (v) => {
         console.log(v);
       }
     );

     await new Promise((r) => r(2))
       .then(console.log);

     console.log(3);
   }


   componentWillMount() {
     this.abc();
   }

   render() {
     const { isFetching } = this.props;
     const { react, redux } = pkg.dependencies;

     return ([
       <OstLoading key='0' isLoading={isFetching} />,
       isFetching
         ? null
         : <div className="Main" key='1'>
           <img src={SPINACIA} alt="" />
           <h2>SPINACIA-REACT</h2>
           <span>react with redux</span>
           <Version
             list={[
               { react },
               { redux },
               { 'react-router': pkg.dependencies['react-router'] }
             ]} />
         </div>
     ]);
   }
}

Main.propTypes = {
  actions: PropTypes.object,
  isFetching: PropTypes.bool
};

export default Connect(Main);
