  #!/bin/bash
  cd /var/moi-project/
  rm -r node_modules/
  npm install
  npm run build
  yarn prisma migrate deploy