import {
    generatePreservedRoutes,
    generateRegularRoutes
} from '@generouted/solid-router/core'

import { Router, type RouteDefinition, type RouteLoadFunc, type RouteLoadFuncArgs } from '@solidjs/router'
import { ErrorBoundary, JSX, lazy, Show, Suspense, type Component, type ParentComponent } from 'solid-js'
import { createComponent as _$createComponent } from 'solid-js/web'

type Module = {
    default: Component<any>
    Pending?: Component<any>
    Catch?: any
    Loader?: RouteLoadFunc
    Action?: any
}
type BaseRoute = {
    id?: string;
    path?: string;
    children?: BaseRoute[];
} & Record<string, any>;

//export type RouteLoadFunc<T = unknown> = (args: RouteLoadFuncArgs) => T;

var PRESERVED = import.meta.glob<Module>('/src/pages/(_app|404).{jsx,tsx}', { eager: true })
var ROUTES = import.meta.glob<Module>([
    '/src/pages/**/[\\w[-]*.{jsx,tsx,mdx}',
    '!/src/pages/**/(_!(layout)*(/*)?|_app|404)*'
])

var preservedRoutes = generatePreservedRoutes<Omit<Module, 'action'>>(PRESERVED)


var regularRoutes = generateRegularRoutes<BaseRoute, () => Promise<Module>>(ROUTES, (module) => {
    const Default2 = lazy(module)
    const Pending2 = lazy(() => module().then((module2) => ({ default: module2?.Pending || Fragment })))
    const Catch2 = lazy(() => module().then((module2) => ({ default: module2?.Catch || Fragment })))

    const Page: Component = (props) => _$createComponent(Suspense, {
        get fallback() {
            return _$createComponent(Pending2, {})
        },
        get children() {
            return _$createComponent(Default2, props)
        }
    })

    const Component: Component = (props) => _$createComponent(ErrorBoundary, {
        fallback: (error, reset) => Catch2({ error, reset }),
        get children() { return _$createComponent(Page, props) }
    })

    return {
        component: Component,
        load: (args: RouteLoadFuncArgs) => module().then((mod) => mod?.Loader?.(args) || void 0)
    }
})

var _app = preservedRoutes?.['_app']
var _404 = preservedRoutes?.['404']

var Fragment: ParentComponent = (props) => props?.children
var Default = _app?.default || Fragment
var Pending = _app?.Pending || Fragment
var Catch = preservedRoutes?.['_app']?.Catch

var Layout: Component = (props) => [
    _$createComponent(Default, props),
    ' ',
]

var App: Component = (props) =>
    _$createComponent(ErrorBoundary, {
        fallback: (error, reset) =>
            Catch?.({
                error,
                reset
            }),
        get children() {
            return _$createComponent(Show, {
                get when() { return _app?.Pending },
                get fallback() { return _$createComponent(Layout, props) },
                get children() {
                    return _$createComponent(Suspense, {
                        get fallback() { return _$createComponent(Pending, {}) },
                        get children() { return _$createComponent(Layout, props) }
                    })
                },
                keyed: true
            })
        }
    })

var app: RouteDefinition = {
    path: '',
    component: _app?.default ? App : Layout,
    load: _app?.Loader || void 0
}

var fallback: RouteDefinition = {
    path: '*',
    component: _404?.default || Fragment
}

var routes: RouteDefinition[] = [
    {
        ...app,
        children: [...regularRoutes, fallback]
    }
]

var Routes = (): JSX.Element =>
    _$createComponent(Router, {
        children: routes,
        base: "/map"
    })

export { Routes, routes }
