export const viewportFadeIn = {
  initial: { opacity: 0 },
  transition: { duration: 0.8 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
}

export const fadeIn = {
  animate: { opacity: [0, 1] },
  transition: { duration: 0.8 },
}
