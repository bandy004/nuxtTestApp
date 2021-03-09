<template>
  <v-card flat>
    <v-btn @click="showDep = !showDep" color="primary">Show Dependecy</v-btn>
    <v-btn @click="reset" color="primary">Reset</v-btn>
    <v-row>
      <v-col :cols="displayInterval">
        <datagrid
          :actualHeader="invHeaders"
          :allitems="intervals"
          :showHeader="showInvHeaders"
          :defaultItem="defaultItem"
          name="Intervals"
          type="I"
          :edit="true"
          :del="true"
          @save="save"
        />
      </v-col>
      <v-col :cols="displayDep" class="mt-12">
        <simplegrid
          v-if="showDep"
          :items="dependencies"
          :headers="depHeaders"
          :defaultItem="defaultDep"
          name="Dependecy"
          type="D"
          :edit="false"
          :del="true"
          @save="save"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import datagrid from "@/components/datagrid";
import simplegrid from "@/components/simplegrid";
export default {
  components: {
    datagrid,
    simplegrid,
  },
  data: () => {
    return {
      showDep: false,
      displayInterval: 12,
      displayDep: 0,
      invHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Parent", value: "parent" },
        { text: "Realese", value: "releasedate" },
        { text: "Start", value: "start" },
        { text: "Duration", value: "duration" },
        { text: "End", value: "end" },
        { text: "Actions", value: "actions" },
      ],
      depHeaders: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "From", value: "from" },
        { text: "To", value: "to" },
        { text: "Actions", value: "actions" },
      ],
      intervals: [],
      dependencies: [],
      defaultItem: {
        children: [],
        duration: 0,
        end: 0,
        name: "",
        parent: "",
        releasedate: 0,
        start: 0,
      },
      defaultDep: {
        name: "",
        from: "",
        to: "",
        type: "ES",
      },
      showInvHeaders: [],
      showDepHeaders: [],
    };
  },
  watch: {
    showDep(val) {
      if (val) {
        this.displayInterval = 8;
        this.displayDep = 4;
      } else {
        this.displayInterval = 12;
      }
    },
  },
  mounted() {
    this.invHeaders.map((v) => {
      this.showInvHeaders.push(v["value"]);
    });
    this.depHeaders.map((v) => {
      this.showDepHeaders.push(v["value"]);
    });
    this.loadIntervals();
    this.laodDependencies();
  },
  methods: {
    async loadIntervals() {
      this.intervals = [];
      const intervResp = await this.$axios.get(
        "http://localhost:8000/getintervals"
      );
      for (var d in intervResp.data) {
        //console.log(intervResp.data[d]);
        this.intervals.push(intervResp.data[d]);
      }
    },
    async laodDependencies() {
      this.dependencies = [];
      const depdResp = await this.$axios.get(
        "http://localhost:8000/getdependencies"
      );
      for (var d in depdResp.data) {
        this.dependencies.push(depdResp.data[d]);
      }
    },
    async reset() {
      const depdResp = await this.$axios.get("http://localhost:8000/reset");
      if (depdResp != null) {
        this.loadIntervals();
        this.laodDependencies();
      }
    },
    save() {
      //console.log("Emmiting Save--- int Manager");
      this.loadIntervals();
      this.laodDependencies();
    },
  },
};
</script>