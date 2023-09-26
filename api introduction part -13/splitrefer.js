// Basic Splitting by Space:
// const sentence = "This is a sample sentence";
// const words = sentence.split(' ');
// console.log(words);
// Output: ["This", "is", "a", "sample", "sentence"]





// Splitting by Comma for CSV Data:
// const csvData = "John,Doe,25,New York";
// const fields = csvData.split(',');
// console.log(fields);
// Output: ["John", "Doe", "25", "New York"]




// Splitting by Multiple Characters (Regex):
// const text = "apple,banana;cherry.orange";
// const fruits = text.split(/[,;]/);
// console.log(fruits);
// Output: ["apple", "banana", "cherry", "orange"]





// Splitting Lines in a Multiline String:
// const multilineText = "Line 1\nLine 2\nLine 3";
// const lines = multilineText.split('\n');
// console.log(lines);
// Output: ["Line 1", "Line 2", "Line 3"]




// Limiting the Number of Splits:
// const sentence = "This is a sample sentence";
// const words = sentence.split(' ', 3); // Limit to 3 splits
// console.log(words);
// Output: ["This", "is", "a sample sentence"]



// Splitting an Empty String:
// const emptyString = "";
// const result = emptyString.split(' ');
// console.log(result);
// Output: [""]




// Splitting a String into Characters:
// const word = "hello";
// const characters = word.split('');
// console.log(characters);
// Output: ["h", "e", "l", "l", "o"]





// Using split() with Regular Expressions:
// const text = "apple,banana;cherry.orange";
// const fruits = text.split(/[,;]/);
// console.log(fruits);
// Output: ["apple", "banana", "cherry", "orange"]



// Splitting by Whitespace (Tabs, Spaces, Line Breaks):
// const text = "Word1\tWord2 Word3\nWord4";
// const words = text.split(/\s+/);
// console.log(words);
// Output: ["Word1", "Word2", "Word3", "Word4"]
