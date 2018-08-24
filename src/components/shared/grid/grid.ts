import { Component, Input, OnChanges, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material';


@Component({
    selector: 'app-component-shared-grid',
    templateUrl: './grid.html',
    styleUrls: [ './grid.scss' ],
})

export class ComponentSharedGrid implements OnChanges, OnInit, AfterViewInit {

    public draggable;
    public filterModel: any = {};
    public filteredData: any[] = [];
    public range: any = 0;
    public limitRange: number;
    public status: {};
    public changestatus: {};

    @Input('loadingData') loadingData: Boolean;
    public dataClone: any[] = [];
    @ViewChild(MatPaginator) paginador: MatPaginator;
    @Input('data') data: any[] = [];
    @Input('config') config: {
         headBoard: {
            id: string,
            title: String,
            orderFilter?: Boolean,
            viewMore?: boolean,
            viewAction?: Boolean,
            orderType?: String,
            items?:
                {
                    id: number,
                    title: String,
                }[],
        }[],
        action: {
            edit?: Boolean,
            sum?: Boolean,
            res?: Boolean,
            cant?: Boolean,
            changeState?: Boolean,
            delete?: Boolean,
            viewItem?: Boolean
        },
        pageSize?: number,
        dragAndDrop?: Boolean
    };
    @Output() selectItem = new EventEmitter();
    @Output() editItem = new EventEmitter();
    @Output() sumItem = new EventEmitter();
    @Output() cantItem = new EventEmitter();
    @Output() resItem = new EventEmitter();
    @Output() deleteItem = new EventEmitter();
    @Output() changeStateItem = new EventEmitter();
    @Output() changeTheOrder = new EventEmitter();


    constructor() {
        this.changestatus = {0 : 'SHARED.DRAF', 1 : 'SHARED.DRAF', 2: 'SHARED.ACTIVE'};
        this.draggable = true;
    }

    ngOnInit(): void {
        this.config.headBoard.forEach((head, key) => {
            if (head.orderFilter) {
                this.config.headBoard[key].orderType = 'ASC';
            }
        });
    }

    ngAfterViewInit() {
        this.limitRange = this.config.pageSize;
    }

    ngOnChanges(changes) {
        if (changes.data && changes.data.currentValue !== undefined) {
            this.filterList();
            if (!this.draggable) {
                this.dataClone = this.data;
            }
        }
    }

    public changePage(event): void {
        this.range = event.pageIndex * event.pageSize;
        this.limitRange = this.range + event.pageSize;
    }

    public filterList(): void {
        this.filteredData = this.data;
        if (this.filteredData.length > 0) {
            // console.log('El fistpage es--->', this.paginador.firstPage());
            // this.paginador.firstPage();
        }
        if (this.filterModel['global']) {
                this.filteredData = this.filteredData.filter(item => {
                    return this.config.headBoard.some((head) => {
                        return (item[head['id']].toString().toLowerCase().indexOf(this.filterModel['global'].toLowerCase()) > -1);
                    });
                });
        }
        this.config.headBoard.forEach((head) => {
            if (this.filterModel[head.id] !== '' && this.filterModel[head.id] !== undefined) {
                this.filteredData = this.filteredData.filter(item => {
                    if (item[head.id].id >= 0) {
                        return (item[head['id']].id.toString().toLowerCase().indexOf(this.filterModel[head.id].toLowerCase()) > -1);
                    } else {
                        return (item[head['id']].toString().toLowerCase().indexOf(this.filterModel[head.id].toLowerCase()) > -1);
                    }
                });
            }
        });
    }

    public orderField(index, key): void {
        const order = this.config.headBoard[index].orderType;
        this.filteredData.sort(function(a, b) {
            if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                return (order === 'DESC') ? b[key].localeCompare(a[key]) : a[key].localeCompare(b[key]);
            } else {
                if (a[key].id >= 0 && b[key].id >= 0) {
                    return (order === 'DESC') ? b[key].id - a[key].id : a[key].id - b[key].id;
                }
                return (order === 'DESC') ? b[key] - a[key] : a[key] - b[key];
            }
        });
        this.config.headBoard[index].orderType = (this.config.headBoard[index].orderType === 'DESC') ? 'ASC' : 'DESC';
    }

    public changeOrder(): void {
        const changeInData: any[] = [];
        this.data.forEach((data, index) => {
            data.order = index;
        });
        this.data.forEach((data, index) => {
            if (data.order !== this.dataClone[index].order) {
                changeInData.push(data);
            }
        });
        if (changeInData.length > 0) {
            this.changeTheOrder.emit(changeInData);
        }
        this.dataClone = [];
    }

    public createClonData(): void {
        this.dataClone = (this.dataClone.length > 0) ? this.dataClone : [...this.data];
    }

    public changeBooleanDraggable(): void {
        this.draggable = !this.draggable;
    }

}
