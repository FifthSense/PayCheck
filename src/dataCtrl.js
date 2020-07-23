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
    {"naam":"Serafina","uurloon":9.80}
]
class Shift {
    constructor(dag, startuur, einduur, werkgever){
        this.dag = dag,
        this.startuur = startuur,
        this.einduur = einduur
        this.werkgever = werkgever
    }
}

class Werkgever {
    constructor(naam, uurloon){
        this.naam = naam,
        this.uurloon = uurloon
    }
}

const dataMethods = {
    "pushShiftToList": (currentMonth, dag, startuur, einduur, werkgever)=>{
        const shift = new Shift(dag, startuur, einduur, werkgever);
        currentMonth.push(shift);
    },
    "pushEmployerToList": (naam, uurloon)=>{
        const werkgever = new Werkgever(naam, uurloon);
        console.log(werkgever);
    },
    "parseFloatToHourFormat":(hour)=>{
        let float =  hour;
        float = float.replace('.00', ':00');
        float = float.replace('.25', ':15');
        float = float.replace('.50', ':30');
        float = float.replace('.75', ':45');
        float = float.replace('24:', '00:');
        return float;
    }
}
export const shiftsExport = shifts;
export const werkgeversExport = werkgevers;
export const dataMethodsExport = dataMethods;