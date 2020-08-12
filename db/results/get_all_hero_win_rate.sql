SELECT h.name, COUNT(prh.id) AS games_played,  COUNT(win) filter (where "win") as win_count, COUNT(win) filter (WHERE NOT "win") as lose_count,  h.image FROM player_results pr
JOIN player_results_heroes prh ON pr.id = prh.player_results_id
JOIN heroes h on prh.hero_id = h.id
WHERE player_id = $1
GROUP BY h.name, h.image
ORDER BY games_played DESC