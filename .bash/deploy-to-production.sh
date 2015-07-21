#!/bin/sh

TARGET_SERVER="sod.spsy.eu"
TARGET_DIR="/home/thujer/musebox-nodejs"
TARGET_LOG_DIR="/home/thujer/musebox-nodejs"
TARGET_NAME="PRODUCTION"
SOURCE_DIR="../*"
LOG="rsync_production.log"

rsync -rvclk $SOURCE_DIR $TARGET_SERVER:$TARGET_DIR --delete-after --dry-run --exclude-from=.deploy_ignore --log-file=$LOG > rsync.diff
cat rsync.diff

echo
echo "YOU'RE TRYING TO UPDATE $TARGET_NAME SERVER"
echo
echo "Do you right to upload these files ?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) rsync -rvclk $SOURCE_DIR $TARGET_SERVER:$TARGET_DIR --delete-after --exclude-from=.deploy_ignore --log-file=rsync_staging.log;
              ssh $TARGET_SERVER "sudo chown -R www-data:www-data $TARGET_DIR; sudo chmod g+w -R $TARGET_DIR";
              cat rsync.diff | ssh $TARGET_SERVER "echo '----- DEPLOY PRODUCTION, USER: '$USER >> $TARGET_LOG_DIR/rsync.log ; cat >> $TARGET_LOG_DIR/rsync.log"
              break;;
        No ) exit;;
    esac
done
