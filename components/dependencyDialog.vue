<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.from" label="From"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.to" label="To"></v-text-field>
          </v-col>
          <!-- <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.type"
              label="Type"
              default="ES"
            ></v-text-field>
          </v-col> -->
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
      <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    item: Object,
    formTitle: String,
  },
  data: () => {
    return {
      editedItem: null,
    };
  },
  created() {
    this.editedItem = JSON.parse(JSON.stringify(this.item)); //Object.assign({}, this.item);
    //console.log(this.editedItem);
  },
  methods: {
    close() {
      this.$emit("close");
      this.editedItem = JSON.parse(JSON.stringify(this.item));
    },
    async save() {
      ///save resource
      //let data = [];
      //console.log(this.editedItem);
      //data.push(this.editedItem);
      const resp = await this.$axios.post(
        "http://localhost:8000/adddependency",
        this.editedItem
      );
      if (resp != null) {
        this.$emit("save");
        this.editedItem = JSON.parse(JSON.stringify(this.item));
      }
    },
  },
};
</script>