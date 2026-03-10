document.addEventListener("DOMContentLoaded", () => {
  const botData = {
    guard: {
      title: "Protect Guard",
      description:
        "Protect Guard est un bot de sécurité avancé qui protège les serveurs Discord contre les raids, le spam, les liens malveillants et les comportements abusifs. Il permet aussi aux administrateurs de gérer rapidement la sécurité du serveur.",
      commands: [
        { name: "+antiraid on", text: "Active la protection anti-raid du serveur." },
        { name: "+antispam on", text: "Active la protection contre le spam." },
        { name: "+antilink on", text: "Active le blocage des liens interdits." },
        { name: "+lock", text: "Verrouille rapidement un salon." },
        { name: "+unlock", text: "Déverrouille un salon verrouillé." },
        { name: "+wl add @user", text: "Ajoute un utilisateur à la whitelist." }
      ]
    },
    ai: {
      title: "Protect AI",
      description:
        "Protect AI est un bot intelligent conçu pour aider les membres d’un serveur Discord. Il peut répondre aux questions, assister les utilisateurs et proposer une interaction plus naturelle sur différents sujets.",
      commands: [
        { name: "+ask", text: "Pose une question à l’IA." },
        { name: "+helpai", text: "Affiche l’aide du bot IA." },
        { name: "+profile", text: "Affiche le profil utilisateur." },
        { name: "+serverinfo", text: "Donne des informations utiles sur le serveur." },
        { name: "+optigaming", text: "Donne des conseils d’optimisation gaming." },
        { name: "+resetai", text: "Réinitialise le contexte de discussion IA." }
      ]
    }
  };

  const title = document.getElementById("botTitle");
  const description = document.getElementById("botDescription");
  const grid = document.getElementById("commandGrid");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const switchButtons = document.querySelectorAll(".bot-switch");
  const botCards = document.querySelectorAll(".bot-card");

  function renderBot(botKey) {
    const bot = botData[botKey];
    if (!bot) return;

    title.textContent = bot.title;
    description.textContent = bot.description;
    grid.innerHTML = "";

    bot.commands.forEach((cmd) => {
      const item = document.createElement("div");
      item.className = "command-item";
      item.innerHTML = `
        <span class="command-name">${cmd.name}</span>
        <p>${cmd.text}</p>
      `;
      grid.appendChild(item);
    });

    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.bot === botKey);
    });

    botCards.forEach((card) => {
      card.classList.toggle("active-bot-card", card.dataset.bot === botKey);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      renderBot(btn.dataset.bot);
    });
  });

  switchButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const botKey = btn.dataset.bot;
      renderBot(botKey);
      const target = document.querySelector("#commands");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));

  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  renderBot("guard");
});
