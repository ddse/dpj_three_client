<template>
  <Widget
    title="<h5>Table <span class='fw-semi-bold'>Styles</span></h5>"
    customHeader
    settings
    close
  >
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
        <vue-form-generator
          :schema="schema_1"
          :model="model"
          :options="formOptions"
        ></vue-form-generator>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
        <vue-form-generator
          :schema="schema_2"
          :model="model"
          :options="formOptions"
        ></vue-form-generator>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4">
        <vue-form-generator
          :schema="schema_3"
          :model="model"
          :options="formOptions"
        ></vue-form-generator>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-type="flex">
        <vue-form-generator
          :schema="schema_4"
          :model="model"
          :options="formOptions"
        ></vue-form-generator>
      </vs-col>
    </vs-row>
  </Widget>
</template>
<script>
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
  data: (vm) => ({
    model: {
      id: 1,
      name: "John Doe",
      password: "J0hnD03!x4",
      barcode_type: "code128",
      skills: ["Javascript", "VueJS"],
      email: "john.doe@gmail.com",
      status: true,
      product_unit: "",
    },
    schema_1: {
      fields: [
        {
          type: "select",
          label: vm.$t("file.Product Type"),
          model: "product_type",
          values: [
            { id: "standard", name: "Standard" },
            { id: "combo", name: "Combo" },
            { id: "digital", name: "Digital" },
          ],
          noneSelectedText: "Selecting",
        },
        {
          type: "select",
          label: vm.$t("file.Barcode Type"),
          model: "barcode_type",
          values: [
            { id: "code128", name: "Code 128" },
            { id: "combo", name: "Code 39" },
            { id: "digital", name: "UPC-A" },
            { id: "digital", name: "UPC-E" },
            { id: "digital", name: "EAN-8" },
            { id: "digital", name: "EAN-13" },
          ],
          readonly: true,
          disabled: true,
        },
        {
          type: "select",
          label: vm.$t("file.Product Unit"),
          model: "product_unit",
          values: [
            { id: "code128", name: "Code 128" },
            { id: "combo", name: "Code 39" },
            { id: "digital", name: "UPC-A" },
            { id: "digital", name: "UPC-E" },
            { id: "digital", name: "EAN-8" },
            { id: "digital", name: "EAN-13" },
          ],
        },
        {
          type: "input",
          inputType: "text",
          label: vm.$t("file.Product Cost"),
          model: "product_cost",
        },
        {
          type: "select",
          label: vm.$t("file.Product Tax"),
          model: "product_tax",
          values: [
            { id: "vat10", name: "VAT 10" },
            { id: "vat15", name: "VAT 15" },
            { id: "vat20", name: "VAT 20" },
          ],
        },
      ],
      selectOptions: {
        noneSelectedText: "Selecting",
      },
    },
    schema_2: {
      fields: [
        {
          type: "input",
          inputType: "text",
          label: vm.$t("file.Product Name"),
          model: "product_name",
        },
        {
          type: "select",
          label: vm.$t("file.Brand"),
          model: "brand",
          values: [
            { id: "hp", name: "HP" },
            { id: "samsung", name: "Samsung" },
          ],
        },
        {
          type: "select",
          label: vm.$t("file.Sale Unit"),
          model: "product_sale_unit",
          values: [{ id: "meter", name: "Meter" }],
        },
        {
          type: "input",
          inputType: "number",
          label: vm.$t("file.Product Price"),
          model: "product_price",
        },
        {
          type: "select",
          label: vm.$t("file.Tax Method"),
          model: "product_tax_method",
          values: [
            { id: "include", name: vm.$t("file.Include") },
            { id: "excluse", name: vm.$t("file.Exclude") },
          ],
        },
      ],
      selectOptions: {
        noneSelectedText: "Selecting",
      },
    },
    schema_3: {
      fields: [
        {
          type: "input",
          inputType: "text",
          label: vm.$t("file.Product Code"),
          model: "product_code",
          required: true,
        },
        {
          type: "select",
          label: vm.$t("file.Product Category"),
          model: "product_category",
          values: [
            { id: "code128", name: "toy" },
            { id: "combo", name: "Child" },
          ],
        },
        {
          type: "select",
          label: vm.$t("file.Purchase Unit"),
          model: "product_unit",
          values: [{ id: "vat10", name: "meter" }],
        },
        {
          type: "input",
          inputType: "text",
          label: vm.$t("file.Alert Quantity"),
          model: "product_alert_quantiy",
          placeholder: "Your name",
          featured: true,
          required: true,
        },
        {
          type: "checkbox",
          label: vm.$t("file.Featured"),
          model: "product_Featured",
          featured: true,
          required: true,
        },
      ],
      selectOptions: {
        noneSelectedText: "Selecting",
      },
    },
    schema_4: {
      fields: [
        {
          type: "upload",
          label: vm.$t("file.Product Image"),
          model: "product_image",
          action: "https://jsonplaceholder.typicode.com/posts/",
          disabled: false,
          readonly: false,
        },
        {
          type: "editor",
          label: vm.$t("file.Product Description"),
          model: "product_description",
          disabled: false,
          readonly: false,
        },
      ],
    },
    formOptions: {
      validateAfterLoad: true,
      validateAfterChanged: true,
    },
  }),
  computed: {},
  created() {
    this.getList();
  },
  watch: {
    "model.product_unit": (n, c) => {
      console.log(n + "<========" + c);
    },
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