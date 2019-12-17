import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../service/modal-service';

@Component({
    selector : 'w3-modal',
    template : `<div class="w3-modal">
                    <div class ="w3-modal-content">
                        <ng-content></ng-content>
                    </div>
                </div>
                <div class ="w3-modal-background"></div>`
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id : string;
    private element : any;

    constructor(private modalService: ModalService, private el: ElementRef){
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        if(!this.id)
        {
            console.error('modal must have an ID');
            return;
        }

        document.body.appendChild(this.element);

        this.element.addEventListener('click', function (e: any) {
            if (e.target.ClassName == 'w3-modal') {
                modal.close();
            }
        });

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    open(): void {
        this.element.style.display ='block';
        document.body.classList.add('w3-modal-open');
    }

    close(): void {
        this.element.style.display ='none';
        document.body.classList.remove('w3-modal-open');
    }
}