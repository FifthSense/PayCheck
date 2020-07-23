import {uiMethodsExport} from './uiCtrl';
import {dataMethodsExport} from './dataCtrl';

function init(){
    uiMethodsExport.loadEventListeners();
    uiMethodsExport.populateEmployerSelection();
    uiMethodsExport.displayShiftList();
}

init();
