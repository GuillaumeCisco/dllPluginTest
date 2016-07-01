export default (base, types) => {
    types = types || ['REQUEST', 'SUCCESS', 'FAILURE'];

    return types.reduce((requestTypes, type) => {
        requestTypes[type] = `${base}_${type}`;
        return requestTypes;
    }, {});
};
