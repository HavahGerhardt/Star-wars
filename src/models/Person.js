/**
 * Person
 */
export class Person {
    name;
    birth_year;
    eye_color; // "n/a" if the person does not have an eye.
    gender; // "unknown", "n/a" if the person does not have a gender.
    hair_color; // Will be "unknown" if not known or "n/a" if the person does not have hair.
    height; // centimeters.
    mass; // kilograms.
    skin_color;
    homeworld; // The URL of a planet resource, a planet that this person was born on or inhabits.
    films; // An array of film resource URLs that this person has been in.
    species; // An array of species resource URLs that this person belongs to.
    speciesObjArr = [];
    starships; // An array of starship resource URLs that this person has piloted.
    vehicles; // An array of vehicle resource URLs that this person has piloted.
    type = "people";
    id;

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    shortInfo() {
        return (
            <div>
                <h2>{this.name}</h2>
                <p>Birth year: {this.birth_year}</p>
                {this.gender && <p>Gender: {this.gender}</p>}
            </div>
        );
    }

    detailedInfo() {
        return (
            <div>
                <h2>{this.name}</h2>
                <p>Birth year: {this.birth_year}</p>
                {this.eye_color && <p>Eye color: {this.eye_color}</p>}
                {this.gender && <p>Gender: {this.gender}</p>}
                {this.hair_color && <p>Hair color: {this.hair_color}</p>}
                <p>Height: {this.height} cm</p>
                <p>Mass: {this.mass} kg</p>
                <p>Skin color: {this.skin_color}</p>
            </div>
        );
    }
}
