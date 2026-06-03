import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'

/**
 * Full-bleed typographic statement that lights up word-by-word as you scroll:
 * each word starts dim + blurred and resolves to bright/cream (accent words to
 * mint) as it passes through the viewport. No card, no frame — pure type. This
 * is where the page tips from dark toward lighter.
 */

const STATEMENT =
  'Wij bouwen digitale producten die aandacht omzetten in groei, en die met je merk blijven meegroeien.'
const WORDS = STATEMENT.split(' ')
const ACCENT = new Set(['aandacht', 'groei,', 'meegroeien.'])

function Word({
  word,
  progress,
  range,
  accent,
}: {
  word: string
  progress: MotionValue<number>
  range: [number, number]
  accent: boolean
}) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const blur = useTransform(progress, range, [10, 0])
  const filter = useTransform(blur, (b) => `blur(${b}px)`)
  return (
    <motion.span
      style={{ opacity, filter }}
      className={
        'mr-[0.25em] inline-block ' +
        (accent ? 'font-accent italic text-mint' : 'text-cream')
      }
    >
      {word}
    </motion.span>
  )
}

export function IntroStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.65'],
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-32 md:py-52"
      style={{
        backgroundImage:
          'radial-gradient(120% 80% at 80% 0%, rgba(31,166,122,0.18), transparent 60%), linear-gradient(180deg, #08120F 0%, #0A1B16 100%)',
      }}
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-20">
        <p className="max-w-[18ch] font-display text-[clamp(2rem,6.2vw,5.5rem)] font-semibold leading-[1.04] tracking-tight md:max-w-[20ch]">
          {reduce
            ? STATEMENT
            : WORDS.map((word, i) => (
                <Word
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  range={[(i / WORDS.length) * 0.8, (i / WORDS.length) * 0.8 + 0.18]}
                  accent={ACCENT.has(word)}
                />
              ))}
        </p>
      </div>
    </section>
  )
}
