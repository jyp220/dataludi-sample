if [ -f "db.sqlite" ] ; then
  echo "db.sqlite exist"
else
  echo "db.sqlite create"
  curl -O https://raw.githubusercontent.com/jyp220/dataludi-sample/master/db.sqlite
fi

if [ -f "docker-compose.yml" ] ; then
  echo "docker-compose.yml exist"
else
  echo "docker-compose.yml create"
  curl -O https://raw.githubusercontent.com/jyp220/dataludi-sample/master/docker-compose.yml
fi



# echo "start"
# echo $1

HOST_PORT=3000

echo "1 -------- : ${HOST_PORT}"
if [ $# -eq 0 ] ; then
  echo "Warning: default port 3000"
else
  HOST_PORT=$1
fi

echo "2 -------- : $0"
echo "3 -------- : $1"
echo "4 -------- : ${HOST_PORT}"

echo "HostPort="$HOST_PORT > .env


docker-compose up

# echo "end"