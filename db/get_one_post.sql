SELECT p.post_id, p.title, p.img, p.CONTENT, u.username, u.profile_pic
FROM posts p
JOIN users u 
ON p.author_id = u.user_id
WHERE p.post_id = $1;
