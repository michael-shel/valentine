<script lang="ts">
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-fall");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    heart.innerText = "💗";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
  setInterval(createHeart, 300);
</script>
