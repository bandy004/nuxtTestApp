<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-row justify="center">
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
              cols="2"
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
          <v-data-table :items="items" :headers="headers" :search="searchText">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>{{ name }} </v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="searchText"
                  class="mx-4 pt-4"
                  label="search"
                >
                </v-text-field>
                <v-spacer></v-spacer>
                <dialogelements
                  :show="dialog"
                  :item="defaultItem"
                  formTitle="New"
                  :edit="false"
                  :type="type"
                  @close="close"
                  @save="save"
                />
                <dialogelements
                  v-if="dialog"
                  :show="true"
                  :edit="true"
                  :item="editedItem"
                  formTitle="Edit"
                  :type="type"
                  @close="close"
                  @save="save"
                />
                <dialogelementdelete
                  v-if="dialogDelete"
                  :type="type"
                  :item="editedItem"
                  @close="close"
                />
              </v-toolbar>
            </template>
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
              <v-btn class="primary" small icon dark @click="editItem(item)"
                ><v-icon small>mdi-pencil</v-icon></v-btn
              >
              <v-btn class="primary" small icon dark @click="childItem(item)"
                ><v-icon small>mdi-repeat</v-icon></v-btn
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
import dialogelements from "@/components/dialogelements";
import dialogelementdelete from "@/components/dialogelementdelete";
export default {
  components: {
    dialogelements,
    dialogelementdelete,
  },
  props: {
    actualHeader: Array,
    allitems: Array,
    showHeader: Array,
    name: String,
    type: String,
    defaultItem: Object,
    edit: Boolean,
    del: Boolean,
  },
  data() {
    return {
      displayHeaders: [],
      hidemenu: true,
      headers: this.actualHeader,
      items: [],
      dialog: false,
      searchText: "",
      dialogDelete: false,
      editedItem: null,
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
    allitems(val) {
      this.expandAll();
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
          itemIndex = itemIndex + 1;
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
    },
    save() {
      //console.log("Emmiting Save--- datagrid element");
      this.$emit("save");
      this.dialog = false;
    },
    close() {
      //alert("Cancel Called");
      this.dialog = false;
      this.dialogDelete = false;
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    childItem(item) {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedItem.parent = item.name;
      this.dialog = true;
    },
    delItem(item) {
      this.editedItem = Object.assign({}, item);
      //console.log("Deleting", this.editedItem);
      this.dialogDelete = true;
    },
  },
  computed: {},
};
</script>