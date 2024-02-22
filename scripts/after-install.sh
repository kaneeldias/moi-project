  #!/bin/bash
  cd /var/moi-project/
  rm -r node_modules/
  npm install
  yarn prisma migrate deploy