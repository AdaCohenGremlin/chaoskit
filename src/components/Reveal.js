import { Fragment, useEffect, useRef } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import useUpdateEffect from 'react-use/lib/useUpdateEffect'
import { useTheme } from 'emotion-theming'

import Button from './Button'

const Reveal = ({
  onComplete = () => {},
  onReverseComplete = () => {},
  onStart = () => {},
  reveal,
  children,
  className,
  trigger = { props: {}, label: '' },
  ...rest
}) => {
  const theme = useTheme()

  const revealRef = useRef()
  const triggerRef = useRef()

  const attachTimeline = () => {
    const $reveal = revealRef.current
    const $trigger = triggerRef.current

    // Attach GSAP
    $reveal.timeline = gsap.timeline({
      paused: true,
      onStart: () => {
        // Add active class to trigger
        $trigger.classList.add(theme.settings.classes.active)
        // Toggle aria state
        $reveal.setAttribute('aria-hidden', false)

        onStart()
      },
      onComplete: () => {
        onComplete()
      },
      onReverseComplete: () => {
        onReverseComplete()
      },
    })

    $reveal.timeline.to($reveal, {
      duration: theme.gsap.timing.long,
      height: 'auto',
      autoAlpha: 1,
      ease: theme.gsap.transition.base,
    })

    if (reveal) {
      $reveal.timeline.progress(1)
    }
  }

  const handleOnReverseStart = () => {
    const $reveal = revealRef.current
    const $trigger = triggerRef.current

    if ($trigger) {
      // Remove active class on trigger
      $trigger.classList.remove(theme.settings.classes.active)
    }

    if ($reveal) {
      // Toggle aria state
      $reveal.setAttribute('aria-hidden', true)
    }
  }

  const revealOpen = () => {
    const $reveal = revealRef.current

    if ($reveal && $reveal.timeline) {
      $reveal.timeline.play()
    }
  }

  const revealClose = () => {
    const $reveal = revealRef.current

    if ($reveal && $reveal.timeline) {
      $reveal.timeline.reverse()

      handleOnReverseStart()
    }
  }

  const handleRevealToggle = () => {
    const $reveal = revealRef.current

    if ($reveal.timeline.progress() > 0) {
      revealClose()
    } else {
      revealOpen()
    }
  }

  useUpdateEffect(() => {
    handleRevealToggle()
  }, [reveal])

  useEffect(() => {
    attachTimeline()
  }, [])

  return (
    <Fragment>
      <Button ref={triggerRef} onClick={handleRevealToggle} {...trigger.props}>
        {trigger.label}
      </Button>
      <div
        css={{
          // Take care of overflowing content
          overflow: 'hidden',
          visibility: 'hidden',
          height: 0,
        }}
        className={clsx('CK__Reveal', className)}
        ref={revealRef}
        aria-hidden={reveal ? 'false' : 'true'}
        {...rest}
      >
        <div className={`CK__Reveal__Content ${theme.settings.classes.trim}`}>
          {children}
        </div>
      </div>
    </Fragment>
  )
}

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  reveal: PropTypes.bool,
  /** Animation callback */
  onComplete: PropTypes.func,
  /** Animation callback */
  onReverseComplete: PropTypes.func,
  /** Animation callback */
  onStart: PropTypes.func,
  /**
   * `trigger.props` Accepts all `<Button />` props
   * `trigger.label` acts as `<Button />` child
   */
  trigger: PropTypes.shape({
    props: PropTypes.object,
    label: PropTypes.any.isRequired,
  }),
}

export default Reveal
