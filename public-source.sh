###
 # @Author: busyzz
 # @Date: 2020-12-23 16:33:10
 # @Description:
###
#!/bin/bash
DIR=/project/public-source
cd $DIR
echo "清除老代码"
git reset --hard origin/master
git clean -f
echo "拉取最新代码"
git pull origin master

