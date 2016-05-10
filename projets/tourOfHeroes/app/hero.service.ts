import {Injectable} from 'angular2/core';
import {HEROES} from './mock-heroes';
import {Hero} from "./hero";

@Injectable()
export class HeroService
{
    getHeroes()
    {
        if(localStorage.getItem("heroes") == undefined)
            return Promise.resolve(HEROES);
        else
            return Promise.resolve(JSON.parse(localStorage.getItem("heroes")));
    }

    getHero(id: number) {
        return Promise.resolve(HEROES).then(
            heroes => heroes.filter(hero => hero.id === id)[0]
        );
    }

    deleteHero(id: number)
    {
        var index;
        for (let i=0; i<HEROES.length; i++)
        {
            if(HEROES[i].id === id)
                index = i;
        }
        HEROES.splice(index, 1);
    }

    addNewHero()
    {
        var index = HEROES[HEROES.length-1].id +1;
        HEROES.push({"id": index, "name": "Hero no " + index});
        return HEROES[HEROES.length-1].id;
    }

    saveHeroesInLocalStorage()
    {
        localStorage.setItem("heroes",JSON.stringify(HEROES));
    }
}