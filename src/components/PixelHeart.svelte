<script lang="ts">
  import { modal } from "./Modal.svelte";
  import Photo from "./Photo.svelte";
  import { page } from "$app/stores";

  export let imageUrls: string[] = [];
  function getImageUrl(name: string) {
    return new URL(`./dir/${name}.png`, import.meta.url).href;
  }

  console.log(imageUrls);

  console.log(getImageUrl(imageUrls[0]));

  const openPhoto = (url: string) => {
    modal.open(Photo, {
      imageUrl: url,
    });
  };

  // Function to shuffle array elements
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const hiddenBlocks = [
    1, 4, 7, 22, 28, 29, 30, 34, 35, 36, 37, 38, 40, 41, 42,
  ];

  const isHidden = (index: number) => {
    return hiddenBlocks.includes(index) || index > 42;
  };
  // Shuffle the imageUrls array
  $: shuffledImageUrls = shuffleArray(imageUrls);
</script>

<div class="heart">
  {#each shuffledImageUrls as imageUrl, index (imageUrl)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="item"
      class:!opacity-0={isHidden(index + 1)}
      class:cursor-pointer={!isHidden(index + 1)}
      on:click={() => (!isHidden(index + 1) ? openPhoto('photos/'+imageUrl) : false)}
      style={`background-image: url(photos/${imageUrl});`}
    ></div>
  {/each}
</div>

<style lang="postcss">
  .heart {
    grid-gap: 0.4rem;
    display: grid;
    grid-template-columns: repeat(7, 3rem);
    grid-template-rows: repeat(6, 3rem);
    max-height: 620px;
    padding-top: 5px;
    width: 100%;
    justify-content: center;
    overflow: hidden;
  }

  @media (min-width: 32em) {
    .heart {
      grid-template-columns: repeat(7, 4rem);
      grid-template-rows: repeat(6, 4rem);
    }
  }

  @media (min-width: 45em) {
    .heart {
      grid-template-columns: repeat(7, 5rem);
      grid-template-rows: repeat(6, 5rem);
    }
  }

  .item {
    @apply bg-cover bg-center relative;
    filter: hue-rotate(-3deg) brightness(0.88) grayscale(0.3) contrast(1.1);
    outline: 3px solid #ff0019;
    outline-offset: -3px;
  }

  .item:hover {
    @apply scale-110 transition-all;
  }

  .item:after {
    position: absolute;
    content: "";
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #ff748c;
    mix-blend-mode: overlay;
  }
</style>
