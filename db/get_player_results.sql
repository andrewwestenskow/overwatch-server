SELECT m.name AS map, m.image AS map_image, gm.name as game_mode, p.name as player, win, json_agg(prh)  FROM player_results r
JOIN players p ON r.player_id = p.id
JOIN maps m on r.map_id = m.id
JOIN game_modes gm on m.game_mode_id = gm.id
JOIN player_results_heroes prh on r.id = prh.player_results_id
WHERE p.id = ${player_id}
GROUP BY r.id, m.name, gm.name, p.name, m.image