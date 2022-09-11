import { writable } from "svelte/store";

export let leftItemsList = writable([
  { id: 1312, text: "slow" },
  { id: 2523, text: "chimney" },
  { id: 3511, text: "safari" },
  { id: 4231, text: "trust" },
  { id: 6753, text: "curtain" },
]);
export let rightItemsList = writable([]);
