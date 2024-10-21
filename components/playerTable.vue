<script setup>
const props = defineProps({
  team: {
    type: Array,
    default: () => [],
  },
  headerColor: {
    type: String,
    default: "bg-black",
  },
  averages: {
    type: Object,
    default: () => {},
  },
});

const tableHeadings = [
  "Name",
  "FG%",
  "FT%",
  "3PM",
  "PTS",
  "REB",
  "AST",
  "STL",
  "BLK",
  "TO",
];
</script>

<template>
  <VTable density="compact">
    <thead :class="headerColor">
      <tr>
        <th
          v-for="(heading, index) in tableHeadings"
          :key="index"
          class="text-white text-xs"
          :class="{ 'w-48': index === 0 }"
        >
          {{ heading }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(player, index) in team" :key="index">
        <td
          v-for="(heading, index) in tableHeadings"
          :key="index"
          class="text-xs"
          :class="{ 'w-48': index === 0 }"
        >
          {{ player[heading] }}
        </td>
      </tr>
      <tr v-if="team.length === 0">
        <td class="border border-slate-700 w-48"></td>
        <td class="border border-slate-700"></td>
        <td class="border border-slate-700"></td>
        <td class="border border-slate-700"></td>
        <td class="border border-slate-700"></td>
        <td class="border border-slate-700"></td>
        <td class="border border-slate-700"></td>
        <td class="border border-slate-700"></td>
        <td class="border border-slate-700"></td>
        <td class="border border-slate-700"></td>
      </tr>
      <tr v-else>
        <td class="w-48 text-xs font-bold"></td>
        <td v-for="(average, index) in averages" :key="index" class="text-xs">
          {{ average }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
