<template>
    <div class="sandwish-add mt-4 p-1">
        <h2>Broodje toevoegen</h2>
        <v-form ref="form" v-model="isValid">
            <v-select
                v-model="sandwish.type"
                :items="types"
                item-text="name"
                item-value="id"
                label="Type"
                required
                v-on:change="calculatePrice"
                :rules="[v => !!v || 'Type sandwish is verplicht']"
            ></v-select>
            <v-select
                v-model="sandwish.topping"
                :items="toppings"
                item-text="name"
                item-value="id"
                label="Topping"
                required
                multiple
                v-on:change="calculatePrice"
                :rules="[v => v.length > 0 || 'Topping is verplicht']"
            ></v-select>
            <v-select
                v-model="sandwish.sauce"
                :items="sauces"
                item-text="name"
                item-value="id"
                label="Saus"
                multiple
                v-on:change="calculatePrice"
            ></v-select>
            <v-checkbox v-model="sandwish.isSmos" class="mx-2" label="Smos" v-on:change="calculatePrice"></v-checkbox>        
            <div class="text-right">
                Totale prijs: &euro; {{ formatPrice(sandwish.total_price) }}
            </div>
            <div class="pt-4 text-right">
                <v-btn :disabled="!isValid" v-on:click="submitForm(selectIngredients, formatPrice(sandwish.total_price))">Toevoegen</v-btn>
            </div>
        </v-form>

    </div>
</template>

<script>

  export default {
    name: 'SandwishAdd',
    props: {
        ingredients: Array

    },
    data: () => ({
        isValid: false,
        sandwish: {
            type: 0,
            topping: [],
            sauce: [],
            smos: 0,
            isSmos: false,
            total_price: 0
        },
        selectIngredients: []
    }),
    created () {
    },
    mounted() {

    },
    methods: {
        calculatePrice() {
            this.selectIngredients = []
            this.sandwish.total_price = 0
            if (this.sandwish.type > 0) {
                this.selectIngredients.push(this.sandwish.type)
                let typeid = parseInt(this.sandwish.type)
                this.sandwish.total_price += this.ingredients.filter(function (item) { return item.id === typeid })[0].price
            }
            if (this.sandwish.topping.length > 0) {
                for (let i = 0; i < this.sandwish.topping.length; i++) {
                   let toppingid = parseInt(this.sandwish.topping[i])
                   this.selectIngredients.push(this.sandwish.topping[i])
                   this.sandwish.total_price += this.ingredients.filter(function (item) { return item.id === toppingid })[0].price
                }
            }  
            if (this.sandwish.sauce.length > 0) {
                for (let i = 0; i < this.sandwish.sauce.length; i++) {
                   let sauceid = parseInt(this.sandwish.sauce[i])
                   this.selectIngredients.push(this.sandwish.sauce[i])
                   this.sandwish.total_price += this.ingredients.filter(function (item) { return item.id === sauceid })[0].price
                }
            } 
            if (this.sandwish.isSmos) {
                this.selectIngredients.push(this.smos[0].id)
                this.sandwish.total_price += this.smos[0].price
            }            
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2)
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        submitForm(sandwish, price_sandwish) {
            this.$emit('add-sandwish', sandwish, price_sandwish)
            this.$refs.form.reset()
        }
    },
    computed: {
        types() {
            return this.ingredients.filter(function (item) {  return item.type === "bread"});
        },
        toppings() {
            return this.ingredients.filter(function (item) {  return item.type === "topping"});
        },
        sauces() {
            return this.ingredients.filter(function (item) {  return item.type === "sauce"});
        },
        smos() {
            return this.ingredients.filter(function (item) {  return item.type === "smos"});
        }
    }
  }
</script>