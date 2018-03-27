const Utils = function () {
    const compose = function (...fns) {
        return param => fns.reduce(
            (result, fn) => {
                const {error} = result;
                return error ? {error} : fn(result);
            },
            param
        );
    };

    return Object.freeze({compose});
};

export default Utils;
