import test from 'tape';

//COMPONENT ---------------------------------------------------------------------
const Calculator = function () {

    const sum = function ({addends}) {
        const numbers = addends.split(',');
        let total = 0;

        numbers.forEach((val) => {
            total += parseInt(val) || 0;
        });

        return parseInt(total);
    };

    return Object.freeze({sum});
};

// TESTS ------------------------------------------------------------------------
test('-------- Component: Testing calculator for 1 input', (assert) => {
    const message = 'Returning the same input';
    const expected = 1;

    const cal = Calculator();
    const actual = cal.sum({addends: '1'});

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Component: Testing calculator for 1 input (handling '')`, (assert) => {
    const message = `Returning 0 if input = ''`;
    const expected = 0;

    const cal = Calculator();
    const actual = cal.sum({addends: ''});

    assert.equal(actual, expected, message);

    assert.end();
});
