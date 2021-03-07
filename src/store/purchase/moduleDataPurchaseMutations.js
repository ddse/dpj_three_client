/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
    ADD_ITEM(state, item) {
        state.purchases.unshift(item)
    },
    SET_PURCHASES(state, purchases) {
        state.purchases = purchases
    },
    // SET_LABELS(state, labels) {
    //   state.eventLabels = labels
    // },
    UPDATE_PURCHASE(state, purchase) {
        const purchaseIndex = state.purchases.findIndex((p) => p.id == purchase.id)
        Object.assign(state.purchases[purchaseIndex], purchase)
    },
    REMOVE_ITEM(state, itemId) {
        const ItemIndex = state.purchases.findIndex((p) => p.id == itemId)
        state.purchases.splice(ItemIndex, 1)
    },
}