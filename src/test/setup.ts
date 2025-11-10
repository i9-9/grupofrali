import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpiar después de cada test
afterEach(() => {
  cleanup()
})

// Extender expect con matchers de jest-dom
expect.extend({
  // Los matchers de jest-dom ya están disponibles a través de '@testing-library/jest-dom'
})



