-- args: player_id, hero_id
-- GET THE BEST MAP FOR A GIVEN HERO
CREATE OR REPLACE FUNCTION get_hero_best_map(integer, integer) RETURNS jsonb AS $$
    SELECT row_to_json(t)::jsonb FROM(SELECT m.id, m.name, m.image, COUNT(win) filter(WHERE "win") AS win_count, COUNT(win) filter (WHERE NOT "win") as lose_count, COUNT(pr.id) as games_played FROM player_results pr
JOIN player_results_heroes prh on prh.player_results_id = pr.id 
JOIN maps m ON pr.map_id = m.id
WHERE player_id = $1 AND hero_id = $2
GROUP BY pr.map_id, m.name, m.id, m.image
ORDER BY win_count DESC
LIMIT 1) t
$$ LANGUAGE SQL;

--args: player_id, hero_id
-- GET THE WORST MAP FOR A GIVEN HERO
CREATE OR REPLACE FUNCTION get_hero_worst_map(integer, integer) RETURNS jsonb AS $$
    SELECT row_to_json(t)::jsonb FROM(SELECT m.id, m.name, m.image, COUNT(win) filter(WHERE "win") AS win_count, COUNT(win) filter (WHERE NOT "win") as lose_count, COUNT(pr.id) as games_played FROM player_results pr
JOIN player_results_heroes prh on prh.player_results_id = pr.id 
JOIN maps m ON pr.map_id = m.id
WHERE player_id = $1 AND hero_id = $2
GROUP BY pr.map_id, m.name, m.id, m.image
ORDER BY win_count ASC
LIMIT 1) t
$$ LANGUAGE SQL;

--args: player_id, map_id
-- GET THE BEST HERO FOR A MAP
CREATE OR REPLACE FUNCTION get_map_best_hero(integer, integer) RETURNS jsonb AS $$
SELECT row_to_json(t)::jsonb FROM (
SELECT h.id, h.name, h.image, COUNT(win)filter(WHERE "win")AS win_count, COUNT(win)filter(WHERE NOT "win") as lose_count, COUNT(pr.id) as games_played FROM player_results pr
JOIN player_results_heroes prh ON pr.id = prh.player_results_id
JOIN heroes h ON h.id = prh.hero_id
WHERE player_id = $1 AND map_id = $2
GROUP BY h.id
ORDER BY win_count DESC
LIMIT 1
) t
$$ LANGUAGE SQL;

--args: player_id, map_id
-- GET THE WORST HERO FOR A GIVEN MAP
CREATE OR REPLACE FUNCTION get_map_worst_hero(integer, integer) RETURNS jsonb AS $$
SELECT row_to_json(t)::jsonb FROM (
SELECT h.id, h.name, h.image, COUNT(win)filter(WHERE "win")AS win_count, COUNT(win)filter(WHERE NOT "win") as lose_count, COUNT(pr.id) as games_played FROM player_results pr
JOIN player_results_heroes prh ON pr.id = prh.player_results_id
JOIN heroes h ON h.id = prh.hero_id
WHERE player_id = $1 AND map_id = $2
GROUP BY h.id
ORDER BY win_count ASC
LIMIT 1
) t
$$ LANGUAGE SQL;