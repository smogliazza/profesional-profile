import { useEffect } from 'react'
import { useTheme } from './theme/ThemeProvider'
import { VARIANT_COMPONENTS } from './variants'
import { VariantSwitcher } from './components/VariantSwitcher'
import { profile } from './lib/useProfile'

export default function App() {
  const { variant } = useTheme()
  const Variant = VARIANT_COMPONENTS[variant]

  useEffect(() => {
    document.title = `${profile.basics.name} — ${profile.basics.label}`
  }, [])

  return (
    <>
      {/* key forces a remount, so entrance animations replay on style change */}
      <Variant key={variant} />
      <VariantSwitcher />
    </>
  )
}
