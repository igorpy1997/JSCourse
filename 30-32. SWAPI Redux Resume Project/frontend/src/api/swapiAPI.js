class SwapiAPI {
    constructor() {
        this.baseURL = 'https://swapi.dev/api'; // Keep for reference
        console.log('🌟 SWAPI Mock Data Service initialized - Demo Mode');
    }

    // Simulate realistic API delay
    async simulateDelay(ms = 300 + Math.random() * 200) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async request(url) {
        await this.simulateDelay();
        console.log(`🚀 Mock API call: ${url}`);
        return this.getMockResponse(url);
    }

    getMockResponse(url) {
        if (url.includes('/people')) {
            if (url.includes('search=')) {
                const query = decodeURIComponent(url.split('search=')[1]);
                return this.searchMockPeople(query);
            }
            const page = parseInt(url.match(/page=(\d+)/)?.[1] || '1');
            return this.getMockPeople(page);
        }

        if (url.includes('/planets')) {
            if (url.includes('search=')) {
                const query = decodeURIComponent(url.split('search=')[1]);
                return this.searchMockPlanets(query);
            }
            const page = parseInt(url.match(/page=(\d+)/)?.[1] || '1');
            return this.getMockPlanets(page);
        }

        if (url.includes('/starships')) {
            if (url.includes('search=')) {
                const query = decodeURIComponent(url.split('search=')[1]);
                return this.searchMockStarships(query);
            }
            const page = parseInt(url.match(/page=(\d+)/)?.[1] || '1');
            return this.getMockStarships(page);
        }

        if (url.includes('/films')) {
            return this.getMockFilms();
        }

        return { results: [], count: 0 };
    }

    getMockPeople(page = 1) {
        const allPeople = [
            {
                name: "Luke Skywalker",
                height: "172",
                mass: "77",
                hair_color: "blond",
                skin_color: "fair",
                eye_color: "blue",
                birth_year: "19BBY",
                gender: "male",
                url: "https://swapi.dev/api/people/1/"
            },
            {
                name: "Darth Vader",
                height: "202",
                mass: "136",
                hair_color: "none",
                skin_color: "white",
                eye_color: "yellow",
                birth_year: "41.9BBY",
                gender: "male",
                url: "https://swapi.dev/api/people/4/"
            },
            {
                name: "Leia Organa",
                height: "150",
                mass: "49",
                hair_color: "brown",
                skin_color: "light",
                eye_color: "brown",
                birth_year: "19BBY",
                gender: "female",
                url: "https://swapi.dev/api/people/5/"
            },
            {
                name: "Obi-Wan Kenobi",
                height: "182",
                mass: "77",
                hair_color: "auburn, white",
                skin_color: "fair",
                eye_color: "blue-gray",
                birth_year: "57BBY",
                gender: "male",
                url: "https://swapi.dev/api/people/10/"
            },
            {
                name: "Yoda",
                height: "66",
                mass: "17",
                hair_color: "white",
                skin_color: "green",
                eye_color: "brown",
                birth_year: "896BBY",
                gender: "male",
                url: "https://swapi.dev/api/people/20/"
            },
            {
                name: "Han Solo",
                height: "180",
                mass: "80",
                hair_color: "brown",
                skin_color: "fair",
                eye_color: "brown",
                birth_year: "29BBY",
                gender: "male",
                url: "https://swapi.dev/api/people/14/"
            },
            {
                name: "Chewbacca",
                height: "228",
                mass: "112",
                hair_color: "brown",
                skin_color: "unknown",
                eye_color: "blue",
                birth_year: "200BBY",
                gender: "male",
                url: "https://swapi.dev/api/people/13/"
            },
            {
                name: "R2-D2",
                height: "96",
                mass: "32",
                hair_color: "n/a",
                skin_color: "white, blue",
                eye_color: "red",
                birth_year: "33BBY",
                gender: "n/a",
                url: "https://swapi.dev/api/people/3/"
            },
            {
                name: "C-3PO",
                height: "167",
                mass: "75",
                hair_color: "n/a",
                skin_color: "gold",
                eye_color: "yellow",
                birth_year: "112BBY",
                gender: "n/a",
                url: "https://swapi.dev/api/people/2/"
            },
            {
                name: "Padmé Amidala",
                height: "165",
                mass: "45",
                hair_color: "brown",
                skin_color: "light",
                eye_color: "brown",
                birth_year: "46BBY",
                gender: "female",
                url: "https://swapi.dev/api/people/27/"
            }
        ];

        const itemsPerPage = 4;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const results = allPeople.slice(startIndex, endIndex);

        return {
            count: allPeople.length,
            next: endIndex < allPeople.length ? `page=${page + 1}` : null,
            previous: page > 1 ? `page=${page - 1}` : null,
            results: results
        };
    }

    getMockPlanets(page = 1) {
        const allPlanets = [
            {
                name: "Tatooine",
                rotation_period: "23",
                orbital_period: "304",
                diameter: "10465",
                climate: "arid",
                gravity: "1 standard",
                terrain: "desert",
                surface_water: "1",
                population: "200000",
                url: "https://swapi.dev/api/planets/1/"
            },
            {
                name: "Alderaan",
                rotation_period: "24",
                orbital_period: "364",
                diameter: "12500",
                climate: "temperate",
                gravity: "1 standard",
                terrain: "grasslands, mountains",
                surface_water: "40",
                population: "2000000000",
                url: "https://swapi.dev/api/planets/2/"
            },
            {
                name: "Yavin IV",
                rotation_period: "24",
                orbital_period: "4818",
                diameter: "10200",
                climate: "temperate, tropical",
                gravity: "1 standard",
                terrain: "jungle, rainforests",
                surface_water: "8",
                population: "1000",
                url: "https://swapi.dev/api/planets/3/"
            },
            {
                name: "Hoth",
                rotation_period: "23",
                orbital_period: "549",
                diameter: "7200",
                climate: "frozen",
                gravity: "1.1 standard",
                terrain: "tundra, ice caves, mountain ranges",
                surface_water: "100",
                population: "unknown",
                url: "https://swapi.dev/api/planets/4/"
            },
            {
                name: "Dagobah",
                rotation_period: "23",
                orbital_period: "341",
                diameter: "8900",
                climate: "murky",
                gravity: "N/A",
                terrain: "swamp, jungles",
                surface_water: "8",
                population: "unknown",
                url: "https://swapi.dev/api/planets/5/"
            },
            {
                name: "Bespin",
                rotation_period: "12",
                orbital_period: "5110",
                diameter: "118000",
                climate: "temperate",
                gravity: "1.5 standard",
                terrain: "gas giant",
                surface_water: "0",
                population: "6000000",
                url: "https://swapi.dev/api/planets/6/"
            },
            {
                name: "Endor",
                rotation_period: "18",
                orbital_period: "402",
                diameter: "4900",
                climate: "temperate",
                gravity: "0.85 standard",
                terrain: "forests, mountains, lakes",
                surface_water: "8",
                population: "30000000",
                url: "https://swapi.dev/api/planets/7/"
            },
            {
                name: "Naboo",
                rotation_period: "26",
                orbital_period: "312",
                diameter: "12120",
                climate: "temperate",
                gravity: "1 standard",
                terrain: "grassy hills, swamps, forests, mountains",
                surface_water: "12",
                population: "4500000000",
                url: "https://swapi.dev/api/planets/8/"
            }
        ];

        const itemsPerPage = 4;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const results = allPlanets.slice(startIndex, endIndex);

        return {
            count: allPlanets.length,
            next: endIndex < allPlanets.length ? `page=${page + 1}` : null,
            previous: page > 1 ? `page=${page - 1}` : null,
            results: results
        };
    }

    getMockStarships(page = 1) {
        const allStarships = [
            {
                name: "Death Star",
                model: "DS-1 Orbital Battle Station",
                manufacturer: "Imperial Department of Military Research, Sienar Fleet Systems",
                cost_in_credits: "1000000000000",
                length: "120000",
                max_atmosphering_speed: "n/a",
                crew: "342953",
                passengers: "843342",
                cargo_capacity: "1000000000000",
                consumables: "3 years",
                hyperdrive_rating: "4.0",
                MGLT: "10",
                starship_class: "Deep Space Mobile Battlestation",
                url: "https://swapi.dev/api/starships/9/"
            },
            {
                name: "Millennium Falcon",
                model: "YT-1300 light freighter",
                manufacturer: "Corellian Engineering Corporation",
                cost_in_credits: "100000",
                length: "34.37",
                max_atmosphering_speed: "1050",
                crew: "4",
                passengers: "6",
                cargo_capacity: "100000",
                consumables: "2 months",
                hyperdrive_rating: "0.5",
                MGLT: "75",
                starship_class: "Light freighter",
                url: "https://swapi.dev/api/starships/10/"
            },
            {
                name: "Y-wing",
                model: "BTL Y-wing",
                manufacturer: "Koensayr Manufacturing",
                cost_in_credits: "134999",
                length: "14",
                max_atmosphering_speed: "1000km",
                crew: "2",
                passengers: "0",
                cargo_capacity: "110",
                consumables: "1 week",
                hyperdrive_rating: "1.0",
                MGLT: "80",
                starship_class: "assault starfighter",
                url: "https://swapi.dev/api/starships/11/"
            },
            {
                name: "X-wing",
                model: "T-65 X-wing",
                manufacturer: "Incom Corporation",
                cost_in_credits: "149999",
                length: "12.5",
                max_atmosphering_speed: "1050",
                crew: "1",
                passengers: "0",
                cargo_capacity: "110",
                consumables: "1 week",
                hyperdrive_rating: "1.0",
                MGLT: "100",
                starship_class: "Starfighter",
                url: "https://swapi.dev/api/starships/12/"
            },
            {
                name: "TIE Advanced x1",
                model: "Twin Ion Engine Advanced x1",
                manufacturer: "Sienar Fleet Systems",
                cost_in_credits: "unknown",
                length: "9.2",
                max_atmosphering_speed: "1200",
                crew: "1",
                passengers: "0",
                cargo_capacity: "150",
                consumables: "5 days",
                hyperdrive_rating: "1.0",
                MGLT: "105",
                starship_class: "Starfighter",
                url: "https://swapi.dev/api/starships/13/"
            },
            {
                name: "Imperial shuttle",
                model: "Lambda-class T-4a shuttle",
                manufacturer: "Sienar Fleet Systems",
                cost_in_credits: "240000",
                length: "20",
                max_atmosphering_speed: "850",
                crew: "6",
                passengers: "20",
                cargo_capacity: "80000",
                consumables: "2 months",
                hyperdrive_rating: "1.0",
                MGLT: "50",
                starship_class: "Armed government transport",
                url: "https://swapi.dev/api/starships/22/"
            }
        ];

        const itemsPerPage = 4;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const results = allStarships.slice(startIndex, endIndex);

        return {
            count: allStarships.length,
            next: endIndex < allStarships.length ? `page=${page + 1}` : null,
            previous: page > 1 ? `page=${page - 1}` : null,
            results: results
        };
    }

    getMockFilms() {
        return {
            count: 6,
            results: [
                {
                    title: "A New Hope",
                    episode_id: 4,
                    opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
                    director: "George Lucas",
                    producer: "Gary Kurtz, Rick McCallum",
                    release_date: "1977-05-25",
                    url: "https://swapi.dev/api/films/1/"
                },
                {
                    title: "The Empire Strikes Back",
                    episode_id: 5,
                    opening_crawl: "It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....",
                    director: "Irvin Kershner",
                    producer: "Gary Kurtz, Rick McCallum",
                    release_date: "1980-05-17",
                    url: "https://swapi.dev/api/films/2/"
                },
                {
                    title: "Return of the Jedi",
                    episode_id: 6,
                    opening_crawl: "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain\r\ndoom for the small band of\r\nrebels struggling to restore\r\nfreedom to the galaxy...",
                    director: "Richard Marquand",
                    producer: "Howard G. Kazanjian, George Lucas, Rick McCallum",
                    release_date: "1983-05-25",
                    url: "https://swapi.dev/api/films/3/"
                },
                {
                    title: "The Phantom Menace",
                    episode_id: 1,
                    opening_crawl: "Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....",
                    director: "George Lucas",
                    producer: "Rick McCallum",
                    release_date: "1999-05-19",
                    url: "https://swapi.dev/api/films/4/"
                },
                {
                    title: "Attack of the Clones",
                    episode_id: 2,
                    opening_crawl: "There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared their\r\nintentions to leave the Republic.\r\n\r\nThis separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\nmade it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\npeace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\nQueen of Naboo, is returning\r\nto the Galactic Senate to vote\r\non the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....",
                    director: "George Lucas",
                    producer: "Rick McCallum",
                    release_date: "2002-05-16",
                    url: "https://swapi.dev/api/films/5/"
                },
                {
                    title: "Revenge of the Sith",
                    episode_id: 3,
                    opening_crawl: "War! The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor....",
                    director: "George Lucas",
                    producer: "Rick McCallum",
                    release_date: "2005-05-19",
                    url: "https://swapi.dev/api/films/6/"
                }
            ]
        };
    }

    // Search methods
    searchMockPeople(query) {
        const allPeople = this.getMockPeople(1);
        const allPeopleExtended = [];

        // Get all people from all pages
        let page = 1;
        while (true) {
            const pageData = this.getMockPeople(page);
            if (pageData.results.length === 0) break;
            allPeopleExtended.push(...pageData.results);
            page++;
        }

        const filtered = allPeopleExtended.filter(person =>
            person.name.toLowerCase().includes(query.toLowerCase())
        );

        return {
            count: filtered.length,
            next: null,
            previous: null,
            results: filtered
        };
    }

    searchMockPlanets(query) {
        const allPlanets = this.getMockPlanets(1);
        const allPlanetsExtended = [];

        let page = 1;
        while (true) {
            const pageData = this.getMockPlanets(page);
            if (pageData.results.length === 0) break;
            allPlanetsExtended.push(...pageData.results);
            page++;
        }

        const filtered = allPlanetsExtended.filter(planet =>
            planet.name.toLowerCase().includes(query.toLowerCase())
        );

        return {
            count: filtered.length,
            next: null,
            previous: null,
            results: filtered
        };
    }

    searchMockStarships(query) {
        const allStarships = this.getMockStarships(1);
        const allStarshipsExtended = [];

        let page = 1;
        while (true) {
            const pageData = this.getMockStarships(page);
            if (pageData.results.length === 0) break;
            allStarshipsExtended.push(...pageData.results);
            page++;
        }

        const filtered = allStarshipsExtended.filter(starship =>
            starship.name.toLowerCase().includes(query.toLowerCase())
        );

        return {
            count: filtered.length,
            next: null,
            previous: null,
            results: filtered
        };
    }

    // Main API methods
    async fetchPeople(page = 1) {
        return this.request(`/people/?page=${page}`);
    }

    async fetchPerson(id) {
        const allPeople = this.getMockPeople(1);
        const person = allPeople.results.find(p => p.url.includes(`/${id}/`));
        if (!person) throw new Error('Person not found');
        await this.simulateDelay();
        return person;
    }

    async searchPeople(query) {
        return this.request(`/people/?search=${encodeURIComponent(query)}`);
    }

    async fetchPlanets(page = 1) {
        return this.request(`/planets/?page=${page}`);
    }

    async fetchPlanet(id) {
        const allPlanets = this.getMockPlanets(1);
        const planet = allPlanets.results.find(p => p.url.includes(`/${id}/`));
        if (!planet) throw new Error('Planet not found');
        await this.simulateDelay();
        return planet;
    }

    async searchPlanets(query) {
        return this.request(`/planets/?search=${encodeURIComponent(query)}`);
    }

    async fetchStarships(page = 1) {
        return this.request(`/starships/?page=${page}`);
    }

    async fetchStarship(id) {
        const allStarships = this.getMockStarships(1);
        const starship = allStarships.results.find(s => s.url.includes(`/${id}/`));
        if (!starship) throw new Error('Starship not found');
        await this.simulateDelay();
        return starship;
    }

    async searchStarships(query) {
        return this.request(`/starships/?search=${encodeURIComponent(query)}`);
    }

    async fetchFilms() {
        return this.request('/films/');
    }

    async fetchFilm(id) {
        const films = this.getMockFilms();
        const film = films.results.find(f => f.url.includes(`/${id}/`));
        if (!film) throw new Error('Film not found');
        await this.simulateDelay();
        return film;
    }

    async searchAll(query) {
        await this.simulateDelay();
        const [people, planets, starships] = await Promise.all([
            this.searchMockPeople(query),
            this.searchMockPlanets(query),
            this.searchMockStarships(query)
        ]);

        return { people, planets, starships };
    }

    async fetchAllCategories() {
        await this.simulateDelay();
        const [people, planets, starships, films] = await Promise.all([
            this.getMockPeople(1),
            this.getMockPlanets(1),
            this.getMockStarships(1),
            this.getMockFilms()
        ]);

        return { people, planets, starships, films };
    }

    extractIdFromUrl(url) {
        if (!url) return null;
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? parseInt(matches[1]) : null;
    }
}

export default SwapiAPI;