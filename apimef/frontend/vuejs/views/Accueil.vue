<template>
  <div>
    <h1>Bienvenue sur notre boutique Apimef</h1>
    <p v-if="utilisateurConnecte">Bonjour, {{ utilisateurConnecte }}! Profitez de notre sélection de miels.</p>
    <p v-else>Veuillez vous connecter pour commencer à acheter.</p>
  </div>
</template>

<script>
export default {
  computed: {
    utilisateurConnecte() {
      return localStorage.getItem("user");
    },
  },
};
</script>
