<script lang="ts" context="module">
  import type { ComponentProps, ComponentType, SvelteComponent } from "svelte";
  import { writable } from "svelte/store";
  import { navigating } from "$app/stores";

  let openModals = writable<
    Array<{
      component: ComponentType;
      props?: Record<string, any>;
      isOpen: boolean;
    }>
  >([]);
  export let opened = writable(false);
  let timeout: any;
  let modalWidths = writable<string[]>([]);

  export type ModalConfig = {
    backdropClose: boolean;
    size?: "sm" | "lg" | "full";
  };

  let modalComponent = writable<ComponentType | undefined>(undefined);
  let modalProps = writable<Record<string, any> | undefined>(undefined);
  let modalConfig = writable<ModalConfig | undefined>({
    backdropClose: true,
  });

  const openModal = <T extends SvelteComponent>(
    component: ComponentType<T>,
    ...props: ComponentProps<T> extends { [x: string]: never }
      ? []
      : [props: ComponentProps<T>]
  ) => {
    if (timeout) clearTimeout(timeout);
    modalComponent.set(component);
    modalProps.set(props[0]);
    openModals.update((modals) => [
      ...modals,
      { component, props: props ? props[0] : undefined, isOpen: true },
    ]);
    let width: string = "100%";
    // set modal width in base of the number of open modals store
    openModals.subscribe(($openModals) => {
      width = `${100 - 5 * $openModals.length}%`;
    });
    modalWidths.update((widths) => [...widths, width]);
    setTimeout(() => {
      opened.set(true);
    }, 300);
  };

  export let useModal = ({
    backdropClose = true,
    size = "lg",
  }: ModalConfig) => {
    modalConfig.set({ backdropClose, size });
    return {
      open: openModal,
      close: closeModal,
      config: setConfig,
    };
  };

  const closeModal = () => {
    // close the last modal
    if (timeout) clearTimeout(timeout);
    openModals.update((d) => d.slice(0, d.length - 1));
    modalWidths.update((widths) => widths.slice(0, widths.length - 1));
    timeout = setTimeout(() => {
      opened.set(false);
      modalComponent.set(undefined);
      modalProps.set(undefined);
    }, 300);
  };

  const closeAllModals = () => {
    // close all modals
    if (timeout) clearTimeout(timeout);
    openModals.set([]);
    modalWidths.set([]);
    timeout = setTimeout(() => {
      opened.set(false);
      modalComponent.set(undefined);
      modalProps.set(undefined);
    }, 300);
  };

  const setConfig = (config: ModalConfig) => {
    modalConfig.set(config);
    return {
      open: openModal,
    };
  };

  export const modal = {
    open: openModal,
    close: closeModal,
    config: setConfig,
  };
</script>

<script lang="ts">
  let backdropElements: HTMLDivElement[] = [];
  let modalWrapperElements: HTMLDivElement[] = [];
  // if the modal is open, set the body to overflow hidden
  $: {
    if ($openModals.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  // if the modal is open when the url changes, close it
  $: {
    if ($openModals.length > 0) {
      const unsubscribe = navigating.subscribe((navigating) => {
        if (navigating) {
          closeAllModals();
          unsubscribe();
        }
      });
    }
  }
</script>

<svelte:window
  on:keydown={(event) => {
    if (
      event.key === "Escape" &&
      $openModals.length > 0 &&
      $modalConfig?.backdropClose
    )
      closeModal();
  }}
/>

{#each $openModals as { component: $modalComponent, props: $modalProps, isOpen: $opened }, index (index)}
  {#if $modalComponent}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="modal"
      class:modal-open={$opened}
      bind:this={backdropElements[index]}
      on:click|self={() => {
        if ($modalConfig?.backdropClose) closeModal();
      }}
      style="z-index:{`${90 * (index + 1)}`}"
    >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        bind:this={modalWrapperElements[index]}
        class="modal-box relative {$modalConfig?.size}"
        style:width={$modalWidths[index]}
        style="z-index:{`${30 * (index + 1)}`}"
      >
        <svelte:component this={$modalComponent} {...$modalProps} />
      </div>
    </div>
  {/if}
{/each}

<style lang="postcss">
  .modal-box.full {
    max-height: 100vh !important;
    height: 100% !important;
    width: 100% !important;
    max-width: 100% !important;
    min-height: 100vh;
    top: 99px;
    border-radius: 0 !important;
  }

  .modal-box {
    max-height: calc(100vh - 5em);
    grid-column-start: 1;
    grid-row-start: 1;
    width: 91.666667%;
    max-width: 32rem /* 512px */;
    --tw-scale-x: 0.9;
    --tw-scale-y: 0.9;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y))
      rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
      scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--b1) / var(--tw-bg-opacity));
    transition-property: color, background-color, border-color,
      text-decoration-color, fill, stroke, opacity, box-shadow, transform,
      filter, backdrop-filter;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    border-top-left-radius: var(--rounded-box, 1rem /* 16px */);
    border-top-right-radius: var(--rounded-box, 1rem /* 16px */);
    border-bottom-left-radius: var(--rounded-box, 1rem /* 16px */);
    border-bottom-right-radius: var(--rounded-box, 1rem /* 16px */);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .modal {
    pointer-events: none;
    position: fixed;
    inset: 0px;
    margin: 0px;
    display: grid;
    height: 100%;
    max-height: none;
    width: 100%;
    max-width: none;
    justify-items: center;
    padding: 0px;
    /* opacity: 0; */
    overscroll-behavior: contain;
    overscroll-behavior: contain;
    z-index: 999;
    background-color: transparent;
    color: inherit;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: transform, opacity, visibility;
    overflow-y: hidden;
  }
  :where(.modal) {
    align-items: center;
  }
  .modal-open {
    pointer-events: auto;
    visibility: visible;
    animation: modal-show 0.2s ease-in;
  }

  @keyframes modal-show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .modal:not(dialog:not(.modal-open)),
  .modal::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    /* animation: modal-pop 0.2s ease-out; */
  }

  .modal-open .modal-box,
  .modal:target .modal-box,
  .modal[open] .modal-box {
    --tw-translate-y: 0px;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y))
      rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
      scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
</style>
