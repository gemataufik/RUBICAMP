class Car {
    constructor(year, seat, door, warranty, number, tyre) {
        this.hasilNumber = number
        this.hasilSeat = seat,
        this.hasilYear = year
        this.hasilDoor = door
        this.hasilWarranty = warranty,
        this.hasilTyre = tyre
    }
    seat() {
        return this.hasilSeat;
    }
    year() {
        return this.hasilYear;
    }
    door() {
        this.hasilDoor = 4;
        return this.hasilDoor;
    }
    number() {
        return this.hasilNumber
    }
    tyre() {
        return this.hasilTyre
    }
    warranty() {
        this.hasilWarranty = Car.generateRandom(1, 3);
        return this.hasilWarranty;
    }
    static generateRandom(min, max) {
        let diffrence = max - min + 1;
        let random = Math.random();
        random = Math.floor(random * diffrence);
        random = random + min;
        return random;
    }
}


class CarFactory {
    constructor() {
        console.log("Hasil produksi :")
        this.cars = []
    }
    produce(year) {
        const totalAgya = Car.generateRandom(1,5);
        for (let i = 1; i <= totalAgya; i++) {
            const makeAgya = new Agya(year);
            this.cars.push(makeAgya.produceAgya());
        }
        const totalRush = Car.generateRandom(1,5);
        for (let i = 1; i <= totalRush; i++) {
            const makeRush = new Rush(year);
            this.cars.push(makeRush.produceRush());
        }
    }
    result() {
        this.cars.forEach((item, index) => {
            console.log(`no.${index + 1}`)
            console.log(`varian       : ${item.varian}`);
            console.log(`sn           : ${item.sn}`);
            console.log(`door         : ${item.door}`);
            console.log(`seat         : ${item.seat}`);
            console.log(`tyre         : ${item.tyre}`);
            console.log(`year         : ${item.year}`);
            console.log(`warranty     : ${item.warranty} year\n`);
        });
    }

    guaranteeSimulation(simulationYear) {
        console.log(`Hasil simulasi garansi semua mobil pada tahun ${simulationYear} :`)
        this.cars.forEach((item, index) => {
            console.log(`no.${index + 1}`)
            console.log(`varian       : ${item.varian}`);
            console.log(`door         : ${item.door}`);
            console.log(`seat         : ${item.seat}`);
            console.log(`tyre         : ${item.tyre}`);
            console.log(`year         : ${item.year}`);
            console.log(`warranty     : ${item.warranty} year \n`);
            let stat ="";
            let result = item.year + item.warranty
            if(result >= simulationYear){
                stat = "active"
            }else{
                stat = "expired"
            }
            stat
            console.log(`status on ${simulationYear} this guarantee status is ${stat} \n`)
        });
    }
}



class Tyre {
    constructor(brand, size) {
        this._brand = brand,
        this._size = size
    }
    brand() {
        return `${this._brand}`;
    }
    size() {
        return `${this._size}`;
    }
}

class Agya extends Car {
    produceAgya() {
        const obj = {
            varian: "Agya",
            door: this.door(),
            seat: `5 seater`,
            tyre: `Dunlop 15 inch`,
            year: this.year(),
            warranty: this.warranty()
        }
        return obj
    }
}
class Rush extends Car {
    produceRush() {
        const obj = {
            varian: "Rush",
            door: this.door(),
            seat: `7 seater`,
            tyre: `Bridgestone 17 inch`,
            year: this.year(),
            warranty: this.warranty()
        }
        return obj
    }
}

const mustang = new CarFactory()
mustang.produce(2020)
mustang.produce(2022)
mustang.result()
mustang.guaranteeSimulation(2025)

