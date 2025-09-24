let lastScroll = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll hacia abajo → ocultar
        header.classList.add("hidden");
    } else {
        // Scroll hacia arriba → mostrar
        header.classList.remove("hidden");
    }

    lastScroll = currentScroll;
});


// === Detectar página actual y marcar el link activo ===
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene la ruta actual del archivo (ej: /nosotros.html)
    const currentPath = window.location.pathname;

    // Selecciona todos los links del nav
    const navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach(link => {
        // Si el href del link coincide con la ruta actual, agrega la clase active
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
});


const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto play
setInterval(() => {
    let nextIndex = (currentIndex + 1) % dots.length;
    showSlide(nextIndex);
}, 5000);

// JS para lightbox (prueba.js)
document.querySelectorAll('.galeria img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `<img src="${img.src}" alt="">`;
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

});


document.addEventListener("DOMContentLoaded", async () => {
  const postsList = document.getElementById("posts-list");

  if (!postsList) return;

  try {
    // obtenemos los archivos de /post/
    const response = await fetch("/post/");
    const text = await response.text();

    // Parseamos listado (Netlify sirve un index de carpeta en modo dev, en producción a veces no)
    // Lo más sencillo: mantener un posts.json generado o usar Eleventy/Hugo
    // Aquí te muestro una demo mínima para Markdown + fetch:

    const posts = [
      "mi-primer-post.md" // ⚡ por ahora mete a mano los nombres de tus posts
    ];

    posts.forEach(async (file) => {
      const res = await fetch(`/post/${file}`);
      const md = await res.text();

      // Extraer frontmatter YAML (ejemplo simple)
      const titleMatch = md.match(/title:\s*(.+)/);
      const dateMatch = md.match(/date:\s*(.+)/);

      const title = titleMatch ? titleMatch[1] : "Sin título";
      const date = dateMatch ? new Date(dateMatch[1]).toLocaleDateString() : "";

      // Insertar en HTML
      postsList.innerHTML += `
        <article class="post">
          <h2>${title}</h2>
          <p><small>${date}</small></p>
          <a href="/post/${file.replace(".md", ".html")}">Leer más</a>
        </article>
      `;
    });

  } catch (err) {
    console.error("Error cargando posts", err);
  }
});

//codigo

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("posts");

  try {
    // Leer el index.json con todos los posts
    const res = await fetch("/post/index.json");
    const posts = await res.json();

    for (const url of posts) {
      const resPost = await fetch(url);
      const text = await resPost.text();

      // Extraer frontmatter (--- ---)
      const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
      const match = text.match(frontmatterRegex);

      let metadata = {};
      let content = text;

      if (match) {
        const yaml = match[1];
        content = text.replace(frontmatterRegex, "");
        yaml.split("\n").forEach(line => {
          const [key, ...rest] = line.split(":");
          if (key && rest) {
            metadata[key.trim()] = rest.join(":").trim();
          }
        });
      }

      // Crear la card del post
      const article = document.createElement("article");
      article.classList.add("post");
      article.innerHTML = `
        ${metadata.image ? `<img src="${metadata.image}" alt="${metadata.title || "Post"}" class="featured-img">` : ""}
        <h2>${metadata.title || "Sin título"}</h2>
        <span class="date">${metadata.date || ""}</span>
        <div class="post-body">${marked.parse(content)}</div>
      `;
      container.appendChild(article);
    }
  } catch (err) {
    console.error("Error cargando posts:", err);
    container.innerHTML = `<p>No se pudieron cargar los posts.</p>`;
  }
});










