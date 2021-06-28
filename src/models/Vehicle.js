/**
 * Vehicle
 */
export class Vehicle {
    name; // string -- The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".
    model; // string -- The model or official name of this vehicle. Such as "All-Terrain Attack Transport".
    vehicle_class; // string -- The class of this vehicle, such as "Wheeled" or "Repulsorcraft".
    manufacturer; // string -- The manufacturer of this vehicle. Comma separated if more than one.
    length; // string -- The length of this vehicle in meters.
    cost_in_credits; // string -- The cost of this vehicle new, in Galactic Credits.
    crew; // string -- The number of personnel needed to run or pilot this vehicle.
    passengers; // string -- The number of non-essential people this vehicle can transport.
    max_atmosphering_speed; // string -- The maximum speed of this vehicle in the atmosphere.
    cargo_capacity; // string -- The maximum number of kilograms that this vehicle can transport.
    consumables; // *string The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply.
    films; // array -- An array of Film URL Resources that this vehicle has appeared in.
    pilots; // array -- An array of People URL Resources that this vehicle has been piloted by.
    type = "vehicles";
    id;

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    shortInfo() {
        return (
            <div>
                <h2>{this.name}</h2>
                <p>Model: {this.model}</p>
                <p>Vehicle class: {this.vehicle_class}</p>
                <p>Manufacturer: {this.manufacturer}</p>
                <p>Cost in credits: {this.cost_in_credits} years</p>
            </div>
        );
    }

    detailedInfo() {
        return (
            <div>
                <h2>{this.name}</h2>
                <p>Model: {this.model}</p>
                <p>Vehicle class: {this.vehicle_class}</p>
                <p>Manufacturer: {this.manufacturer}</p>
                <p>Cost in credits: {this.cost_in_credits} years</p>
                <p>Crew: {this.crew}</p>
                <p>Length: {this.length} m</p>
                <p>Passengers: {this.passengers}</p>
                <p>Max atmosphering speed: {this.max_atmosphering_speed}</p>
                <p>MGLT: {this.MGLT}</p>
                <p>Cargo capacity: {this.cargo_capacity}</p>
                <p>Consumables: {this.consumables}</p>
            </div>
        );
    }
}
