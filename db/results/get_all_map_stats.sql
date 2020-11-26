WITH player_stats AS (
SELECT m.id AS map_id, m.name, COUNT(m.id) AS games_played,  COUNT(win) filter (where "win") as win_count, COUNT(win) filter (WHERE NOT "win") as lose_count,  m.image 
FROM player_results pr
FULL JOIN maps m ON pr.map_id = m.id
WHERE player_id = $1
GROUP BY m.id, m.name, m.image
ORDER BY games_played DESC
)

SELECT m.id, m.name, m.image, ps.games_played, ps.win_count, ps.lose_count, get_map_best_hero($1, m.id) as best, get_map_worst_hero($1, m.id) as worst FROM maps m
FULL JOIN player_stats ps ON m.id = ps.map_id
ORDER BY (ps.win_count / ps.games_played) DESC NULLS LAST;