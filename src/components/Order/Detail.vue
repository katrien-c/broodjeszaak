<template>
    <div class="order-detail">
        <h1>Detail van bestelling</h1>
        <div class="text-left mb-4">Besteld door: {{ order.orderedBy }}</div>
        <div v-for="(sandwish, index) in order.sandwishes" :key="index">
            <SandwishDetail :sandwish="sandwish.ingredients" :index="index" :ingredients="ingredients"></SandwishDetail>                            
        </div>
        <div>
            <v-btn @click.prevent="gotoList()">Naar het overzicht</v-btn>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import SandwishDetail from './../Sandwish/Detail'

export default {
    name: 'OrderDetail',
    components: {
        SandwishDetail
    },
    data() {
        return {
            id: this.$route.params.id
        }
    },

    
    created() {
        console.log('loaded')
        this.$store.dispatch('loadIngredients')
        this.$store.dispatch('loadOrder', this.$route.params.id)
    },
    
    methods: {
        gotoList() {
            this.$router.push({ name: 'Order-list' })
        }
    },
    computed: {
        ...mapState([
            'ingredients',
            'order'
        ])
    }


}
</script>