SELECT h.id, h.name, h.image, r.name AS "role", r.image AS role_image FROM heroes h
JOIN hero_roles r ON h.hero_role_id = r.id
WHERE h.hero_role_id = (SELECT id FROM hero_roles WHERE name ilike ${role})