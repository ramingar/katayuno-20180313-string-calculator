import test from 'tape';
import Calculator from '../public/assets/src/js/calculator.component';

// TESTS ------------------------------------------------------------------------
test('-------- Component: Testing calculator for 1 input', (assert) => {
    const message  = 'Returning the same input';
    const expected = 1;

    const cal    = Calculator();
    const actual = cal.sum({addends: '1'});

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Component: Testing calculator for 1 input (handling '')`, (assert) => {
    const message  = `Returning 0 if input = ''`;
    const expected = 0;

    const cal    = Calculator();
    const actual = cal.sum();

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Component: Testing calculator for more than one input`, (assert) => {
    const message  = `Testing sum for two numbers`;
    const expected = 5;

    const cal    = Calculator();
    const actual = cal.sum({addends: '1,4'});

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Component: Testing calculator with different delimiters`, (assert) => {
    const message  = `Testing sum passing in \\n, || and @ as delimiters`;
    const expected = 58;

    const cal    = Calculator();
    const actual = cal.sum({addends: '1\n40||7@10'});

    assert.equal(actual, expected, message);

    assert.end();
});

test(`-------- Component: Testing calculator with negatives numbers`, (assert) => {
    const messageForOnlyOneNegative     = 'Calling add() with a negative number will throw an exception ' +
        '"negatives not allowed" - and the negative that was passed. (Only one negative number)';
    const messageForMoreThanOneNegative = 'Calling add() with a negative number will throw an exception ' +
        '"negatives not allowed" - and the negative that was passed. (Two or more negatives numbers)';

    const expectedWhenOnlyOneNegative     = 'negatives not allowed: -1';
    const expectedWhenMoreThanOneNegative = 'negatives not allowed: -1, -2, -4';

    const cal                           = Calculator();
    const actualWhenOnlyOneNegative     = cal.sum({addends: '1\n-1||7'});
    const actualWhenMoreThanOneNegative = cal.sum({addends: '1\n-1||-4,3,-2,7'});

    assert.equal(actualWhenOnlyOneNegative, expectedWhenOnlyOneNegative, messageForOnlyOneNegative);
    assert.equal(actualWhenMoreThanOneNegative, expectedWhenMoreThanOneNegative, messageForMoreThanOneNegative);

    assert.end();
});

test(`-------- Component: Testing calculator with numbers greater than 1000`, (assert) => {
    const message = 'Every number greater than 1000 will be ignored';

    const expected = 7;

    const cal    = Calculator();
    const actual = cal.sum({addends: '1, 2000, 1001, 6'});

    assert.equal(actual, expected, message);

    assert.end();
});