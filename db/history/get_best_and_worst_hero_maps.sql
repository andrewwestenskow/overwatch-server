(SELECT m.id, m.name, m.image, COUNT(win) filter(WHERE "win") AS win_count, COUNT(pr.id) as games_played FROM player_results pr
JOIN player_results_heroes prh on prh.player_results_id = pr.id 
JOIN maps m ON pr.map_id = m.id
WHERE player_id = ${player_id} AND hero_id = ${hero_id}
GROUP BY pr.map_id, m.name, m.id, m.image
ORDER BY win_count DESC
LIMIT 1)

UNION ALL

(SELECT m.id, m.name, m.image, COUNT(win) filter(WHERE "win") AS win_count , COUNT(pr.id) as games_played FROM player_results pr
JOIN player_results_heroes prh on prh.player_results_id = pr.id 
JOIN maps m ON pr.map_id = m.id
WHERE player_id = ${player_id} AND hero_id = ${hero_id}
GROUP BY pr.map_id, m.name, m.id, m.image
ORDER BY win_count ASC
LIMIT 1)