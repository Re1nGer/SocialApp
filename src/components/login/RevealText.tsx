import { useEffect, useRef } from 'react'

export function RevealText(): JSX.Element {
  const revealTextRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const revealTextElement = revealTextRef.current!
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealTextElement.classList.add('text-focus-in')
          } else revealTextElement.classList.remove('text-focus-in')
        })
      },
      { threshold: 1, rootMargin: '10px' },
    )

    observer.observe(revealTextElement)

    return () => observer.unobserve(revealTextElement)
  }, [])

  return (
    <div className='login__right_reveal'>
      <h1 className='login__right_reveal-text' ref={revealTextRef}>
        Destiny Arrives All The Same
      </h1>
    </div>
  )
}
