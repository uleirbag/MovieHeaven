<template>
    <div class="cinema-bar">
      <h2>Cinema Bar</h2>

      <div class="product-category" v-for="(category, index) in products" :key="index">
       
        <h3>{{ category.category }}</h3>
       
        <div class="product-options">
          <div v-for="(option, i) in category.options" :key="i" class="product-option">
           
            <div class="option-details">
              <span class="option-name">{{ option.name }}</span>
              <span class="option-price">({{ option.price }} RON)</span>
            </div>

            <div class="option-quantity">
              <label>Nr. buc:</label>
              <input type="number"
                     v-model.number="order[category.category][option.name]"
                     min="0"
                     :max="maxQuantity" />
            </div>
          </div>
        </div>
      </div>
      <button class="confirm-button" @click="confirmOrder">Confirmă comanda</button>
    </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { defineEmits } from 'vue';

  const emit = defineEmits(['updateCinemaBarOrder']);
  
  const maxQuantity = 10; 
  
  const products = ref([
    {
      category: 'Popcorn',
      options: [
        { name: 'Mic - 100g', price: 10 },
        { name: 'Mediu - 150g', price: 15 },
        { name: 'Mare - 200g', price: 20 }
      ]
    },
    {
      category: 'Nachos',
      options: [
        { name: 'Nachos + sos salsa', price: 12 },
        { name: 'Nachos + sos branza', price: 12 }
      ]
    },
    {
      category: 'Snack-uri',
      options: [
        { name: 'Snickers', price: 8 },
        { name: 'Mars', price: 8 },
        { name: 'Bounty', price: 9 }
      ]
    },
    {
      category: 'Băuturi (0.5l)',
      options: [
        { name: 'Coca Cola', price: 8 },
        { name: 'Fanta', price: 7 },
        { name: 'Sprite', price: 7 },
        { name: 'Cappy Pulpy Piersică', price: 5 },
        { name: 'Apă plată Dorna', price: 5 }
      ]
    }
  ]);

  //initializam comanda cu toate valorile 0
  const order = reactive({});
  products.value.forEach(cat => {
    order[cat.category] = {};
    cat.options.forEach(option => {
      order[cat.category][option.name] = 0;
    });
  });
  
  const confirmOrder = () => {
    const orderSummary = {};
    for (const category in order) {
      const items = [];
      for (const product in order[category]) {
        const qty = order[category][product];
        if (qty > 0) {
          items.push({ product, quantity: qty });
        }
      }
      if (items.length > 0) {
        orderSummary[category] = items;
      }
    }
    console.log('Ati comandat de la Cinema Bar:', orderSummary);
    emit('updateCinemaBarOrder', orderSummary);
  };
  </script>
  
<style scoped>
  .cinema-bar {
    background-color: #222;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin: 20px auto;
    max-width: 800px;
  }
  
  .cinema-bar h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .product-category {
    margin-bottom: 20px;
    text-align: start;
  }
  
  .product-category h3 {
    border-bottom: 1px solid #444;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
  
  .product-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .product-option {
    background-color: #333;
    padding: 10px;
    border-radius: 5px;
    flex: 1 1 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .option-details {
    display: flex;
    flex-direction: column;
  }
  
  .option-name {
    font-weight: bold;
  }
  
  .option-price {
    font-size: 0.9rem;
    color: #ffdd57;
  }
  
  .option-quantity {
    display: flex;
    align-items: center;
  }
  
  .option-quantity label {
    margin-right: 5px;
  }
  
  .option-quantity input {
    width: 50px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #555;
    background-color: #444;
    color: #fff;
  }
  
  .confirm-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #ffdd57;
    color: #1e1e1e;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .confirm-button:hover {
    background-color: #ffd027;
  }
</style>
  