SELECT m.id, m.name, m.game_mode_id, m.image, gm.name AS game_mode FROM maps m
JOIN game_modes gm ON m.game_mode_id = gm.id;