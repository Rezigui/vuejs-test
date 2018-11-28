#! /bin/bash


PORT=8080;
DOCKER_IMAGE="selency/malik-test";

if ! hash docker 2>/dev/null
then
    echo "Hi sorry but the project selency test need a docker";
    exit 0;
fi


read -p "Which port can use for the demo ? (8080 by default)" answer;

if [ "$answer" != "" ] ;then
    PORT=$answer
fi

echo "Build the vue docker with the port : $PORT";
echo -e "\033[33mSelency ça pousse !!\033[0m"

if [[ "$(docker images -q $DOCKER_IMAGE 2> /dev/null)" == "" ]]; then
    echo -e "\033[32mVers l'infini et au-dela (npm install ... )!!\033[0m"
    docker build -t $DOCKER_IMAGE . ;
fi

if [ $PORT != 8080 ] ;then
    echo -e "\033[33mN'oubliez pas utiliser le port que vous avez configuré !!\033[0m";
fi
docker run --rm -p $PORT:8080 --name=selency-malik $DOCKER_IMAGE;

echo -e "\033[32mJ'éspère que le test vous a convenu, au plaisir de vous voir !!\033[0m";
