/**
 * Species
 */
export class Species {
    name; // string -- The name of this species.
    classification; // string -- The classification of this species, such as "mammal" or "reptile".
    designation; // string -- The designation of this species, such as "sentient".
    average_height; // string -- The average height of this species in centimeters.
    average_lifespan; // string -- The average lifespan of this species in years.
    eye_colors; // string -- A comma-separated string of common eye colors for this species, "none" if this species does not typically have eyes.
    hair_colors; // string -- A comma-separated string of common hair colors for this species, "none" if this species does not typically have hair.
    skin_colors; // string -- A comma-separated string of common skin colors for this species, "none" if this species does not typically have skin.
    language; // string -- The language commonly spoken by this species.
    homeworld; // string -- The URL of a planet resource, a planet that this species originates from.
    people; // array -- An array of People URL Resources that are a part of this species.
    films; // array -- An array of Film URL Resources that this species has appeared in.
    type = "species";
    id;

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    shortInfo() {
        return (
            <div>
                <h2>{this.name}</h2>
                <p>Classification: {this.classification}</p>
                <p>Designation: {this.designation}</p>
            </div>
        );
    }

    detailedInfo() {
        return (
            <div>
                <h2>{this.name}</h2>
                <p>Classification: {this.classification}</p>
                <p>Designation: {this.designation}</p>
                <p>Average height: {this.average_height} cm</p>
                <p>Average lifespan: {this.average_lifespan} years</p>
                <p>Eye colors: {this.eye_colors}</p>
                <p>Hair colors: {this.hair_colors}</p>
                <p>Skin color: {this.skin_color}</p>
                <p>Language: {this.language}</p>
            </div>
        );
    }
}
