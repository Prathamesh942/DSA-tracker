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
    // Pattern 1: Two Pointers (8 problems) - TEST PATTERN
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
    { id: 29, pattern: 'Binary Search', name: 'Aggressive Cows', number: 0, difficulty: 'Hard', link: 'https://www.spoj.com/problems/AGGRCOW/', status: 'not_started', notes: 'SPOJ' },
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