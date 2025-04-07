Skyy-Command/
│
├── ansible/                                # Ansible playbooks and roles
│   ├── inventory/                          # Static or dynamic inventories (Tailscale IPs, etc)
│   ├── roles/                              # Reusable role logic (proxmox, ceph, updates, etc)
│   └── playbooks/                          # Actual playbooks (site.yml, ceph_add.yml, etc)
│
├── backend/                                # Python based backend
│   ├── app/                                # Django app packages
│   │   ├── auth/                           # Authentication logic
│   │   ├── deployments/                    #
│   │   ├── clusters/                       # 
│   │   └── customers/                      # 
│   ├── celery/                             # Celery config and task routing
│   ├── tasks/                              # Async or scheduled logic (reboot checkers, sync jobs)
│   ├── core/                               # Settings, URLs, root config
│   ├── requirements.txt                    # Python dependencies
│   └── config.py                           # Configuration settings
│
├── components/                             # Additional applications
│   ├── flux_edge_cli tool/                 # Go based binary that you can run commands on for API based control
│   │   └── ...                             
│   ├── flux_edge_monitoring/               # separate data stream and dashboard for Edge deployments
│   │   └── ... 
│   ├── flux_edge_integrations/             # 
│   │   └── ... 
│
├── desired_state/                          # End state server configs
│   ├── hosts/                              # Hosts configuration (servers)
│   │   ├── puma-proxmox-001.yml      
│   │   ├── puma-proxmox-002.yml
│   │   ├── puma-proxmox-003.yml      
│   ├── deployments/                        # Deployments configuration
│
├── docker/                                 # Docker-related configs
│   ├── docker-compose.yml                  # Full stack composition
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── Dockerfile.worker                   # Optional: for Celery or other services
│ 
├── frontend/                               # Angular SPA (Single page applicaiton)
│   ├── .angular/                           #  
│   ├── .vscode/                            #  
│   ├── dist/                               # This is the --configuration=production output 
│   │   ├── skyy-command/
│   │       ├── browser/
│   │       │   ├── favicon.ico
│   │       │   ├── index.html
│   │       │   ├── main-KCEYPGZ4.js
│   │       │   ├── polyfills-A7MJM4D4.js
│   │       │   └── styles-O354YENQ.css
│   │       ├── assets
│   │       └── 3rdpartylicenses.txt
│   ├── node_modules/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/                 # UI components
│   │   │   │   ├── dynamic/                # Dynamic components
│   │   │   │   ├── static/                 # Other static components
│   │   │   │   ├── auth/                   # Authentication components
│   │   │   │   │   ├── login/              # Login component
│   │   │   │   │   ├── register/           # Registration component
│   │   │   │   │   └── forgot-password/    # Forgot password component
│   │   │   ├── services/                   # Angular services
│   │   │   │   ├── auth.service.ts         # Authentication service
│   │   │   ├── shared/                     # Shared utilities and constants
│   │   │   ├── models/                     # TypeScript models
│   │   │   ├── guards/                     # Route guards
│   │   │   └── views/                      # Different tabs/views
│   │   ├── assets/                         # Static assets like images, stylesheets
│   │   ├── environments/                   # Environment-specific configs
│   │   ├── favicon.ico                     # Favicon
│   │   ├── index.html                      # Main HTML file
│   │   ├── main.ts                         # Entry point for Angular app
│   │   ├── polyfills.ts                    # Polyfills needed by Angular
│   │   ├── styles.css                      # Global styles
│   │   └── test.ts                         # Entry point for unit tests
│   ├── angular.json                        # Configuration for Angular CLI
│   ├── package.json                        # NPM package configuration
│   ├── README.md                           # 
│   ├── tsconfig.app.json                   # 
│   ├── tsconfig.json                       # TypeScript compiler configuration
│   └── tsconfig.spec.json                  # 
│
├── scripts/                                # Scripts for automation
│   ├── build-and-run.sh                    # Bash script for local development
│   └── ci-build.yml                        # CI/CD pipeline for production automation
│
├── terraform/                              # Infra provisioning (digitalocean, hetzner, cloudflare)
│   ├── modules/
│   ├── variables.tf
│   ├── main.tf
│   └── outputs.tf
│
├── maintenance/                            # Maintenance scripts/tasks
│   ├── reboot-scheduler/
│   ├── patcher/
│   └── reports/                            # Generate upgrade status, disk health, etc
│
├── docs/                                   # Project-level docs
│   ├── filestructure.txt                   # File structure (for planning)
│
├── nginx/                                  # Nginx configuration files
│   └── nginx.conf
│
├── .env                                    # Store sensative info (gitignore)
├── .env.template                           # Template to store sensative info (user to rename to .env)
├── .gitignore                              # Remove certain files from being tracked by git
│
├── ansible.cfg                             # Ansible configuration
├── config.yaml                             # Main global config
│
├── LICENSE                                 # Dockerbuild file
└── README.md                               # Project documentation
