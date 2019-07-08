<template>
  <div class="product">
    <div class="product-title">
      <h1>{{product.name}}</h1>
    </div>
    <div class="product-info">
      <ul class="product-info-list">
        <li class="product-info-item">Brand : <span>{{product.brand}}</span></li>
        <li class="product-info-item">Weight : <span>{{product.weight}}</span></li>
        <li class="product-info-item">Quantity: <span>{{product.quantity}}</span></li>
        <li class="product-info-item">Stock : <span>{{product.stock}}</span></li>
        <li class="product-info-item">Price : <span>{{product.price}}(UAH)</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Product",
    props: ['product']
  }
</script>

<style scoped>
  .product {
    margin:10px auto;
    width: 350px;
    height: 250px;
    box-shadow: 0px 0px 5px 1px rgba(218, 230, 126, 1);
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .product:hover {
    cursor: pointer;
    animation: FadeIn-link 1s linear;
    animation-fill-mode: both;
  }

  @keyframes FadeIn-link {
    0% {

      transform: scale(1);
    }
    40% {

      transform: scale(.9);
    }

    85% {

      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .product-title {
    margin-top: 10px;
    color: skyblue;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .product-info-list {
    margin-left: 1px;
    padding: 20px;
  }

  .product-info-item {
    margin-bottom: 15px;
    text-decoration: none;
    list-style-type: none;
    color: #526488;
    font-size: 18px;
    font-weight: bold;
  }

  .product-info-item span {
    color: #c0b598;
  }
</style>
