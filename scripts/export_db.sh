echo "Please wait until we export your database...";
docker exec mysql-wordpress bash -c 'mysqldump -u$DB_USER -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE > /db.sql; exit';
docker cp mysql-wordpress:/db.sql ./build/db.sql
echo "Database successfully copied."