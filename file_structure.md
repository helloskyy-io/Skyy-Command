Skyy-Command/
│
├── frontend/                # Angular SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # UI components
│   │   │   ├── services/    # Angular services
│   │   │   ├── models/      # TypeScript models
│   │   │   └── views/       # Different tabs/views
│   │   ├── assets/          # Static assets like images, stylesheets
│   │   ├── environments/    # Environment-specific configs
│   │   ├── favicon.ico      # Favicon
│   │   ├── index.html       # Main HTML file
│   │   ├── main.ts          # Entry point for Angular app
│   │   ├── polyfills.ts     # Polyfills needed by Angular
│   │   ├── styles.css       # Global styles
│   │   └── test.ts          # Entry point for unit tests
│   ├── angular.json         # Configuration for Angular CLI
│   ├── package.json         # NPM package configuration
│   └── tsconfig.json        # TypeScript compiler configuration
│
├── backend/                 # Python backend
│   ├── app/                 # FastAPI or Flask app
│   ├── models/              # Data models
│   ├── services/            # Business logic
│   ├── main.py              # Entry point of the backend
│   ├── requirements.txt     # Python dependencies
│   └── config.py            # Configuration settings
│
├── ansible/                 # Ansible playbooks and roles
│   ├── roles/
│   ├── inventory/
│   └── playbooks/
│
├── terraform/               # Terraform configurations (if added later)
│   ├── modules/
│   └── main.tf
│
├── nginx/                   # Nginx configuration files
│   └── skyy-command.conf
│
├── docker/                  # Dockerfiles and docker-compose files
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── README.md                # Project documentation

1. Grafena
2. proxmox
3. manage updates and deployments
4. backups
5. firewall
6. chat GPT
7. obsidian?
8. next cloud?
9. Flux Core AI server management
10. Flux Edge AI server deployment
