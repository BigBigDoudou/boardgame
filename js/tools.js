// SLEEPING

// [FUNCTION] SLEEP

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// PREVENT REPEATED CALLS

// This function limits function calls. It is usefull if a function can be called a lot of time in few ms.
// This function has been imported from Github - https://gist.github.com/nmsdvid/8807205 - and is created by David Nemes (nmsdvid).

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

// FINDING POSITIONS SURROUNDING A POSITION

// [FUNCTION] GET POSITIONS SURROUNDING A POSITION

function findSurroundingPositions(position) { // PARAMETERS : position

    // Order : top-lef, top, top-right, left, right, bottom-left, bottom, bottom-right

    // 0 1 2
    // 3 P 4
    // 5 6 7

    var surrounds = []; // array to return

    if ((position > 9) && (position % 10 > 0)) { // IF tested position is on second row or more and second column or more
        surrounds.push(position - 10 - 1); // push top-left position to array
    }else{ // ELSE
        surrounds.push(null); // push "null" to array
    }

    if (position > 9) { // IF tested position is on second row or more
        surrounds.push(position - 10); // push top position
    }else{ // "
        surrounds.push(null); // "
    }

    if ((position > 9) && (position % 10 < 9)) { // IF tested position is on second row or more and heights column or less
        surrounds.push(position - 10 + 1); // push top-right position
    }else{ // "
        surrounds.push(null); // "
    }

    if (position % 10 > 0) { // IF tested position is on second column or more
        surrounds.push(position - 1); // push left position
    }else{ // "
        surrounds.push(null); // "
    }
    if (position % 10 < 9) { // IF tested position is on heights column or less
        surrounds.push(position + 1); // push right position
    }else{ // "
        surrounds.push(null); // "
    }
    
    if ((position < 90) && (position % 10 > 0)) { // IF tested position is on heights row or less and second column or more
        surrounds.push(position + 10 - 1); // push bottom-left position
    }else{ // "
        surrounds.push(null); // "
    }
    
    if (position < 90) { // IF tested position is on heights row or less
        surrounds.push(position + 10); // push bottom position
    }else{ // "
        surrounds.push(null); // "
    }

    if ((position < 90) && (position % 10 < 9)) { // IF tested position is on heights row or less and heights column or less
        surrounds.push(position + 10 + 1); // push bottom-right position
    }else{ // "
        surrounds.push(null); // "
    }

    return surrounds; // return array

}
