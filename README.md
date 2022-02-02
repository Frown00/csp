# Graph Coloring Problem
Program created as a university project to learn how backtracking and forward checking algorithms works and how to program them.\
It's a problem which may classified as Constraint Satisfaction Problem (CSP).\
Two algorithms mention above are use to solve this type of problems.

## What's the problem?
Coloring each node (point) with a different color than its neighbors

[More info][wiki]

## Preview
![alt text][preview]

Program generates graph with selected number of nodes (points).\
Then using given algorithm try to find out all solutions and present one of them.\
There is also heuristic which change how algorithm works.\
When it turns off then algorithm jumps randomly between nodes.\
When it turns on then next node is with the lease avaiable colors to choose.   

## Color Pool
![alt text][col3]
![alt text][col4]

Maximum 7 colors. Obviously adding more colors makes there is a lot of more solutions and it may affect performance


[preview]: https://github.com/Frown00/csp/blob/master/assets/Animation.gif?raw=true "Application preview"
[col3]: https://github.com/Frown00/csp/blob/master/assets/01.PNG?raw=true "Use of 3 color pool"
[col4]: https://github.com/Frown00/csp/blob/master/assets/02.PNG?raw=true "Use of 4 color pool"
[wiki]: https://en.wikipedia.org/wiki/Graph_coloring "More information"
