SELECT pr.id, pr.win, pr.created_at, m.name, m.image FROM player_results pr 
JOIN maps m ON pr.map_id = m.id
WHERE player_id = $1
ORDER BY created_at DESC
LIMIT $2