
curl -O https://raw.githubusercontent.com/jyp220/dataludi-sample/master/db.sqlite
curl -O https://raw.githubusercontent.com/jyp220/dataludi-sample/master/docker-compose.yml

# echo "start"
# echo $1

echo "HostPort="$1 > .env


docker-compose up

# echo "end"