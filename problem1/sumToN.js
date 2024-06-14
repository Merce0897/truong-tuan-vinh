
/*
    FIRST APPROACH
    * Time Complexity: O(n)
    * Space Complexity: O(n)
    Add recursion till n is 0.
    Then all current function in call stack will execute
*/
var sum_to_n_a = function (n) {
    if (n === 0) return n
    return n + sum_to_n_b(n - 1)

};

/*
    SECOND APPROACH
    * Time Complexity: O(n)
    * Space Complexity: O(1)
    Using loop to iterate from 0 to n.
    Create a result to store the sum.
    Return the result after the loop ends
*/
var sum_to_n_b = function (n) {
    let res = 0
    for (let idx = 1; idx <= n; idx++) {
        res += idx
    }
    return res
};

/* 
    THIRD APPROACH
    * Time Complexity: O(1)
    * Space Complexity: O(1)
    Using the well-known formula for the sum of the first n natural numbers
*/
var sum_to_n_c = function (n) {
    return n * (n + 1) / 2
};
