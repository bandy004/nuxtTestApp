<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-row justify="center">
            <span>
              Configure Columns
              <v-icon @click="menuShow" large color="green darken-2">
                mdi-cog
              </v-icon>
              <v-divider class="mx-4" vertical></v-divider>
              Show all rows
              <v-icon @click="expandAll" large color="blue darken-2">
                mdi-plus-circle
              </v-icon>
              <v-divider class="mx-4" vertical color="black"></v-divider>
              Show only top level rows
              <v-icon @click="collapseAll" large color="red darken-2">
                mdi-minus-circle
              </v-icon>
            </span>
            <v-divider class="mx-4" vertical></v-divider>
          </v-row>
          <v-row v-if="!hidemenu">
            <v-col
              cols="1"
              v-for="h in actualHeader"
              :key="h.vlaue"
              v-show="h.value != 'name'"
            >
              <v-checkbox
                v-model="showHeader"
                :value="h.value"
                :label="h.text"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-data-table :items="items" :headers="headers">
            <template #item.name="{ item, header, value }">
              <div style="display: inline">
                <span style="width: 25px; display: inline-block">
                  <v-icon v-if="item.children.length > 0" @click="show(item)">
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
            <template #item.actions="{ item }">
              <v-btn class="primary">Add</v-btn>
            </template>
            <template #item.tags="{ item }">
              <v-btn v-for="t in item.tags" class="primary mx-2">
                {{ t }}
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      showHeader: [
        "name",
        "calories",
        "fat",
        "carbs",
        "protein",
        "iron",
        "actions",
        "tags",
      ],
      hidemenu: true,
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
        { text: "Tags", value: "tags" },
        { text: "Actions", value: "actions" },
      ],
      headers: this.actualHeader,
      allitems: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
          children: ["Ice cream sandwich", "Eclair", "Cupcake"],
          parent: "",
          display: true,
          padding: 0,
          tags: ["Tag-1", "Tag-2"],
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
          children: [],
          parent: "Frozen Yogurt",
          display: true,
          padding: 10,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
          children: [],
          parent: "Frozen Yogurt",
          display: true,
          padding: 10,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
          children: ["Donut", "KitKat"],
          parent: "Frozen Yogurt",
          display: true,
          padding: 10,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
          children: [],
          parent: "",
          display: true,
          padding: 0,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
          children: [],
          parent: "",
          display: true,
          padding: 0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
          children: [],
          parent: "KitKat",
          display: true,
          padding: 30,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
          children: [],
          parent: "KitKat",
          display: true,
          padding: 30,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
          children: [],
          parent: "Cupcake",
          display: true,
          padding: 20,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
          children: ["Honeycomb", "Lollipop"],
          parent: "Cupcake",
          display: true,
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
    this.expandAll();
  },
  methods: {
    menuShow(val) {
      this.hidemenu = !this.hidemenu;
    },
    show(item) {
      var itemIndex = this.items.indexOf(item);
      if (item.display) {
        //hide all its childrenren in the sub-tree
        var allchildren = this.getAllChildren(item, []);
        for (var c in allchildren) {
          for (var i in this.items) {
            if (allchildren[c] == this.items[i].name) {
              this.items.splice(i, 1);
              this.items[i].display = false;
              break;
            }
          }
        }
        item.display = false;
      } else {
        // show immidiate childrenren
        for (var c in item.children) {
          for (var i in this.allitems) {
            if (item.children[c] == this.allitems[i].name) {
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
    getAllChildren(item, allChildren) {
      for (var c in item.children) {
        allChildren.push(item.children[c]);
        var childrenItem = null;
        for (var x in this.allitems) {
          if (this.allitems[x].name == item.children[c]) {
            childrenItem = this.allitems[x];
          }
        }
        this.getAllChildren(childrenItem, allChildren);
      }
      return allChildren;
    },
    collapseAll() {
      for (var i in this.items) {
        this.items[i].display = false;
      }
      this.items = [];
      for (var i in this.allitems) {
        if (this.allitems[i].parent == "") {
          this.items.push(this.allitems[i]);
        }
      }
    },
    expandAll() {
      for (var i in this.items) {
        this.items[i].display = false;
      }
      this.items = [];
      for (var i in this.allitems) {
        if (this.allitems[i].parent == "") {
          this.items.push(this.allitems[i]);
          this.allitems[i].display = true;
          var allChildren = this.getAllChildren(this.allitems[i], []);
          for (var k in allChildren) {
            for (var j in this.allitems) {
              if (allChildren[k] == this.allitems[j].name) {
                this.items.push(this.allitems[j]);
              }
            }
          }
        }
      }
    },
  },
  computed: {},
};
</script>