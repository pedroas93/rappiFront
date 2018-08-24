import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class Loading {
    public visible = new BehaviorSubject<Boolean>(false);
    constructor() {}

    public show() {
        this.visible.next(true);
    }

    public hide() {
        this.visible.next(false);
    }

}
