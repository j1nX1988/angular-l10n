import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { LocaleDateDirective } from './../../index';
import {
    LocalizationModule,
    LocaleService
} from './../../index';

describe('LocaleDateDirective', () => {

    let comp: LocaleDateComponent;
    let fixture: ComponentFixture<LocaleDateComponent>;
    let des: DebugElement[];
    let els: HTMLElement[] = [];

    let locale: LocaleService;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [LocaleDateComponent],
            imports: [
                LocalizationModule.forRoot()
            ]
        }).createComponent(LocaleDateComponent);

        comp = fixture.componentInstance;

        locale = TestBed.get(LocaleService);

        locale.addConfiguration()
            .disableStorage()
            .defineDefaultLocale('en', 'US');
        locale.init();

        fixture.detectChanges();

        des = fixture.debugElement.queryAll(By.directive(LocaleDateDirective));
        for (let i: number = 0; i < des.length; i++) {
            els.push(des[i].nativeElement);
        }
    });

    it('should render localized date', (() => {
        expect(els[0].textContent).toContain("Apr 19, 2017");
        expect(els[1].textContent).toContain("4/19/2017");
    }));

    it('should render localized dates when default locale changes', fakeAsync(() => {
        locale.setDefaultLocale('it', 'IT');

        tick();
        fixture.detectChanges();

        els = [];
        for (let i: number = 0; i < des.length; i++) {
            els.push(des[i].nativeElement);
        }
        expect(els[0].textContent).toContain("19 apr 2017");
        expect(els[1].textContent).toContain("19/4/2017");
    }));

});

@Component({
    template: `
        <p><em>should render localized date</em></p>
        <p localeDate>{{ day }}</p>
        <p localeDate="shortDate">{{ day }}</p>
    `
})
class LocaleDateComponent {

    day: Date = new Date('4/19/2017');

}
