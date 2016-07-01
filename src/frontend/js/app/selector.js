/**
 * Created by guillaume on 6/24/16.
 */
import {createSelector, createSelectorCreator, defaultMemoize} from 'reselect'
import _ from 'lodash';

const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    _.isEqual
);
