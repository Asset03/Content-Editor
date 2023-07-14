<template>
  <div class="container">
    ``
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" href="#">en-EN</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">kz-KZ</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">ru-RU</a>
      </li>
    </ul>
    <Recursion :data="jsonData" />
  </div>
</template>
<script>
import Recursion from "./Recursion.vue";
import { ref, onMounted, watch } from "vue";

export default {
  name: "HelloWorld",
  components: {
    Recursion,
  },
  setup() {
    const jsonData = ref([]);

    onMounted(() => {
      fetchData();
    });

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/read-file");
        if (!response.ok) {
          throw new Error("Error while Fetching");
        }
        const data = await response.json();
        jsonData.value = data;
      } catch (error) {
        console.log(error);
      }
    };
    return { jsonData };
  },
};
</script>
