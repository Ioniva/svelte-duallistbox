<script>
  import { leftItemsList, rightItemsList } from "./store.js";

  let selectMultipleItems = [];
  let leftSearchInput = "";
  let rightSearchInput = "";

  $: leftList = $leftItemsList;
  $: rightList = $rightItemsList;

  $: counterLeftListItems = filterListByItem(leftList, leftSearchInput).length;
  $: counterRightListItems = filterListByItem(rightList, rightSearchInput).length;

  function filterListByItem(list, searchInput) {
    return searchInput
      ? list.filter((item) => {
          return item.text
            .toLocaleLowerCase()
            .startsWith(searchInput.toLocaleLowerCase());
        })
      : list;
  }

  const updateBothLists = () => {
    leftList = leftList;
    rightList = rightList;
  };

  function moveItem(fromList, toList) {
    const selectedOptions = fromList.filter((item) =>
      selectMultipleItems.includes(item.id)
    );

    return selectedOptions.map((item) => {
      const indx = fromList.findIndex((text) => text.id === item.id);
      fromList.splice(indx, 1);
      toList.push(item);
      updateBothLists();
    });
  }

  function moveAllItems(fromList, toList) {
    const removeAllItems = fromList.splice(0);
    return removeAllItems.map((item) => {
      toList.push(item);
      updateBothLists();
    });
  }
</script>

<!-- Title -->
<h1 class="text-center border-bottom">Dual ListBox</h1>
<div class="container">
  <div class="row">
    <!-- First container -->
    <div class="col-5">
      <!-- Options counter-->
      {#if counterLeftListItems === 0}
        <small>Empty list</small>
      {:else}
        <small>Showing all {counterLeftListItems}</small>
      {/if}
      <!-- Filter input -->
      <input
        class="mb-3 w-100"
        type="text"
        placeholder="Filter"
        bind:value={leftSearchInput}
      />
      <!-- Select options-->
      <select class="w-100 w-100" multiple bind:value={selectMultipleItems}>
        {#each filterListByItem(leftList, leftSearchInput) as item}
          <option
            class="border-bottom "
            value={item.id}
            on:dblclick={moveItem(leftList, rightList)}>{item.text}</option
          >
        {/each}
      </select>
    </div>
    <!-- /First container -->

    <!-- Buttons container -->
    <div class="row col-2 align-item-center">
      <button
        class="btn btn-outline-secondary w-100"
        on:click={moveItem(leftList, rightList)}>&#62</button
      >
      <button
        class="btn btn-outline-secondary w-100"
        on:click={moveAllItems(leftList, rightList)}>&#62&#62</button
      >
      <button
        class="btn btn-outline-secondary w-100 mt-4"
        on:click={moveItem(rightList, leftList)}>&#60</button
      >
      <button
        class="btn btn-outline-secondary w-100"
        on:click={moveAllItems(rightList, leftList)}>&#60&#60</button
      >
    </div>
    <!-- /Buttons container -->

    <!-- Second container -->
    <div class="col-5">
      <!-- Options counter-->
      {#if counterRightListItems === 0}
        <small>Empty list</small>
      {:else}
        <small>Showing all {counterRightListItems}</small>
      {/if}
      <!-- Filter input -->
      <input
        class="mb-3 w-100"
        type="text"
        placeholder="Filter"
        bind:value={rightSearchInput}
      />
      <!-- Select options-->
      <select class="w-100" multiple bind:value={selectMultipleItems}>
        {#each filterListByItem(rightList, rightSearchInput) as item}
          <option
            class="border-bottom"
            value={item.id}
            on:dblclick={moveItem(rightList, leftList)}>{item.text}</option
          >
        {/each}
      </select>
    </div>
    <!-- /Second container -->
  </div>
</div>
