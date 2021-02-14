<template>
  <section>
    <div class="container-fluid">
      <button
        type="button"
        class="btn btn-info"
        data-toggle="modal"
        data-target="#createModal"
      >
        <i class="dripicons-plus"></i> {{ $t("file.Add Category") }}</button
      >&nbsp;
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#importCategory"
      >
        <i class="dripicons-copy"></i> {{ $t("file.Import Category") }}
      </button>
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
        colHeight="20"
        :common="listQuery"
        max-row-scroll="5"
      >
      <table-column
          label="ID"
          prop="id"
          fixed="left"
          width="250"
         
        >
        </table-column>
        <table-column
          label="氏 名"
          prop="account"
          fixed="left"
          width="250"
          :prefix="{ class: 'account_name' }"
          :render-cell="
            (self, data) => {
              return data.row[data.column]['name'];
            }
          "
          :tooltip="true"
        >
        </table-column>
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
      :width="1000"
      :height="800"
      :footerflg="false"
    >
      <h2 slot="header"></h2>
      <div slot="body">
        <p class="italic">
          <small
            >{{
              trans(
                "file.The field labels marked with * are required input fields"
              )
            }}.</small
          >
        </p>
        <div class="row">
          <div class="col-md-6 form-group">
            <label>{{ trans("file.name") }} *</label>
            {--{ Form::text('name',null,array('required' => 'required', 'class'
            => 'form-control', 'placeholder' => 'Type category name...')) }--}
          </div>
          <div class="col-md-6 form-group">
            <label>{{ trans("file.Image") }}</label>
            <input type="file" name="image" class="form-control" />
          </div>
          <div class="col-md-6 form-group">
            <label>{{ trans("file.Parent Category") }}</label>
            {--{Form::select('parent_id', $lims_categories, null, ['class' =>
            'form-control','placeholder' => 'No Parent Category']) }--}
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="ui-button ui-corner-all ui-widget modal-default-button">
          {{ $t("file.submit") }}
        </button>
        <button
          class="ui-button ui-corner-all ui-widget modal-default-button noneEvent"
          v-on:click="backProcess"
        >
          {{ $t("file.close") }}
        </button>
      </div>
    </modal>
  </section>
</template>
<script>
import VueDatatable from "@/components/VueDatatable/VueDatatable";
import {categoryData} from './mock';
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
  computed: {
    
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data } = categoryData;//await categoryResource.list(this.listQuery);
      this.list = data.data;
      this.total = data.recordsTotal;
      this.listLoading = false;
    },
  },
};
</script>

<style src="./Categories.scss" lang="scss" scoped />