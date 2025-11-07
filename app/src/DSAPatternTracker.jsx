import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Search, Trash2 } from 'lucide-react';

const DSAPatternTracker = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [selectedPattern, setSelectedPattern] = useState('all');

  const problemsData = [
    // Pattern 1: Two Pointers (8 problems)
    { id: 1, pattern: 'Two Pointers', name: 'Container With Most Water', number: 11, difficulty: 'Medium', link: 'https://leetcode.com/problems/container-with-most-water/', status: 'not_started', notes: '' },
    { id: 2, pattern: 'Two Pointers', name: '3Sum', number: 15, difficulty: 'Medium', link: 'https://leetcode.com/problems/3sum/', status: 'not_started', notes: '' },
    { id: 3, pattern: 'Two Pointers', name: 'Trapping Rain Water', number: 42, difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water/', status: 'not_started', notes: '' },
    { id: 4, pattern: 'Two Pointers', name: 'Remove Duplicates from Sorted Array II', number: 80, difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/', status: 'not_started', notes: '' },
    { id: 5, pattern: 'Two Pointers', name: 'Minimize Maximum Pair Sum', number: 1877, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/', status: 'not_started', notes: '' },
    { id: 6, pattern: 'Two Pointers', name: 'Boats to Save People', number: 881, difficulty: 'Medium', link: 'https://leetcode.com/problems/boats-to-save-people/', status: 'not_started', notes: '' },
    { id: 7, pattern: 'Two Pointers', name: 'Subarray Product Less Than K', number: 713, difficulty: 'Medium', link: 'https://leetcode.com/problems/subarray-product-less-than-k/', status: 'not_started', notes: '' },
    { id: 8, pattern: 'Two Pointers', name: 'Longest Mountain in Array', number: 845, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-mountain-in-array/', status: 'not_started', notes: '' },

    // Pattern 2: Sliding Window (10 problems)
    { id: 9, pattern: 'Sliding Window', name: 'Longest Substring Without Repeating', number: 3, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', status: 'not_started', notes: '' },
    { id: 10, pattern: 'Sliding Window', name: 'Minimum Window Substring', number: 76, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-substring/', status: 'not_started', notes: '', star: true },
    { id: 11, pattern: 'Sliding Window', name: 'Longest Repeating Character Replacement', number: 424, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', status: 'not_started', notes: '' },
    { id: 12, pattern: 'Sliding Window', name: 'Permutation in String', number: 567, difficulty: 'Medium', link: 'https://leetcode.com/problems/permutation-in-string/', status: 'not_started', notes: '' },
    { id: 13, pattern: 'Sliding Window', name: 'Minimum Size Subarray Sum', number: 209, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-size-subarray-sum/', status: 'not_started', notes: '' },
    { id: 14, pattern: 'Sliding Window', name: 'Fruit Into Baskets', number: 904, difficulty: 'Medium', link: 'https://leetcode.com/problems/fruit-into-baskets/', status: 'not_started', notes: '' },
    { id: 15, pattern: 'Sliding Window', name: 'Subarrays with K Different Integers', number: 992, difficulty: 'Hard', link: 'https://leetcode.com/problems/subarrays-with-k-different-integers/', status: 'not_started', notes: '' },
    { id: 16, pattern: 'Sliding Window', name: 'Sliding Window Maximum', number: 239, difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-maximum/', status: 'not_started', notes: '', star: true },
    { id: 17, pattern: 'Sliding Window', name: 'Minimum Window Subsequence', number: 727, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-subsequence/', status: 'not_started', notes: '' },
    { id: 18, pattern: 'Sliding Window', name: 'Count Subarrays With Fixed Bounds', number: 2444, difficulty: 'Hard', link: 'https://leetcode.com/problems/count-subarrays-with-fixed-bounds/', status: 'not_started', notes: '' },

    // Pattern 3: Binary Search (12 problems)
    { id: 19, pattern: 'Binary Search', name: 'Binary Search', number: 704, difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-search/', status: 'not_started', notes: '' },
    { id: 20, pattern: 'Binary Search', name: 'Search in Rotated Sorted Array', number: 33, difficulty: 'Medium', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', status: 'not_started', notes: '' },
    { id: 21, pattern: 'Binary Search', name: 'Find First and Last Position', number: 34, difficulty: 'Medium', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', status: 'not_started', notes: '' },
    { id: 22, pattern: 'Binary Search', name: 'Search a 2D Matrix II', number: 240, difficulty: 'Medium', link: 'https://leetcode.com/problems/search-a-2d-matrix-ii/', status: 'not_started', notes: '' },
    { id: 23, pattern: 'Binary Search', name: 'Koko Eating Bananas', number: 875, difficulty: 'Medium', link: 'https://leetcode.com/problems/koko-eating-bananas/', status: 'not_started', notes: '' },
    { id: 24, pattern: 'Binary Search', name: 'Capacity To Ship Packages', number: 1011, difficulty: 'Medium', link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', status: 'not_started', notes: '' },
    { id: 25, pattern: 'Binary Search', name: 'Minimize Max Distance to Gas Station', number: 774, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimize-max-distance-to-gas-station/', status: 'not_started', notes: '' },
    { id: 26, pattern: 'Binary Search', name: 'Split Array Largest Sum', number: 410, difficulty: 'Hard', link: 'https://leetcode.com/problems/split-array-largest-sum/', status: 'not_started', notes: '', star: true },
    { id: 27, pattern: 'Binary Search', name: 'Find K-th Smallest Pair Distance', number: 719, difficulty: 'Hard', link: 'https://leetcode.com/problems/find-k-th-smallest-pair-distance/', status: 'not_started', notes: '' },
    { id: 28, pattern: 'Binary Search', name: 'Median of Two Sorted Arrays', number: 4, difficulty: 'Hard', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', status: 'not_started', notes: '', star: true },
    { id: 29, pattern: 'Binary Search', name: 'Aggressive Cows', number: 0, difficulty: 'Hard', link: 'https://www.spoj.com/problems/AGGRCOW/', status: 'not_started', notes: 'CodeForces/SPOJ' },
    { id: 30, pattern: 'Binary Search', name: 'Min Days to Make m Bouquets', number: 1482, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/', status: 'not_started', notes: '' },

    // Pattern 4: Fast & Slow Pointers (5 problems)
    { id: 31, pattern: 'Fast & Slow Pointers', name: 'Linked List Cycle II', number: 142, difficulty: 'Medium', link: 'https://leetcode.com/problems/linked-list-cycle-ii/', status: 'not_started', notes: '' },
    { id: 32, pattern: 'Fast & Slow Pointers', name: 'Happy Number', number: 202, difficulty: 'Easy', link: 'https://leetcode.com/problems/happy-number/', status: 'not_started', notes: '' },
    { id: 33, pattern: 'Fast & Slow Pointers', name: 'Find the Duplicate Number', number: 287, difficulty: 'Medium', link: 'https://leetcode.com/problems/find-the-duplicate-number/', status: 'not_started', notes: '', star: true },
    { id: 34, pattern: 'Fast & Slow Pointers', name: 'Palindrome Linked List', number: 234, difficulty: 'Easy', link: 'https://leetcode.com/problems/palindrome-linked-list/', status: 'not_started', notes: '' },
    { id: 35, pattern: 'Fast & Slow Pointers', name: 'Reorder List', number: 143, difficulty: 'Medium', link: 'https://leetcode.com/problems/reorder-list/', status: 'not_started', notes: '' },

    // Pattern 5: In-place LL Reversal (5 problems)
    { id: 36, pattern: 'In-place LL Reversal', name: 'Reverse Linked List', number: 206, difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-linked-list/', status: 'not_started', notes: '' },
    { id: 37, pattern: 'In-place LL Reversal', name: 'Reverse Linked List II', number: 92, difficulty: 'Medium', link: 'https://leetcode.com/problems/reverse-linked-list-ii/', status: 'not_started', notes: '' },
    { id: 38, pattern: 'In-place LL Reversal', name: 'Reverse Nodes in k-Group', number: 25, difficulty: 'Hard', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', status: 'not_started', notes: '', star: true },
    { id: 39, pattern: 'In-place LL Reversal', name: 'Swap Nodes in Pairs', number: 24, difficulty: 'Medium', link: 'https://leetcode.com/problems/swap-nodes-in-pairs/', status: 'not_started', notes: '' },
    { id: 40, pattern: 'In-place LL Reversal', name: 'Rotate List', number: 61, difficulty: 'Medium', link: 'https://leetcode.com/problems/rotate-list/', status: 'not_started', notes: '' },

    // Pattern 6: Tree DFS (12 problems)
    { id: 41, pattern: 'Tree DFS', name: 'Maximum Depth of Binary Tree', number: 104, difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', status: 'not_started', notes: '' },
    { id: 42, pattern: 'Tree DFS', name: 'Path Sum II', number: 113, difficulty: 'Medium', link: 'https://leetcode.com/problems/path-sum-ii/', status: 'not_started', notes: '' },
    { id: 43, pattern: 'Tree DFS', name: 'Diameter of Binary Tree', number: 543, difficulty: 'Easy', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', status: 'not_started', notes: '' },
    { id: 44, pattern: 'Tree DFS', name: 'Binary Tree Maximum Path Sum', number: 124, difficulty: 'Hard', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', status: 'not_started', notes: '', star: true },
    { id: 45, pattern: 'Tree DFS', name: 'Lowest Common Ancestor', number: 236, difficulty: 'Medium', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', status: 'not_started', notes: '' },
    { id: 46, pattern: 'Tree DFS', name: 'Serialize and Deserialize Binary Tree', number: 297, difficulty: 'Hard', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', status: 'not_started', notes: '' },
    { id: 47, pattern: 'Tree DFS', name: 'Count Good Nodes in Binary Tree', number: 1448, difficulty: 'Medium', link: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', status: 'not_started', notes: '' },
    { id: 48, pattern: 'Tree DFS', name: 'House Robber III', number: 337, difficulty: 'Medium', link: 'https://leetcode.com/problems/house-robber-iii/', status: 'not_started', notes: '' },
    { id: 49, pattern: 'Tree DFS', name: 'Binary Tree Cameras', number: 968, difficulty: 'Hard', link: 'https://leetcode.com/problems/binary-tree-cameras/', status: 'not_started', notes: '' },
    { id: 50, pattern: 'Tree DFS', name: 'Longest Univalue Path', number: 687, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-univalue-path/', status: 'not_started', notes: '' },
    { id: 51, pattern: 'Tree DFS', name: 'Maximum Sum BST in Binary Tree', number: 1373, difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/', status: 'not_started', notes: '' },
    { id: 52, pattern: 'Tree DFS', name: 'All Nodes Distance K', number: 863, difficulty: 'Medium', link: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', status: 'not_started', notes: '' },

    // Pattern 7: Tree BFS (6 problems)
    { id: 53, pattern: 'Tree BFS', name: 'Binary Tree Level Order Traversal', number: 102, difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', status: 'not_started', notes: '' },
    { id: 54, pattern: 'Tree BFS', name: 'Binary Tree Zigzag Level Order', number: 103, difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', status: 'not_started', notes: '' },
    { id: 55, pattern: 'Tree BFS', name: 'Binary Tree Right Side View', number: 199, difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', status: 'not_started', notes: '' },
    { id: 56, pattern: 'Tree BFS', name: 'Minimum Depth of Binary Tree', number: 111, difficulty: 'Easy', link: 'https://leetcode.com/problems/minimum-depth-of-binary-tree/', status: 'not_started', notes: '' },
    { id: 57, pattern: 'Tree BFS', name: 'Connect Level Order Siblings', number: 117, difficulty: 'Medium', link: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/', status: 'not_started', notes: '' },
    { id: 58, pattern: 'Tree BFS', name: 'Maximum Level Sum', number: 1161, difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/', status: 'not_started', notes: '' },

    // Pattern 8: Graph BFS (10 problems)
    { id: 59, pattern: 'Graph BFS', name: 'Number of Islands', number: 200, difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-islands/', status: 'not_started', notes: '' },
    { id: 60, pattern: 'Graph BFS', name: 'Rotting Oranges', number: 994, difficulty: 'Medium', link: 'https://leetcode.com/problems/rotting-oranges/', status: 'not_started', notes: '' },
    { id: 61, pattern: 'Graph BFS', name: 'Word Ladder', number: 127, difficulty: 'Hard', link: 'https://leetcode.com/problems/word-ladder/', status: 'not_started', notes: '', star: true },
    { id: 62, pattern: 'Graph BFS', name: 'Shortest Path in Binary Matrix', number: 1091, difficulty: 'Medium', link: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', status: 'not_started', notes: '' },
    { id: 63, pattern: 'Graph BFS', name: '01 Matrix', number: 542, difficulty: 'Medium', link: 'https://leetcode.com/problems/01-matrix/', status: 'not_started', notes: '' },
    { id: 64, pattern: 'Graph BFS', name: 'Shortest Bridge', number: 934, difficulty: 'Medium', link: 'https://leetcode.com/problems/shortest-bridge/', status: 'not_started', notes: '' },
    { id: 65, pattern: 'Graph BFS', name: 'Minimum Knight Moves', number: 1197, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-knight-moves/', status: 'not_started', notes: '' },
    { id: 66, pattern: 'Graph BFS', name: 'Cut Off Trees for Golf Event', number: 675, difficulty: 'Hard', link: 'https://leetcode.com/problems/cut-off-trees-for-golf-event/', status: 'not_started', notes: '' },
    { id: 67, pattern: 'Graph BFS', name: 'Shortest Path with Alternating Colors', number: 1129, difficulty: 'Medium', link: 'https://leetcode.com/problems/shortest-path-with-alternating-colors/', status: 'not_started', notes: '' },
    { id: 68, pattern: 'Graph BFS', name: 'Min Cost to Make Valid Path', number: 1368, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/', status: 'not_started', notes: '' },

    // Pattern 9: Graph DFS (8 problems)
    { id: 69, pattern: 'Graph DFS', name: 'Clone Graph', number: 133, difficulty: 'Medium', link: 'https://leetcode.com/problems/clone-graph/', status: 'not_started', notes: '' },
    { id: 70, pattern: 'Graph DFS', name: 'Course Schedule II', number: 210, difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule-ii/', status: 'not_started', notes: '' },
    { id: 71, pattern: 'Graph DFS', name: 'Number of Connected Components', number: 323, difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', status: 'not_started', notes: '' },
    { id: 72, pattern: 'Graph DFS', name: 'Pacific Atlantic Water Flow', number: 417, difficulty: 'Medium', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', status: 'not_started', notes: '' },
    { id: 73, pattern: 'Graph DFS', name: 'Reconstruct Itinerary', number: 332, difficulty: 'Hard', link: 'https://leetcode.com/problems/reconstruct-itinerary/', status: 'not_started', notes: '' },
    { id: 74, pattern: 'Graph DFS', name: 'Critical Connections in Network', number: 1192, difficulty: 'Hard', link: 'https://leetcode.com/problems/critical-connections-in-a-network/', status: 'not_started', notes: '', star: true },
    { id: 75, pattern: 'Graph DFS', name: 'Longest Increasing Path in Matrix', number: 329, difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', status: 'not_started', notes: '' },
    { id: 76, pattern: 'Graph DFS', name: 'Evaluate Division', number: 399, difficulty: 'Medium', link: 'https://leetcode.com/problems/evaluate-division/', status: 'not_started', notes: '' },

    // Pattern 10: Union Find (8 problems)
    { id: 77, pattern: 'Union Find', name: 'Number of Provinces', number: 547, difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-provinces/', status: 'not_started', notes: '' },
    { id: 78, pattern: 'Union Find', name: 'Redundant Connection', number: 684, difficulty: 'Medium', link: 'https://leetcode.com/problems/redundant-connection/', status: 'not_started', notes: '' },
    { id: 79, pattern: 'Union Find', name: 'Most Stones Removed', number: 947, difficulty: 'Medium', link: 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/', status: 'not_started', notes: '' },
    { id: 80, pattern: 'Union Find', name: 'Accounts Merge', number: 721, difficulty: 'Medium', link: 'https://leetcode.com/problems/accounts-merge/', status: 'not_started', notes: '' },
    { id: 81, pattern: 'Union Find', name: 'Number of Islands II', number: 305, difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-islands-ii/', status: 'not_started', notes: '' },
    { id: 82, pattern: 'Union Find', name: 'Satisfiability of Equality Equations', number: 990, difficulty: 'Medium', link: 'https://leetcode.com/problems/satisfiability-of-equality-equations/', status: 'not_started', notes: '' },
    { id: 83, pattern: 'Union Find', name: 'Smallest String With Swaps', number: 1202, difficulty: 'Medium', link: 'https://leetcode.com/problems/smallest-string-with-swaps/', status: 'not_started', notes: '' },
    { id: 84, pattern: 'Union Find', name: 'Edge Length Limited Paths', number: 1697, difficulty: 'Hard', link: 'https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/', status: 'not_started', notes: '' },

    // Pattern 11: Topological Sort (6 problems)
    { id: 85, pattern: 'Topological Sort', name: 'Course Schedule', number: 207, difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule/', status: 'not_started', notes: '' },
    { id: 86, pattern: 'Topological Sort', name: 'Course Schedule II', number: 210, difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule-ii/', status: 'not_started', notes: '' },
    { id: 87, pattern: 'Topological Sort', name: 'Alien Dictionary', number: 269, difficulty: 'Hard', link: 'https://leetcode.com/problems/alien-dictionary/', status: 'not_started', notes: '', star: true },
    { id: 88, pattern: 'Topological Sort', name: 'Sequence Reconstruction', number: 444, difficulty: 'Medium', link: 'https://leetcode.com/problems/sequence-reconstruction/', status: 'not_started', notes: '' },
    { id: 89, pattern: 'Topological Sort', name: 'Minimum Height Trees', number: 310, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-height-trees/', status: 'not_started', notes: '' },
    { id: 90, pattern: 'Topological Sort', name: 'Sort Items by Groups', number: 1203, difficulty: 'Hard', link: 'https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/', status: 'not_started', notes: '' },

    // Pattern 12: 1D DP (8 problems)
    { id: 91, pattern: '1D DP', name: 'Climbing Stairs', number: 70, difficulty: 'Easy', link: 'https://leetcode.com/problems/climbing-stairs/', status: 'not_started', notes: '' },
    { id: 92, pattern: '1D DP', name: 'House Robber', number: 198, difficulty: 'Medium', link: 'https://leetcode.com/problems/house-robber/', status: 'not_started', notes: '' },
    { id: 93, pattern: '1D DP', name: 'House Robber II', number: 213, difficulty: 'Medium', link: 'https://leetcode.com/problems/house-robber-ii/', status: 'not_started', notes: '' },
    { id: 94, pattern: '1D DP', name: 'Decode Ways', number: 91, difficulty: 'Medium', link: 'https://leetcode.com/problems/decode-ways/', status: 'not_started', notes: '' },
    { id: 95, pattern: '1D DP', name: 'Word Break', number: 139, difficulty: 'Medium', link: 'https://leetcode.com/problems/word-break/', status: 'not_started', notes: '' },
    { id: 96, pattern: '1D DP', name: 'Longest Increasing Subsequence', number: 300, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', status: 'not_started', notes: '', star: true },
    { id: 97, pattern: '1D DP', name: 'Jump Game II', number: 45, difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game-ii/', status: 'not_started', notes: '' },
    { id: 98, pattern: '1D DP', name: 'Maximum Product Subarray', number: 152, difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-product-subarray/', status: 'not_started', notes: '' },

    // Pattern 13: 2D DP (10 problems)
    { id: 99, pattern: '2D DP', name: 'Unique Paths', number: 62, difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-paths/', status: 'not_started', notes: '' },
    { id: 100, pattern: '2D DP', name: 'Minimum Path Sum', number: 64, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-path-sum/', status: 'not_started', notes: '' },
    { id: 101, pattern: '2D DP', name: 'Longest Common Subsequence', number: 1143, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-common-subsequence/', status: 'not_started', notes: '', star: true },
    { id: 102, pattern: '2D DP', name: 'Edit Distance', number: 72, difficulty: 'Hard', link: 'https://leetcode.com/problems/edit-distance/', status: 'not_started', notes: '', star: true },
    { id: 103, pattern: '2D DP', name: 'Distinct Subsequences', number: 115, difficulty: 'Hard', link: 'https://leetcode.com/problems/distinct-subsequences/', status: 'not_started', notes: '' },
    { id: 104, pattern: '2D DP', name: 'Interleaving String', number: 97, difficulty: 'Medium', link: 'https://leetcode.com/problems/interleaving-string/', status: 'not_started', notes: '' },
    { id: 105, pattern: '2D DP', name: 'Longest Palindromic Subsequence', number: 516, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-subsequence/', status: 'not_started', notes: '' },
    { id: 106, pattern: '2D DP', name: 'Regular Expression Matching', number: 10, difficulty: 'Hard', link: 'https://leetcode.com/problems/regular-expression-matching/', status: 'not_started', notes: '', star: true },
    { id: 107, pattern: '2D DP', name: 'Wildcard Matching', number: 44, difficulty: 'Hard', link: 'https://leetcode.com/problems/wildcard-matching/', status: 'not_started', notes: '', star: true },
    { id: 108, pattern: '2D DP', name: 'Maximal Square', number: 221, difficulty: 'Medium', link: 'https://leetcode.com/problems/maximal-square/', status: 'not_started', notes: '' },

    // Pattern 14: Knapsack (8 problems)
    { id: 109, pattern: 'Knapsack', name: 'Partition Equal Subset Sum', number: 416, difficulty: 'Medium', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', status: 'not_started', notes: '', star: true },
    { id: 110, pattern: 'Knapsack', name: 'Target Sum', number: 494, difficulty: 'Medium', link: 'https://leetcode.com/problems/target-sum/', status: 'not_started', notes: '' },
    { id: 111, pattern: 'Knapsack', name: 'Last Stone Weight II', number: 1049, difficulty: 'Medium', link: 'https://leetcode.com/problems/last-stone-weight-ii/', status: 'not_started', notes: '' },
    { id: 112, pattern: 'Knapsack', name: 'Coin Change', number: 322, difficulty: 'Medium', link: 'https://leetcode.com/problems/coin-change/', status: 'not_started', notes: '' },
    { id: 113, pattern: 'Knapsack', name: 'Coin Change II', number: 518, difficulty: 'Medium', link: 'https://leetcode.com/problems/coin-change-ii/', status: 'not_started', notes: '' },
    { id: 114, pattern: 'Knapsack', name: 'Combination Sum IV', number: 377, difficulty: 'Medium', link: 'https://leetcode.com/problems/combination-sum-iv/', status: 'not_started', notes: '' },
    { id: 115, pattern: 'Knapsack', name: 'Ones and Zeroes', number: 474, difficulty: 'Medium', link: 'https://leetcode.com/problems/ones-and-zeroes/', status: 'not_started', notes: '' },
    { id: 116, pattern: 'Knapsack', name: 'Profitable Schemes', number: 879, difficulty: 'Hard', link: 'https://leetcode.com/problems/profitable-schemes/', status: 'not_started', notes: '' },

    // Pattern 15: DP on Strings (8 problems)
    { id: 117, pattern: 'DP on Strings', name: 'Longest Palindromic Substring', number: 5, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-substring/', status: 'not_started', notes: '' },
    { id: 118, pattern: 'DP on Strings', name: 'Palindromic Substrings', number: 647, difficulty: 'Medium', link: 'https://leetcode.com/problems/palindromic-substrings/', status: 'not_started', notes: '' },
    { id: 119, pattern: 'DP on Strings', name: 'Longest Palindromic Subsequence', number: 516, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-subsequence/', status: 'not_started', notes: '' },
    { id: 120, pattern: 'DP on Strings', name: 'Minimum Insertion Steps', number: 1312, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/', status: 'not_started', notes: '' },
    { id: 121, pattern: 'DP on Strings', name: 'Distinct Subsequences', number: 115, difficulty: 'Hard', link: 'https://leetcode.com/problems/distinct-subsequences/', status: 'not_started', notes: '' },
    { id: 122, pattern: 'DP on Strings', name: 'Shortest Common Supersequence', number: 1092, difficulty: 'Hard', link: 'https://leetcode.com/problems/shortest-common-supersequence/', status: 'not_started', notes: '' },
    { id: 123, pattern: 'DP on Strings', name: 'Minimum ASCII Delete Sum', number: 712, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/', status: 'not_started', notes: '' },
    { id: 124, pattern: 'DP on Strings', name: 'Count Palindromic Subsequences', number: 730, difficulty: 'Hard', link: 'https://leetcode.com/problems/count-different-palindromic-subsequences/', status: 'not_started', notes: '' },

    // Pattern 16: DP on Trees (6 problems)
    { id: 125, pattern: 'DP on Trees', name: 'House Robber III', number: 337, difficulty: 'Medium', link: 'https://leetcode.com/problems/house-robber-iii/', status: 'not_started', notes: '' },
    { id: 126, pattern: 'DP on Trees', name: 'Binary Tree Maximum Path Sum', number: 124, difficulty: 'Hard', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', status: 'not_started', notes: '' },
    { id: 127, pattern: 'DP on Trees', name: 'Longest Path Different Adjacent', number: 2246, difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-path-with-different-adjacent-characters/', status: 'not_started', notes: '' },
    { id: 128, pattern: 'DP on Trees', name: 'Count Nodes Equal to Sum', number: 2049, difficulty: 'Medium', link: 'https://leetcode.com/problems/count-nodes-equal-to-sum-of-descendants/', status: 'not_started', notes: '' },
    { id: 129, pattern: 'DP on Trees', name: 'Number of Ways to Reorder', number: 1569, difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/', status: 'not_started', notes: '' },
    { id: 130, pattern: 'DP on Trees', name: 'Tree Diameter', number: 1245, difficulty: 'Medium', link: 'https://leetcode.com/problems/tree-diameter/', status: 'not_started', notes: '' },

    // Pattern 17: Interval DP (6 problems)
    { id: 131, pattern: 'Interval DP', name: 'Min Cost Tree From Leaf Values', number: 1130, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/', status: 'not_started', notes: '' },
    { id: 132, pattern: 'Interval DP', name: 'Burst Balloons', number: 312, difficulty: 'Hard', link: 'https://leetcode.com/problems/burst-balloons/', status: 'not_started', notes: '', star: true },
    { id: 133, pattern: 'Interval DP', name: 'Remove Boxes', number: 546, difficulty: 'Hard', link: 'https://leetcode.com/problems/remove-boxes/', status: 'not_started', notes: '' },
    { id: 134, pattern: 'Interval DP', name: 'Strange Printer', number: 664, difficulty: 'Hard', link: 'https://leetcode.com/problems/strange-printer/', status: 'not_started', notes: '' },
    { id: 135, pattern: 'Interval DP', name: 'Minimum Cost to Merge Stones', number: 1000, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-merge-stones/', status: 'not_started', notes: '' },
    { id: 136, pattern: 'Interval DP', name: 'Palindrome Removal', number: 1246, difficulty: 'Hard', link: 'https://leetcode.com/problems/palindrome-removal/', status: 'not_started', notes: '' },

    // Pattern 18: Bitmask DP (6 problems)
    { id: 137, pattern: 'Bitmask DP', name: 'Shortest Path Visiting All Nodes', number: 847, difficulty: 'Hard', link: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/', status: 'not_started', notes: '', star: true },
    { id: 138, pattern: 'Bitmask DP', name: 'Partition to K Equal Sum Subsets', number: 698, difficulty: 'Medium', link: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/', status: 'not_started', notes: '' },
    { id: 139, pattern: 'Bitmask DP', name: 'Find the Shortest Superstring', number: 943, difficulty: 'Hard', link: 'https://leetcode.com/problems/find-the-shortest-superstring/', status: 'not_started', notes: '' },
    { id: 140, pattern: 'Bitmask DP', name: 'Maximum Students Taking Exam', number: 1349, difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-students-taking-exam/', status: 'not_started', notes: '' },
    { id: 141, pattern: 'Bitmask DP', name: 'Min Cost to Connect Two Groups', number: 1595, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points/', status: 'not_started', notes: '' },
    { id: 142, pattern: 'Bitmask DP', name: 'Ways to Wear Different Hats', number: 1434, difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other/', status: 'not_started', notes: '' },

    // Pattern 19: Digit DP (4 problems)
    { id: 143, pattern: 'Digit DP', name: 'Count Numbers with Unique Digits', number: 357, difficulty: 'Medium', link: 'https://leetcode.com/problems/count-numbers-with-unique-digits/', status: 'not_started', notes: '' },
    { id: 144, pattern: 'Digit DP', name: 'Numbers At Most N Given Digit Set', number: 902, difficulty: 'Hard', link: 'https://leetcode.com/problems/numbers-at-most-n-given-digit-set/', status: 'not_started', notes: '' },
    { id: 145, pattern: 'Digit DP', name: 'Non-negative Integers without Ones', number: 600, difficulty: 'Hard', link: 'https://leetcode.com/problems/non-negative-integers-without-consecutive-ones/', status: 'not_started', notes: '' },
    { id: 146, pattern: 'Digit DP', name: 'Numbers With Repeated Digits', number: 1012, difficulty: 'Hard', link: 'https://leetcode.com/problems/numbers-with-repeated-digits/', status: 'not_started', notes: '' },

    // Pattern 20: Greedy (12 problems)
    { id: 147, pattern: 'Greedy', name: 'Jump Game', number: 55, difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game/', status: 'not_started', notes: '' },
    { id: 148, pattern: 'Greedy', name: 'Jump Game II', number: 45, difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game-ii/', status: 'not_started', notes: '' },
    { id: 149, pattern: 'Greedy', name: 'Gas Station', number: 134, difficulty: 'Medium', link: 'https://leetcode.com/problems/gas-station/', status: 'not_started', notes: '' },
    { id: 150, pattern: 'Greedy', name: 'Candy', number: 135, difficulty: 'Hard', link: 'https://leetcode.com/problems/candy/', status: 'not_started', notes: '' },
    { id: 151, pattern: 'Greedy', name: 'Task Scheduler', number: 621, difficulty: 'Medium', link: 'https://leetcode.com/problems/task-scheduler/', status: 'not_started', notes: '' },
    { id: 152, pattern: 'Greedy', name: 'Non-overlapping Intervals', number: 435, difficulty: 'Medium', link: 'https://leetcode.com/problems/non-overlapping-intervals/', status: 'not_started', notes: '' },
    { id: 153, pattern: 'Greedy', name: 'Minimum Number of Arrows', number: 452, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', status: 'not_started', notes: '' },
    { id: 154, pattern: 'Greedy', name: 'Queue Reconstruction by Height', number: 406, difficulty: 'Medium', link: 'https://leetcode.com/problems/queue-reconstruction-by-height/', status: 'not_started', notes: '' },
    { id: 155, pattern: 'Greedy', name: 'Partition Labels', number: 763, difficulty: 'Medium', link: 'https://leetcode.com/problems/partition-labels/', status: 'not_started', notes: '' },
    { id: 156, pattern: 'Greedy', name: 'Minimum Number of Taps', number: 1326, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/', status: 'not_started', notes: '' },
    { id: 157, pattern: 'Greedy', name: 'Min Cost to Hire K Workers', number: 857, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-hire-k-workers/', status: 'not_started', notes: '' },
    { id: 158, pattern: 'Greedy', name: 'IPO', number: 502, difficulty: 'Hard', link: 'https://leetcode.com/problems/ipo/', status: 'not_started', notes: '' },

    // Pattern 21: Backtracking (10 problems)
    { id: 159, pattern: 'Backtracking', name: 'Permutations', number: 46, difficulty: 'Medium', link: 'https://leetcode.com/problems/permutations/', status: 'not_started', notes: '' },
    { id: 160, pattern: 'Backtracking', name: 'Combinations', number: 77, difficulty: 'Medium', link: 'https://leetcode.com/problems/combinations/', status: 'not_started', notes: '' },
    { id: 161, pattern: 'Backtracking', name: 'Subsets', number: 78, difficulty: 'Medium', link: 'https://leetcode.com/problems/subsets/', status: 'not_started', notes: '' },
    { id: 162, pattern: 'Backtracking', name: 'Combination Sum', number: 39, difficulty: 'Medium', link: 'https://leetcode.com/problems/combination-sum/', status: 'not_started', notes: '' },
    { id: 163, pattern: 'Backtracking', name: 'Palindrome Partitioning', number: 131, difficulty: 'Medium', link: 'https://leetcode.com/problems/palindrome-partitioning/', status: 'not_started', notes: '' },
    { id: 164, pattern: 'Backtracking', name: 'Word Search', number: 79, difficulty: 'Medium', link: 'https://leetcode.com/problems/word-search/', status: 'not_started', notes: '' },
    { id: 165, pattern: 'Backtracking', name: 'N-Queens', number: 51, difficulty: 'Hard', link: 'https://leetcode.com/problems/n-queens/', status: 'not_started', notes: '' },
    { id: 166, pattern: 'Backtracking', name: 'Sudoku Solver', number: 37, difficulty: 'Hard', link: 'https://leetcode.com/problems/sudoku-solver/', status: 'not_started', notes: '', star: true },
    { id: 167, pattern: 'Backtracking', name: 'Word Search II', number: 212, difficulty: 'Hard', link: 'https://leetcode.com/problems/word-search-ii/', status: 'not_started', notes: '', star: true },
    { id: 168, pattern: 'Backtracking', name: 'Expression Add Operators', number: 282, difficulty: 'Hard', link: 'https://leetcode.com/problems/expression-add-operators/', status: 'not_started', notes: '' },

    // Pattern 22: Divide & Conquer (6 problems)
    { id: 169, pattern: 'Divide & Conquer', name: 'Merge Sort', number: 0, difficulty: 'Medium', link: 'https://www.geeksforgeeks.org/merge-sort/', status: 'not_started', notes: 'Practice on GFG' },
    { id: 170, pattern: 'Divide & Conquer', name: 'Median of Two Sorted Arrays', number: 4, difficulty: 'Hard', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', status: 'not_started', notes: '' },
    { id: 171, pattern: 'Divide & Conquer', name: 'Kth Largest Element', number: 215, difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', status: 'not_started', notes: '' },
    { id: 172, pattern: 'Divide & Conquer', name: 'Count of Range Sum', number: 327, difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-range-sum/', status: 'not_started', notes: '' },
    { id: 173, pattern: 'Divide & Conquer', name: 'Beautiful Array', number: 932, difficulty: 'Medium', link: 'https://leetcode.com/problems/beautiful-array/', status: 'not_started', notes: '' },
    { id: 174, pattern: 'Divide & Conquer', name: 'Different Ways to Add Parentheses', number: 241, difficulty: 'Medium', link: 'https://leetcode.com/problems/different-ways-to-add-parentheses/', status: 'not_started', notes: '' },

    // Pattern 23: Monotonic Stack (10 problems)
    { id: 175, pattern: 'Monotonic Stack', name: 'Daily Temperatures', number: 739, difficulty: 'Medium', link: 'https://leetcode.com/problems/daily-temperatures/', status: 'not_started', notes: '' },
    { id: 176, pattern: 'Monotonic Stack', name: 'Next Greater Element I', number: 496, difficulty: 'Easy', link: 'https://leetcode.com/problems/next-greater-element-i/', status: 'not_started', notes: '' },
    { id: 177, pattern: 'Monotonic Stack', name: 'Next Greater Element II', number: 503, difficulty: 'Medium', link: 'https://leetcode.com/problems/next-greater-element-ii/', status: 'not_started', notes: '' },
    { id: 178, pattern: 'Monotonic Stack', name: 'Largest Rectangle in Histogram', number: 84, difficulty: 'Hard', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', status: 'not_started', notes: '', star: true },
    { id: 179, pattern: 'Monotonic Stack', name: 'Maximal Rectangle', number: 85, difficulty: 'Hard', link: 'https://leetcode.com/problems/maximal-rectangle/', status: 'not_started', notes: '', star: true },
    { id: 180, pattern: 'Monotonic Stack', name: 'Trapping Rain Water', number: 42, difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water/', status: 'not_started', notes: '' },
    { id: 181, pattern: 'Monotonic Stack', name: 'Remove K Digits', number: 402, difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-k-digits/', status: 'not_started', notes: '' },
    { id: 182, pattern: 'Monotonic Stack', name: 'Sum of Subarray Minimums', number: 907, difficulty: 'Medium', link: 'https://leetcode.com/problems/sum-of-subarray-minimums/', status: 'not_started', notes: '' },
    { id: 183, pattern: 'Monotonic Stack', name: 'Maximum Width Ramp', number: 962, difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-width-ramp/', status: 'not_started', notes: '' },
    { id: 184, pattern: 'Monotonic Stack', name: 'Longest Well-Performing Interval', number: 1124, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-well-performing-interval/', status: 'not_started', notes: '' },

    // Pattern 24: Monotonic Queue (5 problems)
    { id: 185, pattern: 'Monotonic Queue', name: 'Sliding Window Maximum', number: 239, difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-maximum/', status: 'not_started', notes: '', star: true },
    { id: 186, pattern: 'Monotonic Queue', name: 'Shortest Subarray with Sum K', number: 862, difficulty: 'Hard', link: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/', status: 'not_started', notes: '' },
    { id: 187, pattern: 'Monotonic Queue', name: 'Constrained Subsequence Sum', number: 1425, difficulty: 'Hard', link: 'https://leetcode.com/problems/constrained-subsequence-sum/', status: 'not_started', notes: '' },
    { id: 188, pattern: 'Monotonic Queue', name: 'Jump Game VI', number: 1696, difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game-vi/', status: 'not_started', notes: '' },
    { id: 189, pattern: 'Monotonic Queue', name: 'Longest Continuous Subarray', number: 1438, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/', status: 'not_started', notes: '' },

    // Pattern 25: Heap (12 problems)
    { id: 190, pattern: 'Heap', name: 'Kth Largest Element', number: 215, difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', status: 'not_started', notes: '' },
    { id: 191, pattern: 'Heap', name: 'K Closest Points to Origin', number: 973, difficulty: 'Medium', link: 'https://leetcode.com/problems/k-closest-points-to-origin/', status: 'not_started', notes: '' },
    { id: 192, pattern: 'Heap', name: 'Top K Frequent Elements', number: 347, difficulty: 'Medium', link: 'https://leetcode.com/problems/top-k-frequent-elements/', status: 'not_started', notes: '' },
    { id: 193, pattern: 'Heap', name: 'Find Median from Data Stream', number: 295, difficulty: 'Hard', link: 'https://leetcode.com/problems/find-median-from-data-stream/', status: 'not_started', notes: '', star: true },
    { id: 194, pattern: 'Heap', name: 'Merge K Sorted Lists', number: 23, difficulty: 'Hard', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', status: 'not_started', notes: '' },
    { id: 195, pattern: 'Heap', name: 'Kth Smallest in Sorted Matrix', number: 378, difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', status: 'not_started', notes: '' },
    { id: 196, pattern: 'Heap', name: 'Meeting Rooms II', number: 253, difficulty: 'Medium', link: 'https://leetcode.com/problems/meeting-rooms-ii/', status: 'not_started', notes: '' },
    { id: 197, pattern: 'Heap', name: 'Task Scheduler', number: 621, difficulty: 'Medium', link: 'https://leetcode.com/problems/task-scheduler/', status: 'not_started', notes: '' },
    { id: 198, pattern: 'Heap', name: 'The Skyline Problem', number: 218, difficulty: 'Hard', link: 'https://leetcode.com/problems/the-skyline-problem/', status: 'not_started', notes: '', star: true },
    { id: 199, pattern: 'Heap', name: 'IPO', number: 502, difficulty: 'Hard', link: 'https://leetcode.com/problems/ipo/', status: 'not_started', notes: '' },
    { id: 200, pattern: 'Heap', name: 'Find K Pairs with Smallest Sums', number: 373, difficulty: 'Medium', link: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/', status: 'not_started', notes: '' },
    { id: 201, pattern: 'Heap', name: 'Reorganize String', number: 767, difficulty: 'Medium', link: 'https://leetcode.com/problems/reorganize-string/', status: 'not_started', notes: '' },

    // Pattern 26: Trie (6 problems)
    { id: 202, pattern: 'Trie', name: 'Implement Trie', number: 208, difficulty: 'Medium', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/', status: 'not_started', notes: '' },
    { id: 203, pattern: 'Trie', name: 'Word Search II', number: 212, difficulty: 'Hard', link: 'https://leetcode.com/problems/word-search-ii/', status: 'not_started', notes: '', star: true },
    { id: 204, pattern: 'Trie', name: 'Design Add and Search Words', number: 211, difficulty: 'Medium', link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', status: 'not_started', notes: '' },
    { id: 205, pattern: 'Trie', name: 'Replace Words', number: 648, difficulty: 'Medium', link: 'https://leetcode.com/problems/replace-words/', status: 'not_started', notes: '' },
    { id: 206, pattern: 'Trie', name: 'Longest Word in Dictionary', number: 720, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-word-in-dictionary/', status: 'not_started', notes: '' },
    { id: 207, pattern: 'Trie', name: 'Maximum XOR of Two Numbers', number: 421, difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', status: 'not_started', notes: '' },

    // Pattern 27: Segment Tree (6 problems)
    { id: 208, pattern: 'Segment Tree', name: 'Range Sum Query - Mutable', number: 307, difficulty: 'Medium', link: 'https://leetcode.com/problems/range-sum-query-mutable/', status: 'not_started', notes: '', star: true },
    { id: 209, pattern: 'Segment Tree', name: 'Count Smaller Numbers After Self', number: 315, difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', status: 'not_started', notes: '' },
    { id: 210, pattern: 'Segment Tree', name: 'Range Sum Query 2D - Mutable', number: 308, difficulty: 'Hard', link: 'https://leetcode.com/problems/range-sum-query-2d-mutable/', status: 'not_started', notes: '' },
    { id: 211, pattern: 'Segment Tree', name: 'The Skyline Problem', number: 218, difficulty: 'Hard', link: 'https://leetcode.com/problems/the-skyline-problem/', status: 'not_started', notes: '' },
    { id: 212, pattern: 'Segment Tree', name: 'Falling Squares', number: 699, difficulty: 'Hard', link: 'https://leetcode.com/problems/falling-squares/', status: 'not_started', notes: '' },
    { id: 213, pattern: 'Segment Tree', name: 'Count of Range Sum', number: 327, difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-range-sum/', status: 'not_started', notes: '' },

    // Pattern 28: BIT/Fenwick Tree (4 problems)
    { id: 214, pattern: 'BIT/Fenwick Tree', name: 'Range Sum Query - Mutable', number: 307, difficulty: 'Medium', link: 'https://leetcode.com/problems/range-sum-query-mutable/', status: 'not_started', notes: '' },
    { id: 215, pattern: 'BIT/Fenwick Tree', name: 'Count Smaller Numbers After Self', number: 315, difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', status: 'not_started', notes: '' },
    { id: 216, pattern: 'BIT/Fenwick Tree', name: 'Reverse Pairs', number: 493, difficulty: 'Hard', link: 'https://leetcode.com/problems/reverse-pairs/', status: 'not_started', notes: '' },
    { id: 217, pattern: 'BIT/Fenwick Tree', name: 'Create Sorted Array', number: 1649, difficulty: 'Hard', link: 'https://leetcode.com/problems/create-sorted-array-through-instructions/', status: 'not_started', notes: '' },

    // Pattern 29: KMP (4 problems)
    { id: 218, pattern: 'KMP Algorithm', name: 'Implement strStr()', number: 28, difficulty: 'Easy', link: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', status: 'not_started', notes: '' },
    { id: 219, pattern: 'KMP Algorithm', name: 'Shortest Palindrome', number: 214, difficulty: 'Hard', link: 'https://leetcode.com/problems/shortest-palindrome/', status: 'not_started', notes: '', star: true },
    { id: 220, pattern: 'KMP Algorithm', name: 'Repeated Substring Pattern', number: 459, difficulty: 'Easy', link: 'https://leetcode.com/problems/repeated-substring-pattern/', status: 'not_started', notes: '' },
    { id: 221, pattern: 'KMP Algorithm', name: 'Find All Good Strings', number: 1397, difficulty: 'Hard', link: 'https://leetcode.com/problems/find-all-good-strings/', status: 'not_started', notes: '' },

    // Pattern 30: Rolling Hash (5 problems)
    { id: 222, pattern: 'Rolling Hash', name: 'Repeated DNA Sequences', number: 187, difficulty: 'Medium', link: 'https://leetcode.com/problems/repeated-dna-sequences/', status: 'not_started', notes: '' },
    { id: 223, pattern: 'Rolling Hash', name: 'Longest Duplicate Substring', number: 1044, difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-duplicate-substring/', status: 'not_started', notes: '' },
    { id: 224, pattern: 'Rolling Hash', name: 'Find Substring With Given Hash', number: 2156, difficulty: 'Medium', link: 'https://leetcode.com/problems/find-substring-with-given-hash-value/', status: 'not_started', notes: '' },
    { id: 225, pattern: 'Rolling Hash', name: 'Distinct Echo Substrings', number: 1316, difficulty: 'Hard', link: 'https://leetcode.com/problems/distinct-echo-substrings/', status: 'not_started', notes: '' },
    { id: 226, pattern: 'Rolling Hash', name: 'Longest Happy Prefix', number: 1392, difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-happy-prefix/', status: 'not_started', notes: '' },

    // Pattern 31: Manacher's Algorithm (3 problems)
    { id: 227, pattern: "Manacher's Algorithm", name: 'Longest Palindromic Substring', number: 5, difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-substring/', status: 'not_started', notes: '' },
    { id: 228, pattern: "Manacher's Algorithm", name: 'Palindromic Substrings', number: 647, difficulty: 'Medium', link: 'https://leetcode.com/problems/palindromic-substrings/', status: 'not_started', notes: '' },
    { id: 229, pattern: "Manacher's Algorithm", name: 'Count Palindromic Subsequences', number: 730, difficulty: 'Hard', link: 'https://leetcode.com/problems/count-different-palindromic-subsequences/', status: 'not_started', notes: '' },

    // Pattern 32: Math & Number Theory (10 problems)
    { id: 230, pattern: 'Math & Number Theory', name: 'Pow(x, n)', number: 50, difficulty: 'Medium', link: 'https://leetcode.com/problems/powx-n/', status: 'not_started', notes: '' },
    { id: 231, pattern: 'Math & Number Theory', name: 'Sqrt(x)', number: 69, difficulty: 'Easy', link: 'https://leetcode.com/problems/sqrtx/', status: 'not_started', notes: '' },
    { id: 232, pattern: 'Math & Number Theory', name: 'Count Primes', number: 204, difficulty: 'Medium', link: 'https://leetcode.com/problems/count-primes/', status: 'not_started', notes: '' },
    { id: 233, pattern: 'Math & Number Theory', name: 'Excel Sheet Column Number', number: 171, difficulty: 'Easy', link: 'https://leetcode.com/problems/excel-sheet-column-number/', status: 'not_started', notes: '' },
    { id: 234, pattern: 'Math & Number Theory', name: 'Factorial Trailing Zeroes', number: 172, difficulty: 'Medium', link: 'https://leetcode.com/problems/factorial-trailing-zeroes/', status: 'not_started', notes: '' },
    { id: 235, pattern: 'Math & Number Theory', name: 'Fraction to Recurring Decimal', number: 166, difficulty: 'Medium', link: 'https://leetcode.com/problems/fraction-to-recurring-decimal/', status: 'not_started', notes: '' },
    { id: 236, pattern: 'Math & Number Theory', name: 'Nth Digit', number: 400, difficulty: 'Medium', link: 'https://leetcode.com/problems/nth-digit/', status: 'not_started', notes: '' },
    { id: 237, pattern: 'Math & Number Theory', name: 'Integer Break', number: 343, difficulty: 'Medium', link: 'https://leetcode.com/problems/integer-break/', status: 'not_started', notes: '' },
    { id: 238, pattern: 'Math & Number Theory', name: 'Super Pow', number: 372, difficulty: 'Medium', link: 'https://leetcode.com/problems/super-pow/', status: 'not_started', notes: '' },
    { id: 239, pattern: 'Math & Number Theory', name: 'Count Palindromic Subsequences', number: 730, difficulty: 'Hard', link: 'https://leetcode.com/problems/count-different-palindromic-subsequences/', status: 'not_started', notes: '' },

    // Pattern 33: Bit Manipulation (10 problems)
    { id: 240, pattern: 'Bit Manipulation', name: 'Single Number', number: 136, difficulty: 'Easy', link: 'https://leetcode.com/problems/single-number/', status: 'not_started', notes: '' },
    { id: 241, pattern: 'Bit Manipulation', name: 'Single Number II', number: 137, difficulty: 'Medium', link: 'https://leetcode.com/problems/single-number-ii/', status: 'not_started', notes: '' },
    { id: 242, pattern: 'Bit Manipulation', name: 'Single Number III', number: 260, difficulty: 'Medium', link: 'https://leetcode.com/problems/single-number-iii/', status: 'not_started', notes: '' },
    { id: 243, pattern: 'Bit Manipulation', name: 'Number of 1 Bits', number: 191, difficulty: 'Easy', link: 'https://leetcode.com/problems/number-of-1-bits/', status: 'not_started', notes: '' },
    { id: 244, pattern: 'Bit Manipulation', name: 'Counting Bits', number: 338, difficulty: 'Easy', link: 'https://leetcode.com/problems/counting-bits/', status: 'not_started', notes: '' },
    { id: 245, pattern: 'Bit Manipulation', name: 'Maximum XOR of Two Numbers', number: 421, difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', status: 'not_started', notes: '' },
    { id: 246, pattern: 'Bit Manipulation', name: 'Bitwise AND of Numbers Range', number: 201, difficulty: 'Medium', link: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/', status: 'not_started', notes: '' },
    { id: 247, pattern: 'Bit Manipulation', name: 'Sum of Two Integers', number: 371, difficulty: 'Medium', link: 'https://leetcode.com/problems/sum-of-two-integers/', status: 'not_started', notes: '' },
    { id: 248, pattern: 'Bit Manipulation', name: 'UTF-8 Validation', number: 393, difficulty: 'Medium', link: 'https://leetcode.com/problems/utf-8-validation/', status: 'not_started', notes: '' },
    { id: 249, pattern: 'Bit Manipulation', name: 'Min Flips to Make OR Equal', number: 1318, difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/', status: 'not_started', notes: '' },

    // Pattern 34: Game Theory (5 problems)
    { id: 250, pattern: 'Game Theory', name: 'Nim Game', number: 292, difficulty: 'Easy', link: 'https://leetcode.com/problems/nim-game/', status: 'not_started', notes: '' },
    { id: 251, pattern: 'Game Theory', name: 'Flip Game II', number: 294, difficulty: 'Medium', link: 'https://leetcode.com/problems/flip-game-ii/', status: 'not_started', notes: '' },
    { id: 252, pattern: 'Game Theory', name: 'Can I Win', number: 464, difficulty: 'Medium', link: 'https://leetcode.com/problems/can-i-win/', status: 'not_started', notes: '' },
    { id: 253, pattern: 'Game Theory', name: 'Predict the Winner', number: 486, difficulty: 'Medium', link: 'https://leetcode.com/problems/predict-the-winner/', status: 'not_started', notes: '' },
    { id: 254, pattern: 'Game Theory', name: 'Stone Game', number: 877, difficulty: 'Medium', link: 'https://leetcode.com/problems/stone-game/', status: 'not_started', notes: '' },

    // Pattern 35: Prefix Sum (8 problems)
    { id: 255, pattern: 'Prefix Sum', name: 'Range Sum Query - Immutable', number: 303, difficulty: 'Easy', link: 'https://leetcode.com/problems/range-sum-query-immutable/', status: 'not_started', notes: '' },
    { id: 256, pattern: 'Prefix Sum', name: 'Subarray Sum Equals K', number: 560, difficulty: 'Medium', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', status: 'not_started', notes: '', star: true },
    { id: 257, pattern: 'Prefix Sum', name: 'Continuous Subarray Sum', number: 523, difficulty: 'Medium', link: 'https://leetcode.com/problems/continuous-subarray-sum/', status: 'not_started', notes: '' },
    { id: 258, pattern: 'Prefix Sum', name: 'Product of Array Except Self', number: 238, difficulty: 'Medium', link: 'https://leetcode.com/problems/product-of-array-except-self/', status: 'not_started', notes: '' },
    { id: 259, pattern: 'Prefix Sum', name: 'Range Addition', number: 370, difficulty: 'Medium', link: 'https://leetcode.com/problems/range-addition/', status: 'not_started', notes: '' },
    { id: 260, pattern: 'Prefix Sum', name: 'Corporate Flight Bookings', number: 1109, difficulty: 'Medium', link: 'https://leetcode.com/problems/corporate-flight-bookings/', status: 'not_started', notes: '' },
    { id: 261, pattern: 'Prefix Sum', name: 'Car Pooling', number: 1094, difficulty: 'Medium', link: 'https://leetcode.com/problems/car-pooling/', status: 'not_started', notes: '' },
    { id: 262, pattern: 'Prefix Sum', name: 'Max Sum of 3 Non-Overlapping', number: 689, difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/', status: 'not_started', notes: '' },

    // Pattern 36: Matrix (6 problems)
    { id: 263, pattern: 'Matrix Manipulation', name: 'Rotate Image', number: 48, difficulty: 'Medium', link: 'https://leetcode.com/problems/rotate-image/', status: 'not_started', notes: '' },
    { id: 264, pattern: 'Matrix Manipulation', name: 'Spiral Matrix', number: 54, difficulty: 'Medium', link: 'https://leetcode.com/problems/spiral-matrix/', status: 'not_started', notes: '' },
    { id: 265, pattern: 'Matrix Manipulation', name: 'Set Matrix Zeroes', number: 73, difficulty: 'Medium', link: 'https://leetcode.com/problems/set-matrix-zeroes/', status: 'not_started', notes: '' },
    { id: 266, pattern: 'Matrix Manipulation', name: 'Diagonal Traverse', number: 498, difficulty: 'Medium', link: 'https://leetcode.com/problems/diagonal-traverse/', status: 'not_started', notes: '' },
    { id: 267, pattern: 'Matrix Manipulation', name: 'Search a 2D Matrix', number: 74, difficulty: 'Medium', link: 'https://leetcode.com/problems/search-a-2d-matrix/', status: 'not_started', notes: '' },
    { id: 268, pattern: 'Matrix Manipulation', name: 'Valid Sudoku', number: 36, difficulty: 'Medium', link: 'https://leetcode.com/problems/valid-sudoku/', status: 'not_started', notes: '' },

    // Pattern 37: Simulation (5 problems)
    { id: 269, pattern: 'Simulation', name: 'Design Tic-Tac-Toe', number: 348, difficulty: 'Medium', link: 'https://leetcode.com/problems/design-tic-tac-toe/', status: 'not_started', notes: '' },
    { id: 270, pattern: 'Simulation', name: 'Design Snake Game', number: 353, difficulty: 'Medium', link: 'https://leetcode.com/problems/design-snake-game/', status: 'not_started', notes: '' },
    { id: 271, pattern: 'Simulation', name: 'Robot Bounded In Circle', number: 1041, difficulty: 'Medium', link: 'https://leetcode.com/problems/robot-bounded-in-circle/', status: 'not_started', notes: '' },
    { id: 272, pattern: 'Simulation', name: 'Walking Robot Simulation', number: 874, difficulty: 'Medium', link: 'https://leetcode.com/problems/walking-robot-simulation/', status: 'not_started', notes: '' },
    { id: 273, pattern: 'Simulation', name: 'Design Underground System', number: 1396, difficulty: 'Medium', link: 'https://leetcode.com/problems/design-underground-system/', status: 'not_started', notes: '' },

    // Pattern 38: State Machine DP (6 problems)
    { id: 274, pattern: 'State Machine DP', name: 'Buy and Sell Stock', number: 121, difficulty: 'Easy', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', status: 'not_started', notes: '' },
    { id: 275, pattern: 'State Machine DP', name: 'Buy and Sell Stock II', number: 122, difficulty: 'Medium', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/', status: 'not_started', notes: '' },
    { id: 276, pattern: 'State Machine DP', name: 'Buy and Sell Stock III', number: 123, difficulty: 'Hard', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', status: 'not_started', notes: '' },
    { id: 277, pattern: 'State Machine DP', name: 'Buy and Sell Stock IV', number: 188, difficulty: 'Hard', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/', status: 'not_started', notes: '' },
    { id: 278, pattern: 'State Machine DP', name: 'Buy Sell with Cooldown', number: 309, difficulty: 'Medium', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', status: 'not_started', notes: '' },
    { id: 279, pattern: 'State Machine DP', name: 'Buy Sell with Transaction Fee', number: 714, difficulty: 'Medium', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/', status: 'not_started', notes: '' },

    // Pattern 39: Iterator Design (4 problems)
    { id: 280, pattern: 'Iterator Design', name: 'Flatten Nested List Iterator', number: 341, difficulty: 'Medium', link: 'https://leetcode.com/problems/flatten-nested-list-iterator/', status: 'not_started', notes: '' },
    { id: 281, pattern: 'Iterator Design', name: 'Peeking Iterator', number: 284, difficulty: 'Medium', link: 'https://leetcode.com/problems/peeking-iterator/', status: 'not_started', notes: '' },
    { id: 282, pattern: 'Iterator Design', name: 'Zigzag Iterator', number: 281, difficulty: 'Medium', link: 'https://leetcode.com/problems/zigzag-iterator/', status: 'not_started', notes: '' },
    { id: 283, pattern: 'Iterator Design', name: 'Binary Search Tree Iterator', number: 173, difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-search-tree-iterator/', status: 'not_started', notes: '' },

    // Pattern 40: Advanced Graph (10 problems)
    { id: 284, pattern: 'Advanced Graph', name: 'Network Delay Time', number: 743, difficulty: 'Medium', link: 'https://leetcode.com/problems/network-delay-time/', status: 'not_started', notes: '' },
    { id: 285, pattern: 'Advanced Graph', name: 'Cheapest Flights Within K Stops', number: 787, difficulty: 'Medium', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', status: 'not_started', notes: '' },
    { id: 286, pattern: 'Advanced Graph', name: 'Path With Maximum Probability', number: 1514, difficulty: 'Medium', link: 'https://leetcode.com/problems/path-with-maximum-probability/', status: 'not_started', notes: '' },
    { id: 287, pattern: 'Advanced Graph', name: 'Shortest Path with Obstacles', number: 1293, difficulty: 'Hard', link: 'https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/', status: 'not_started', notes: '' },
    { id: 288, pattern: 'Advanced Graph', name: 'Min Cost to Make Valid Path', number: 1368, difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/', status: 'not_started', notes: '' },
    { id: 289, pattern: 'Advanced Graph', name: 'Swim in Rising Water', number: 778, difficulty: 'Hard', link: 'https://leetcode.com/problems/swim-in-rising-water/', status: 'not_started', notes: '' },
    { id: 290, pattern: 'Advanced Graph', name: 'Path With Minimum Effort', number: 1631, difficulty: 'Medium', link: 'https://leetcode.com/problems/path-with-minimum-effort/', status: 'not_started', notes: '' },
    { id: 291, pattern: 'Advanced Graph', name: 'Reconstruct Itinerary', number: 332, difficulty: 'Hard', link: 'https://leetcode.com/problems/reconstruct-itinerary/', status: 'not_started', notes: '' },
    { id: 292, pattern: 'Advanced Graph', name: 'Critical Connections', number: 1192, difficulty: 'Hard', link: 'https://leetcode.com/problems/critical-connections-in-a-network/', status: 'not_started', notes: '' },
    { id: 293, pattern: 'Advanced Graph', name: 'Min Cost to Connect All Points', number: 1584, difficulty: 'Medium', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', status: 'not_started', notes: '' },
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('dsa_tracker_problems');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProblems(parsed);
        setFilteredProblems(parsed);
      } catch (error) {
        console.error('Failed to load saved data:', error);
        setProblems(problemsData);
        setFilteredProblems(problemsData);
      }
    } else {
      setProblems(problemsData);
      setFilteredProblems(problemsData);
    }
  }, []);

  // Save to localStorage whenever problems change
  useEffect(() => {
    if (problems.length > 0) {
      localStorage.setItem('dsa_tracker_problems', JSON.stringify(problems));
    }
  }, [problems]);

  useEffect(() => {
    let filtered = problems;

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.number.toString().includes(searchTerm)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus);
    }

    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(p => p.difficulty === filterDifficulty);
    }

    if (selectedPattern !== 'all') {
      filtered = filtered.filter(p => p.pattern === selectedPattern);
    }

    setFilteredProblems(filtered);
  }, [searchTerm, filterStatus, filterDifficulty, selectedPattern, problems]);

  const updateProblem = (id, field, value) => {
    const updated = problems.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    setProblems(updated);
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem('dsa_tracker_problems');
      setProblems(problemsData);
      setFilteredProblems(problemsData);
    }
  };

  const exportToCSV = () => {
    const headers = ['Pattern', 'Problem', 'Number', 'Difficulty', 'Status', 'Notes', 'Link'];
    const rows = problems.map(p => [
      p.pattern, p.name, p.number, p.difficulty, p.status, p.notes, p.link
    ]);
    
    const csv = [headers, ...rows].map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dsa_tracker.csv';
    a.click();
  };

  const patterns = [...new Set(problems.map(p => p.pattern))];
  const stats = {
    total: problems.length,
    completed: problems.filter(p => p.status === 'completed').length,
    inProgress: problems.filter(p => p.status === 'in_progress').length,
    notStarted: problems.filter(p => p.status === 'not_started').length,
  };

  const getStatusColor = (status) => {
    if (status === 'completed') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (status === 'in_progress') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-gray-700 text-gray-400 border-gray-600';
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'Easy') return 'text-green-400';
    if (difficulty === 'Medium') return 'text-yellow-400';
    if (difficulty === 'Hard') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">DSA Tracker</h1>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-400">{stats.total} problems</span>
            <span className="text-green-400">{stats.completed} done</span>
            <span className="text-yellow-400">{stats.inProgress} in progress</span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-700"
            />
          </div>
          
          <select
            value={selectedPattern}
            onChange={(e) => setSelectedPattern(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-gray-100 focus:outline-none focus:border-gray-700"
          >
            <option value="all">All Patterns</option>
            {patterns.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-gray-100 focus:outline-none focus:border-gray-700"
          >
            <option value="all">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm text-gray-100 focus:outline-none focus:border-gray-700"
          >
            <option value="all">All Status</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pattern</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Problem</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diff</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map((problem) => (
                <tr key={problem.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                  <td className="px-4 py-3">
                    <select
                      value={problem.status}
                      onChange={(e) => updateProblem(problem.id, 'status', e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(problem.status)} bg-transparent cursor-pointer focus:outline-none`}
                    >
                      <option value="not_started" className="bg-gray-900">Not Started</option>
                      <option value="in_progress" className="bg-gray-900">In Progress</option>
                      <option value="completed" className="bg-gray-900">Completed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{problem.pattern}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {problem.star && <span className="text-yellow-500">⭐</span>}
                      <span className="text-sm text-gray-200">{problem.name}</span>
                      {problem.number > 0 && <span className="text-xs text-gray-600">#{problem.number}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={problem.notes}
                      onChange={(e) => updateProblem(problem.id, 'notes', e.target.value)}
                      placeholder="Add notes..."
                      className="w-full px-2 py-1 text-sm bg-gray-800 border border-gray-700 rounded text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition"
                    >
                      <BookOpen className="w-4 h-4" />
                      Open
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-gray-500">{((stats.completed / stats.total) * 100).toFixed(0)}% complete</span>
          <div className="flex gap-3">
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/30 border border-red-800/30 rounded text-red-400 transition"
            >
              <Trash2 className="w-4 h-4" />
              Reset Progress
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAPatternTracker;