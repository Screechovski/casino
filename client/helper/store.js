export const defaultGettersList = (keys) => {
    const getters = {};

    keys.forEach(key => {
        let normalKey = "get" + key.charAt(0).toUpperCase() + key.slice(1);
        getters[normalKey] = state => state[key]
    });

    return getters;
}

export const defaultMutation = (key) => (state, value) => {
    state[key] = value;
}

export const defaultMutationsList = (keys) => {
    const mitations = {};

    keys.forEach(key => {
        let normalKey = "set" + key.charAt(0).toUpperCase() + key.slice(1);
        mitations[normalKey] = (state, data) => {
            state[key] = data;
        }
    })

    return mitations;
}