const spinner = {
    namespaced: true,
    state: () => ({
        transitionClassState: false,
        transformClassState: false,
        colorsArray: [],
    }),
    getters: {
        transitionClass: state => state.transitionClassState,
        transformClass: state => state.transformClassState,
        colorsArray: state => state.colorsArray,
    },
    mutations: {
        setTransitionClass(state, value){
            state.transitionClassState = value;
        },
        setTransformClass(state, value){
            state.transformClassState = value;
        },
        setColorsArray(state, arr){
            state.colorsArray = arr;
        }
    },
    actions: {
        startSpin(context, data){
            const { color, colorsLine } = data;

            context.commit('setColorsArray', colorsLine);
            context.dispatch('resetSpinner');
            setTimeout(()=>{
                context.commit('setTransitionClass', true);
            }, 2)
            setTimeout(()=>{
                context.commit('setTransformClass', true);
            }, 4)
        },
        resetSpinner(context){
            context.commit('setTransitionClass', false);
            context.commit('setTransformClass', false);
        }
    }
}

export default spinner;