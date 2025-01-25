<template>
    <div>
      <h2>Connexion</h2>
      <form @submit.prevent="connecter">
        <div>
          <label for="username">Nom d'utilisateur :</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      connecter() {
        // Simuler une connexion pour l'exemple
        if (this.username === "utilisateur" && this.password === "motdepasse") {
          // Sauvegarder l'utilisateur dans le localStorage
          localStorage.setItem("user", this.username);
          // Rediriger vers la page d'accueil
          this.$router.push("/"); 
        } else {
          alert("Nom d'utilisateur ou mot de passe incorrect");
        }
      },
    },
  };
  </script>
  