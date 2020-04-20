
curl -O https://raw.githubusercontent.com/jyp220/dataludi-sample/master/db.sqlite
curl -O https://raw.githubusercontent.com/jyp220/dataludi-sample/master/docker-compose.yml

# echo "start"
# echo $1

HOST_PORT=3000

echo "${HOST_PORT}"
if [ $# -eq 0 ] ; then
  echo "Warning: default port 3000"
  HOST_PORT="3000"
else
  HOST_PORT=$1
fi
echo "${HOST_PORT}"

echo "HostPort="$HOST_PORT > .env


docker-compose up

# echo "end"