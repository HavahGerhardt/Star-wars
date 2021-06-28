/**
 * Planet
 */
export class Planet {
    name; // string -- The name of this planet.
    diameter; // string -- The diameter of this planet in kilometers.
    rotation_period; // string -- The number of standard hours it takes for this planet to complete a single rotation on its axis.
    orbital_period; // string -- The number of standard days it takes for this planet to complete a single orbit of its local star.
    gravity; // string -- A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.
    population; // string -- The average population of sentient beings inhabiting this planet.
    climate; // string -- The climate of this planet. Comma separated if diverse.
    terrain; // string -- The terrain of this planet. Comma separated if diverse.
    surface_water; // string -- The percentage of the planet surface that is naturally occurring water or bodies of water.
    residents; // array -- An array of People URL Resources that live on this planet.
    films; // array -- An array of Film URL Resources that this planet has appeared in.
    type = "planets";
    id;

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    shortInfo() {
        return (
            <div>
                <h2>{this.name}</h2>
                <p>Diameter: {this.diameter} km</p>
                <p>Population: {this.population}</p>
                <p>Climate: {this.climate}</p>
            </div>
        );
    }

    detailedInfo() {
        return (
            <div>
                <h2>{this.name}</h2>
                <p>Diameter: {this.diameter} km</p>
                <p>Rotation period: {this.rotation_period} hours</p>
                <p>Orbital period: {this.orbital_period} days</p>
                <p>Gravity: {this.gravity} Gs</p>
                <p>Population: {this.population}</p>
                <p>Climate: {this.climate}</p>
                <p>Surface water: {this.surface_water}%</p>
            </div>
        );
    }
}
