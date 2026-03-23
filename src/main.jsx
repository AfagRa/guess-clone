import { createRoot } from 'react-dom/client'
import { useSyncExternalStore } from 'react'
import './index.css'
import App from './App.jsx'
import { RouterProvider, BrowserRouter } from 'react-router'
import { route } from './router/route.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AdminApp from './admin/AdminApp.jsx'

function subscribeAdminPath(notify) {
  const onPop = () => notify()
  window.addEventListener('popstate', onPop)
  const push = history.pushState.bind(history)
  const replace = history.replaceState.bind(history)
  history.pushState = (...args) => {
    push(...args)
    notify()
  }
  history.replaceState = (...args) => {
    replace(...args)
    notify()
  }
  return () => {
    window.removeEventListener('popstate', onPop)
    history.pushState = push
    history.replaceState = replace
  }
}

function getIsAdminPath() {
  return window.location.pathname.startsWith('/admin')
}

function getServerIsAdminPath() {
  return false
}

const Root = () => {
  const isAdmin = useSyncExternalStore(
    subscribeAdminPath,
    getIsAdminPath,
    getServerIsAdminPath
  )

  if (isAdmin) {
    return (
      <BrowserRouter basename="/admin">
        <AdminApp />
      </BrowserRouter>
    )
  }

  return (
    <RouterProvider router={route}>
      <App />
    </RouterProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Root />
  </Provider>
)
