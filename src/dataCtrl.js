import {storageMethodsExport} from './storageCtrl';

let shifts = storageMethodsExport.getShifts();
let werkgevers = storageMethodsExport.getWerkgevers();
let var_currentShiftID = storageMethodsExport.getCurrentShiftID();

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
    constructor(naam, uurloon, color){
        this.naam = naam,
        this.uurloon = uurloon,
        this.color = color
    }
}

const dataMethods = {
    "pushShiftToList": (currentMonth, dag, startuur, einduur, werkgever, id)=>{
        const shift = new Shift(dag, startuur, einduur, werkgever, id);
        currentMonth.push(shift);
        storageMethodsExport.storeShift(shift);
    },
    "pushEmployerToList": (naam, uurloon, color)=>{
        const werkgever = new Werkgever(naam, uurloon, color);
        werkgevers.push(werkgever);
        storageMethodsExport.storeEmployer(werkgever);
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
    },
    "logShiftData": () => {
        const data = shifts;
        console.log(data);
    },
    "logEmployerData": () => {
        const data = werkgevers;
       console.log(data);
    }
}

export const shiftsExport = shifts;
export const werkgeversExport = werkgevers;
export const dataMethodsExport = dataMethods;