 import AppRouter from './routes/AppRouter'
import AuthInitializer from './features/auth/components/AuthInitializer'

const App = () => {
  return (
    <AuthInitializer>
      <AppRouter />
    </AuthInitializer>
  )
}

export default App