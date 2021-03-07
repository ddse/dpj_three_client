<template>
  <div class="wrapper" v-attributes="'wrapper'">
    <vs-upload
      :id="getFieldID(schema)"
      type="file"
      :name="schema.inputName"
      @change="onChange"
       @on-success="onSuccess"
      :accept="schema.accept"
      :multiple="schema.multiple"
      :readonly="schema.readonly"
      :required="schema.required"
      
      :action="schema.action" 
    />
  </div>
</template>

<script>
import abstractField from "../abstractField";
import { isFunction } from "lodash";

export default {
  mixins: [abstractField],
  methods: {
    onChange($event) {
      if (isFunction(this.schema.onChanged)) {
        // Schema has defined onChange method.
        this.schema.onChanged.call(this, this.model, this.schema, $event, this);
      }
    },
    onSuccess($event) {
      if (isFunction(this.schema.onSuccess)) {
        // Schema has defined onChange method.
        this.schema.onSuccess.call(this, this.model, this.schema, $event, this);
      }
    },
  },
};
</script>

<style lang="scss">
.vue-form-generator .field-input {
  .wrapper {
    width: 100%;
  }
  .helper {
    margin: auto 0.5em;
  }
}
</style>
