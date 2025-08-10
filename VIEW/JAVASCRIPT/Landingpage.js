// Mobile sidebar functionality
document.addEventListener("DOMContentLoaded", function () {
  // Mobile sidebar menu functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  // Open sidebar
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileSidebar.classList.remove("translate-x-full");
      sidebarOverlay.classList.remove("hidden");
    });
  }

  // Close sidebar
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", function () {
      mobileSidebar.classList.add("translate-x-full");
      sidebarOverlay.classList.add("hidden");
    });
  }

  // Close sidebar when clicking on overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", function () {
      mobileSidebar.classList.add("translate-x-full");
      sidebarOverlay.classList.add("hidden");
    });
  }

  // Mobile services dropdown in sidebar
  const mobileServicesBtn = document.getElementById("mobileServicesBtn");
  const mobileServicesContent = document.getElementById(
    "mobileServicesContent"
  );
  const servicesArrow = document.getElementById("servicesArrow");

  if (mobileServicesBtn && mobileServicesContent) {
    mobileServicesBtn.addEventListener("click", function () {
      mobileServicesContent.classList.toggle("hidden");
      servicesArrow.classList.toggle("rotate-180");
    });
  }

  // Mobile profile dropdown in sidebar
  const mobileProfileBtn = document.getElementById("mobileProfileBtn");
  const mobileProfileContent = document.getElementById("mobileProfileContent");
  const profileArrow = document.getElementById("profileArrow");

  if (mobileProfileBtn && mobileProfileContent) {
    mobileProfileBtn.addEventListener("click", function () {
      mobileProfileContent.classList.toggle("hidden");
      profileArrow.classList.toggle("rotate-180");
    });
  }

  // Desktop profile dropdown functionality
  const profileBtn = document.getElementById("profileDropdownBtn");
  const dropdownContent = document.getElementById("profileDropdownContent");

  if (profileBtn && dropdownContent) {
    // Toggle dropdown on click
    profileBtn.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownContent.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !profileBtn.contains(e.target) &&
        !dropdownContent.contains(e.target)
      ) {
        dropdownContent.classList.add("hidden");
      }
    });
  }

  // Desktop services dropdown functionality
  const servicesBtn = document.getElementById("servicesDropdownBtn");
  const servicesDropdownContent = document.getElementById(
    "servicesDropdownContent"
  );

  if (servicesBtn && servicesDropdownContent) {
    // Toggle dropdown on click
    servicesBtn.addEventListener("click", function (e) {
      e.preventDefault();
      servicesDropdownContent.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !servicesBtn.contains(e.target) &&
        !servicesDropdownContent.contains(e.target)
      ) {
        servicesDropdownContent.classList.add("hidden");
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Enhanced parallax effect for floating elements with mouse interaction
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 100;
    mouseY = (e.clientY / window.innerHeight) * 100;
  });

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".animate-bounce-slow");
    const backgroundImages = document.querySelectorAll(
      ".scrolling-banner img, .scrolling-banner-reverse img"
    );

    // Enhanced parallax for floating elements
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrolled * speed);
      const mouseInfluence = (mouseX - 50) * 0.1;
      element.style.transform = `translateY(${yPos}px) translateX(${mouseInfluence}px)`;
    });

    // Mouse-influenced movement for background images
    backgroundImages.forEach((img, index) => {
      const mouseInfluenceX = (mouseX - 50) * 0.02;
      const mouseInfluenceY = (mouseY - 50) * 0.02;
      const rotation = Math.sin(scrolled * 0.001 + index) * 5;

      img.style.transform += ` translate(${mouseInfluenceX}px, ${mouseInfluenceY}px) rotate(${rotation}deg)`;
    });
  });

  // Interactive image effects on hover
  const backgroundImages = document.querySelectorAll(
    ".scrolling-banner img, .scrolling-banner-reverse img, .diagonal-scroll img"
  );

  backgroundImages.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
      this.style.transform = "scale(1.4) rotate(15deg)";
      this.style.filter =
        "brightness(1.3) drop-shadow(0 0 20px rgba(59, 130, 246, 0.9))";
      this.style.zIndex = "100";
      this.style.transition =
        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    });

    img.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
      this.style.transform = "";
      this.style.filter = "";
      this.style.zIndex = "";
    });
  });

  // Dynamic speed control for scrolling banners based on scroll speed
  let lastScrollTop = 0;
  let scrollSpeed = 0;

  window.addEventListener("scroll", () => {
    const currentScrollTop = window.pageYOffset;
    scrollSpeed = Math.abs(currentScrollTop - lastScrollTop);
    lastScrollTop = currentScrollTop;

    const banners = document.querySelectorAll(
      ".scrolling-banner, .scrolling-banner-reverse"
    );
    banners.forEach((banner) => {
      const speedMultiplier = 1 + scrollSpeed * 0.01;
      banner.style.animationDuration = `${25 / speedMultiplier}s`;
    });
  });

  // Add click effects to floating medical icons
  const medicalIcons = document.querySelectorAll('[class*="medical-float"]');
  medicalIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("div");
      ripple.className = "ripple-effect";
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${e.offsetX - 10}px;
        top: ${e.offsetY - 10}px;
        width: 20px;
        height: 20px;
        pointer-events: none;
      `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe service cards for animation
  document
    .querySelectorAll(".service-card, .bg-gradient-to-br")
    .forEach((el) => {
      observer.observe(el);
    });

  // Add entrance animations
  const style = document.createElement("style");
  style.textContent = `
    .animate-in {
      animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Counter animation */
    .counter {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
    }
    
    .counter.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll(".text-3xl.font-bold");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.textContent.replace(/\D/g, "")) || 0;
          const suffix = counter.textContent.replace(/\d/g, "");
          let current = 0;

          // Only animate if target is a valid number greater than 0
          if (target > 0) {
            const increment = target / 50;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current) + suffix;
              }
            }, 30);
          }

          observer.unobserve(counter);
        }
      });
    });

    counters.forEach((counter) => observer.observe(counter));
  }

  // Initialize counter animation
  animateCounters();

  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";

  window.addEventListener("load", () => {
    document.body.style.opacity = "1";
  });

  // Add interactive hover effects to buttons
  document
    .querySelectorAll("button, .bg-blue-600, .bg-transparent")
    .forEach((button) => {
      button.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)";
      });

      button.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
    });
});
