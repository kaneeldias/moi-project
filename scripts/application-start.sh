  #!/bin/bash
  cd /var/moi-project/
  pm2 describe np2m > /dev/null
  RUNNING=$?

  if [ "${RUNNING}" -ne 0 ]; then
    pm2 start yarn --name np2m -- start
  else
    pm2 reload np2m
  fi;
