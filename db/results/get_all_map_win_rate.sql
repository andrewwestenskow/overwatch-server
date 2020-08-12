SELECT m.name, COUNT(pr.id) AS games_played, COUNT(win) filter (where "win") as win_count, COUNT(win) filter (WHERE NOT "win") AS lose_count, m.image
FROM maps m
FULL JOIN player_results pr ON pr.map_id = m.id
WHERE player_id = $1
GROUP BY m.name, m.image
ORDER BY win_count DESC