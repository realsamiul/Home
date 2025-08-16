
'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';

export default function Home() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    })
    requestAnimationFrame(animate);
  }, [])

  const animate = () => {
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  }

  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image 
        src="/images/background.jpg"
        fill={true}
        alt="background"
      />
      
      {/* Location indicator */}
      <div className={styles.locationBadge}>
        <p><span>Located </span><span>in </span><span>Bangladesh</span></p>
      </div>

      {/* Main hero content */}
      <div className={styles.heroContent}>
        <div className={styles.heroSubtext}>
          <div className={styles.arrow}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-1019.000000, -279.000000)" stroke="#FFFFFF" strokeWidth="1.5">
                  <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                    <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                    <line x1="12" y1="0" x2="0" y2="12"></line>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <h4><span>Strategic Apparel</span> Sourcing Partner</h4>
        </div>
        
        <div className={styles.bigName}>
          <h1>Stitchmark<span className={styles.spacer}>—</span></h1>
        </div>
      </div>

      {/* Animated text slider */}
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>The Architecture of Apparel -</p>
          <p ref={secondText}>The Architecture of Apparel -</p>
        </div>
      </div>

      {/* Description section */}
      <div className={styles.description}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
        </svg>
        <p>Executed with Precision</p>
        <p>in Bangladesh</p>
      </div>

      {/* Intro content */}
      <div className={styles.introSection}>
        <h4 className={styles.introTitle}>The Architecture of Apparel. Executed with Precision in Bangladesh.</h4>
        <div className={styles.introText}>
          <p>Our process is architected by engineers and technicians. We provide granular oversight that mass-market agencies cannot replicate, ensuring predictable excellence for our global partners.</p>
          <div className={styles.ctaButton}>
            <span>Our Expertise</span>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
