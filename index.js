const store = new Proxy({
    state: {
        arr: [],
        count: 0,
        f: {}
    },
    mutations: {
        increment(state, payload) {
            state.count++
        }, 
        setF(state, payload) {
            state.f = payload
        },
    }, 
    // getters:  new Proxy({
    //     getCount: (s) => {
    //         return s.count
    //     }
    // }, {
    //     get: function (t, n) {
    //         switch (true) {
    //             case n in t:
    //             return t[n](store.$state)
    //         }
    //     }
    // })
}, {
    get: function (target, name) {
        const {state, mutations, getters} = target

        switch (true) {
            case (name in state): 
                console.warn(`Its better to use getters for getting the state properties`)
                return state[name]
            case (name === 'getters'): 
                return getters
            case (name === 'commit'):
                return (mutation, payload) => mutations[mutation](state, payload)
            // case name.startsWith('$'):
            //     const n = name.slice(1)
            //     return target[n]
            default:
                console.warn(`Error getting "${name}". There is not such a property`)
                return undefined
        }
    },
    set: function ({state}, name, val) {
        if (state[name]) {
            console.warn('Direct change is forbidden, use commit instead')
            return false
        } else {
            console.warn('There is not such a property ' + name)
            return undefined
        }
    }
})



document.querySelector('button').addEventListener('click', (e) => {
    store.commit('increment')
    
    console.log(store.count);
    // e.target.textContent = store.getters['getCount']
    // console.log(store.getters['getCount']);
    
})
