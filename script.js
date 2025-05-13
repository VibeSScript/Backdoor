// Définition des niveaux et scénarios disponibles
const levels = {
  beginner: { name: "Débutant", range: [1, 1] },
  intermediate: { name: "Intermédiaire", range: [2, 2] },
  advanced: { name: "Avancé", range: [3, 3] },
  expert: { name: "Expert", range: [4, 4] },
  hacker: { name: "Hacker", range: [5, 5] },
};

// Fonction de génération de la sidebar
function generateSidebar() {
  const sidebarContent = document.getElementById("sidebar-content");
  sidebarContent.innerHTML = ""; // Vider la sidebar avant de la remplir

  // Parcourir les niveaux définis dans l'objet 'levels'
  for (const [level, details] of Object.entries(levels)) {
    const section = document.createElement("div");
    section.innerHTML = `<h3>${details.name}</h3><ul></ul>`; // Titre du niveau et liste vide
    const ul = section.querySelector("ul");

    // Générer les liens pour chaque scénario dans la plage de ce niveau
    for (let i = details.range[0]; i <= details.range[1]; i++) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#scenario-${i}">Niveau ${i}</a>`;
      ul.appendChild(li);
    }

    sidebarContent.appendChild(section);
  }
}

// Fonction pour afficher le tutoriel et masquer les autres scénarios
function displayTuto() {
  // Masquer tous les scénarios
  const allScenarios = document.querySelectorAll(".scenario");
  allScenarios.forEach(scenario => scenario.style.display = "none");

  // Afficher uniquement le tutoriel
  const tutoElement = document.getElementById("tuto");
  if (tutoElement) {
      tutoElement.classList.add('tuto-visible'); // Ajouter la classe pour afficher le tutoriel
      tutoElement.scrollIntoView({ behavior: "smooth" });
  }
}

// Ajouter les écouteurs d'événements pour chaque bouton de validation des scénarios
document.getElementById("validate-ctf-code-1").addEventListener("click", function () {
  validateScenario(1, "TOULOUSE"); // Mot de passe correct pour le scénario 1
});

document.getElementById("validate-ctf-code-2").addEventListener("click", function () {
  validateScenario(2, "FAIBLE"); // Mot de passe correct pour le scénario 2
});

document.getElementById("validate-ctf-code-3").addEventListener("click", function () {
  validateScenario(3, "IMAGE"); // Mot de passe correct pour le scénario 3
});

// Initialisation : Générer la sidebar après le chargement du DOM
document.addEventListener("DOMContentLoaded", generateSidebar);


// Initialisation : Générer la sidebar après le chargement du DOM
document.addEventListener("DOMContentLoaded", generateSidebar);

document.addEventListener("DOMContentLoaded", function() {
  let tutoStyles = window.getComputedStyle(document.getElementById("tuto"));
  let scenarios = document.querySelectorAll(".scenario");

  scenarios.forEach(scenario => {
      scenario.style.background = tutoStyles.background;
      scenario.style.padding = tutoStyles.padding;
      scenario.style.borderRadius = tutoStyles.borderRadius;
      scenario.style.boxShadow = tutoStyles.boxShadow;
      scenario.style.position = tutoStyles.position;
      scenario.style.overflow = tutoStyles.overflow;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Ajoute un listener pour chaque niveau
  for (let i = 1; i <= 5; i++) {
      const btn = document.querySelector(`#validate-password-${i}`);
      if (btn) {
          btn.addEventListener("click", function () {
              checkPassword(i);
          });
      }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Défilement en douceur vers l'élément "tuto" lors du chargement de la page
  const tutoElement = document.getElementById("tuto");
  if (tutoElement) {
      tutoElement.scrollIntoView({ behavior: "smooth" });
  }
});

window.addEventListener("load", function () {
  const tutoElement = document.getElementById("tuto");

  if (tutoElement) {
      // On le rend visible au chargement
      tutoElement.style.display = "block";

      // On scrolle avec un léger délai pour être sûr que le rendu est bien fait
      setTimeout(() => {
          tutoElement.scrollIntoView({ behavior: "smooth" });
      }, 100); 
  } else {
      console.warn("⚠️ L'élément avec l'ID 'tuto' n'a pas été trouvé.");
  }
});





async function checkPassword(level) {

  const password = document.getElementById(`password-${level}`).value;

 const response = await fetch("http://SITE_WEB/api/check_password", {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ level, password })

  });

 const data = await response.json();

  if (data.success) {

      alert("✅ Niveau débloqué !");

      document.getElementById(`tab-${level}`).classList.remove("locked");

  } else {

      alert("❌ Mauvais mot de passe !");

  }

  // Fonction pour afficher le tutoriel
// Fonction pour afficher le tutoriel
function displayTuto() {
  // Masquer tous les scénarios
  const allScenarios = document.querySelectorAll(".scenario");
  allScenarios.forEach(scenario => scenario.style.display = "none");

  // Afficher uniquement le tutoriel
  const tutoElement = document.getElementById("tuto");
  if (tutoElement) {
      tutoElement.style.display = "block";
      tutoElement.scrollIntoView({ behavior: "smooth" });
  }
}


// Au chargement de la page, afficher le tutoriel si aucun hash n'est présent
window.addEventListener("load", function () {
  const currentHash = window.location.hash;
  const tutoElement = document.getElementById("tuto-container");
  const allScenarios = document.querySelectorAll(".scenario");

  // Masquer les scénarios par défaut
  allScenarios.forEach(scenario => scenario.style.display = "none");

  if (!currentHash || currentHash === "#tuto") {
      displayTuto();
  } else {
      if (document.querySelector(currentHash)) {
          document.querySelector(currentHash).style.display = "block";
      }
  }
});

// Lors d'un changement de hash (clic sur un scénario)
window.addEventListener("hashchange", function () {
  const allScenarios = document.querySelectorAll(".scenario");
  const tutoElement = document.getElementById("tuto-container");

  // Masquer tout
  allScenarios.forEach(scenario => scenario.style.display = "none");
  tutoElement.style.display = "none";

  // Afficher le bon scénario
  const targetElement = document.querySelector(window.location.hash);
  if (targetElement) {
      targetElement.style.display = "block";
      targetElement.scrollIntoView({ behavior: "smooth" });
  }
});


}

