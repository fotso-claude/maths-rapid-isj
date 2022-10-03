var exp = "6[5(yz^5)]^2 + 2578yz^3 - [[y]]^4";
var operators = (exp.match(/[+-/*]/g)).length;
var items = operators + 1;

var tab = exp.split(/[+-/*]/);
var result = new Array();

for(i = 0; i < items; i++) {
    tab[i] = tab[i].trim();
    elt_c = elt_p = false
    
    if(tab[i].match(/[\[\]]/)) {
        start_c = tab[i].indexOf('[')
        end_c = tab[i].lastIndexOf(']')
        unknow_c = tab[i].slice(start_c, end_c + 1)
        tab[i] = tab[i].replace(unknow_c, '');
        elt_c = true
    }

    if(tab[i].match(/[()]/)) {
        start_p = tab[i].indexOf('(')
        end_p = tab[i].lastIndexOf(')')
        unknow_p = tab[i].slice(start_p, end_p + 1)
        tab[i] = tab[i].replace(unknow_p, '');
        elt_p = true
    }

    if(tab[i].match(/\^/g)) {
        tab[i] = tab[i].split('^');
        tab[i][1] = parseFloat(tab[i][1])
    }
    else {
        tab[i] = [tab[i], 1];
    }

    if(tab[i][0].match(/[0-9]/)) {
        //console.info(tab[i][0])
        factor = tab[i][0].match(/[0-9]/g).toString().replaceAll(',', '')
        factorLenght = factor.length
        factor = parseFloat(factor)
        //console.log("Facteur : " + factor)
        var indexFactor = tab[i][0].indexOf(factor)

        if(!elt_c && !elt_p) {
            //Vaiable du facteur
            tab[i][0] = tab[i][0].substring(indexFactor + factorLenght)
        }

        if(elt_c) {
            tab[i][0] = unknow_c
        }

        if(elt_p) {
            tab[i][0] = unknow_p
        }

        result.push([[tab[i][0], tab[i][1]], factor])
    }
    else {
    
        if(elt_c) {
            tab[i][0] = unknow_c
        }

        if(elt_p) {
            tab[i][0] = unknow_p
        }

        result.push([[tab[i][0], tab[i][1]], 1])
    }

}

console.log(result)
