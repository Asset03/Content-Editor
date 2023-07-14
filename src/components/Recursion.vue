<template>
  <div class="mt-3 mb-3 ps-5" v-for="(item, index) in data" :key="index">
    <!-- if(Object) -->
    <div v-if="isObject(data[index])">
      <div class="d-flex align-items-center">
        <button
          class="toggle btn btn-sm btn-light"
          @click="toggleObject(data[index])"
        >
          <i
            :class="[
              'fa-solid ',
              isObjectOpen(data[index]) ? 'fa-minus' : 'fa-plus',
            ]"
          ></i>
        </button>
        <div class="hidden d-flex align-items-center">
          <strong :contenteditable="isKeyEditable(index)">{{ index }}:</strong>
          <span
            class="ms-2 text-decoration-underline"
            v-if="!isObjectOpen(data[index]) && !isEmpty(item)"
            >{...}</span
          >
          <span class="empty ms-2" v-if="isEmpty(item)">Empty Object</span>

          <div class="actions d-flex align-items-center">
            <a class="ms-2" @click="onClickEditableKey(index)"
              ><i class="fa-solid fa-key"></i
            ></a>
            <a class="ms-2" @click="isPropertyModalOpen = !isPropertyModalOpen"
              ><i class="fa-solid fa-circle-plus"></i
            ></a>
            <AddProperty :index="index" :data="data" />
            <a class="ms-2" @click="isRemoveModalOpen = !isRemoveModalOpen"
              ><i class="fa-solid fa-trash"></i
            ></a>
            <RemoveModal :index="index" />
            <div class="dropdown ms-2">
              <button
                class="btn btn-sm btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ isObject(data[index]) ? "Object" : "String" }}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" @click="transform(index)">{{
                    isObject(data[index]) ? "String" : "Object"
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
          <!--  -->
        </div>
        <!--  -->
      </div>
      <Recursion v-if="isObjectOpen(data[index])" :data="data[index]" />
    </div>
    <!-- if(String) -->

    <div v-else>
      <div class="hidden d-flex align-items-center">
        <strong :contenteditable="isKeyEditable(index)">{{ index }}:</strong>
        <span
          class="ms-2 text-decoration-underline"
          v-if="!isEmpty(item)"
          :contenteditable="isValueEditable(index)"
          >{{ item }}</span
        >
        <span class="empty ms-2" v-else>Empty String</span>
        <div class="actions d-flex align-items-center">
          <a class="ms-2" @click="onClickEditableKey(index)"
            ><i class="fa-solid fa-key"></i
          ></a>
          <a class="ms-2" @click="onClickEditableValue(index)"
            ><i class="fa-solid fa-pen-to-square"></i
          ></a>
          <a class="ms-2" @click="isRemoveModalOpen = !isRemoveModalOpen"
            ><i class="fa-solid fa-trash"></i
          ></a>
          <RemoveModal :index="index" />
          <div class="dropdown ms-2">
            <button
              class="btn btn-sm btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ isObject(data[index]) ? "Object" : "String" }}
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click="transform(index)">{{
                  isObject(data[index]) ? "String" : "Object"
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
  </div>
</template>
<script>
import Recursion from "@/components/Recursion.vue";
import RemoveModal from "@/components/RemoveModal.vue";
import AddProperty from "./AddProperty.vue";

import { ref, computed, watch, provide } from "vue";
export default {
  name: "Recursion",
  components: {
    Recursion,
    RemoveModal,
    AddProperty,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const openNodes = ref([]);
    const editKeys = ref([]);
    const isRemoveModalOpen = ref(false);
    const isPropertyModalOpen = ref(false);
    const editValues = ref([]);

    const isObject = (val) => {
      return typeof val === "object";
    };

    const toggleObject = computed(() => (node) => {
      if (isObjectOpen(node)) {
        openNodes.value = openNodes.value.filter((n) => n !== node);
      } else {
        openNodes.value.push(node);
      }
    });

    const isObjectOpen = (node) => {
      return openNodes.value.includes(node);
    };

    const transform = (node) => {
      if (isObject(props.data[node])) {
        props.data[node] = "";
      } else {
        props.data[node] = {};
      }
    };

    const isKeyEditable = (index) => {
      return editKeys.value[index];
    };

    const onClickEditableKey = (index) => {
      editKeys.value[index] = !editKeys.value[index];
    };

    const isValueEditable = (index) => {
      return editValues.value[index];
    };

    const onClickEditableValue = (index) => {
      editValues.value[index] = !editValues.value[index];
    };

    const onClickRemoveItem = (index) => {
      isRemoveModalOpen.value = false;
      delete props.data[index];
    };

    const isEmpty = (node) => {
      return node == "" || Object.keys(node).length == 0;
    };

    watch(props, (newValue) => {
      console.log("NEW: ", newValue);
      // post method to write-file
    });

    provide("isRemoveModalOpen", isRemoveModalOpen);
    provide("onClickRemoveItem", onClickRemoveItem);
    provide("isPropertyModalOpen", isPropertyModalOpen);

    return {
      isObject,
      toggleObject,
      isObjectOpen,
      transform,
      isEmpty,
      isKeyEditable,
      isValueEditable,
      onClickEditableKey,
      onClickEditableValue,
      onClickRemoveItem,
      isRemoveModalOpen,
      isPropertyModalOpen,
    };
  },
};
</script>
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
* {
  height: max-content;
}
.actions {
  opacity: 0;
}
.hidden:hover .actions {
  opacity: 1;
}
.modal {
  display: none;
}
.modal.show {
  display: block;
}
.empty {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 2px 12px;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
</style>
