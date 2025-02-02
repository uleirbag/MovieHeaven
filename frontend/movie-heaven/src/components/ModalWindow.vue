<template>
    <div class="modal-overlay">
      <div class="modal">
        <p>{{ message }}</p>
        <button @click="closeModal">OK</button>
      </div>
    </div>
</template>
  
<script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      default: ''
    }
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }
  
  .modal {
    background-color: #121212;
    padding: 20px 30px;
    border-radius: 8px;
    text-align: center;
  }
  
  .modal p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    color: #fff;
  }
  
  .modal button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #ffdd57;
    color: #1e1e1e;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .modal button:hover {
    background-color: #ffd027;
  }
</style>
  