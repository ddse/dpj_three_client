<template>
  <Widget
    title="<h5>Table <span class='fw-semi-bold'>Styles</span></h5>"
    customHeader
    settings
    close
  >
  {{schema}}
    <vue-form-generator
      :schema="schema"
      :model="model"
      :options="formOptions"
    ></vue-form-generator>
    <div>
    <div class="vx-row mb-6">
      <div class="vx-col sm:w-1/3 w-full">
        <span>{{ $t("file.Type") }}</span>
      </div>
      <div class="vx-col sm:w-2/3 w-full">
        <vs-input class="w-full" v-model="input1" />
        <span>standard</span>
      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col sm:w-1/3 w-full">
        <span>{{ $t("file.Product Name") }}</span>
      </div>
      <div class="vx-col sm:w-2/3 w-full">
        <vs-input class="w-full" type="email" v-model="input2" />
        <span>Earphone</span>
      </div>
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Code") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>85415108</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Brand") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>samsung</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Category") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>electronics</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Quantity") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>163</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Unit") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>Piece</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Cost") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>200</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Price") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>250</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Tax") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>N/A</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Tax Method") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>Exclusive</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Alert Quantity") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span>2</span></vs-input
      >
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ $t("file.Product Details") }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" type="email" v-model="input2"
        ><span></span
      ></vs-input>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-2/3 w-full ml-auto">
        <vs-button class="mr-3 mb-2">Submit</vs-button>
        <vs-button
          color="warning"
          type="border"
          class="mb-2"
          @click="
            input1 = input2 = input3 = input4 = input4 = '';
            check1 = false;
          "
          >Reset</vs-button
        >
      </div>
    </div>
    </div>
  </Widget>
</template>
<script>
// import VueDatatable from "@/components/VueDatatable/VueDatatable";
import { productData } from "./mock";
import VueFormGenerator from "@/components/FormGenerator/FormGenrator.vue";
// import Resource from "@/api/resource";
// const categoryResource = new Resource("category");
export default {
  name: "ProductDetail",
  components: {
    // VueDatatable,
    VueFormGenerator,
  },
  data: () => {
    return {
      input1:"aaa",
      input2:"bbb",
      model: {
        id: 1,
        name: "John Doe",
        password: "J0hnD03!x4",
        skills: ["Javascript", "VueJS"],
        email: "john.doe@gmail.com",
        status: true,
      },

      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "ID (disabled text field)",
            model: "id",
            readonly: true,
            disabled: true,
          },
          {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            placeholder: "Your name",
            featured: true,
            required: true,
          },
          {
            type: "input",
            inputType: "password",
            label: "Password",
            model: "password",
            min: 6,
            required: true,
            hint: "Minimum 6 characters",
            // validator: VueFormGenerator.validators.string,
          },
          {
            type: "select",
            label: "Skills",
            model: "skills",
            values: ["Javascript", "VueJS", "CSS3", "HTML5"],
          },
          {
            type: "input",
            inputType: "email",
            label: "E-mail",
            model: "email",
            placeholder: "User's e-mail address",
          },
          {
            type: "checkbox",
            label: "Status",
            model: "status",
            default: true,
          },
        ],
      },

      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data } = productData; //await categoryResource.list(this.listQuery);
      this.list = data.data;
      this.total = data.recordsTotal;
      this.listLoading = false;
    },
  },
};
</script>

<style src="./Product.scss" lang="scss" scoped />