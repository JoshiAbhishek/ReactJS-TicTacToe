# React-Tac-Toe

This module is a Tic-Tac-Toe game played in the browser, completed as part of a [course](http://arch-joelross.rhcloud.com/) at the UW ISchool. 

The below questions should be answered (in detail!) regarding your submission!


##### 1. Does using a Model-View-Controller architecture make it easier to change your game in the future? How many places would you need to make changes to your code to make this a 5x5 game of Tic-Tac-Toe?
> Yes, using a Model-View-Controller architecture allows for the game to be de-coupled and modular using React.js components. I would not need to make any changes since my code repository is currently built to handle multiple table sizes for the Tic-Tac-Toe game.


##### 2. Why did I say that an `Array` is the best data structure to represent the game's grid of cells? Why not a 2D-array (Array of Arrays), or an Object, or a Linked-List, or a Tree? 
> An Array is a good data structure for the game's grid system of cells due to its O(1) index-based retrieval and put functionality, as well as simple O(n) search (or lower, depending on how search is implemented). I used a 2D-Array, which offers similar characteristics, but takes up more space and requires more complex iteration. Other data structures would simply offer too much functionality than necessary for the grid, or not be useful, such as a tree.


##### 3. What online resources did you find to help you learn React? How do you search for resources, and how did you determine whether they were helpful or not? Think back to the "learning an API" paper! 
> I searched for basic React.js functionality, such a click handling, from StackOverflow. In addition, I used the main React.js documentation to view examples of formatting JSX code.


##### 4. Approximately how many hours did it take you to complete this assignment? #####
> ~15


##### 5. Did you receive help from any other sources (classmates, etc)? If so, please list who (be specific!). #####
> None.


##### 6. Did you encounter any problems in this assignment we should warn students about in the future? How can we make the assignment better? #####
> I had issues with simple React.js syntax that was hard to catch due to limited IDE support for JSX.
