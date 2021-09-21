//---vFunctionsChecker------
// Will List all functions....while also marking used as they get triggered.
// vFuCe.showUI()  -> Will print results.
const vFuCe = {
    consoleLog: false,
    consoleLogChk () {
        return this.consoleLog;
    },
    log(params){
        if (this.consoleLogChk()) console.log(params);
    },
    _log: [],
    _list : [],
    add(funcToAdd) {
        funcToReturn = (...arguments) => {
            var tsStart = performance.now();
            funcToAdd(arguments);
            var tsEnd = performance.now();
            var execTime = tsEnd - tsStart;
            vFuCe.triggered( { functionName : funcToAdd.name , tsStart: tsStart, tsEnd: tsEnd, execTime: execTime } );
        }
        this._list.push({ name: funcToAdd.name, triggered: false });
        return funcToReturn;
    },
    triggered( params ){
        this._list.forEach( item => {   
            if (item.name === params.functionName) {   
                if (item.triggered !== true) item.triggered = true;
                
                this._log.push(params)
            }
        })
    },
    consoleTableList() {
        console.table(this._list)
    },
    consoleTableLog() {
        console.table(this._log)
    },
    showUI () {
        document.body.innerHTML += `<func_checker><head><root_title>Listing of functions.....</root_title><v_row><info_number_of type="numberOfAll"><title>All Accessible:</title><val></val></info_number_of><info_number_of type="numberOfUsed"><title>Number of Triggered:</title><val></val></info_number_of><info_number_of type="numberOfUnused"><title>Unused:</title><val></val></info_number_of></v_row></head><func_list></func_list></func_checker>`;
        var usedNumber = 0;
        this._list.forEach (item => {
            if (item.triggered === true) usedNumber++;
            document.querySelector('func_checker func_list').innerHTML += `<single_func triggered="${item.triggered}"><name><title>Function Name:</title><val>${item.name} ()</val></name><triggered><title>Triggered:</title><val>${item.triggered}</val></triggered></single_func>`;
        });
        
        document.querySelector('info_number_of[type="numberOfAll"] val').innerHTML = this._list.length;
        document.querySelector('info_number_of[type="numberOfUsed"] val').innerHTML = usedNumber;
        document.querySelector('info_number_of[type="numberOfUnused"] val').innerHTML = this._list.length - usedNumber;
        
    },
    init() {
        Object.keys(window).forEach( item => {
            vFuCe.log(item + " : " + window[item]);
            if ((typeof window[item] == 'function') || (typeof window[item] == 'const')) {
                window[item] = vFuCe.add(window[item]);
            }
        })
    }
};

// Trigger INIT();
vFuCe.init();

module.exports = vFuCe;
