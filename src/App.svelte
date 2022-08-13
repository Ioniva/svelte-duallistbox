<script>
  let itemListA = [
    { id: 1312, text: "slow" },
    { id: 2523, text: "chimney" },
    { id: 3511, text: "safari" },
  ];
  let itemListB = [];
  let selected = [];
  let prefixA = "";
  let prefixB = "";

  $: filterListA = prefixA
    ? itemListA.filter((item) => {
        const text = item.text;
        return text.toLocaleLowerCase().startsWith(prefixA.toLocaleLowerCase());
      })
    : itemListA;

  $: filterListB = prefixB
    ? itemListB.filter((item) => {
        const text = item.text;
        return text.toLocaleLowerCase().startsWith(prefixB.toLocaleLowerCase());
      })
    : itemListB;

  $: counterListA = filterListA.length;
  $: counterListB = filterListB.length;

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

<div class="container">
  <div class="form-group">
    <strong>Multiple</strong>
    <div class="row">
      <!-- First Container -->
      <div class="box1 col-5">
        <div class="info-container">
          {#if counterListA === 0}
            <p class="info">Empty list</p>
          {:else}
            <p class="info">Showing all {counterListA}</p>
          {/if}
        </div>

        <input
          class="form-control filter"
          type="text"
          placeholder="Filter"
          bind:value={prefixA}
        />
        <select class="w-100 h-100" multiple bind:value={selected}>
          {#each filterListA as item}
            <option value={item.id}>{item.text}</option>
          {/each}
        </select>
      </div>
      <!-- /First Container -->

      <!-- Action Buttons -->
      <div class="col-2 h-100">
        <button
          class="btn moveone btn-outline-secondary w-100"
          id="oneToRight"
          type="button"
          title="moveone"
          on:click={sendToRight}>&#62</button
        >
        <button
          class="btn moveone btn-outline-secondary w-100 mt-2"
          type="button"
          title="moveall"
          on:click={sendAllToRight}>&#62&#62</button
        >
        <button
          class="btn moveone btn-outline-secondary w-100 mt-4"
          type="button"
          title="moveone"
          on:click={sendToLeft}>&#60</button
        >
        <button
          class="btn moveone btn-outline-secondary w-100 mt-2"
          type="button"
          title="moveall"
          on:click={sendAllToLeft}>&#60&#60</button
        >
      </div>
      <!-- /Action Buttons-->

      <!-- Second Container -->
      <div class="box2 col-5">
        <div class="info-container">
          {#if counterListB === 0}
            <p class="info">Empty list</p>
          {:else}
            <p class="info">Showing all {counterListB}</p>
          {/if}
        </div>

        <input
          class="form-control filter"
          type="text"
          placeholder="Filter"
          bind:value={prefixB}
        />
        <select class="w-100 h-100" multiple bind:value={selected}>
          {#each filterListB as item}
            <option value={item.id}>{item.text}</option>
          {/each}
        </select>
      </div>
    </div>
    <!-- /Second Container -->
  </div>
</div>

<style>
</style>
