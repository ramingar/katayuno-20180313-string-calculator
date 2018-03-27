import Utils from './utils.component';

const Calculator = function () {

    const validateNotAllowedNegatives = function ({addends, ...rest}) {
        const ERROR_MESSAGE = 'negatives not allowed: ';
        const negatives     = addends.match(/-\d+/g);

        return negatives && negatives.length > 0 ?
            Object.freeze({error: ERROR_MESSAGE + negatives.sort().join(', ')}) :
            Object.freeze({addends, ...rest});
    };

    const filterGreaterThanOneThousand = function ({addends, ...rest}) {
        const numbers         = addends.split(/\D/);
        const filteredNumbers = numbers.filter(number => number < 1001);
        return Object.freeze({addends: filteredNumbers.join(','), ...rest});
    };

    const makeSum = function ({addends}) {
        const numbers = addends.split(/\D/);
        return numbers.reduce((acc, val) => acc += parseInt(val) || 0, 0);

    };

    const sum = function ({addends = ''} = {}) {
        const result  = Utils().compose(
            validateNotAllowedNegatives,
            filterGreaterThanOneThousand,
            makeSum
        )(
            {addends}
        );
        const {error} = result;
        return error || result;
    };

    return Object.freeze({sum});
};

export default Calculator;
