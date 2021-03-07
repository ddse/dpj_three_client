import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';

//
// import CategoryPage from '@/pages/Category/Category';
import CategoriesPage from '@/pages/Categories/Categories';

import ProductPage from '@/pages/Products/Product';
import ProductPageDetail from '@/pages/Products/ProductDetail';

import PurchasePage from '@/pages/Purchases/Purchase';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/error',
            name: 'Error',
            component: ErrorPage,
        },
        {
            path: '/app',
            name: 'Layout',
            component: Layout,
            children: [{
                    path: 'dashboard',
                    name: 'AnalyticsPage',
                    component: AnalyticsPage,
                },
                {
                    path: 'typography',
                    name: 'TypographyPage',
                    component: TypographyPage,
                },
                {
                    path: 'components/icons',
                    name: 'IconsPage',
                    component: IconsPage,
                },
                {
                    path: 'notifications',
                    name: 'NotificationsPage',
                    component: NotificationsPage,
                },
                {
                    path: 'components/charts',
                    name: 'ChartsPage',
                    component: ChartsPage,
                },
                {
                    path: 'tables',
                    name: 'TablesBasicPage',
                    component: TablesBasicPage,
                },
                {
                    path: 'components/maps',
                    name: 'GoogleMapPage',
                    component: GoogleMapPage,
                },
                {
                    path: 'category',
                    name: 'Category',
                    component: CategoriesPage,
                },
                {
                    path: 'product',
                    name: 'Product',
                    component: ProductPage,
                },
                {
                    path: 'product-detail',
                    name: 'ProductDetail',
                    component: ProductPageDetail,
                },
                {
                    path: 'purchase',
                    name: 'Purchase',
                    component: PurchasePage,
                },
            ],
        },
    ],
});