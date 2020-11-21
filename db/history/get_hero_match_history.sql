SELECT pr.id, pr.win, pr.created_at, m.name AS map_name, m.image AS map_image FROM player_results_heroes prh
JOIN player_results pr ON prh.player_results_id = pr.id
JOIN maps m on pr.map_id = m.id
WHERE player_id = $1 AND prh.hero_id = $2
ORDER BY pr.created_at DESC
LIMIT $3