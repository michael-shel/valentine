<script lang="ts">
  import { modal } from "./Modal.svelte";
  import Photo from "./Photo.svelte";

  export let imageUrls: string[] = [];

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
      on:click={() =>
        !isHidden(index + 1) ? openPhoto("photos/" + imageUrl) : false}
      style={`background-image: url(photos/${imageUrl});`}
    ></div>
  {/each}
</div>

<style lang="postcss">
  .heart {
    grid-gap: 0.2rem;
    display: grid;
    grid-template-columns: repeat(7, 2.1rem);
    grid-template-rows: repeat(6, 2.1rem);
    max-height: 630px;
    padding-top: 10px;
    width: 100%;
    justify-content: center;
    overflow: hidden;
  }

  @media (min-width: 32em) {
    .heart {
      grid-gap: 0.4rem;
      grid-template-columns: repeat(7, 4rem);
      grid-template-rows: repeat(6, 4rem);
    }
  }

  @media (min-width: 45em) {
    .heart {
      grid-gap: 0.4rem;
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

  .heart > .item:hover {
    transition: 200ms;
    scale: 1.1 !important;
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

  @keyframes waveAnimation {
    0% {
      transform: scale(1);
    }
    6% {
      transform: scale(1.1);
    }
    20% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }

  .item {
    animation: waveAnimation 6s infinite;
  }

  .heart > .item:nth-child(7n + 1) {
    animation-delay: 0s;
  }
  .heart > .item:nth-child(7n + 2) {
    animation-delay: 0.1s;
  }
  .heart > .item:nth-child(7n + 3) {
    animation-delay: 0.2s;
  }

  .heart > .item:nth-child(7n + 4) {
    animation-delay: 0.3s;
  }
  .heart > .item:nth-child(7n + 5) {
    animation-delay: 0.4s;
  }
  .heart > .item:nth-child(7n + 6) {
    animation-delay: 0.5s;
  }
  .heart > .item:nth-child(7n + 7) {
    animation-delay: 0.6s;
  }
</style>
