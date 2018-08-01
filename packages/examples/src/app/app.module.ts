import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

/* Note:
 * Angular in AOT mode isn't capable of doing plain `import XXX from 'package-xxx'` imports.
 * Most existing backends follow the convention of doing default exports only, so in Angular
 * you should use `import { default as XXX } from 'package-xxx'` to import them.
 */
// import { default as HTML5Backend } from 'react-dnd-html5-backend'
// import { default as TouchBackend } from 'react-dnd-touch-backend';

// some examples here

// import { default as MouseBackend } from 'react-dnd-mouse-backend';
// import { default as TouchBackend } from 'react-dnd-touch-backend';
// import { default as MultiBackend } from 'react-dnd-multi-backend';
// import { default as HTML5toTouch } from 'react-dnd-multi-backend/lib/HTML5toTouch';

import { PreloadAllModules } from '@angular/router';
// this is our own adaptation of dnd-multi-backend. will be published eventually
import { UtilityModule } from './utility.module';
import { TestComponent } from './test/test.component';
import { StoreRootModule, StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { SkyhookDndModule } from 'angular-skyhook';
import { routes } from './routes';
import { customMultiBackend } from './customMultiBackend';

@NgModule({
    declarations: [AppComponent, TestComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UtilityModule,
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            useHash: true
        }),
        StoreRootModule,
        SkyhookDndModule.forRoot({ backendFactory: customMultiBackend }),
        StoreModule.forRoot(reducers, { metaReducers }),
        // !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects])
        // SkyhookDndModule.forRoot({ backend: TouchBackend }),
        // SkyhookDndModule.forRoot({ backend: MouseBackend }),
    ],
    providers: [
        // { provide: DRAG_DROP_BACKEND, useFactory: backendFactory },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
