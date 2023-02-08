<template>
  <div class="field">
    <slot></slot>
    <div class="control">
      <div :class="['select', { 'is-danger': error }]">
        <select :value="value" @input="$emit('input', $event.target.value)">
          <slot name="options"></slot>
        </select>
      </div>
    </div>
    <p v-if="error" class="help is-danger">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    error: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ""
    }
  }
};
</script>
