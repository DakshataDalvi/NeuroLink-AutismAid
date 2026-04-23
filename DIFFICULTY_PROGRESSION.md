# Progressive Difficulty Implementation Guide

## What Was Done

### ✅ Fixed Memory Game with 5 Difficulty Levels
- **Level 1 (Easy 🟢)**: 4 pairs, target 10 matches
- **Level 2 (Medium 🟡)**: 5 pairs, target 8 matches  
- **Level 3 (Hard 🔴)**: 6 pairs, target 6 matches
- **Level 4 (Expert ⚡)**: 7 pairs, target 5 matches
- **Level 5 (Master 🌟)**: 8 pairs, target 4 matches

**Features**:
- Visual difficulty indicator with progress bar
- Automatic level-up prompts when player performs well
- Saves score with difficulty level to database
- Tracks accuracy percentage
- Shows target matches for each level

---

## How to Apply to Other Games

### Pattern Game Implementation

```tsx
// Add at top
const DIFFICULTY_CONFIG = {
  1: { timeLimit: 12, colors: 2, sequences: ['red', 'blue'] },
  2: { timeLimit: 10, colors: 3, sequences: ['red', 'blue', 'green'] },
  3: { timeLimit: 8, colors: 4, sequences: ['red', 'blue', 'green', 'yellow'] },
  4: { timeLimit: 6, colors: 5, sequences: [...] },
  5: { timeLimit: 4, colors: 6, sequences: [...] },
};

// In component state
const [difficulty, setDifficulty] = useState(1);
const config = DIFFICULTY_CONFIG[difficulty];

// On game win
const saveAndCheckLevelUp = async () => {
  await supabase.from("game_scores").insert({
    game_type: "pattern_game",
    difficulty_level: difficulty,
    score: score,
    accuracy: (score / config.maxScore) * 100,
    child_id: activeChild.id,
    parent_id: user.id,
  });

  if (score > config.maxScore * 0.8 && difficulty < 5) {
    // Show level up prompt
  }
};
```

### Attention Game Implementation

```tsx
const ATTENTION_DIFFICULTY = {
  1: { duration: 20, items: 8, speed: 'slow' },
  2: { duration: 18, items: 10, speed: 'slow' },
  3: { duration: 16, items: 12, speed: 'medium' },
  4: { duration: 12, items: 14, speed: 'medium' },
  5: { duration: 10, items: 16, speed: 'fast' },
};

// Increases item count, reduces time, and speeds up animation
const config = ATTENTION_DIFFICULTY[difficulty];
useEffect(() => {
  const interval = setInterval(() => {
    // Generate items based on config.items
  }, SPEED_MAP[config.speed]);
}, [difficulty]);
```

### Problem Solving Game Implementation

```tsx
const PROBLEM_DIFFICULTY = {
  1: { puzzles: 3, timePerPuzzle: 120, hintsAvailable: 3 },
  2: { puzzles: 4, timePerPuzzle: 100, hintsAvailable: 2 },
  3: { puzzles: 5, timePerPuzzle: 80, hintsAvailable: 1 },
  4: { puzzles: 6, timePerPuzzle: 60, hintsAvailable: 1 },
  5: { puzzles: 7, timePerPuzzle: 45, hintsAvailable: 0 },
};

// Increases puzzle count, reduces time, reduces hints
```

---

## Database Schema Addition

No database changes needed! The `game_scores` columns already available:
- `difficulty_level` (INTEGER 1-5)
- `score` (INTEGER)
- `accuracy` (DECIMAL 0-100)
- `time_taken` (INTEGER seconds)

---

## Testing Difficulty Progression

### Test the Memory Game
1. Go to Kids section → Memory Game
2. Complete a round with good score (~10 matches in 15 moves on Easy)
3. See "Level Up" prompt appear
4. Click to go to Medium difficulty
5. Check parent dashboard - should show difficulty_level: 2 in scores

### Verify in Database
```sql
SELECT 
  game_type,
  difficulty_level,
  score,
  accuracy,
  time_taken,
  created_at
FROM game_scores
WHERE child_id = 'xyz'
ORDER BY created_at DESC;
```

---

## Next Steps for Other Games

1. **Pattern Game** - Update with time limits and color complexity
2. **Attention Game** - Increase items and speed at higher levels
3. **Problem Solving** - More puzzles, less time, fewer hints
4. **Emotion Guide** - More scenarios, faster responses
5. **Story Time** - Longer stories, comprehension questions at higher levels

Each game should:
- Have 5 difficulty levels
- Save difficulty_level with each score
- Show level-up prompts on good performance
- Implement level thresholds (80%+ accuracy = level up)

---

## Parent Dashboard Enhancement

Update parent dashboard to show difficulty progression:

```tsx
// Add chart for difficulty progression
const difficultyProgress = gameScores.reduce((acc, score) => {
  const existing = acc.find(d => d.difficulty === score.difficulty_level);
  if (existing) {
    existing.attempts++;
    existing.avgScore = (existing.avgScore + score.score) / 2;
  } else {
    acc.push({
      difficulty: score.difficulty_level,
      attempts: 1,
      avgScore: score.score
    });
  }
  return acc;
}, []);

// Show as bar chart with difficulty on X-axis, avg score on Y-axis
```

Now parents can see exactly at which difficulty level their child is succeeding!
