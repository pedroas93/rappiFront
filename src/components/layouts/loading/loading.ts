import { Component } from '@angular/core';
import { Loading } from 'providers/loading/Loading';


@Component({
    selector: 'app-component-layouts-loading',
    templateUrl: './loading.html',
    styleUrls: [ './loading.scss' ]
})
export class ComponentLayoutsLoading {
    showModal: Boolean;
    constructor(private loading: Loading) {
        loading.visible.subscribe((visible) => {
            this.showModal = visible;
        });
    }


}
