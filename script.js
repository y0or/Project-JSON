document.addEventListener("DOMContentLoaded", () => {
  hljs.highlightAll();

  document.querySelectorAll("pre").forEach((bloco) => {
    const botao = document.createElement("button");
    botao.className = "copy-btn";
    botao.textContent = "Copy";
    bloco.appendChild(botao);

    botao.addEventListener("click", () => {
      const codigo = bloco.querySelector("code").textContent;
      navigator.clipboard.writeText(codigo).then(() => {
        botao.textContent = "Copied!";
        botao.style.background = "#34d399";
        botao.style.transform = "scale(1.1)";
        setTimeout(() => {
          botao.textContent = "Copy";
          botao.style.background = "#60a5fa";
          botao.style.transform = "scale(1)";
        }, 2000);
      });
    });
  });

  const secoes = document.querySelectorAll(".fade-in");
  secoes.forEach((secao, index) => {
    secao.style.display = "block";
    secao.style.opacity = "0"; // Start hidden
    secao.style.transform = "translateY(20px)"; // Start slightly below
    console.log(`Section ${index} initialized`); // Debug: Confirm sections are detected
  });

  // Smoother scroll animation with persistent visibility
  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          console.log(`Section ${entrada.target.id} is intersecting`); // Debug: Confirm intersection
          entrada.target.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
          entrada.target.style.opacity = "1";
          entrada.target.style.transform = "translateY(0)";
          observer.unobserve(entrada.target); // Unobserve after animation
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the section is visible
      rootMargin: "0px 0px 200px 0px" // Extend the bottom margin to preload sections earlier
    }
  );

  secoes.forEach((secao, index) => {
    observador.observe(secao);
    console.log(`Observing section ${index}: ${secao.id}`); // Debug: Confirm observer setup
  });

  // Fallback: Force visibility for sections that might not trigger
  window.addEventListener("scroll", () => {
    secoes.forEach((secao) => {
      const rect = secao.getBoundingClientRect();
      if (rect.top < window.innerHeight && secao.style.opacity === "0") {
        console.log(`Fallback triggered for section ${secao.id}`); // Debug: Confirm fallback
        secao.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        secao.style.opacity = "1";
        secao.style.transform = "translateY(0)";
        observador.unobserve(secao); // Unobserve to prevent duplicate triggers
      }
    });
  });
});

function searchAndScroll() {
  const termoBusca = document.getElementById("searchInput").value.toLowerCase();
  const elementosTexto = document.querySelectorAll("p, h2, h3, code");

  for (const elemento of elementosTexto) {
    const texto = elemento.textContent.toLowerCase();
    if (texto.includes(termoBusca) && termoBusca.length > 0) {
      elemento.scrollIntoView({ behavior: "smooth", block: "center" });
      elemento.style.background = "rgba(96, 165, 250, 0.2)";
      elemento.style.transition = "background 0.3s ease";
      setTimeout(() => {
        elemento.style.background = "none";
      }, 2000);
      break;
    }
  }
}
