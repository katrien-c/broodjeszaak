<template>
    <div class="order-list">
        <h1>Lijst van bestellingen</h1>
        <v-simple-table class="my-4">
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Besteld door</th>
                    <th class="text-left">Aantal</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" :key="index">
                    <td class="text-left">{{ order.id }}</td>
                    <td class="text-left">{{ order.orderedBy }}</td>
                    <td class="text-left">{{ order.sandwishes.length }}</td>
                    <td class="text-right"><v-btn @click.prevent="gotoDetail(order.id)">details</v-btn></td>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>

<script>

  import { mapState } from 'vuex'

  export default {
    name: 'OrderList',
    components: {

    },
    props: {
    },
    data: () => ({
    }),
    created () {
        this.$store.dispatch('loadOrders')
    },
    mounted() {
        
    },

    methods: {
        gotoDetail(id) {
            this.$router.push({ name: 'Order-detail', params: {id} })
        }
    },
    
    computed: {
        ...mapState([
            'orders'
        ])
    }
  }
</script>