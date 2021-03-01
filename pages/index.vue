<template>
  <datagrid
    :actualHeader="actualHeader"
    :allitems="allitems"
    :showHeader="showHeader"
  />
</template>

<script>
import datagrid from "@/components/datagrid";
export default {
  components: {
    datagrid,
  },
  data: () => {
    return {
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
      showHeader: [],
    };
  },
  mounted() {
    this.actualHeader.map((v) => {
      this.showHeader.push(v["value"]);
    });
    return this.showHeader;
  },
};
</script>
