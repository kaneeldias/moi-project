  #!/bin/bash
  cd /var/moi-project/
  pm2 describe npm > /dev/null
  RUNNING=$?

  if [ "${RUNNING}" -ne 0 ]; then
    pm2 start yarn --name npm -- start
  else
    pm2 reload npm
  fi;
