import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import routesFactory from './routes';

// For using browserHistory with amazon s3, we need our own domain name (for not impacting customer and record)
// and a custom routerHistory
// http://stackoverflow.com/questions/16267339/s3-static-website-hosting-route-all-paths-to-index-html
//
// In the Edit Redirection Rules section of the S3 Console for your domain, add the following rules:
//
//     <RoutingRules>
//         <RoutingRule>
//             <Condition>
//                 <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
//             </Condition>
//             <Redirect>
//                 <HostName>domain.com</HostName>
//                 <ReplaceKeyPrefixWith>#/</ReplaceKeyPrefixWith>
//             </Redirect>
//         </RoutingRule>
//     </RoutingRules

// import { Router, useRouterHistory } from 'react-router';
// import { createHistory } from 'history';
//
// const history = useRouterHistory(createHistory)();
//
// history.listen(function (location) {
//     const path = (/#(\/.*)$/.exec(location.hash) || [])[1];
//     if (path) history.replace(path);
// });


const Root = ({store}) => {
    const history = syncHistoryWithStore(hashHistory, store);
    const routes = routesFactory(store);

    return (
        <Provider {...{store}}>
            <Router {...{history, routes}} />
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
