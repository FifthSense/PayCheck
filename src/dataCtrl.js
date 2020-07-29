const shifts = {
        x2020: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        x2021: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        x2022: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        x2023: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        x2024: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        x2025: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        x2026: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        x2027: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    };

const werkgevers = [
    // {"naam":"Serafina","uurloon":9.80}
]
let var_currentShiftID = 1;

class Shift {
    constructor(dag, startuur, einduur, werkgever, id){
        this.dag = dag,
        this.startuur = startuur,
        this.einduur = einduur
        this.werkgever = werkgever,
        this.id = id,
        this.totalPay = ((parseFloat(einduur) - parseFloat(startuur)) * parseFloat(werkgever.uurloon)).toFixed(2)
    }
}

class Werkgever {
    constructor(naam, uurloon){
        this.naam = naam,
        this.uurloon = uurloon
    }
}

const dataMethods = {
    "pushShiftToList": (currentMonth, dag, startuur, einduur, werkgever, id)=>{
        const shift = new Shift(dag, startuur, einduur, werkgever, id);
        currentMonth.push(shift);
    },
    "pushEmployerToList": (naam, uurloon)=>{
        const werkgever = new Werkgever(naam, uurloon);
        werkgevers.push(werkgever);
    },
    "parseFloatToHourFormat":(float)=>{
        float = float.replace('.00', ':00');
        float = float.replace('.25', ':15');
        float = float.replace('.50', ':30');
        float = float.replace('.75', ':45');
        float = float.replace('24:', '00:');
        return float;
    },
    "parseHourToFloatFormat":(hour)=>{
        hour = hour.replace(':00','.00');
        hour = hour.replace(':15','.25');
        hour = hour.replace(':30','.50');
        hour = hour.replace(':45','.75');
        hour = hour.replace('00.','24.');
        hour = parseFloat(hour).toFixed(2);
        return hour;
    },
    "iterateCurrentShiftID": () => {
        let id = var_currentShiftID;
        id++;
        var_currentShiftID = id;
    },
    "getCurrentShiftID": () => {
        let id = var_currentShiftID;
        return id;
    }
}
export const shiftsExport = shifts;
export const werkgeversExport = werkgevers;
export const dataMethodsExport = dataMethods;