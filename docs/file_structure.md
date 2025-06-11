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
│   │   ├── infra/                          # Manage HS owned infrastructure (servers)
│   │   ├── clusters/                       # Manage HS owned clusters (Proxmox, Ceph, Nomad)
│   │   ├── deployments/                    # Manage HS owned deployments (personal, monitoring, skyy command)
│   │   └── customers/                      # Manage Customer owned deployments
│   ├── celery/                             # Celery config and task routing
│   ├── core/                               # Django's internal config, Settings, URLs, root config 
│   ├── tasks/                              # Async or scheduled logic (reboot checkers, sync jobs)
│   ├── utils/                              # Shared Python utilities (config/env loaders, logging, common tools)
│   ├── manage.py                           #                    
│   └── config.py                           # Configuration settings
│
├── components/                             # Additional applications
│   ├── decision_engine/                    # Either a simple neural network, or an LLM with API (ollama)
│   │   ├── notebooks/                      # Jupyter notebooks for training, testing, accuracy comparisons
│   │   ├── models/                         # Exported .pkl, .pt, or ONNX models (versioned)
│   │   ├── datasets/                       # CSV or JSON logs of past deployments for training
│   │   ├── scheduler/                      # Python classes that plug into Django or CLI
│   │   │   ├── base.py                     # Base interface (predict_best_node)
│   │   │   ├── rule_based.py               # Classic if/else fallback
│   │   │   ├── ml_sklearn.py               # scikit-learn model wrapper
│   │   │   ├── nn_torch.py                 # PyTorch NN wrapper
│   │   └── README.md                       # Notes about training process, how to extend, etc
│   │
│   ├── firewall/
│   │   ├── pfsense/                       
│   │   │   ├── api/                        # Raw interaction with the pfSense API (pure HTTP)
│   │   │   │   ├── client.py               # Wrapper around requests with key and base URL
│   │   │   │   ├── rules.py                # Create/read/delete firewall rules
│   │   │   │   ├── nats.py                 # 1:1 NAT logic
│   │   │   │   ├── vips.py                 # Virtual IPs handling
│   │   │   │   ├── dhcp.py                 # Static DHCP mappings
│   │   │   │   └── status.py               # Get system version, health, interface states, etc
│   │   │   ├── lib/                        # reusable single purpose logic
│   │   │   │   ├── vips.py                 # Calls api/client + builds payload to create virtual IP addresses
│   │   │   │   ├── nats.py                 # Calls api/client + builds payload to create 1:1 NAT
│   │   │   │   ├── dhcp.py                 # Calls api/client + builds payload to create DHCP reservations
│   │   │   │   └── rules.py                # Calls api/client + builds payload to create firewall rules
│   │   │   ├── ops/                        # Higher level logic for automation/desired state
│   │   │   │   ├── sync_all.py             # Syncs actual vs desired firewall state (calls api/)
│   │   │   │   ├── generate_config.py      # Prepares reservation/NAT config from desired_state
│   │   │   │   └── validate.py             # Validates firewall config (VIP conflicts, unused rules, etc)
│   │   │   ├── monitor/                    # Hooks for Django or Celery to query state
│   │   │   │   ├── fetch_rules.py          # Task or callable that gets all rules for the UI
│   │   │   │   └── models.py               # Optional caching model if storing firewall state in DB
│   │   │   ├── utils/                      # Shared functions
│   │   │   │   └── net_utils.py            # Subnet logic, IP sorting, etc
│   │   │   └── README.md
│   │   ├── other firewalls (placeholder)/ 
│   │
│   ├── flux_edge_integrations/             # 
│   │   ├── cli_tool/
│   │   │   ├── bin/                        # downloaded binary
│   │   │   ├── scripts/                    # Simple Python wrappers for CLI calls
│   │   │   │   ├── check_balance.py        # Makes call to Edge and retreives wallet balance
│   │   │   │   ├── check_spend.py          # Makes call to Edge and retreives rate of spending ($/hr)
│   │   │   ├── utils/
│   │   │   │   └── runner.py               # Helper for subprocess + error handling
│   │   │   ├── version.txt                 # Track current known-good CLI version
│   │   │   └── README.md                   # 
│   │   ├── monitoring/                     # separate data stream and dashboard for Edge deployments
│   │   │   └── ... 
│   │   └── ... 
│   │
│   ├── gpu_agent/                          # This component actively manages the GPU temps
│   │   ├── agent/                          # Core logic
│   │   │   ├── bootstrap.py                # Handles installation of xorg, coolbits, systemd units
│   │   │   ├── monitor.py                  # Main polling loop (GPU temp, fan speed, etc)
│   │   │   ├── config.py                   # Load config from disk or URL, validate schema
│   │   │   ├── controller.py               # Set power/fan levels via pynvml or nvidia-smi/nvidia-settings
│   │   │   ├── api.py                      # Optional FastAPI server (for Django to query or control)
│   │   │   └── state.py                    # Stores internal status, metrics, and health checks
│   │   ├── local_config/                   # Base values, and Fall back values if main app is non accessible
│   │   │   ├── gpu_config.yaml             # Base values for GPu temp management
│   │   ├── systemd/                        # systemd unit files for agent + optional Xorg daemon
│   │   │   ├── gpu-agent.service
│   │   │   ├── xorg-headless.service
│   │   ├── scripts/                        # Setup/install script, packaging, local testing
│   │   │   └── install.sh
│   │   ├── utils/                          # Shell helpers, detection logic, subprocess wrappers
│   │   │   ├── gpu_detect.py               # Detects GPUs, their fans, and capabilities
│   │   │   └── runner.py                   # Shell-safe subprocess runner with logging
│   │   ├── main.py
│   │   └── README.md
│   │
│   ├── skyy-lab/                           # This is only for reference (depricated)
│   │   ├── __init__.py
│   │   ├── api_client.py                   # proxmoxer wrapper
│   │   ├── vm_desired_state.yaml           # defines VM state per host
│   │   ├── sync.py                         # reconciles desired vs. actual state
│   │   ├── apply.py                        # create/update/delete logic
│   │   └── gpu_utils.py                    # helper for passthrough logic                      
│   │
│   └── placeholder/
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
