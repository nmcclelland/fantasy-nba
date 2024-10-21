<script setup>
const props = defineProps({
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

const winningStats = computed(() => {
  const { averages } = props;
  const stats = {};
  tableHeadings.forEach((heading) => {
    if (heading !== "Name") {
      if (averages["teamA"][heading] === averages["teamB"][heading]) {
        stats[heading] = "draw";
      } else {
        if (heading === "TO") {
          stats[heading] =
            averages["teamA"][heading] < averages["teamB"][heading]
              ? "teamA"
              : "teamB";
        } else {
          stats[heading] =
            averages["teamA"][heading] > averages["teamB"][heading]
              ? "teamA"
              : "teamB";
        }
      }
    }
  });
  return stats;
});
</script>
<template>
  <VTable density="compact">
    <thead class="bg-blue-600">
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
      <tr v-for="(team, index) in Object.keys(averages)" :key="index">
        <td class="text-xs w-48">
          {{ team === "teamA" ? "Team A" : "Team B" }}
        </td>
        <td
          v-for="(stat, key) in averages[team]"
          :key="key"
          class="text-xs"
          :class="{ 'font-bold': winningStats[key] === team }"
        >
          {{ stat }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
