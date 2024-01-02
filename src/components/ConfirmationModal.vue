<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="confirm">Yes</button>
      <button @click="cancel">No</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    showModal: Boolean,
    onConfirm: Function,
    onCancel: Function,
  },
  methods: {
    confirm() {
      this.onConfirm();
    },
    cancel() {
      this.onCancel();
    },
  },
};
</script>

<style scoped>
.modal {
    display:block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  width: 30%;
  height: 100px;
  z-index: 1000;
}
body.modal-open {
  overflow: hidden;
}


button {
  margin: 5px;
}
</style>
