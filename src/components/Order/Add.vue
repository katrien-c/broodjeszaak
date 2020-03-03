<template>
    <div class="order-add">
        <h1>Plaats een bestelling</h1>

        <div class="row mt-5">
            <div class="col-12 col-md-6 side">
                <SandwishAdd v-on:add-sandwish="addSandwish" :ingredients="ingredients"></SandwishAdd>
            </div>

            <div class="col-12 col-md-6 side">
                <div class="mt-4">
                    <h2>Broodjes overzicht (in wachtrij)</h2>

                    <v-form v-model="isValid">
                        <v-text-field
                            v-model="name"
                            label="Naam"
                            required
                            :rules="[v => !!v || 'Naam van de besteller is verplicht']"
                        ></v-text-field>

                        <div class="order-queue mt-5" v-if="sandwishes.length > 0">
                            <div class="text-left">
                                <h3>Broodjes klaar om te bestellen</h3>
                            </div>

                            <div v-for="(sandwish, index) in sandwishes" :key="index">
                                <SandwishDetail v-on:remove-sandwish="removeSandwish" :sandwish="sandwish" :index="index" :ingredients="ingredients" :price="prices[index]"></SandwishDetail>
                            </div>

                            <div class="text-right total-price pt-2">
                                Totale prijs : &euro; {{ formatPrice(total_price) }}
                            </div>
                            <div class="text-right pt-4">
                                <v-btn :disabled="!isValid" v-on:click="submitForm()">Bestellen</v-btn>
                            </div>
                        </div>
                    </v-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import SandwishAdd from './../Sandwish/Add'
  import SandwishDetail from './../Sandwish/Detail'

  import { mapState } from 'vuex'

  export default {
    name: 'OrderAdd',
    components: {
        SandwishAdd, 
        SandwishDetail
    },
    props: {
    },
    data: () => ({
        isValid: false,
        name: '',
        sandwishes: [],
        prices: []
    }),
    created () {

    },
    mounted() {
        this.$store.dispatch('loadIngredients')
    },

    methods: {
        addSandwish(sandwish, price) {
            this.sandwishes.push(sandwish)
            this.prices.push(price)
        },
        removeSandwish(index) {
            this.sandwishes.splice(index, 1) 
            this.prices.splice(index, 1)
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2)
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        submitForm() {
            let cleanSandwishes = []
            for (let i = 0; i < this.sandwishes.length; i++) {
                let item = {
                    'ingredients': this.sandwishes[i]
                }
                cleanSandwishes.push(item)
            }
            let order = {
                'orderedBy': this.name,
                'sandwishes': cleanSandwishes
            }
            this.$store.dispatch('addOrder', order)
            this.$router.push('/order/list')
            
        }
    },
    
    computed: {
        ...mapState([
            'ingredients'
        ]),
        total_price() {
            let total = 0;
            for (let i = 0; i < this.prices.length; i++) {
                total += parseFloat(this.prices[i]);
            }
            return total
        }
    }
  }
</script>

<style scoped>
    .side {
        border: 1px solid #fff;
        padding: 1rem;
    }
    .total-price {
        border-top: 1px solid #fff;
        margin-top: 1.5rem;
    }
</style>