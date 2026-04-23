# NeuroLink Database Schema & Data Persistence

## ✅ Current Status: USING SUPABASE (PostgreSQL)

Your app is **already connected to Supabase** with persistent data storage enabled. No additional setup needed!

### Authentication & Persistence
- ✅ Parent login details are **automatically persisted** via Supabase Auth
- ✅ Session persists even after browser refresh (localStorage)
- ✅ Auto token refresh enabled

## Database Tables

### 1. **profiles**
Stores parent/user information
```
- id: UUID (primary key)
- user_id: UUID (from Supabase Auth)
- display_name: TEXT (parent's name)
- created_at: TIMESTAMP
```
**Purpose**: Parent profile data
**Auto-persisted**: Yes (Supabase Auth integration)

### 2. **children**
Stores child profiles created by parents
```
- id: UUID (primary key)
- parent_id: UUID (FK to auth.users)
- name: TEXT (child's name)
- age: INTEGER
- created_at: TIMESTAMP
```
**Purpose**: Child profile management
**Auto-persisted**: Yes (when parent adds child)

### 3. **quiz_results**
Stores scores from daily quizzes, scenario quizzes
```
- id: UUID (primary key)
- child_id: UUID (FK to children)
- parent_id: UUID (FK to auth.users)
- quiz_type: TEXT ('daily_quiz', 'scenario_quiz', 'autism_quiz')
- category: TEXT (optional - topic of quiz)
- score: INTEGER
- max_score: INTEGER
- created_at: TIMESTAMP
```
**What's saved**: All quiz attempts, categories, scores
**Example**: When child completes "science" quiz with 8/10, this is saved immediately

### 4. **game_scores**
Stores scores from games (Memory, Pattern, Attention, etc.)
```
- id: UUID (primary key)
- child_id: UUID (FK to children)
- parent_id: UUID (FK to auth.users)
- game_type: TEXT ('memory_game', 'pattern_game', 'attention_game', etc.)
- score: INTEGER
- created_at: TIMESTAMP
```
**What's saved**: All game attempts and scores
**Example**: Memory game completed - score 85/100

### 5. **mood_logs**
Stores daily mood tracking
```
- id: UUID (primary key)
- child_id: UUID (FK to children)
- parent_id: UUID (FK to auth.users)
- mood: TEXT ('Happy', 'Excited', 'Anxious', 'Sad', 'Angry')
- created_at: TIMESTAMP
```
**What's saved**: Daily mood entries for emotion tracking

---

## ✅ What IS Being Saved Automatically

| Feature | Saved | Table | Notes |
|---------|-------|-------|-------|
| Parent Login | ✅ | Supabase Auth | Persists via localStorage |
| Child Profiles | ✅ | children | When parent adds child |
| Quiz Scores | ✅ | quiz_results | When quiz is completed |
| Game Scores | ✅ | game_scores | When game is completed |
| Mood Logs | ✅ | mood_logs | When child logs mood |
| Parent Dashboard Data | ✅ | All tables | Auto-aggregated from above |
| Language Preference | ⚠️ | localStorage | (Not in database) |

---

## 🔄 How Parent Dashboard Works

The parent dashboard automatically pulls data:

```tsx
// Fetch mood logs
const { data: moods } = await supabase
  .from("mood_logs")
  .select("mood")
  .eq("child_id", activeChild.id);

// Fetch quiz results
const { data: quizzes } = await supabase
  .from("quiz_results")
  .select("score, max_score, created_at")
  .eq("child_id", activeChild.id);

// Fetch game scores
const { data: games } = await supabase
  .from("game_scores")
  .select("game_type, score")
  .eq("child_id", activeChild.id);
```

✅ **All analytics on the dashboard are real-time** from actual stored data!

---

## 🆕 Enhancement Needed: Difficulty Level Tracking

To implement progressive difficulty, add this column to relevant tables:

### NEW: Add to game_scores table
```
- difficulty_level: INTEGER (1-5 for easy to hard)
- time_taken: INTEGER (seconds)
- accuracy: DECIMAL (0-100%)
```

### Usage Example
```sql
-- Get progression for Memory Game
SELECT difficulty_level, AVG(score) as avg_score 
FROM game_scores 
WHERE game_type = 'memory_game' 
  AND child_id = 'xyz'
GROUP BY difficulty_level
ORDER BY created_at;
```

### Implementation in Code
```tsx
// Save with difficulty
supabase.from("game_scores").insert({
  game_type: "memory_game",
  difficulty_level: currentDifficulty, // 1-5
  score: 85,
  time_taken: 120,
  accuracy: 92.5,
  child_id: activeChild.id,
  parent_id: user.id,
});

// Increase difficulty on success
if (score > 80 && difficultLevel < 5) {
  setDifficultyLevel(prev => prev + 1);
}
```

---

## 🔐 Security Notes

- Parent login is **encrypted by Supabase Auth** (industry standard)
- All child data is **scoped to parent_id** (privacy protected)
- Row-level security (RLS) can be enabled in Supabase dashboard
- Data is **backed up automatically** by Supabase

---

## 📊 Checking Stored Data in Supabase Console

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor**
4. Check recent scores:
```sql
SELECT 
  c.name as child_name,
  qr.quiz_type,
  qr.score,
  qr.max_score,
  qr.created_at
FROM quiz_results qr
JOIN children c ON c.id = qr.child_id
ORDER BY qr.created_at DESC
LIMIT 10;
```

---

## Next Steps

1. ✅ **Data persistence is working** - no changes needed
2. 🆕 **Add difficulty level tracking** - implement in MemoryGame, PatternGame, AttentionGame
3. 📈 **Update parent dashboard** - show difficulty progression charts
4. 🎮 **Progressive difficulty algorithm** - increase difficulty after successful attempts
