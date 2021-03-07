<template>
  <div>
    <section>
      <div class="container-fluid">
        <!-- Check permission role add  -->
        <!-- <a href="{{route('purchases.create')}}" class="btn btn-info"
          ><i class="dripicons-plus"></i> {{ trans("file.Add Purchase") }}</a
        >&nbsp;
        <a href="{{url('purchases/purchase_by_csv')}}" class="btn btn-primary"
          ><i class="dripicons-copy"></i> {{ trans("file.Import Purchase") }}</a
        > -->
      </div>

      <div class="table-responsive">
        <vs-table
          ref="table"
          multiple
          v-model="selected"
          pagination
          :max-items="itemsPerPage"
          search
          :data="purchases"
        >
          <div
            slot="header"
            class="flex flex-wrap-reverse items-center flex-grow justify-between"
          >
            <div class="flex flex-wrap-reverse items-center">
              <!-- ACTION - DROPDOWN -->
              <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">
                <div
                  class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32"
                >
                  <span class="mr-2 glyphicon glyphicon-chevron-down"
                    >Actions</span
                  >
                </div>

                <vs-dropdown-menu>
                  <vs-dropdown-item>
                    <span class="flex items-center">
                      <span class="glyphicon glyphicon-trash">Delete</span>
                    </span>
                  </vs-dropdown-item>

                  <vs-dropdown-item>
                    <span class="flex items-center">
                      <span class="glyphicon glyphicon-archive">Archive</span>
                    </span>
                  </vs-dropdown-item>

                  <vs-dropdown-item>
                    <span class="flex items-center">
                      <span class="glyphicon glyphicon-file">Print</span>
                    </span>
                  </vs-dropdown-item>

                  <vs-dropdown-item>
                    <span class="flex items-center">
                      <span class="glyphicon glyphicon-save"
                        >Another Action</span
                      >
                    </span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>

              <!-- ADD NEW -->
              <div
                class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary"
                @click="addNewData"
              >
                <span
                  class="ml-2 text-base text-primary glyphicon glyphicon-plus"
                  >Add New</span
                >
              </div>
            </div>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
              <div
                class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
              >
                <span class="mr-2 glyphicon glyphicon-chevron-down"
                  >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                  {{
                    purchases.length - currentPage * itemsPerPage > 0
                      ? currentPage * itemsPerPage
                      : purchases.length
                  }}
                  of {{ queriedItems }}</span
                >
              </div>
              <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage = 4">
                  <span>4</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 15">
                  <span>15</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 20">
                  <span>20</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <template slot="thead">
            <vs-th>{{ $t("files.image") }}</vs-th>
            <vs-th sort-key="date">{{ $t("files.Date") }}</vs-th>
            <vs-th sort-key="refrence">{{ $t("files.Refrence") }}</vs-th>
            <vs-th sort-key="supplier">{{ $t("files.Supplier") }}</vs-th>
            <vs-th sort-key="purchase_status">{{ $t("files.Purchase Status") }}</vs-th>
            <vs-th sort-key="quantity">{{ $t("files.Grand Total") }}</vs-th>
            <vs-th sort-key="paid">{{ $t("files.Paid") }}</vs-th>
            <vs-th sort-key="due">{{ $t("files.Due") }}</vs-th>
            <vs-th sort-key="payment_status">{{$t("files.Payment Status")}}</vs-th>
            <vs-th>{{ $t("files.action") }}</vs-th>
          </template>

          <template slot-scope="{ data }">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td class="img-container">
                  <!-- <img :src="tr.img" class="product-img" /> -->
                  <div v-html="tr.image"></div>
                </vs-td>

                <vs-td>
                  <p class="product-name font-medium truncate">{{ tr.name }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-code">{{ tr.code }}</p>
                </vs-td>
                <vs-td>
                  <p class="product-brand font-medium truncate">
                    {{ tr.brand }}
                  </p>
                </vs-td>
                <vs-td>
                  <p class="product-category font-medium truncate">
                    {{ tr.category }}
                  </p>
                </vs-td>
                <vs-td>
                  <vs-progress
                    :percent="Number(tr.qty)"
                    :color="getPopularityColor(Number(tr.qty))"
                    class="shadow-md"
                  />
                  <span>{{ tr.qty }}</span>
                </vs-td>

                <vs-td>
                  <p class="product-unit font-medium truncate">{{ tr.unit }}</p>
                </vs-td>

                <vs-td>
                  <p class="product-price">${{ tr.price }}</p>
                </vs-td>

                <!-- <vs-td>
               <vs-chip :color="getOrderStatusColor(tr.order_status)" class="product-order-status">{{ tr.order_status | title }}</vs-chip>
              <vs-chip
                :color="getOrderStatusColor(tr.order_status)"
                class="product-order-status"
                >{{ tr.order_status }}</vs-chip
              >
            </vs-td> -->

                <vs-td class="whitespace-no-wrap">
                  <vs-button
                    color="primary"
                    type="border"
                    @click.stop="editData(tr)"
                    ><span class="glyphicon glyphicon-edit"></span
                  ></vs-button>
                  <vs-button
                    color="primary"
                    type="border"
                    @click.stop="deleteData(tr.id)"
                    ><span
                      data-v-1de05651=""
                      class="glyphicon glyphicon-trash"
                    ></span
                  ></vs-button>

                  <!-- <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
              <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" /> -->
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>
    </section>
  </div>
</template>
<script>
// import DataViewSidebar from './DataViewSidebar.vue'
import modulePurchase from "@/store/purchase/moduleDataPurchase.js";

export default {
  components: {
    // DataViewSidebar
  },
  data() {
    return {
      selected: [],
      // purchases: [],
      itemsPerPage: 4,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    purchases() {
      // console.log(this.$store.state.purchase.purchases);
      return this.$store.state.purchase.purchases;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.purchases.length;
    },
  },
  methods: {
    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    deleteData(id) {
      this.$store.dispatch("purchase/removeItem", id).catch((err) => {
        console.error(err);
      });
    },
    editData(data) {
      // this.sidebarData = JSO N.parse(JSON.stringify(this.blankData))
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    getOrderStatusColor(status) {
      if (status == "on_hold") return "warning";
      if (status == "delivered") return "success";
      if (status == "canceled") return "danger";
      return "primary";
    },
    getPopularityColor(num) {
      if (num > 90) return "success";
      if (num > 70) return "primary";
      if (num >= 50) return "warning";
      if (num < 50) return "danger";
      return "primary";
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    },
  },
  created() {
    if (!modulePurchase.isRegistered) {
      this.$store.registerModule("purchase", modulePurchase);
      modulePurchase.isRegistered = true;
    }
    this.$store.dispatch("purchase/fetchDataPurchaseItems");
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>