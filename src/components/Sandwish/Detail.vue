<template>
    <div class="sandwish-detail d-flex justify-space-between">
        <div class="ingredients">
            <span v-for="(ingredient, index) in sandwish" :key="index">
                {{ getIngredientName(ingredient) }}
            </span>
        </div>
        <div v-if="price" class="price">&euro; {{ price }} <v-btn v-on:click="removeSandwish(index)">x</v-btn></div>

    </div>
</template>


<script>
export default {
    name: 'SandwishDetail',

    props: {
        ingredients: Array,
        sandwish: Array,
        price: String,
        index: Number
    },

    created() {

    },
    mounted() {

    },
    methods: {
        getIngredientName(id) {
            return this.ingredients.filter(function (item) {  return item.id === id})[0].name
        },
        removeSandwish(index) {
            this.$emit('remove-sandwish', index)
        }
    },
}
</script>