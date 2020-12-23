
#!/bin/bash
DIR=/project/public-source
cd $DIR
echo "清除老代码"
git reset --hard origin/master
git clean -f
echo "拉取最新代码"
git pull origin master
echo "构建镜像"
docker build -t public-source:1.0.0 .
echo "删除旧容器"
docker stop public-source-container
docker rm public-source-container
echo "启动容器"
docker run -d -p 4000:4000 --name public-source-container public-source:1.0.0