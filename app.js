import { siteContent } from "./content.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const app = document.querySelector("#app");
const header = document.querySelector("#site-header");

renderPage(siteContent);
wireInteractions();

function renderPage(content) {
  syncDocumentMeta(content);
  renderHeader();
  renderMain(content);
}

function renderHeader() {
  header.innerHTML = "";
}

function renderMain(content) {
  app.innerHTML = `
    <section class="hero section reveal" id="overview" data-nav-section>
      <div class="hero-copy">
        <p class="eyebrow">Product leader</p>
        <h1>${content.hero.name}</h1>
        <p class="hero-summary">${content.hero.summary}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="mailto:${content.contact.email}">${content.hero.ctaLabel}</a>
          <a class="button button-secondary" href="${content.contact.linkedIn}" target="_blank" rel="noreferrer">View LinkedIn</a>
        </div>
      </div>
    </section>

    <section class="experience section" id="experience" data-nav-section>
      <div class="section-heading reveal">
        <p class="section-kicker">Experience</p>
      </div>
      <div class="experience-list">
        ${content.experience
          .map(
            (role, index) => `
              <details class="experience-item reveal" data-role-id="${role.id}" ${index === 0 ? "open" : ""}>
                <summary>
                  <span class="experience-date">${role.dates}</span>
                  <span class="experience-main-row">
                    ${
                      role.logo
                        ? `
                          <span class="experience-logo-shell" aria-hidden="true">
                            <img
                              class="experience-logo ${role.logo.variant ? `experience-logo-${role.logo.variant}` : ""}"
                              src="${role.logo.src}"
                              alt="${role.logo.alt}"
                              loading="lazy"
                            />
                          </span>
                        `
                        : ""
                    }
                    <span class="experience-main">
                    <span class="experience-title">${role.title}</span>
                    <span class="experience-company">${role.company}</span>
                  </span>
                  </span>
                  <span class="experience-location">${role.location}</span>
                </summary>
                <div class="experience-panel">
                  <p class="experience-summary">${role.summary}</p>
                  ${role.impacts.length
                    ? `
                      <ul class="impact-list">
                        ${role.impacts
                          .map((impact) => {
                            if (typeof impact === "string") {
                              return `<li>${impact}</li>`;
                            }

                            return `<li>${impact.prefix}<a href="${impact.href}" target="_blank" rel="noreferrer">${impact.label}</a>${impact.suffix}</li>`;
                          })
                          .join("")}
                      </ul>
                    `
                    : ""}
                  <div class="tag-row">
                    ${role.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                  </div>
                </div>
              </details>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="education section" id="education" data-nav-section>
      <div class="section-heading reveal">
        <p class="section-kicker">Education</p>
      </div>
      <div class="education-list">
        ${content.education
          .map(
            (item) => `
              <article class="education-card reveal">
                ${
                  item.logo
                    ? `
                      <span class="education-logo-shell" aria-hidden="true">
                        <img class="education-logo" src="${item.logo.src}" alt="${item.logo.alt}" loading="lazy" />
                      </span>
                    `
                    : ""
                }
                <h3>${item.school}</h3>
                <p>${item.degree}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="contact section contact-section reveal" id="contact" data-nav-section>
      <p class="section-kicker">Contact</p>
      <h2>Get in touch</h2>
      <p class="contact-copy">
        The fastest way to reach me is email. LinkedIn is available if you prefer to connect there first.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href="mailto:${content.contact.email}">${content.contact.email}</a>
        <a class="button button-secondary" href="${content.contact.linkedIn}" target="_blank" rel="noreferrer">Connect on LinkedIn</a>
      </div>
    </section>
  `;
}

function syncDocumentMeta(content) {
  document.title = content.seo.title;
  setMeta("description", content.seo.description);
  setMeta("og:title", content.seo.title, true);
  setMeta("og:description", content.seo.socialPreviewText, true);
  setMeta("og:url", content.contact.website, true);
  setMeta("twitter:title", content.seo.title);
  setMeta("twitter:description", content.seo.socialPreviewText);
  syncJsonLd(content);
}

function setMeta(name, value, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(isProperty ? "property" : "name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", value);
}

function syncJsonLd(content) {
  let schemaTag = document.querySelector("#person-schema");

  if (!schemaTag) {
    schemaTag = document.createElement("script");
    schemaTag.type = "application/ld+json";
    schemaTag.id = "person-schema";
    document.head.appendChild(schemaTag);
  }

  schemaTag.textContent = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: content.hero.name,
      url: content.contact.website,
      jobTitle: "Principal Product Manager",
      email: `mailto:${content.contact.email}`,
      sameAs: [content.contact.linkedIn],
      alumniOf: content.education.map((item) => ({
        "@type": "CollegeOrUniversity",
        name: item.school
      }))
    },
    null,
    2
  );
}

function wireInteractions() {
  activateSectionObserver();
  activateRevealObserver();
}

function activateSectionObserver() {
  const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
  const sectionNodes = [...document.querySelectorAll("[data-nav-section]")];

  if (!sectionLinks.length || !sectionNodes.length) {
    return;
  }

  const markActive = (sectionId) => {
    sectionLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.sectionLink === sectionId);
    });
  };

  markActive("overview");

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

      if (visibleEntry) {
        markActive(visibleEntry.target.id);
      }
    },
    {
      threshold: [0.25, 0.55, 0.8],
      rootMargin: "-20% 0px -45% 0px"
    }
  );

  sectionNodes.forEach((node) => observer.observe(node));
}

function activateRevealObserver() {
  const revealNodes = document.querySelectorAll(".reveal");

  if (reducedMotion) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
}
