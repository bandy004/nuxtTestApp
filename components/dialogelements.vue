<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="!edit"
        color="primary"
        dark
        class="ma-4"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus-circle</v-icon>
        {{ buttonText
        }}<!-- New Item -->
      </v-btn>
    </template>
    <dependencyDialog
      v-if="isDependency"
      :formTitle="formTitle"
      :item="item"
      @close="close"
      @save="save"
    />
    <intervalDialog
      v-if="isInterval"
      :formTitle="formTitle"
      :item="item"
      @close="close"
      @save="save"
    />
  </v-dialog>
</template>
<script>
import dependencyDialog from "@/components/dependencyDialog";
import intervalDialog from "@/components/intervalDialog";
export default {
  components: {
    dependencyDialog,
    intervalDialog,
  },
  props: {
    type: String,
    item: Object,
    formTitle: String,
    show: Boolean,
    edit: Boolean,
    buttonText: String,
  },
  data: () => {
    return {
      //editedItem: "",
      dialog: false,
    };
  },
  computed: {
    isDependency() {
      return this.type == "D";
    },
    isInterval() {
      return this.type == "I";
    },
  },
  mounted() {
    this.dialog = this.show;
    //this.$store.dispatch("setEditedItem", this.item);
  },
  methods: {
    close() {
      this.$emit("close");
      this.dialog = false;
    },
    save() {
      console.log("Emmiting Save--- dig element");
      this.$emit("save");
      this.dialog = false;
    },
  },
};
</script>