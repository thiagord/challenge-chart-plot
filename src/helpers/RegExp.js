    export function regJson(val) {
    return val.replace(/}/g, "}#").split("#");
    }

    export function regLine(val) {
        return val.replace(/\'/g, '"').replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
    }

    export function regName(val) {
       return val.replace(/_/g, " ");
    }