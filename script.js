// =========================================================
// METHA ANASTASYA PORTFOLIO - INTERACTIVE FEATURES
// =========================================================

// =========================================================
// THEME TOGGLE
// =========================================================

const themeToggle = document.getElementById("themeToggle")
const htmlElement = document.documentElement
const bodyElement = document.body

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light-mode"
if (currentTheme === "dark-mode") {
  bodyElement.classList.add("dark-mode")
  updateThemeToggleButton("dark-mode")
} else {
  bodyElement.classList.remove("dark-mode")
  updateThemeToggleButton("light-mode")
}

function toggleTheme() {
  const isDarkMode = bodyElement.classList.contains("dark-mode")

  if (isDarkMode) {
    bodyElement.classList.remove("dark-mode")
    localStorage.setItem("theme", "light-mode")
    updateThemeToggleButton("light-mode")
  } else {
    bodyElement.classList.add("dark-mode")
    localStorage.setItem("theme", "dark-mode")
    updateThemeToggleButton("dark-mode")
  }
}

themeToggle.addEventListener("click", toggleTheme)

function updateThemeToggleButton(theme) {
  const icon = theme === "dark-mode" ? "☀️" : "🌙"
  themeToggle.textContent = icon
}

// =========================================================
// MOBILE NAVIGATION TOGGLE
// =========================================================

const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.getElementById("navMenu")

navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true"
  navToggle.setAttribute("aria-expanded", !isExpanded)
  navMenu.classList.toggle("show")
})

// Close menu when a link is clicked
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false")
    navMenu.classList.remove("show")
  })
})

// =========================================================
// FORM VALIDATION & SUBMISSION
// =========================================================

const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    // Validation
    if (!name) {
      showAlert("Please enter your name", "error")
      return
    }

    if (!email) {
      showAlert("Please enter your email", "error")
      return
    }

    if (!isValidEmail(email)) {
      showAlert("Please enter a valid email address", "error")
      return
    }

    if (!message) {
      showAlert("Please enter your message", "error")
      return
    }

    if (message.length < 10) {
      showAlert("Message must be at least 10 characters long", "error")
      return
    }

    // Success
    showAlert("✅ Message sent successfully! I will get back to you soon.", "success")
    contactForm.reset()
  })
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showAlert(message, type) {
  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.textContent = message
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    border-radius: 12px;
    background: ${type === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"};
    color: ${type === "success" ? "#10b981" : "#ef4444"};
    border: 1px solid ${type === "success" ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)"};
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    max-width: 400px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  `

  document.body.appendChild(alert)

  setTimeout(() => {
    alert.style.animation = "slideOut 0.3s ease"
    setTimeout(() => alert.remove(), 300)
  }, 4000)
}

// =========================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// =========================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault()
      const target = document.querySelector(href)
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// =========================================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// =========================================================

const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll("section[id]")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

// =========================================================
// SCROLL ANIMATION FOR ELEMENTS
// =========================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards"
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe cards and sections
document.querySelectorAll(".experience-card, .project-card, .education-card, .skill-category").forEach((el) => {
  el.style.opacity = "0"
  observer.observe(el)
})

// =========================================================
// PROJECT FILTER FUNCTIONALITY
// =========================================================

const filterButtons = document.querySelectorAll(".filters .chip")
const projectCards = document.querySelectorAll(".project-card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("is-active"))
    button.classList.add("is-active")

    const filterValue = button.getAttribute("data-filter")

    // Filter projects
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-cat")
      if (filterValue === "all" || category === filterValue) {
        card.style.display = "block"
        card.style.animation = "fadeInUp 0.6s ease"
      } else {
        card.style.display = "none"
      }
    })
  })
})

// =========================================================
// UPDATE FOOTER YEAR
// =========================================================

document.getElementById("year").textContent = new Date().getFullYear()

// =========================================================
// CSS ANIMATIONS (injected into style)
// =========================================================

const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
document.head.appendChild(style)

