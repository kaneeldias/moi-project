  #!/bin/bash
  cd /var/moi-project/
  rm -r node_modules/
  yarn install
  npx prisma migrate deploy