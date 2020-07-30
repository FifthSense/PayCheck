const storageMethods = {
    "getShifts":()=>{
        let shifts;
        if(localStorage.getItem('shifts') === null){
            shifts = {
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
        } else {
            shifts = localStorage.getItem('shifts');
        }
        return shifts;
    },
    "getCurrentShiftID":()=>{
        let currentShiftID;
        if(localStorage.getItem('currentShiftID') === null){
            currentShiftID = 1;
        } else {
            currentShiftID = localStorage.getItem('currentShiftID');
        }
        return currentShiftID;
    },
    "getWerkgevers":()=>{
        let werkgevers;
        if(localStorage.getItem('werkgevers') === null){
            werkgevers = [];
        } else {
            werkgevers = localStorage.getItem('werkgevers');
        }
        return werkgevers;
    }
}

export const storageMethodsExport = storageMethods;