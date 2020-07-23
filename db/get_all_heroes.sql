SELECT h.id, h.name, h.image, r.name AS "role", r.id AS role_id, r.image AS role_image FROM heroes h
JOIN hero_roles r ON h.hero_role_id = r.id