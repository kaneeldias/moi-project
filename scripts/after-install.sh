  #!/bin/bash
  cd /var/moi-project/
  rm -r node_modules/
  yarn install
  yarn prisma migrate deploy