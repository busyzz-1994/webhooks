###
 # @Author: busyzz
 # @Date: 2020-12-23 16:33:10
 # @Description:
###
#!/bin/bash
DIR=/project/public-source
cd $DIR
git reset --hard origin/master
git clean -f
git pull origin master

