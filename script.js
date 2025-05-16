// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Enhanced Theme Toggle
  const themeToggle = document.getElementById("themeToggle")
  const body = document.body

  // Function to set theme with visual feedback
  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add("dark")
      body.classList.add("dark-mode")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      body.classList.remove("dark-mode")
      localStorage.setItem("theme", "light")
    }
  }

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark)

  // Set initial theme
  setTheme(isDark)

  // Toggle theme on click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentIsDark = document.documentElement.classList.contains("dark")
      setTheme(!currentIsDark)
    })
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      nav.classList.toggle("active")
    })
  }

  // Tabs
  const tabs = document.querySelectorAll(".tab")
  const tabPanes = document.querySelectorAll(".tab-pane")

  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Remove active class from all tabs and panes
        tabs.forEach((t) => t.classList.remove("active"))
        tabPanes.forEach((p) => p.classList.remove("active"))

        // Add active class to current tab and pane
        this.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Experience Accordion
  const experienceHeaders = document.querySelectorAll(".experience-header")

  if (experienceHeaders.length > 0) {
    experienceHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const card = this.parentElement
        card.classList.toggle("active")

        const toggleIcon = this.querySelector(".toggle-icon")
        if (card.classList.contains("active")) {
          toggleIcon.textContent = "−"
        } else {
          toggleIcon.textContent = "+"
        }
      })
    })
  }

  // Scroll Animation
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".section-title, .skill-card, .project-card, .experience-card, .contact-form-container, .social-links",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on page load

  // Header Scroll Effect
  const header = document.querySelector("header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Typewriter Effect
  const typewriterText = document.getElementById("typewriter-text")

  if (typewriterText) {
    const phrases = ["Electrical Engineer", "Problem Solver", "Caffeine Engineer"]

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        // Deleting text
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50
      } else {
        // Typing text
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100
      }

      // If word is complete
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        isDeleting = true
        typingSpeed = 1000
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        typingSpeed = 500
      }

      setTimeout(typeWriter, typingSpeed)
    }

    // Start the typewriter effect
    setTimeout(typeWriter, 1000)
  }

  // Project Card Tilt Effect
  const projectCards = document.querySelectorAll(".project-card")

  if (projectCards.length > 0) {
    projectCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2

        const mouseX = e.clientX - cardCenterX
        const mouseY = e.clientY - cardCenterY

        const rotateX = mouseY * -0.05
        const rotateY = mouseX * 0.05

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
        card.style.transition = "transform 0.5s ease"
      })
    })
  }

  // PIN Code Validation for Portal Page
  const pinInputs = document.querySelectorAll(".pin-input")
  const submitPinButton = document.getElementById("submit-pin")
  const errorMessage = document.getElementById("error-message")

  if (pinInputs.length > 0 && submitPinButton) {
    // Focus first input on page load
    pinInputs[0].focus()

    // Handle input focus and auto-advance
    pinInputs.forEach((input, index) => {
      input.addEventListener("keyup", function (e) {
        // Only allow numbers
        this.value = this.value.replace(/[^0-9]/g, "")

        // Auto advance to next input
        if (this.value && index < pinInputs.length - 1) {
          pinInputs[index + 1].focus()
        }

        // Handle backspace
        if (e.key === "Backspace" && !this.value && index > 0) {
          pinInputs[index - 1].focus()
        }
      })
    })

    // Handle Enter key press
    pinInputs.forEach((input) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          submitPinButton.click()
        }
      })
    })

    // Submit PIN
    submitPinButton.addEventListener("click", () => {
      let pin = ""
      pinInputs.forEach((input) => {
        pin += input.value
      })

      // Check if PIN is correct (2005)
      if (pin === "2005") {
        window.location.href = "dashboard.html"
      } else {
        // Show error and shake
        errorMessage.textContent = "Invalid access code. Please try again."
        errorMessage.classList.add("visible")

        const pinContainer = document.querySelector(".pin-input-container")
        pinContainer.classList.add("shake")

        // Clear inputs
        pinInputs.forEach((input) => {
          input.value = ""
        })

        // Focus first input
        pinInputs[0].focus()

        // Remove shake class after animation
        setTimeout(() => {
          pinContainer.classList.remove("shake")
        }, 500)
      }
    })

    // Typing effect for portal subtitle
    const typingText = document.getElementById("typing-text")

    if (typingText) {
      const text = typingText.textContent
      typingText.textContent = ""

      let i = 0
      function typePortalText() {
        if (i < text.length) {
          typingText.textContent += text.charAt(i)
          i++
          setTimeout(typePortalText, 100)
        }
      }

      typePortalText()
    }
  }

  // Set up game links
  const snakeGameLink = document.getElementById("snake-game-link")
  const tetrisGameLink = document.getElementById("tetris-game-link")
  const minesweeperGameLink = document.getElementById("minesweeper-game-link")

  if (snakeGameLink) snakeGameLink.href = "https://playsnake.org/"
  if (tetrisGameLink) tetrisGameLink.href = "https://tetris.com/play-tetris"
  if (minesweeperGameLink) minesweeperGameLink.href = "https://minesweeper.online/"
})
