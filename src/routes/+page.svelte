<script lang="ts">
  import Answer from "../components/Answer.svelte";
  import FallHearts from "../components/FallHearts.svelte";
  import PixelHeart from "../components/PixelHeart.svelte";
  import Loading from "../components/loading/Loading.svelte";
  import Cat from "$lib/images/ezgif.com-gif-to-mp4-converter.mp4";
  export let data;

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let { imagePaths } = data.streamed;
  $: ({ imagePaths } = data.streamed);

  let runAnimation: boolean = false;
</script>

<svelte:head>
  <title>Will you be</title>
  <meta name="description" content="Will you be my Valentine?" />
</svelte:head>

{#if runAnimation}
  <FallHearts />
{/if}

{#await Promise.all( [imagePaths, delay(Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000)] )}
  <Loading />
{:then [imagePaths]}
  <div
    class="h-[88vh] max-h-[88vh] flex flex-col justify-evenly overflow-hidden"
  >
    <div class="flex items-center justify-center" style="height: 130px;">
      {#if runAnimation}
        <div class="h-[130px]">
          <video src="{Cat}" loop autoplay preload="auto" muted class="h-[130px]"></video>
        </div>
      {:else}
        <h2 class="title">
          <span class="title-word title-word-1">Will</span>
          <span class="title-word title-word-2">you</span>
          <span class="title-word title-word-3">be</span>
          <span class="title-word title-word-4">my</span>
          <span class="title-word title-word-5">Valentine?</span>
        </h2>
      {/if}
    </div>

    <section>
      <div class="flex justify-center items-center">
        <PixelHeart imageUrls={imagePaths}></PixelHeart>
      </div>
    </section>
    <Answer bind:runAnimation></Answer>
  </div>
{/await}

<style lang="postcss">
  .title-word {
    animation: color-animation 4s linear infinite;
  }

  .title-word-1 {
    --color-1: #df8453;
    --color-2: #3d8dae;
    --color-3: #e4a9a8;
  }

  .title-word-2 {
    --color-1: #dbad4a;
    --color-2: #accfcb;
    --color-3: #17494d;
  }

  .title-word-3 {
    --color-1: #accfcb;
    --color-2: #e4a9a8;
    --color-3: #accfcb;
  }

  .title-word-4 {
    --color-1: #3d8dae;
    --color-2: #df8453;
    --color-3: #e4a9a8;
  }

  .title-word-5 {
    --color-3: #e4a9a8;
    --color-2: #ff4428;
    --color-3: #85ba94;
  }

  @keyframes color-animation {
    0% {
      color: var(--color-1);
    }
    32% {
      color: var(--color-1);
    }
    33% {
      color: var(--color-2);
    }
    65% {
      color: var(--color-2);
    }
    66% {
      color: var(--color-3);
    }
    99% {
      color: var(--color-3);
    }
    100% {
      color: var(--color-1);
    }
  }
  .title {
    font-family: "Montserrat", sans-serif;
    font-weight: 800;
    font-size: 32px;
    text-transform: uppercase;
    text-align: center;
  }
</style>
