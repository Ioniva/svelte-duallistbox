<script>
  let selected = [];

  // First box logic
  let itemListA = [
    { id: 1312, text: "slow" },
    { id: 2523, text: "chimney" },
    { id: 3511, text: "safari" },
  ];
  $: counterListA = filterListA.length;
  let prefixA = "";
  $: filterListA = prefixA
    ? itemListA.filter((item) => {
        const text = item.text;
        return text.toLocaleLowerCase().startsWith(prefixA.toLocaleLowerCase());
      })
    : itemListA;

  function sendToRight() {
    const selectedOptions = itemListA.filter((item) => selected.includes(item.id));
    selectedOptions.forEach((select) => {
      const indx = filterListA.findIndex((todo) => todo.id === select.id);
      itemListA.splice(indx, 1);
      itemListA = itemListA;
      itemListB = [...itemListB, select];
    });
  }

  function sendAllToRight() {
    const allTodosItems = () => itemListA.splice(0);
    allTodosItems().forEach((todo) => {
      itemListB = [...itemListB, todo];
    });
    itemListA = itemListA;
  }

  // Second box logic
  let itemListB = [];
  let prefixB = "";
  $: counterListB = filterListB.length;

  $: filterListB = prefixB
    ? itemListB.filter((item) => {
        const text = item.text;
        return text.toLocaleLowerCase().startsWith(prefixB.toLocaleLowerCase());
      })
    : itemListB;

  function sendToLeft() {
    const selectedOptions = itemListB.filter((todo) => selected.includes(todo.id));
    selectedOptions.forEach((select) => {
      const indx = filterListB.findIndex((todo) => todo.id === select.id);
      itemListB.splice(indx, 1);
      itemListB = itemListB;
      itemListA = [...itemListA, select];
    });
  }

  function sendAllToLeft() {
    const allFinishedItems = () => itemListB.splice(0);
    allFinishedItems().forEach((todo) => {
      itemListA = [...itemListA, todo];
    });
    itemListB = itemListB;
  }
</script>

<!-- Title -->
<h1 class="text-center border-bottom">Dual ListBox</h1>

<div class="container">
  <div class="row">
    <!-- First container -->
    <div class="col-5">
      <!-- Options counter-->
      {#if counterListA === 0}
        <small>Empty list</small>
      {:else}
        <small>Showing all {counterListA}</small>
      {/if}
      <!-- Filter input -->
      <input
        class="mb-3 w-100"
        type="text"
        placeholder="Filter"
        bind:value={prefixA}
      />
      <!-- Select options-->
      <select class="w-100 w-100" multiple bind:value={selected}>
        {#each filterListA as item}
          <option class="border-bottom " value={item.id} on:dblclick={sendToRight}
            >{item.text}</option
          >
        {/each}
      </select>
    </div>
    <!-- /First container -->

    <!-- Buttons container -->
    <div class="row col-2 align-item-center">
      <button class="btn btn-outline-secondary w-100" on:click={sendToRight}
        >&#62</button
      >
      <button class="btn btn-outline-secondary w-100" on:click={sendAllToRight}
        >&#62&#62</button
      >
      <button class="btn btn-outline-secondary w-100 mt-4" on:click={sendToLeft}
        >&#60</button
      >
      <button class="btn btn-outline-secondary w-100" on:click={sendAllToLeft}
        >&#60&#60</button
      >
    </div>
    <!-- /Buttons container -->

    <!-- Second container -->
    <div class="col-5">
      <!-- Options counter-->
      {#if counterListB === 0}
        <small>Empty list</small>
      {:else}
        <small>Showing all {counterListB}</small>
      {/if}
      <!-- Filter input -->
      <input
        class="mb-3 w-100"
        type="text"
        placeholder="Filter"
        bind:value={prefixB}
      />
      <!-- Select options-->
      <select class="w-100" multiple bind:value={selected}>
        {#each filterListB as item}
          <option class="border-bottom" value={item.id} on:dblclick={sendAllToLeft}
            >{item.text}</option
          >
        {/each}
      </select>
    </div>
    <!-- /Second container -->
  </div>
</div>
