
###
 # @Author: busyzz
 # @Date: 2020-12-24 14:41:45
 # @Description:
###
#!/bin/bash
echo "entry sh"
DIR=/project/blog-music
echo "执行命令 - blog-music"
cd $DIR
echo "清除老代码 - blog-music"
git reset --hard origin/master
git clean -f
echo "拉取最新代码 - blog-music"
git pull origin master
echo "构建镜像 - blog-music"
docker build -t blog-music:1.0.0 .
echo "删除旧容器 - blog-music"
docker stop blog-music-container
docker rm blog-music-container
echo "启动容器 - blog-music"
docker run -d -p 80:4100 --name blog-music-container blog-music:1.0.0