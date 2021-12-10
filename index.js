const store = new Proxy({
    state: {
        arr: [],
        count: '',
        f: {}
    },
    mutations: {
        increment(state, payload) {
            state.count = state.count++
        }, 
        setF(state, payload) {
            state.f = payload
        },
    }
}, {
    get: function (target, name) {
        const {state, mutations} = target

        if (name in state) {
            return state[name]
        } else if (name === 'commit') {
            return (mutation, payload) => mutations[mutation](state, payload)
        } else {
            console.warn(`Error getting ${name}. There is not such a property`)
            return undefined
        }
    },
    set: function ({state}, name, val) {
        if (state[name]) {
            console.warn('Direct change is impossible, use commit instead')
            return false
        } else {
            console.warn('There is not such a property ' + name)
            return undefined
        }
    }
})
