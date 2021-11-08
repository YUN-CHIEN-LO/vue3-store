<template>
  <div class="item">
    <img :src="'https://s1.lativ.com.tw/' + props.img" alt="" />
    <p>{{ props.title }}</p>
    <p>{{ props.price }}</p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    title: String,
    price: [String, Number],
    img: String,
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="scss">
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  margin: 10px 0px;
  & img {
    width: 100%;
    margin-bottom: 10px;
  }
  & p {
    margin: 5px;
  }
}
</style>
