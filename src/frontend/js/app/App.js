import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {RouteTransition} from 'react-router-transition';
import HelmetTitle from './HelmetTitle';

const App = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    handleSelect(info) {
        this.context.router.push(info.key);
    },
    render() {
        const {children,} = this.props;

        return (
            <div className="app">
                <HelmetTitle />
                <div className="top">
                    <nav>
                        <a href="#" className="title">Project</a>
                    </nav>
                </div>
                <div className="middle">
                    <div className="children">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
});

App.propTypes = {
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signOut: signOutActions.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
