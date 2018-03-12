import test from 'tape';

// TESTS
test('-------- Component: description', (assert) => {
    const message = `mensaje de lo que se está haciendo`;
    const expected = 'valor esperado';

    const actual = 'valor actual';

    assert.deepEqual(actual, expected, message);

    assert.end();
});
