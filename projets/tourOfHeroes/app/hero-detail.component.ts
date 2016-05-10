import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import {Router} from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import {HeroesComponent} from "./heroes.component";

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(
        private _heroService: HeroService,
        private _routeParams: RouteParams,
        private router:Router) {
    }

    ngOnInit() {
        let id = +this._routeParams.get('id');
        if (id == 0)
        {
            id = this._heroService.addNewHero();
        }
        this._heroService.getHero(id)
            .then(
                hero =>
                {
                    this.hero = hero;
                    if (this.hero == undefined)
                    {
                        console.warn("Id inexistant");
                        this.router.navigate(['Heroes']);
                    }
                });
    }

    goBack() {
        window.history.back();
        this._heroService.saveHeroesInLocalStorage();
    }

    deleteThisHero()
    {
        let id = +this._routeParams.get('id');
        this._heroService.deleteHero(id);
        this._heroService.saveHeroesInLocalStorage();
        window.history.back();
    }
}
