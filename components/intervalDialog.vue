<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.name" label="Name">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.parent" label="Parent">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              type="Number"
              v-model="editedItem.duration"
              label="Duration"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              type="Number"
              v-model="editedItem.releasedate"
              label="Release Date"
            >
            </v-text-field>
          </v-col>
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
    console.log("XXX", this.editedItem);
  },
  methods: {
    close() {
      this.$emit("close");
      this.editedItem = JSON.parse(JSON.stringify(this.item));
    },
    async save() {
      //this.$store.dispatch("addProjects", data);
      //this.$emit("close");
      //this.close();
      console.log(this.editedItem);
      const resp = await this.$axios.post(
        "http://localhost:8000/addinterval",
        this.editedItem
      );
      //this.$emit("save");
      //this.editedItem = JSON.parse(JSON.stringify(this.item));
      if (resp != null) {
        console.log("Emmiting Save--- InvDiag");
        this.$emit("save");
        this.editedItem = JSON.parse(JSON.stringify(this.item));
      }
    },
  },
};
</script>