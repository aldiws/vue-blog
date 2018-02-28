import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Category from '@/components/Category'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import ArticleForm from './ArticleForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: 'category',
        name: 'category',
        component: Category,
      },
    ]      
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/profile',
      component: Profile,
    },
    {
			path: '/articles/new',
			component: ArticleForm,
		},

  ]
})
