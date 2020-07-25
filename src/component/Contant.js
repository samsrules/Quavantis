import React from 'react';
import Leftcorner from './Leftcorner';
import Footer from './Footer';
import Login from './Login';


class Contant extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            {/* <Leftcorner />  */}
          <div id="content-wrapper" className="d-flex flex-column">
                {/* <Content /> */}
                  <Login />  
                {this.props.children}
                
          </div>
        </React.Fragment>);
    }
}

export default Contant;