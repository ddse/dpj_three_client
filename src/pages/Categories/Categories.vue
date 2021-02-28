<template>
  <section>
    <div class="container-fluid">
      <vs-button
        color="rgb(11, 189, 135)"
        type="border"
        @click="
          statusPopup = true;
          contentPopup = 'create';
        "
        >{{ $t("file.Add Category") }}</vs-button
      >
      <vs-button
        color="rgb(11, 189, 135)"
        type="border"
        @click="
          statusPopup = true;
          contentPopup = 'import';
        "
        >{{ $t("file.Import Category") }}</vs-button
      >
    </div>
    <Widget
      title="<h5>Table <span class='fw-semi-bold'>Styles</span></h5>"
      customHeader
      settings
      close
    >
      <h3>Stripped <span class="fw-semi-bold">Table</span></h3>
      <p>
        Each row is highlighted. You will never lost there. Just
        <code>.table-striped</code> it.
      </p>

      <vue-datatable
        :data="list"
        colHeight="85"
        :common="listQuery"
        max-row-scroll="5"
        :paging="true"
      >
        <table-column :label="$t('file.Id')" prop="id"> </table-column>
        <table-column :label="$t('file.Image')" prop="image" width="250">
        </table-column>
        <template slot="image" slot-scope="slotPops">
          <div v-html="slotPops.row[slotPops.column]"></div>
        </template>
        <table-column :label="$t('file.category')" prop="name"> </table-column>
        <!-- <table-column
          label="氏 名"
          prop="image"
          width="250"
          :prefix="{ class: 'account_name' }"
          :renderCell="
            (self, data) => {
              //console.log(data.row);
              return 'aaa';//data.row[data.column]['name'];
            }
          "
          :tooltip="true"
        >
        </table-column> -->
      </vue-datatable>
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="not-exported"></th>
            <th>{{ $t("file.Image") }}</th>
            <th>{{ $t("file.category") }}</th>
            <th>{{ $t("file.Parent Category") }}</th>
            <th>{{ $t("file.Number of Product") }}</th>
            <th>{{ $t("file.Stock Quantity") }}</th>
            <th>{{ $t("file.Stock Worth (Price/Cost)") }}</th>
            <th class="not-exported">{{ $t("file.action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="abc-checkbox">
                <input
                  type="checkbox"
                  id="checkbox2"
                  :checked="checkboxes1[1]"
                  @change="(event) => changeCheck(event, 'checkboxes1', 1)"
                />
                <label for="checkbox2" />
              </div>
            </td>
            <td>Mark</td>
            <td>Otto</td>
            <td><b-badge variant="success">Online</b-badge></td>
          </tr>
          <tr>
            <td>
              <div class="abc-checkbox">
                <input
                  type="checkbox"
                  id="checkbox3"
                  :checked="checkboxes1[2]"
                  @change="(event) => changeCheck(event, 'checkboxes1', 2)"
                />
                <label for="checkbox3" />
              </div>
            </td>
            <td>
              Jacob
              <b-badge variant="warning" class="text-gray-dark">ALERT!</b-badge>
            </td>
            <td>Thornton</td>
            <td><b-badge variant="gray">Away</b-badge></td>
          </tr>
          <tr>
            <td>
              <div class="abc-checkbox">
                <input
                  type="checkbox"
                  id="checkbox4"
                  :checked="checkboxes1[3]"
                  @change="(event) => changeCheck(event, 'checkboxes1', 3)"
                />
                <label for="checkbox4" />
              </div>
            </td>
            <td>Larry</td>
            <td>the Bird</td>
            <td><b-badge variant="danger">Construct</b-badge></td>
          </tr>
        </tbody>
      </table>
    </Widget>
    <!--  <div class="table-responsive">
      <table id="category-table" class="table" style="width: 100%">
        <thead>
          <tr>
            <th class="not-exported"></th>
            <th>{{ $t("file.Image") }}</th>
            <th>{{ $t("file.category") }}</th>
            <th>{{ $t("file.Parent Category") }}</th>
            <th>{{ $t("file.Number of Product") }}</th>
            <th>{{ $t("file.Stock Quantity") }}</th>
            <th>{{ $t("file.Stock Worth (Price/Cost)") }}</th>
            <th class="not-exported">{{ $t("file.action") }}</th>
          </tr>
        </thead>
      </table>
    </div> -->
    <modal
      ref="modalCompo"
      id="modalCompo"
      v-if="statusPopup"
      @close="backProcess"
      :title="$t('file.Add Category')"
      :fit-parent="true"
      :width="800"
      :height="600"
    >
      <h2 slot="header"></h2>
      <div slot="body">
        <vx-card title="Default" code-toggler>
          <p>
            You can upload files to the server with the
            <code>vs-upload</code> component, the requested parameter is
            <code>action</code> which is the URL of the server
          </p>

          <vs-alert
            color="primary"
            icon="new_releases"
            active="true"
            class="mt-5"
          >
            <p>
              For the title of each tab the <code>vs-label</code> property is
              implemented in the <code>vs-tab</code> component
            </p>
          </vs-alert>
          <template v-if="contentPopup == 'create'">
            <div class="default-input d-flex align-items-center">
              {{
                $t(
                  "file.The field labels marked with * are required input fields"
                )
              }}
              <vs-input
                :label="$t('file.name') "
                class="inputx"
                placeholder="Category Name"
                v-model="name"
              />
              <vs-select
                class="selectExample"
                :label="$t('file.Parent Category')"
                v-model="select1"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in lims_categories"
                />
              </vs-select>
            </div>
            <p class="italic">
              <small
                >{{
                  $t(
                    "file.The field labels marked with * are required input fields"
                  )
                }}.</small
              >
            </p>
            <div class="row">
              <div class="col-md-6 form-group">
                <label>{{ $t("file.name") }} *</label>
                {--{ Form::text('name',null,array('required' => 'required',
                'class' => 'form-control', 'placeholder' => 'Type category
                name...')) }--}
              </div>
              <div class="col-md-6 form-group">
                <label>{{ $t("file.Image") }}</label>
                <input type="file" name="image" class="form-control" />
              </div>
              <div class="col-md-6 form-group">
                <label>{{ $t("file.Parent Category") }}</label>
                {--{Form::select('parent_id', $lims_categories, null, ['class'
                => 'form-control','placeholder' => 'No Parent Category']) }--}
              </div>
            </div>
          </template>
          <template v-else-if="contentPopup == 'import'">
            <div class="mt-5">
              new upload
              <vs-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                @on-success="successUpload"
              />
            </div>
          </template>
        </vx-card>
      </div>
      <div slot="footer">
        <b-button variant="info" id="show-info-message"
          >{{ $t("file.submit") }}
        </b-button>
        <b-button variant="dark" v-on:click="backProcess">
          {{ $t("file.close") }}</b-button
        >
      </div>
    </modal>
  </section>
</template>
<script>
import VueDatatable from "@/components/VueDatatable/VueDatatable";
import { categoryData } from "./mock";
// import Resource from "@/api/resource";
// const categoryResource = new Resource("category");
export default {
  name: "Category",
  components: {
    VueDatatable,
  },
  data: () => {
    return {
      statusPopup: false,
      contentPopup: "create",
      checkboxes1: [false, false, false, false],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
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
      const { data } = categoryData; //await categoryResource.list(this.listQuery);
      this.list = data.data;
      this.total = data.recordsTotal;
      this.listLoading = false;
    },
    backProcess: function () {
      this.statusPopup = false;
    },
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur",
      });
    },
  },
};
</script>

<style src="./Categories.scss" lang="scss" scoped />