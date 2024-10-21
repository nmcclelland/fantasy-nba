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

const categories = [
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

// Manually updated
const leagueAverages = {
  "FG%": 46.1,
  "FT%": 80.9,
  "3PM": 1.7,
  PTS: 13.2,
  REB: 4.8,
  AST: 3.0,
  STL: 0.9,
  BLK: 0.6,
  TO: 1.5,
};

function findAverage(category) {
  const value = category.includes("%")
    ? props.averages[category]
    : props.averages[category] / props.team.length;
  return Math.round(value * 10) / 10;
}

function getCellClass(valueA, valueB, key) {
  const scarcityWeights = {
    "FG%": 1,
    "FT%": 1,
    "3PM": 3,
    PTS: 1,
    REB: 1,
    AST: 1.5,
    STL: 3,
    BLK: 3,
    TO: 0.5,
  };

  const weight = scarcityWeights[key] || 1; // Default weight is 1 if key not found
  const diff = (valueA - valueB) * weight; // Adjust difference by weight

  // If A is greater than B, apply a green class
  if (diff > 0) {
    if (diff > 50) return "bg-green-600"; // darkest green
    else if (diff > 20) return "bg-green-500";
    else if (diff > 10) return "bg-green-400";
    else if (diff > 5) return "bg-green-300";
    else return "bg-green-200"; // lightest green
  }
  // If A is less than B, apply a red class
  else if (diff < 0) {
    if (diff < -50) return "bg-red-600"; // darkest red
    else if (diff < -20) return "bg-red-500";
    else if (diff < -10) return "bg-red-400";
    else if (diff < -5) return "bg-red-300";
    else return "bg-red-200"; // lightest red
  }

  // If A and B are equal, no color
  return "";
}
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
      <tr v-if="team.length">
        <td class="border border-slate-700 w-48 text-xs">Team Average</td>
        <td
          v-for="cat in categories"
          :key="cat"
          class="border border-slate-700 text-xs"
          :class="getCellClass(findAverage(cat), leagueAverages[cat], cat)"
        >
          {{ findAverage(cat) }}
        </td>
      </tr>
      <tr>
        <td class="border border-slate-700 w-48 text-xs">League Average</td>
        <td
          v-for="cat in categories"
          :key="cat"
          class="border border-slate-700 text-xs"
        >
          {{ leagueAverages[cat] }}
        </td>
      </tr>
    </tbody>
    <!-- <pre>{{ JSON.stringify(averages) }}</pre>
    <pre>{{ JSON.stringify(leagueAverages) }}</pre> -->
  </VTable>
</template>
