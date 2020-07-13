SELECT pl.id, pl.name, pt.name as platform FROM players pl
JOIN platforms pt on pl.platform_id = pt.id
WHERE pl.user_id = ${user_id};