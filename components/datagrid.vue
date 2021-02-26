<template>
  <v-container>
    <v-card flex>
      <v-row>
        <v-col>
          <v-subheader class="mx-5 pa-5"> Columns </v-subheader>
        </v-col>
        <v-col
          cols="2"
          v-for="h in actualHeader"
          :key="h.vlaue"
          v-show="h.value != 'name'"
        >
          <v-checkbox
            v-model="showHeader"
            :value="h.value"
            :label="h.value"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-data-table :items="items" :headers="headers">
        <template #item.name="{ item, header, value }">
          <div style="display: inline">
            <span style="width: 25px; display: inline-block">
              <v-icon v-if="item.child.length > 0" @click="show(item)">
                {{ getIcon(item) }}
              </v-icon>
              <!-- <v-icon v-else>mdi-minus</v-icon> -->
            </span>
            <!-- display: inline; margin-left: 10px"> -->
            <span :style="getPadding(item)">
              {{ value }}
            </span>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      showHeader: ["name", "calories", "fat", "carbs", "protein", "iron"],

      actualHeader: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      headers: this.actualHeader,
      allitems: [
        {
          name: "1. Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
          child: ["1.1 Ice cream sandwich", "1.2 Eclair", "1.3 Cupcake"],
          parent: "",
          display: false,
          padding: 0,
        },
        {
          name: "1.1 Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
          child: [],
          parent: "1. Frozen Yogurt",
          display: false,
          padding: 10,
        },
        {
          name: "1.2 Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
          child: [],
          parent: "1. Frozen Yogurt",
          display: false,
          padding: 10,
        },
        {
          name: "1.3 Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
          child: ["1.3.1 Donut", "1.3.2 KitKat"],
          parent: "1. Frozen Yogurt",
          display: false,
          padding: 10,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
          child: [],
          parent: "",
          display: false,
          padding: 0,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
          child: [],
          parent: "",
          display: false,
          padding: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
          child: [],
          parent: "",
          display: false,
          padding: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
          child: [],
          parent: "",
          display: false,
          padding: 0,
        },
        {
          name: "1.3.1 Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
          child: [],
          parent: "1.3 Cupcake",
          display: false,
          padding: 20,
        },
        {
          name: "1.3.2 KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
          child: [],
          parent: "1.3 Cupcake",
          display: false,
          padding: 20,
        },
      ],
      items: [],
    };
  },
  watch: {
    showHeader(val) {
      var newHeaders = [];
      for (var h in this.actualHeader) {
        if (val.includes(this.actualHeader[h].value)) {
          newHeaders.push(this.actualHeader[h]);
        }
      }
      this.headers = newHeaders;
    },
  },
  mounted() {
    this.headers = JSON.parse(JSON.stringify(this.actualHeader));
    for (var i in this.allitems) {
      if (this.allitems[i].parent == "") {
        this.items.push(this.allitems[i]);
      }
    }
  },
  methods: {
    show(item) {
      var itemIndex = this.items.indexOf(item);
      if (item.display) {
        //hide all its children in the sub-tree
        var allChild = this.getAllChildren(item, []);
        for (var c in allChild) {
          for (var i in this.items) {
            if (allChild[c] == this.items[i].name) {
              this.items.splice(i, 1);
              this.items[i].display = false;
            }
          }
        }
        item.display = false;
      } else {
        // show immidiate children
        for (var c in item.child) {
          for (var i in this.allitems) {
            if (item.child[c] == this.allitems[i].name) {
              this.items.splice(itemIndex + 1, 0, this.allitems[i]);
              itemIndex = this.items.indexOf(this.allitems[i]);
            }
          }
        }
        item.display = true;
      }
    },
    getIcon(item) {
      if (item.display) {
        return "mdi-chevron-down";
      } else {
        return "mdi-chevron-right";
      }
    },
    getPadding(item) {
      //console.log("pl-" + item.padding);
      //   return "pl-" + item.padding;
      return "display: inline; margin-left:" + item.padding + "px;";
    },
    getAllChildren(item, children) {
      for (var c in item.child) {
        children.push(item.child[c]);
        var childItem = null;
        for (var x in this.allitems) {
          if (this.allitems[x].name == item.child[c]) {
            childItem = this.allitems[x];
          }
        }
        this.getAllChildren(childItem, children);
      }
      return children;
    },
  },
  computed: {},
};
</script>