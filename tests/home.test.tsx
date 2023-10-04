import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'
import { mock } from 'node:test'

vi.mock('@clerk/nextjs', () => {
  const mockedFunctions = {
    auth: () => new Promise((resolve) => resolve({ userId: 'user_' })),
    ClerkProvide: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_',
        fullName: 'Mars',
      },
    }),
  }

  return mockedFunctions
})

test('Home', async () => {
  render(await HomePage())

  expect(screen.getByText('get started')).toBeTruthy()
})
