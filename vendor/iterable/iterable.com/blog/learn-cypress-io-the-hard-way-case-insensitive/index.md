# Learn Cypress.io the Hard Way: Case-Insensitive - Iterable

## Learn Cypress.io the Hard Way: Case-Insensitive

**Published by**

November 1, 2021

During the web development process, sometimes values in HTML have inconsistent capitalization, which will lead to flaky tests. Sometimes, the tests will look for lowercase text, but the actual text value will be in uppercase. One of the common practices to improve such a flaky test is to make the text in case-insensitive way. In this post, I will show you four different ways to make the text case insensitive.

The first approach is to use Cypress built-in feature to ignore case sensitivity. In this approach, the test will pass even if the text value in HTML is `expected text` instead of `Expected Text`. Cypress will ignore the uppercase and only check the actual text content. You can turn on and off this feature by changing the value of `matchCase` from `false` to `true`.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-9.07.37-PM.png)

The second approach is to use Regex to ignore case sensitivity. In this approach, the i flag indicates that case should be ignored while attempting a match in a string.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-9.07.48-PM.png)

The third approach is to change the string to lowercase first before attempting a match. In this approach, the `.toLowerCase();` function will convert all the alphabetic characters in a string to a lowercase string.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-9.08.15-PM.png)

The fourth approach is converting the characters in a string to lowercase by using an ASCII table. In the table below, you will see that #65 to #90 represent uppercase A to Z , whereas #97 to #122 present lowercase a to z. As such, if a character has a value between #65 to #90, we know this character is in upper case. By adding 32 to that character’s number, we can convert that character to lowercase.

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-9.08.32-PM.png)

![](https://iterable.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-9.08.57-PM.png)