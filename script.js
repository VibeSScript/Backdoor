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

// Fonction de validation des codes de CTF pour chaque scénario
function validateScenario(scenarioId, correctPassword) {
  const input = document.getElementById(`ctf-code-${scenarioId}`);
  const feedback = document.getElementById(`feedback-${scenarioId}`);

  // Réinitialiser les styles
  input.style.borderColor = "";
  feedback.classList.remove("success", "error");
  feedback.style.opacity = 0;

  // Validation du mot de passe
  if (input.value === correctPassword) {
    input.style.borderColor = "#00ff00"; // Vert pour succès
    feedback.textContent = "Succès : Code correct !";
    feedback.classList.add("success");
  } else {
    input.style.borderColor = "#ff0000"; // Rouge pour erreur
    feedback.textContent = "Erreur : Code incorrect!";
    feedback.classList.add("error");
  }

  // Affichage du feedback avec animation d'opacité
  feedback.style.opacity = 1;
}

// Ajouter les écouteurs d'événements pour chaque bouton de validation
document.getElementById("validate-ctf-code-1").addEventListener("click", function () {
  validateScenario(1, "TOULOUSE"); // Mot de passe correct pour le scénario 1
});

document.getElementById("validate-ctf-code-2").addEventListener("click", function () {
  validateScenario(2, "FAIBLE"); // Mot de passe correct pour le scénario 2
});

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

}

