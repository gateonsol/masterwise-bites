
// Service to manage lesson content from GeeksforGeeks
import { LessonContent, SkillCategory } from './types';

// Define skill categories and associated content
export const skillCategories: SkillCategory[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    skills: [
      'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Angular', 'Vue.js', 'TypeScript',
      'MongoDB', 'Express.js', 'Next.js', 'Web APIs'
    ]
  },
  {
    id: 'programming',
    name: 'Programming Languages',
    skills: [
      'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Swift', 'Kotlin'
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science',
    skills: [
      'Machine Learning', 'Data Analysis', 'Python for Data Science', 'SQL', 'Tableau',
      'Statistics', 'Data Visualization', 'TensorFlow', 'PyTorch'
    ]
  },
  {
    id: 'cs-basics',
    name: 'Computer Science Fundamentals',
    skills: [
      'Data Structures', 'Algorithms', 'Computer Networks', 'Operating Systems',
      'Database Systems', 'System Design', 'Design Patterns'
    ]
  }
];

// Map for storing lesson content by skill
const lessonContentMap: Record<string, LessonContent[]> = {
  'JavaScript': [
    {
      id: 'js-intro',
      title: 'Introduction to JavaScript',
      description: 'Learn the fundamentals of JavaScript, the programming language of the web.',
      content: `
        <h2>What is JavaScript?</h2>
        <p>JavaScript is a lightweight, interpreted programming language with object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages.</p>
        
        <h3>Key Features of JavaScript</h3>
        <ul>
          <li>Client-side scripting language that runs in the browser</li>
          <li>Interpreted language (no need for compilation)</li>
          <li>Event-driven programming</li>
          <li>Object-oriented programming support</li>
          <li>First-class functions (functions are treated like any other variable)</li>
        </ul>
        
        <h3>Basic JavaScript Syntax</h3>
        <pre><code>// Variables
var x = 5;
let y = 10;
const z = 15;

// Functions
function add(a, b) {
  return a + b;
}

// Arrow functions (ES6)
const multiply = (a, b) => a * b;

// Conditional statements
if (x > 0) {
  console.log("Positive number");
} else if (x < 0) {
  console.log("Negative number");
} else {
  console.log("Zero");
}

// Loops
for (let i = 0; i < 5; i++) {
  console.log(i);
}</code></pre>

        <h3>JavaScript in HTML</h3>
        <pre><code>&lt;script&gt;
  // JavaScript code goes here
  document.getElementById("demo").innerHTML = "Hello JavaScript!";
&lt;/script&gt;</code></pre>

        <h2>Practice Exercise</h2>
        <p>Try creating a simple function that calculates the area of a rectangle:</p>
        <pre><code>function calculateRectangleArea(width, height) {
  // Write your code here
}</code></pre>
      `,
      duration: 8,
      type: 'article',
      source: 'GeeksforGeeks',
      sourceUrl: 'https://www.geeksforgeeks.org/javascript/'
    },
    {
      id: 'js-functions',
      title: 'JavaScript Functions',
      description: 'Master function concepts in JavaScript including declarations, expressions, and arrow functions.',
      content: `
        <h2>JavaScript Functions</h2>
        <p>Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code designed to perform a particular task.</p>
        
        <h3>Function Declaration</h3>
        <pre><code>function greet(name) {
  return "Hello, " + name + "!";
}

// Function call
greet("John"); // "Hello, John!"</code></pre>
        
        <h3>Function Expression</h3>
        <pre><code>const greet = function(name) {
  return "Hello, " + name + "!";
};

// Function call
greet("John"); // "Hello, John!"</code></pre>
        
        <h3>Arrow Functions (ES6)</h3>
        <pre><code>const greet = (name) => {
  return "Hello, " + name + "!";
};

// Shorthand for single expressions
const greet = name => "Hello, " + name + "!";

// Function call
greet("John"); // "Hello, John!"</code></pre>

        <h3>Function Parameters and Arguments</h3>
        <pre><code>// Default parameters
function greet(name = "Guest") {
  return "Hello, " + name + "!";
}

greet(); // "Hello, Guest!"
greet("John"); // "Hello, John!"

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4); // 10</code></pre>

        <h3>Function Scope</h3>
        <pre><code>// Global scope
let message = "Hello";

function greet() {
  // Function scope
  let name = "John";
  console.log(message + ", " + name); // Can access global variable
}

greet(); // "Hello, John"
// console.log(name); // Error: name is not defined (can't access function variable)</code></pre>

        <h2>Practice Exercise</h2>
        <p>Create a function that calculates the factorial of a number:</p>
        <pre><code>function factorial(n) {
  // Write your code here
}</code></pre>
      `,
      duration: 7,
      type: 'video',
      source: 'GeeksforGeeks',
      sourceUrl: 'https://www.geeksforgeeks.org/functions-in-javascript/'
    },
    {
      id: 'js-dom',
      title: 'Working with the DOM',
      description: 'Learn how to manipulate the Document Object Model (DOM) using JavaScript.',
      content: `
        <h2>Introduction to the DOM</h2>
        <p>The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the structure of a document as a tree of objects, allowing JavaScript to access and manipulate the content, structure, and style of a webpage.</p>
        
        <h3>Accessing DOM Elements</h3>
        <pre><code>// Get element by ID
const element = document.getElementById("myId");

// Get elements by class name
const elements = document.getElementsByClassName("myClass");

// Get elements by tag name
const paragraphs = document.getElementsByTagName("p");

// Query selector (returns the first matching element)
const firstElement = document.querySelector(".myClass");

// Query selector all (returns all matching elements)
const allElements = document.querySelectorAll(".myClass");</code></pre>
        
        <h3>Modifying DOM Elements</h3>
        <pre><code>// Change text content
element.textContent = "New text";

// Change HTML content
element.innerHTML = "<span>New HTML</span>";

// Change attributes
element.setAttribute("id", "newId");
element.id = "newId"; // Shorthand

// Change styles
element.style.color = "red";
element.style.fontSize = "16px";</code></pre>
        
        <h3>Creating and Adding Elements</h3>
        <pre><code>// Create new element
const newElement = document.createElement("div");

// Set content and attributes
newElement.textContent = "New Element";
newElement.className = "myClass";

// Append to the DOM
document.body.appendChild(newElement);

// Insert before another element
const referenceElement = document.getElementById("reference");
document.body.insertBefore(newElement, referenceElement);</code></pre>
        
        <h3>Removing Elements</h3>
        <pre><code>// Remove an element
element.remove();

// Remove a child element
const parent = document.getElementById("parent");
const child = document.getElementById("child");
parent.removeChild(child);</code></pre>
        
        <h3>Event Handling</h3>
        <pre><code>// Add event listener
element.addEventListener("click", function(event) {
  console.log("Element clicked!");
});

// Remove event listener
function handleClick(event) {
  console.log("Element clicked!");
}

element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);</code></pre>
        
        <h2>Practice Exercise</h2>
        <p>Create a simple to-do list application that allows adding and removing items.</p>
      `,
      duration: 10,
      type: 'article',
      source: 'GeeksforGeeks',
      sourceUrl: 'https://www.geeksforgeeks.org/dom-document-object-model/'
    }
  ],
  'Python': [
    {
      id: 'py-intro',
      title: 'Introduction to Python',
      description: 'Get started with Python programming language and understand its key features.',
      content: `
        <h2>What is Python?</h2>
        <p>Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation.</p>
        
        <h3>Key Features of Python</h3>
        <ul>
          <li>Easy to learn and read</li>
          <li>Interpreted language</li>
          <li>Dynamically typed</li>
          <li>Object-oriented</li>
          <li>Extensive standard library</li>
          <li>Cross-platform compatibility</li>
        </ul>
        
        <h3>Python Syntax Basics</h3>
        <pre><code># Variables and data types
name = "John"  # string
age = 25       # integer
height = 5.9   # float
is_student = True  # boolean

# Printing output
print("Hello, World!")
print(f"Name: {name}, Age: {age}")

# Lists
fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # apple

# Dictionaries
person = {
  "name": "John",
  "age": 25,
  "city": "New York"
}
print(person["name"])  # John

# Conditional statements
if age > 18:
    print("Adult")
elif age > 12:
    print("Teenager")
else:
    print("Child")

# Loops
for fruit in fruits:
    print(fruit)

count = 0
while count < 5:
    print(count)
    count += 1</code></pre>
        
        <h3>Functions in Python</h3>
        <pre><code>def greet(name):
    return f"Hello, {name}!"

message = greet("John")
print(message)  # Hello, John!

# Function with default parameter
def greet(name="Guest"):
    return f"Hello, {name}!"

print(greet())  # Hello, Guest!</code></pre>
        
        <h2>Practice Exercise</h2>
        <p>Write a Python function to check if a number is prime:</p>
        <pre><code>def is_prime(number):
    # Write your code here
    pass</code></pre>
      `,
      duration: 9,
      type: 'video',
      source: 'GeeksforGeeks',
      sourceUrl: 'https://www.geeksforgeeks.org/python-programming-language/'
    }
  ],
  'Data Structures': [
    {
      id: 'ds-arrays',
      title: 'Arrays and Linked Lists',
      description: 'Understand the fundamentals of arrays and linked lists data structures.',
      content: `
        <h2>Arrays</h2>
        <p>An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.</p>
        
        <h3>Characteristics of Arrays</h3>
        <ul>
          <li>Fixed size (in most languages)</li>
          <li>Elements are accessed using indices</li>
          <li>Contiguous memory allocation</li>
          <li>O(1) time complexity for accessing elements</li>
        </ul>
        
        <h3>Array Operations</h3>
        <pre><code>// JavaScript Array
let arr = [10, 20, 30, 40, 50];

// Accessing elements
console.log(arr[0]);  // 10

// Updating elements
arr[1] = 25;

// Array length
console.log(arr.length);  // 5

// Adding elements
arr.push(60);  // Adds to the end
arr.unshift(5);  // Adds to the beginning

// Removing elements
arr.pop();  // Removes from the end
arr.shift();  // Removes from the beginning

// Iterating through an array
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}</code></pre>
        
        <h2>Linked Lists</h2>
        <p>A linked list is a linear data structure where elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers.</p>
        
        <h3>Characteristics of Linked Lists</h3>
        <ul>
          <li>Dynamic size</li>
          <li>Efficient insertions and deletions</li>
          <li>No random access</li>
          <li>Extra memory for pointers</li>
        </ul>
        
        <h3>Types of Linked Lists</h3>
        <ul>
          <li>Singly Linked List</li>
          <li>Doubly Linked List</li>
          <li>Circular Linked List</li>
        </ul>
        
        <h3>Implementing a Singly Linked List</h3>
        <pre><code>class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  // Add a node at the end
  append(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      return;
    }
    
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    
    current.next = newNode;
  }
  
  // Print the list
  printList() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}</code></pre>
        
        <h3>Array vs. Linked List</h3>
        <table>
          <tr>
            <th>Operation</th>
            <th>Array</th>
            <th>Linked List</th>
          </tr>
          <tr>
            <td>Access</td>
            <td>O(1)</td>
            <td>O(n)</td>
          </tr>
          <tr>
            <td>Search</td>
            <td>O(n)</td>
            <td>O(n)</td>
          </tr>
          <tr>
            <td>Insertion at beginning</td>
            <td>O(n)</td>
            <td>O(1)</td>
          </tr>
          <tr>
            <td>Insertion at end</td>
            <td>O(1)*</td>
            <td>O(n) or O(1)**</td>
          </tr>
          <tr>
            <td>Deletion at beginning</td>
            <td>O(n)</td>
            <td>O(1)</td>
          </tr>
          <tr>
            <td>Deletion at end</td>
            <td>O(1)</td>
            <td>O(n)</td>
          </tr>
        </table>
        <p>* Amortized for dynamic arrays<br>** O(1) if we maintain a tail pointer</p>
        
        <h2>Practice Exercise</h2>
        <p>Implement a function to reverse a linked list:</p>
        <pre><code>function reverseLinkedList(head) {
  // Write your code here
}</code></pre>
      `,
      duration: 10,
      type: 'article',
      source: 'GeeksforGeeks',
      sourceUrl: 'https://www.geeksforgeeks.org/data-structures/'
    }
  ],
  'React': [
    {
      id: 'react-intro',
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React, a JavaScript library for building user interfaces.',
      content: `
        <h2>What is React?</h2>
        <p>React is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience. It was developed by Facebook and has a strong ecosystem and community support.</p>
        
        <h3>Key Features of React</h3>
        <ul>
          <li>Component-based architecture</li>
          <li>Virtual DOM for efficient rendering</li>
          <li>Declarative approach</li>
          <li>One-way data binding</li>
          <li>JSX syntax</li>
        </ul>
        
        <h3>Setting Up React</h3>
        <pre><code>// Using Create React App
npx create-react-app my-app
cd my-app
npm start</code></pre>
        
        <h3>Your First React Component</h3>
        <pre><code>import React from 'react';

function Welcome() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello, React!&lt;/h1&gt;
      &lt;p&gt;Welcome to my first React component.&lt;/p&gt;
    &lt;/div&gt;
  );
}

export default Welcome;</code></pre>
        
        <h3>JSX: JavaScript Extension Syntax</h3>
        <p>JSX allows you to write HTML-like code in your JavaScript:</p>
        <pre><code>const element = &lt;h1&gt;Hello, world!&lt;/h1&gt;;</code></pre>
        
        <h3>Rendering Elements</h3>
        <pre><code>import React from 'react';
import ReactDOM from 'react-dom/client';
import Welcome from './Welcome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(&lt;Welcome /&gt;);</code></pre>
        
        <h3>Components and Props</h3>
        <pre><code>import React from 'react';

function Greeting(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}

// Usage
&lt;Greeting name="John" /&gt;</code></pre>
        
        <h3>State in React</h3>
        <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
        
        <h2>Practice Exercise</h2>
        <p>Create a simple React component that shows a list of items:</p>
        <pre><code>function ItemList() {
  // Create a state variable with some items
  // Render each item in an unordered list
}</code></pre>
      `,
      duration: 10,
      type: 'video',
      source: 'GeeksforGeeks',
      sourceUrl: 'https://www.geeksforgeeks.org/react-js/'
    }
  ]
};

// Get all available skills across categories
export const getAllSkills = (): string[] => {
  return skillCategories.flatMap(category => category.skills);
};

// Get lessons for a specific skill
export const getLessonsForSkill = (skill: string): LessonContent[] => {
  // Default fallback for skills without specific content
  if (!lessonContentMap[skill]) {
    return generateGenericLessons(skill);
  }
  
  return lessonContentMap[skill];
};

// Get a specific lesson by ID
export const getLessonById = (id: string): LessonContent | null => {
  for (const skill in lessonContentMap) {
    const lesson = lessonContentMap[skill].find(lesson => lesson.id === id);
    if (lesson) return lesson;
  }
  return null;
};

// Generate generic lessons for skills without specific content
const generateGenericLessons = (skill: string): LessonContent[] => {
  return [
    {
      id: `${skill.toLowerCase().replace(/\s+/g, '-')}-intro`,
      title: `Introduction to ${skill}`,
      description: `Learn the fundamentals of ${skill} in this beginner-friendly lesson.`,
      content: `
        <h2>Introduction to ${skill}</h2>
        <p>This lesson introduces you to the basic concepts of ${skill}.</p>
        
        <h3>What is ${skill}?</h3>
        <p>${skill} is an important area of study in the field of computer science and technology.</p>
        
        <h3>Why Learn ${skill}?</h3>
        <ul>
          <li>Enhance your technical skills</li>
          <li>Improve your problem-solving abilities</li>
          <li>Open up new career opportunities</li>
          <li>Stay current with industry trends</li>
        </ul>
        
        <h3>Basic Concepts</h3>
        <p>In this lesson, we'll cover the fundamental concepts that form the foundation of ${skill}.</p>
        
        <h2>Practice Exercise</h2>
        <p>Complete the following exercises to reinforce your understanding of ${skill} fundamentals.</p>
      `,
      duration: 8,
      type: 'article',
      source: 'GeeksforGeeks',
      sourceUrl: `https://www.geeksforgeeks.org/${skill.toLowerCase().replace(/\s+/g, '-')}/`
    },
    {
      id: `${skill.toLowerCase().replace(/\s+/g, '-')}-intermediate`,
      title: `${skill} Core Concepts`,
      description: `Dive deeper into ${skill} with these essential concepts and techniques.`,
      content: `
        <h2>${skill} Core Concepts</h2>
        <p>This lesson builds on your basic knowledge of ${skill} and introduces more advanced concepts.</p>
        
        <h3>Key Principles of ${skill}</h3>
        <p>Understanding these core principles will help you master ${skill} more effectively.</p>
        
        <h3>Common Techniques</h3>
        <ul>
          <li>Technique 1: A fundamental approach to solving problems in ${skill}</li>
          <li>Technique 2: Another important method used in ${skill}</li>
          <li>Technique 3: An advanced strategy for complex scenarios</li>
        </ul>
        
        <h3>Best Practices</h3>
        <p>Following these best practices will help you write better, more efficient code and solutions.</p>
        
        <h2>Practice Exercise</h2>
        <p>Apply the concepts learned in this lesson to solve the following problems.</p>
      `,
      duration: 10,
      type: 'video',
      source: 'GeeksforGeeks',
      sourceUrl: `https://www.geeksforgeeks.org/${skill.toLowerCase().replace(/\s+/g, '-')}/`
    },
    {
      id: `${skill.toLowerCase().replace(/\s+/g, '-')}-practical`,
      title: `Practical ${skill} Applications`,
      description: `Apply your ${skill} knowledge with hands-on exercises and real-world applications.`,
      content: `
        <h2>Practical ${skill} Applications</h2>
        <p>This lesson focuses on applying ${skill} concepts to real-world scenarios and problems.</p>
        
        <h3>Case Study 1</h3>
        <p>Examine how ${skill} is used to solve a common problem in the industry.</p>
        
        <h3>Implementation Examples</h3>
        <pre><code>// Example code or pseudocode demonstrating ${skill} implementation
function example() {
  // Implementation details would go here
  return "Example implementation of ${skill}";
}</code></pre>
        
        <h3>Common Challenges and Solutions</h3>
        <p>Learn about the typical challenges faced when working with ${skill} and strategies to overcome them.</p>
        
        <h2>Practice Exercise</h2>
        <p>Complete this comprehensive exercise that combines multiple aspects of ${skill}.</p>
      `,
      duration: 7,
      type: 'article',
      source: 'GeeksforGeeks',
      sourceUrl: `https://www.geeksforgeeks.org/${skill.toLowerCase().replace(/\s+/g, '-')}/`
    }
  ];
};
