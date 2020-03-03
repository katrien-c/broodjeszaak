import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'


Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    ingredients: [],
    orders: []
  },
  
  getters: {

  },
  
  mutations: {
    SET_INGREDIENTS (state, ingredients) {
        state.ingredients = ingredients
    },
    ADD_ORDER(state, order) {
      state.orders.push(order)
    },
    SET_ORDERS (state, orders) {
      state.orders = orders
    },
    SET_ORDER (state, order) {
      state.order = order
    }
  },
  
  actions: {
    loadIngredients ({ commit }) {
        axios
          .get('http://localhost:4000/ingredients')
          .then(r => r.data)
          .then(ingredients => {            
            commit('SET_INGREDIENTS', ingredients)
          })
    },

    addOrder( { commit }, order ) {
        axios
          .post('http://localhost:4001/orders', order)
          .then(r => r.data)
          .then(order => {
            commit('ADD_ORDER', order)
        })
    },

    loadOrders( { commit } ) {
      axios
          .get('http://localhost:4001/orders')
          .then(r => r.data)
          .then(orders => {            
            commit('SET_ORDERS', orders)
          })
    },

    loadOrder( { commit } , id) {
      axios
          .get('http://localhost:4001/orders/'+id)
          .then(r => r.data)
          .then(order => {            
            commit('SET_ORDER', order)
          })
    }
    
  }
});