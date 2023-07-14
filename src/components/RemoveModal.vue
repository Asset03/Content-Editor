<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    :class="{ show: isRemoveModalOpen }"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmation</h5>
          <button
            type="button"
            class="btn-close"
            @click="isRemoveModalOpen = !isRemoveModalOpen"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you want to remove <strong>{{ index }}</strong
            >?
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="isRemoveModalOpen = !isRemoveModalOpen"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="onClickRemoveItem(index)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from "vue";

export default {
  name: "RemoveModal",
  props: {
    index: {
      type: String,
    },
  },
  setup() {
    const isRemoveModalOpen = inject("isRemoveModalOpen");
    const onClickRemoveItem = inject("onClickRemoveItem");
    return { isRemoveModalOpen, onClickRemoveItem };
  },
};
</script>
