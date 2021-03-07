import axios from "@/axios.js"

export default {
    addItem({ commit }, item) {
        return new Promise((resolve, reject) => {
            axios.post("/api/purchases/", { item: item })
                .then((response) => {
                    commit('ADD_ITEM', Object.assign(item, { id: response.data.id }))
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    fetchDataPurchaseItems({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get("/api/purchases")
                .then((response) => {
                    commit('SET_PURCHASES', response.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    // fetchEventLabels({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     axios.get("/api/apps/calendar/labels")
    //       .then((response) => {
    //         commit('SET_LABELS', response.data)
    //         resolve(response)
    //       })
    //       .catch((error) => { reject(error) })
    //   })
    // },
    updateItem({ commit }, item) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/purchases/${item.id}`, { item: item })
                .then((response) => {
                    commit('UPDATE_PURCHASE', response.data)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    removeItem({ commit }, itemId) {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/purchases/${itemId}`)
                .then((response) => {
                    commit('REMOVE_ITEM', itemId)
                    resolve(response)
                })
                .catch((error) => { reject(error) })
        })
    },
    // eventDragged({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     axios.post(`/api/apps/calendar/event/dragged/${payload.event.id}`, {payload: payload})
    //       .then((response) => {

    //         // Convert Date String to Date Object
    //         let event = response.data
    //         event.startDate = new Date(event.startDate)
    //         event.endDate = new Date(event.endDate)

    //         commit('UPDATE_EVENT', event)
    //         resolve(response)
    //       })
    //       .catch((error) => { reject(error) })
    //   })
    // },
}