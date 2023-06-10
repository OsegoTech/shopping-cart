<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import {useProductStore} from "@/stores/ProductStore";
import {useCartStore} from "@/stores/CartStore";
import {ref, reactive} from "vue";

const productStore = useProductStore();
const cartStore = useCartStore();
const history = reactive([])
const doingHistory = ref(false)
history.push(JSON.stringify(cartStore.$state))
const undo = () => {
  if (history.length === 1) return
    doingHistory.value = true
    history.pop()
    cartStore.$state = JSON.parse(history.at(-1))
    doingHistory.value = false
}
cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state))
  }
})
cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError,
}) => {
  if (name === 'addItems'){
    after(() => {
      // describes the action that was performed if successfull
      console.log(args[0])
    })
    onError((error) => {
      console.log('Hello, Error: ', error.message)
    })
  }
})
productStore.fill()


</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
    <AppButton @click="undo">Undo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
