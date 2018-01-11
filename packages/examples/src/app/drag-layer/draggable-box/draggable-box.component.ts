import { Component, Input } from '@angular/core';
import { SkyhookDndService, DragPreviewOptions } from 'angular-skyhook';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { map } from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-draggable-box',
  template: `
  <div class="draggable-box" [dragSource]="source" [ngStyle]="getStyles(isDragging$|async)" >
    <app-box [title]="title"></app-box>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableBoxComponent {

  @Input() id;
  @Input() title;
  @Input() left;
  @Input() top;

  source = this.dnd.dragSource('BOX', {
    beginDrag: () => {
      const  { id, title, left, top } = this;
      return { id, title, left, top };
    }
  });

  isDragging$ = this.source.listen(m => m.isDragging());

  constructor(private dnd: SkyhookDndService) { }

  ngOnInit() {
    this.source.connect(c => c.dragPreview(getEmptyImage(), {
      // for ie11 compat with DragLayer
      captureDraggingState: true
    }));
  }

  ngOnDestroy() {
    this.source.unsubscribe();
  }

  getStyles(isDragging: boolean) {
    const { left, top } = this;
    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
      position: 'absolute',
      transform,
      WebkitTransform: transform,
      // hide the original element while dragging
      opacity: isDragging ? 0 : null,
      height: isDragging ? 0 : null
    };
  }

}
