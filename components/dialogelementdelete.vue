<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline"
        >Are you sure you want to delete this item?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItem">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    type: String,
    item: Object,
  },
  data: () => {
    return {
      dialog: false,
    };
  },
  mounted() {
    this.dialog = true;
  },
  computed: {
    isDependency() {
      return this.type == "D";
    },
    isInterval() {
      return this.type == "I";
    },
  },
  methods: {
    async deleteItem() {
      let data = [];
      data.push(this.item);
      const resp = await this.$axios.post(
        "http://localhost:8000/deletedependency",
        this.item,
        {
          params: { name: this.item.name },
        }
      );
      if (resp != null) {
        this.$emit("save");
        this.dialog = false;
      }
    },
    close() {
      this.$emit("close");
      this.dialog = false;
    },
  },
};
</script>