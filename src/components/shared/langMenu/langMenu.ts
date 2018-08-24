import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-lang-menu',
    templateUrl: './langMenu.html',
    styleUrls: ['./langMenu.scss']
})
export class ComponentLangMenu implements OnInit {

    public lang: string;

    constructor(public translate: TranslateService) { }

    ngOnInit() { }

    public setLang(lang: string): void {
        this.translate.setDefaultLang(lang);
    }
}
