<script setup>
import PlayerTable from "./components/playerTable.vue";
import AveragesTable from "./components/averagesTable.vue";
import PuntTable from "./components/puntTable.vue";
import { data } from "./data/players";

const tableHeadings = [
  "Rank",
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

// Selected teams
const teamA = ref([]);
const teamB = ref([]);
const selectedCategory = shallowRef("Rank");
const categorySort = shallowRef("");

const teamAverages = computed(() => {
  const averages = {
    teamA: {},
    teamB: {},
  };
  tableHeadings.forEach((key) => {
    if (key === "Name" || key === "Rank") {
      return;
    }
    if (key.includes("%")) {
      averages.teamA[key] =
        Math.round(
          (teamA.value.map((x) => x[key]).reduce((a, b) => a + b, 0) /
            teamA.value.length) *
            100
        ) / 100;
      averages.teamB[key] =
        Math.round(
          (teamB.value.map((x) => x[key]).reduce((a, b) => a + b, 0) /
            teamB.value.length) *
            100
        ) / 100;
    } else {
      averages.teamA[key] =
        Math.round(
          teamA.value.map((x) => x[key]).reduce((a, b) => a + b, 0) * 100
        ) / 100;
      averages.teamB[key] =
        Math.round(
          teamB.value.map((x) => x[key]).reduce((a, b) => a + b, 0) * 100
        ) / 100;
    }
  });
  return averages;
});

function addPlayer(event, player) {
  if (teamA.value.find(({ Name }) => Name === player.Name)) {
    teamA.value = teamA.value.filter(({ Name }) => player.Name !== Name);
  } else if (teamB.value.find(({ Name }) => Name === player.Name)) {
    teamB.value = teamB.value.filter(({ Name }) => player.Name !== Name);
  } else if (event.metaKey || event?.touches > 1) {
    teamB.value.push(player);
  } else {
    teamA.value.push(player);
  }
}

function sortTable(category) {
  if (category !== "Name") {
    selectedCategory.value = category;
    categorySort.value = categorySort.value === "asc" ? "desc" : "asc";
    if (categorySort.value === "asc") {
      data.value = data.value.sort((a, b) => b[category] - a[category]);
    } else {
      data.value = data.value.sort((a, b) => a[category] - b[category]);
    }
  }
}
</script>

<template>
  <div class="flex flex-col md:flex-row xs:flex-col h-screen overflow-hidden">
    <div class="flex-1 overflow-auto">
      <VTable fixedHeader density="compact" theme="dark">
        <thead>
          <tr>
            <th
              v-for="(heading, index) in tableHeadings"
              :key="index"
              class="text-xs cursor-pointer"
              :class="{ '!text-yellow-200': selectedCategory === heading }"
              @click="sortTable(heading)"
            >
              {{ heading }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(player, index) in data"
            :key="index"
            class="hover:bg-neutral-700 cursor-pointer"
            @click="addPlayer($event, player)"
          >
            <td
              v-for="(heading, index) in tableHeadings"
              :key="index"
              class="text-xs"
              :class="{
                'bg-green-700': teamA
                  .map(({ Name }) => Name)
                  .includes(player.Name),
                'bg-red-600': teamB
                  .map(({ Name }) => Name)
                  .includes(player.Name),
              }"
            >
              {{ player[heading] }}
            </td>
          </tr>
        </tbody>
      </VTable>
    </div>
    <div class="flex-1 overflow-auto">
      <div class="flex p-4 gap-4 flex-col">
        <VBtn
          variant="text"
          class="w-24 self-end"
          @click="
            teamA = [];
            teamB = [];
          "
          >Clear All</VBtn
        >
        <PlayerTable
          :team="teamA"
          :averages="teamAverages.teamA"
          headerColor="bg-green-700"
        />
        <PlayerTable
          v-if="teamB.length"
          :team="teamB"
          :averages="teamAverages.teamB"
          headerColor="bg-red-600"
        />
        <AveragesTable
          v-if="teamA.length && teamB.length"
          :averages="teamAverages"
        />
        <PuntTable
          v-if="teamB.length === 0"
          :team="teamA"
          :averages="teamAverages.teamA"
        />
      </div>
    </div>
  </div>
</template>
