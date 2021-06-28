/**
 * Film
 */
export class Film {
    title;
    episode_id;
    opening_crawl;
    director;
    producer;
    release_date;
    species;
    starships;
    vehicles;
    characters;
    planets;
    type = "films";
    id;
    
    // Get film title (all other object has "name" property)
    get name() {
        return this.title;
    }

    constructor(obj) {
        obj && Object.assign(this, obj); // Copy object properties to Film
        this.release_date = this.convertDate(this.release_date);
    }

    /**
     * Pad a number with zeros
     * @param {*} number
     * @returns
     */
    paddingZeros(number) {
        return ("0" + number).slice(-2);
    }

    /**
     * Convert date to 'dd-mm-yyyy' format
     * @param {*} dateStr
     * @returns
     */
    convertDate(dateStr) {
        let timeStamp = Date.parse(dateStr);
        // Invalid date
        if (isNaN(+timeStamp)) return false;
        let date = new Date(timeStamp);
        return `${this.paddingZeros(date.getDay())}-${this.paddingZeros(
            date.getMonth() + 1
        )}-${date.getFullYear()}`;
    }

    shortInfo() {
        return (
            <div>
                <h2>
                    {this.title} - Episode {this.episode_id}
                </h2>
                {this.release_date && <p>{this.release_date}</p>}
                {this.director && 
                <p>Director: {this.director} - Producer: {this.producer}</p>}
            </div>
        );
    }

    detailedInfo() {
        return (
            <div>
                <h2>{this.title}</h2>
                <p>Director: {this.director}</p>
                <p>Producer: {this.producer}</p>
                <p>Episode: {this.episode_id}</p>
                {this.release_date && <p>Released on: {this.release_date}</p>}
                <p>{this.opening_crawl}</p>
            </div>
        );
    }
}
