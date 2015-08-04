#!/bin/sh

TARGET_SERVER="spsy.eu"
TARGET_DIR="/var/www/zizkostel.cz/web/"
TARGET_NAME="PRODUCTION"
SOURCE_DIR="../*"
LOG="rsync_production.log"
USER=www-data
GROUP=www-data

rsync -rvclk $SOURCE_DIR $TARGET_SERVER:$TARGET_DIR --delete-after --dry-run --exclude-from=.deploy_ignore --log-file=$LOG > rsync.diff
cat rsync.diff

echo
echo "YOU'RE TRYING TO UPDATE $TARGET_NAME SERVER"
echo
echo "Do you right to upload these files ?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) rsync -rvclk $SOURCE_DIR $TARGET_SERVER:$TARGET_DIR --delete-after --exclude-from=.deploy_ignore
              #ssh $TARGET_SERVER "sudo chown -R $USER:$GROUP $TARGET_DIR; sudo chmod g+w -R $TARGET_DIR";
              break;;
        No ) exit;;
    esac
done
