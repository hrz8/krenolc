import Home from './pages/Home.svelte'
import AccessManagement from './pages/AccessManagement.svelte'
import NotFound from './pages/NotFound.svelte'

export default {
  '/'                 : Home,
  '/access-management': AccessManagement,
  '*'                 : NotFound
}
