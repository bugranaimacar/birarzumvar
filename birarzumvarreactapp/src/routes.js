import AdminLogin from "./Pages/AdminLogin";
import Home from "./Pages/Home";
import Messages from "./Pages/Messages";
import NotFound from "./Pages/NotFound";
import SendMessage from "./Pages/SendMessage";

const routes = [
    {
      path: '/',
      component: Home,
      exact: true,
      admin: false,
      name: "Ana Sayfa"
    },
    {
        path: '/admin/messages',
        component: Messages,
        exact: true,
        admin: true,
        name: "Mesajlar"
    },
    {
        path: '/sendmessage',
        component: SendMessage,
        exact: true,
        admin: false,
        name: "Arzunu Söyle"
    },
    {
      path: '/login',
      component: AdminLogin,
      exact: true,
      admin: false,
      name: "Yetkili Giriş"
    },
    {
      path: '*',
      component: NotFound,
      exact: true,
      admin: false,
      name: ""
    }
  ]

export default routes;