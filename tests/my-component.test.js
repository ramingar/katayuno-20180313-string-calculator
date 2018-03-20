import test from 'tape';

//COMPONENT ---------------------------------------------------------------------
const Calculator = function () {

    const sum = function ({addends = ''} = {}) {
        const negatives = addends.match(/-\d+/g);
        if (negatives && negatives.length > 0) {
            let errorMessage = 'negatives not allowed: ';
            negatives.forEach((negative) => {
                errorMessage += negative + ', ';
            });
            return errorMessage.substring(0, errorMessage.length - 2);  // remove last ', '
        }

        const numbers = addends.split(/\D/);
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
    const actual = cal.sum();

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Component: Testing calculator for more than one input`, (assert) => {
    const message = `Testing sum for two numbers`;
    const expected = 5;

    const cal = Calculator();
    const actual = cal.sum({addends: '1,4'});

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Component: Testing calculator with different delimiters`, (assert) => {
    const message = `Testing sum passing in \\n, || and @ as delimiters`;
    const expected = 58;

    const cal = Calculator();
    const actual = cal.sum({addends: '1\n40||7@10'});

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Component: Testing calculator with negatives numbers`, (assert) => {
    const messageForOnlyOneNegative = 'Calling add() with a negative number will throw an exception ' +
        '"negatives not allowed" - and the negative that was passed. (Only one negative number)';
    const messageForMoreThanOneNegative = 'Calling add() with a negative number will throw an exception ' +
        '"negatives not allowed" - and the negative that was passed. (Two or more negatives numbers)';

    const expectedWhenOnlyOneNegative = 'negatives not allowed: -1';
    const expectedWhenMoreThanOneNegative = 'negatives not allowed: -1, -4, -2';

    const cal = Calculator();
    const actualWhenOnlyOneNegative = cal.sum({addends: '1\n-1||7'});
    const actualWhenMoreThanOneNegative = cal.sum({addends: '1\n-1||-4,3,-2,7'});

    assert.equal(actualWhenOnlyOneNegative, expectedWhenOnlyOneNegative, messageForOnlyOneNegative);
    assert.equal(actualWhenMoreThanOneNegative, expectedWhenMoreThanOneNegative, messageForMoreThanOneNegative);

    assert.end();
});
