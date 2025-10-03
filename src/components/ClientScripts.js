// File: components/ClientScripts.js
'use client'; 

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function ClientScripts() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (isDesktop && !window.cursorInitialized) {
      const cursorDot = document.querySelector('.cursor-dot');
      const cursorOutline = document.querySelector('.cursor-outline');

      if (cursorDot && cursorOutline) {
        window.cursorInitialized = true;
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '0.2';

        const mouse = { x: -100, y: -100 };
        const dotPos = { x: 0, y: 0 };
        const outlinePos = { x: 0, y: 0 };
        const delay = 0.08;
        let animationFrameId;

        const animateCursor = () => {
          dotPos.x += (mouse.x - dotPos.x) * 0.7;
          dotPos.y += (mouse.y - dotPos.y) * 0.7;
          cursorDot.style.transform = `translate(${dotPos.x - (cursorDot.offsetWidth / 2)}px, ${dotPos.y - (cursorDot.offsetHeight / 2)}px)`;

          outlinePos.x += (mouse.x - outlinePos.x) * delay;
          outlinePos.y += (mouse.y - outlinePos.y) * delay;
          cursorOutline.style.transform = `translate(${outlinePos.x - (cursorOutline.offsetWidth / 2)}px, ${outlinePos.y - (cursorOutline.offsetHeight / 2)}px)`;

          animationFrameId = requestAnimationFrame(animateCursor);
        };

        const handleMouseMove = (e) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        animateCursor();

        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          cancelAnimationFrame(animationFrameId);
          window.cursorInitialized = false;
        };
      }
    }
  }, [isDesktop]);

  useEffect(() => {
    let sr;
    let observer;
    const eventListeners = [];
    let tiltElements = [];

    const initializeAnimations = async () => {
      const ScrollReveal = (await import('scrollreveal')).default;

      const addListener = (element, type, handler) => {
        if(element) {
          element.addEventListener(type, handler);
          eventListeners.push({ element, type, handler });
        }
      };

      const handleScroll = () => {
        const nav = document.querySelector('.navbar');
        if (nav) window.scrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
      };
      addListener(window, 'scroll', handleScroll);

      if(isDesktop) {
        document.querySelectorAll('a, button, .skill-item, .project-card, .accordion').forEach(el => {
            const handleMouseOver = () => document.querySelector('.cursor-outline')?.classList.add('hovered');
            const handleMouseLeave = () => document.querySelector('.cursor-outline')?.classList.remove('hovered');
            addListener(el, 'mouseover', handleMouseOver);
            addListener(el, 'mouseleave', handleMouseLeave);
        });
      }

      sr = ScrollReveal({
        origin: 'bottom', distance: '60px', duration: 1500, delay: 200, easing: 'ease-out', reset: false
      });
      sr.reveal('.section-title, .case-title, .case-section-header');
      sr.reveal('.about-content, .projects-container, .contact-content, .case-study article', { delay: 400 });
      sr.reveal('.hero-content h1', { origin: 'top', distance: '40px', duration: 1000, delay: 300 });
      sr.reveal('.hero-content h4', { origin: 'top', distance: '40px', duration: 1000, delay: 500 });
      sr.reveal('.hero-content .hero-intro', { duration: 1000, delay: 700 });
      sr.reveal('.cta-button, .project-button, .back-button', { duration: 1000, delay: 1000, distance: '40px' });
      sr.reveal('.skill-item, .feature-item', { interval: 100 });
      sr.reveal('.expertise-category, .info-box', { delay: 500 });

      if (isDesktop) {
        const VanillaTilt = (await import('vanilla-tilt')).default;
        tiltElements = document.querySelectorAll(".project-card, .skill-item, .expertise-item");
        VanillaTilt.init(tiltElements, { max: 2, speed: 10, glare: false });
      }

      const handleAccordionClick = (e) => {
        const accordion = e.currentTarget;
        accordion.classList.toggle('is-open');
      };
      addListener(document.querySelector('.accordion'), 'click', handleAccordionClick);

      if (pathname === '/') {
        const glowMap = {
          'hero': document.getElementById('glow-hero'),
          'about': document.getElementById('glow-hero'),
          'skills': document.getElementById('glow-skills'),
          'projects': document.getElementById('glow-projects'),
          'contact': document.getElementById('glow-contact'),
        };
        const sectionsToObserve = document.querySelectorAll('section[id]');
        const intersectionRatios = new Map();

        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            intersectionRatios.set(entry.target.id, entry.intersectionRatio);
          });

          let mostVisibleId = null;
          let maxRatio = 0;
          intersectionRatios.forEach((ratio, id) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisibleId = id;
            }
          });

          Object.values(glowMap).forEach(glow => glow?.classList.remove('visible'));
          if (mostVisibleId !== 'hero' && glowMap[mostVisibleId]) {
            glowMap[mostVisibleId].classList.add('visible');
          }

        }, {
          threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        });

        sectionsToObserve.forEach(section => {
          if (section) observer.observe(section);
        });
      }
    };
    
    initializeAnimations();

    return () => {
      eventListeners.forEach(({ element, type, handler }) => {
        element?.removeEventListener(type, handler);
      });
      if (observer) observer.disconnect();
      if (sr) sr.destroy();
      
      if (isDesktop && tiltElements.length > 0) {
        tiltElements.forEach(el => {
            if (el.vanillaTilt) {
                el.vanillaTilt.destroy();
            }
        });
      }
    };
  }, [pathname, isDesktop]);

  return null;
}