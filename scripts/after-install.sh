  #!/bin/bash
  cd /var/moi-project/
  rm -r node_modules/
  yarn install
  npm i -g npx
  npx prisma migrate deploy