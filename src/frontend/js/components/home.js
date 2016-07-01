import React from 'react';
import {connect} from 'react-redux';

const Home = React.createClass({
    render() {
        return <div>
            <h1>Welcome</h1>
        </div>
    }
});


export default connect()(Home);
