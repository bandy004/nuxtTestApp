<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-row justify="left">
            <span>
              <v-divider class="mx-2" vertical></v-divider>
              Configure
              <v-icon
                @click="menuShow"
                color="green darken-2"
                class="ml-2 mr-2"
              >
                mdi-cog
              </v-icon>
              <v-divider class="mx-2" vertical></v-divider>
              Expand
              <v-icon
                @click="expandAll"
                color="blue darken-2"
                class="ml-2 mr-2"
              >
                mdi-arrow-expand-vertical
              </v-icon>
              <v-divider class="mx-2" vertical color="black"></v-divider>
              Collapse
              <v-icon
                @click="collapseAll"
                color="red darken-2"
                class="ml-2 mr-2"
              >
                mdi-arrow-collapse-vertical
              </v-icon>
            </span>
            <v-divider class="mx-2" vertical></v-divider>
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
                <!-- style="width: 25px; display: inline-block"> -->
                <span :style="getPadding(item)">
                  <v-icon v-if="item.children.length > 0" @click="show(item)">
                    {{ getIcon(item) }}
                  </v-icon>
                  <v-icon v-else color="white">mdi-minus</v-icon>
                </span>
                <!-- display: inline; margin-left: 10px"> :style="getPadding(item)"> -->
                <span>
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
        // { text: "Display", value: "display" },
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
          children: ["Cupcake", "Eclair", "Ice cream sandwich"],
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
          var ch = allchildren[c];
          var index_item = this.items.indexOf(ch);
          if (index_item > -1) {
            ch.display = false;
            this.items.splice(index_item, 1);
          }
        }
        item.display = false;
      } else {
        // show immidiate childrenren
        this.expandItem(item, false);
      }
    },
    expandItem(item, all) {
      var itemIndex = this.items.indexOf(item);
      for (var c in item.children) {
        var ch = this.allitems.find((v) => {
          return v.name == item.children[c];
        });
        //console.log("Adding = ", ch.name, "@", itemIndex + 1, ch.display);
        this.items.splice(itemIndex + 1, 0, ch);

        if (all) {
          itemIndex = this.expandItem(ch, all);
        } else {
          itemIndex = itemIndex + 1; //this.items.indexOf(this.allitems[i]);
        }
      }
      item.display = true;
      return itemIndex;
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
        var childrenItem = this.allitems.find((v) => {
          return v.name == item.children[c];
        });
        if (childrenItem != null) {
          allChildren.push(childrenItem);
          this.getAllChildren(childrenItem, allChildren);
        }
      }
      return allChildren;
    },
    collapseAll() {
      this.items.map((v) => {
        v.display = false;
      });

      this.items = this.allitems.filter((v) => {
        return v.parent == "";
      });
    },
    expandAll() {
      this.collapseAll();
      var parents = this.allitems.filter((v) => {
        return v.parent == "";
      });
      for (var i in parents) {
        this.expandItem(parents[i], true);
      }
      // this.items.map((v) => {
      //   v.display = false;
      // });
      // this.items = [];
      // for (var i in this.allitems) {
      //   if (this.allitems[i].parent == "") {
      //     this.items.push(this.allitems[i]);
      //     this.allitems[i].display = true;
      //     var allChildren = this.getAllChildren(this.allitems[i], []);
      //     for (var k in allChildren) {
      //       var ch = this.allitems.find((v) => {
      //         return v.name == allChildren[k];
      //       });
      //       this.items.push(ch);
      //       var parentv = this.allitems.find((v) => {
      //         return v.name == ch.parent;
      //       });
      //       parentv.display = true;
      //     }
      //   }
      // }
    },
  },
  computed: {},
};
</script>