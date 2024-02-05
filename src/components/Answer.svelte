<script lang="ts">
  import Cat from "$lib/images/cat-cats-ezgif.com-gif-to-mp4-converter.mp4";
  export let runAnimation: boolean = false;
  let replace = "NO";
  let replaces: string[] = [
    "Really, are you sure?",
    "Are you sure about your choice?",
    "Is this decision final for you?",
    "Have you considered all options?",
    "Ready to move forward with this?",
    "Any last-minute considerations?",
    "Confident in your selection?",
    "Need more time to think it over?",
    "Any reservations or hesitation?",
    "Comfortable with this decision?",
    "Reviewed all relevant details?",
  ];

  let scale = 1;
  let descale = 1;
  let currentIndex = -1;

  const newReplace = () => {
    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * replaces.length);
    } while (newIndex === currentIndex);

    currentIndex = newIndex;

    replace = replaces[newIndex];
    scale = scale >= 2 ? scale : scale + 0.1;
    descale = descale <= 0.4 ? descale : descale - 0.1;
  };
</script>

<div
  class="flex gap-8 justify-center items-center font-mono flex-wrap px-2 flex-col"
>
  {#if runAnimation}
    <div class="h-[130px]">
      <video
        src={Cat}
        playsinline
        loop
        autoplay
        preload="auto"
        muted
        class="h-[130px]"
      ></video>
    </div>
  {:else}
    <button
      class="rounded-lg p-3 font-bold pulse-button"
      style="scale: {scale};"
      on:click={() => (runAnimation = true)}>YES</button
    >
    <button
      class="rounded-lg p-3 border text-red-500 border-red-500 font-light whitespace-nowrap"
      style="scale: {descale};"
      on:click={newReplace}>{replace}</button
    >
  {/if}
</div>

<style lang="postcss">
  .pulse-button {
    animation: pulse 1s infinite;
    border: 1px solid rgb(19, 174, 68);
    color: rgb(19, 174, 68);
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
