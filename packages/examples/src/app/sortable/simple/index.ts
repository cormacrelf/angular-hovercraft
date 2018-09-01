import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UtilityModule } from "app/utility.module";
import { SkyhookDndModule } from "angular-skyhook";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SkyhookMultiBackendModule } from "angular-skyhook-multi-backend";
import { SkyhookSortableModule } from "angular-skyhook-card-list";

import { SimpleComponent } from "./simple.component";
import { ContainerComponent } from "./container.component";

@NgModule({
    declarations: [
        ContainerComponent,
        SimpleComponent,
    ],
    imports: [
        CommonModule,
        UtilityModule,
        SkyhookDndModule,
        SkyhookMultiBackendModule,
        SkyhookSortableModule,
        RouterModule.forChild([
            { path: "", component: ContainerComponent }
        ])
    ]
})
export class SimpleModule { }