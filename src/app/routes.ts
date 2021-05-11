import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { InventoryCreateComponent } from './home/inventory-create/inventory-create.component';
import { InventoryEditComponent } from './home/inventory-edit/inventory-edit.component';
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {},
        data: {
            name: 'Home'
        }
    },
    {
        path: 'signIn',
        component: SignInComponent,
        resolve: {},
        data: {
            name: 'signIn'
        }
    },
    {
        path: 'inventory-edit/:id',
        component: InventoryEditComponent,
        resolve: {},
        data: {
            name: 'inventory-edit'
        }
    },
    {
        path: 'inventory-create',
        component: InventoryCreateComponent,
        resolve: {},
        data: {
            name: 'inventory-create'
        }
    },
    {
        path: 'users',
        component: UserComponent,
        resolve: {},
        data: {
            name: 'users'
        }
    },
    {
        path: 'user-create',
        component: UserCreateComponent,
        resolve: {},
        data: {
            name: 'user-create'
        }
    },
    {
        path: 'user-edit/:id',
        component: UserEditComponent,
        resolve: {},
        data: {
            name: 'user-edit'
        }
    }
];

export const routerModule = RouterModule.forRoot(routes);

