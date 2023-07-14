<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    :class="{ show: isPropertyModalOpen }"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Property</h5>
          <button
            type="button"
            class="btn-close"
            @click="isPropertyModalOpen = !isPropertyModalOpen"
          ></button>
        </div>
        <div class="modal-body">
          <!-- write here -->
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Key</span>
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              v-model="newKey"
            />
          </div>
          <div class="input-group input-group-sm mb-3">
            <select
              class="form-select"
              @change="isObjectOrString"
              aria-label="Default select example"
            >
              <option selected value="Value">Value</option>
              <option value="Object">Object</option>
            </select>
          </div>
          <div v-if="isString" class="input-group input-group-sm mb-3">
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              v-model="newValue"
            />
          </div>
        </div>
        <!-- write  -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="isPropertyModalOpen = !isPropertyModalOpen"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="onClickAddProperty"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, inject } from "vue";
export default {
  name: "AddProperty",
  props: {
    data: {
      type: Object,
      required: true,
    },
    index: {
      type: String,
    },
  },
  setup(props) {
    const isString = ref(true);
    const isPropertyModalOpen = inject("isPropertyModalOpen");
    const newKey = ref("");
    const newValue = ref("");

    const isObjectOrString = (event) => {
      if (event.target.value == "Value") {
        isString.value = true;
      } else {
        isString.value = false;
      }
    };

    const onClickAddProperty = () => {
      isPropertyModalOpen.value = false;
      if (isString.value) {
        props.data[props.index][newKey.value] = newValue.value;
      } else {
        const newObject = { [newKey.value]: {} };
        props.data[props.index] = { ...props.data[props.index], ...newObject };
      }
    };
    return {
      isPropertyModalOpen,
      isObjectOrString,
      isString,
      newKey,
      newValue,
      onClickAddProperty,
    };
  },
};
</script>
