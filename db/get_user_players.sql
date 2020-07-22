SELECT pl.id, pl.name, pl.private, pl.portrait, pl.tank_sr, pl.damage_sr, pl.support_sr, pt.name as platform FROM players pl
JOIN platforms pt on pl.platform_id = pt.id
WHERE pl.user_id = ${user_id};