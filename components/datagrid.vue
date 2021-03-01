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
                v-model="displayHeaders"
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
              <div style="display: inline; width: 10px">
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
              <v-btn class="primary" small icon dark
                ><v-icon small>mdi-pencil</v-icon></v-btn
              >
            </template>
            <template #item.tags="{ item }">
              <v-btn v-for="t in item.tags" :key="t" small class="primary mx-1">
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
  props: {
    actualHeader: Array,
    allitems: Array,
    showHeader: Array,
  },
  data() {
    return {
      displayHeaders: [],
      hidemenu: true,
      headers: this.actualHeader,
      items: [],
    };
  },
  watch: {
    displayHeaders(val) {
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
    this.displayHeaders = this.showHeader;
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