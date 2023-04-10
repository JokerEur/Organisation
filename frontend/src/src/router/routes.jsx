import About from "../pages/About";
import Auth from "../pages/Auth";
import Object from "../pages/Object";
import Home from "../pages/Home";
import Protocol from "../pages/Protocol";

export const privateRoutes = [
    {path: '/about', component: About, exact: true},
    {path: '/object/:id', component: Object, exact: true},
    {path: '/', component: Home, exact: true},
    {path: '/protocol', component: Protocol, exact: true},
]



export const publicRoutes = [
    {path: '/auth', component: Auth, exact: true},
]
