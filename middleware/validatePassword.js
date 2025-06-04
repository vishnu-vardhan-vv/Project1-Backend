module.exports = function(password) {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const special = /[^A-Za-z0-9]/;

    return minLength.test(password) &&
           upper.test(password) &&
           lower.test(password) &&
           special.test(password);
};
