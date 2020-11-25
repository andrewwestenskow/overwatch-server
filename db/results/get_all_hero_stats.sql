WITH player_stats AS (
SELECT h.id AS hero_id, h.name, COUNT(prh.id) AS games_played,  COUNT(win) filter (where "win") as win_count, COUNT(win) filter (WHERE NOT "win") as lose_count,  h.image 
FROM player_results pr
FULL JOIN player_results_heroes prh ON pr.id = prh.player_results_id
FULL JOIN heroes h on prh.hero_id = h.id
WHERE player_id = $1
GROUP BY h.id, h.name, h.image
ORDER BY games_played DESC
)

SELECT h.id, h.name, h.image, ps.games_played, ps.win_count, ps.lose_count, get_hero_best_map($1, h.id) as best, get_hero_worst_map($1, h.id) as worst FROM heroes h
FULL JOIN player_stats ps ON h.id = ps.hero_id
ORDER BY (ps.win_count / ps.games_played) DESC NULLS LAST;