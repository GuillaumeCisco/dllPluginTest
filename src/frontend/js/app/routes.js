import App from './App';
import Home from './../components/home';

export default store => {
    return {
        childRoutes: [{
            path: '/',
            component: App,
            indexRoute: { component: Home },
            childRoutes: [
            ],
        }],
    };
};
