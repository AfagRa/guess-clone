import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { route } from './router/route.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'

console.log('🛒 Redux store:', store);


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={route}>
      <App />
    </RouterProvider>
  </Provider>
)
