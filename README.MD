Android Lockscreen Permutation Visualizer
=========================================

A simple project born to generate and show all possible Android lockscreen permutations. I believe it came from a discussion about making a robot that could automatically test each password.

How it works
------------

It iteratively deepens, meaning it will show all passwords of length 4, then of length 5, etc. The allowable connections between nodes are encoded as an adjacency list. The drawing is all done with <canvas>.

Screenshots
-----------

### Slow
![Slow speed permutations](/slow-run.gif)
### Medium
![Medium speed permutations](/medium-run.gif)
### Fast
![Fast speed permutations](/fast-run.gif)
