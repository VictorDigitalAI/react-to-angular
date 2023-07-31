import {Directive, ElementRef, inject, Input, OnChanges, OnDestroy} from '@angular/core';
import {ComponentProps, createElement, ElementType} from 'react';
import {createRoot} from 'react-dom/client';

@Directive({
    selector: '[reactComponent]'
})
export class ReactComponentDirective implements OnChanges, OnDestroy {
    @Input() reactComponent!: ElementType;
    @Input() props: ComponentProps<ElementType>;

    private root = createRoot(inject(ElementRef).nativeElement);

    ngOnChanges(): void {
        this.root.render(createElement(this.reactComponent, this.props));
    }

    ngOnDestroy(): void {
        this.root.unmount();
    }
}
