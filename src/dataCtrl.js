const shifts = {
        x2020: [
            [{"dag":"2020","startuur":"1.50","einduur":"5.50","werkgever":{
                "naam":"Serafina",
                "uurloon":10
            }}],
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
            [{"dag":"2021","startuur":"1.50","einduur":"5.50","werkgever":{
                "naam":"Serafina",
                "uurloon":10
            }}],
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
            [{"dag":"2022","startuur":"1.50","einduur":"5.50","werkgever":{
                "naam":"Serafina",
                "uurloon":10
            }}],
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
            [{"dag":"2023","startuur":"1.50","einduur":"5.50","werkgever":{
                "naam":"Serafina",
                "uurloon":10
            }}],
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
            [{"dag":"2024","startuur":"1.50","einduur":"5.50","werkgever":{
                "naam":"Serafina",
                "uurloon":10
            }}],
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
            [{"dag":"2025","startuur":"1.50","einduur":"5.50","werkgever":{
                "naam":"Serafina",
                "uurloon":10
            }}],
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
            [{"dag":"2026","startuur":"1.50","einduur":"5.50","werkgever":{
                "naam":"Serafina",
                "uurloon":10
            }}],
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
            [{"dag":"2027","startuur":"1.50","einduur":"5.50","werkgever":{
                "naam":"Serafina",
                "uurloon":10
            }}],
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