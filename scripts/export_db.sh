if [ ! -d ./build ] 
then
    mkdir -p ./build
fi
echo "Please wait until we export your database...";
container_name=$(docker ps --filter "ancestor=mysql" --format "{{.Names}}")
docker exec $container_name bash -c 'mysqldump -u$DB_USER -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE > /db.sql; exit';
docker cp $container_name:/db.sql ./build/db.sql
echo "Database successfully copied."