<script lang="ts">
  import Answer from "../components/Answer.svelte";
  import FallHearts from "../components/FallHearts.svelte";
  import PixelHeart from "../components/PixelHeart.svelte";
  import Loading from "../components/loading/Loading.svelte";
  import Cat from "$lib/images/happy-dance.png";

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
    class="container-pulse h-screen max-h-screen flex flex-col justify-evenly overflow-hidden"
  >
    <div class="flex items-center justify-center" style="height: 130px;">
      {#if runAnimation}
        <img src={Cat} style="width: 130px; height: 130px" alt="dancing"  />
      {:else}
        <h1 class="text-black font-bold font-mono">
        <!-- <h1 class="text-black font-bold font-mono animate-charcter"> -->
          Will you be my Valentine?
        </h1>
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
  .container-pulse {
    animation: 5s ease 0s infinite pulse;
  }

  @keyframes pulse {
    0%,
    50%,
    100% {
      background: #fee;
    }
    30%,
    80% {
      background: #fff;
    }
  }

  .animate-charcter {
    text-transform: uppercase;
    background-image: linear-gradient(
      -225deg,
      #1b1b1b 0%,
      #44107a 29%,
      #ff1361 67%,
      #fff800 100%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 3s linear infinite;
    display: inline-block;
    font-size: 32px;
  }

  @keyframes textclip {
    to {
      background-position: 200% center;
    }
  }
</style>
