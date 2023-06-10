<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import {useProductStore} from "@/stores/ProductStore";
import {useCartStore} from "@/stores/CartStore";

const productStore = useProductStore();
const cartStore = useCartStore();
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
