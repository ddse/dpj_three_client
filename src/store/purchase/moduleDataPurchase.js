import state from './moduleDataPurchaseState.js'
import mutations from './moduleDataPurchaseMutations.js'
import actions from './moduleDataPurchaseActions.js'
import getters from './moduleDataPurchaseGetters.js'

export default {
    isRegistered: false,
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}