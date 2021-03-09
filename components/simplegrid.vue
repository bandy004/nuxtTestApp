<template>
  <v-data-table
    v-model="selectedItem"
    :headers="headers"
    :items="items"
    :search="searchText"
    sort-by="id"
    class="elevation-1"
    @dblclick:row="dblclickRow"
    @click:row="selected"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ name }} </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="searchText" class="mx-4 pt-4" label="search">
        </v-text-field>
        <v-spacer></v-spacer>
        <dialogelements
          :show="dialog"
          :item="defaultItem"
          :formTitle="newName"
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
          :formTitle="editName"
          :type="type"
          @close="close"
          @save="save"
        />
        <dialogelementdelete
          v-if="dialogDelete"
          :type="type"
          :item="editedItem"
          @close="close"
          @save="save"
        />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="editAction" small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon v-if="delAction" small @click="delItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import dialogelements from "@/components/dialogelements";
import dialogelementdelete from "@/components/dialogelementdelete";
export default {
  props: {
    name: String,
    type: String,
    items: Array,
    headers: Array,
    defaultItem: Object,
    edit: Boolean,
    del: Boolean,
  },
  data: () => {
    return {
      editedItem: null,
      dialogDelete: false,
      dialog: false,
      searchText: "",
      selectedItem: [],
    };
  },
  components: {
    dialogelements,
    dialogelementdelete,
  },
  computed: {
    getType() {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1);
    },
    newName() {
      return "New " + this.getType;
    },
    editName() {
      return "Edit " + this.getType;
    },
    editAction() {
      return this.edit;
    },
    delAction() {
      return this.del;
    },
    item() {
      return this.editedItem;
    },
  },
  methods: {
    dblclickRow(row) {
      alert("Double clicked", row);
    },
    selected() {
      this.$emit("selection", this.selectedItem);
    },
    save() {
      console.log("Emmiting Save--- simplegrid element");
      this.$emit("save");
      this.dialog = false;
      this.dialogDelete = false;
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
    delItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
  },
};
</script>