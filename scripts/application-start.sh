  #!/bin/bash
  pm2 describe app > /dev/null
  RUNNING=$?

  if [ "${RUNNING}" -ne 0 ]; then
    pm2 start yarn --name npm -- start
  else
    pm2 reload npm
  fi;
