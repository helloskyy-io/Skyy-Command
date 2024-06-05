Skyy-Command/
│
├── ansible/                                # Ansible playbooks and roles
│   ├── roles/
│   ├── inventory/
│   └── playbooks/
│
├── backend/                                # Python backend
│   ├── app/                                # FastAPI or Flask app
│   │   ├── auth/                           # Authentication logic
│   │   │   ├── routes.py                   # Authentication routes
│   │   │   ├── models.py                   # Authentication models
│   │   │   └── services.py                 # Authentication services
│   ├── models/                             # Data models
│   ├── services/                           # Business logic
│   ├── main.py                             # Entry point of the backend
│   ├── requirements.txt                    # Python dependencies
│   └── config.py                           # Configuration settings
│
├── docker/                                 # Dockerfiles and docker-compose files
│   ├── Dockerfile
│   └── docker-compose.yml
│ 
├── frontend/                               # Angular SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/                 # UI components
│   │   │   │   ├── auth/                   # Authentication components
│   │   │   │   │   ├── login/              # Login component
│   │   │   │   │   ├── register/           # Registration component
│   │   │   │   │   └── forgot-password/    # Forgot password component
│   │   │   ├── services/                   # Angular services
│   │   │   │   ├── auth.service.ts         # Authentication service
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
│   └── tsconfig.json                       # TypeScript compiler configuration
│
├── terraform/                              # Terraform configurations
│   ├── modules/
│   └── main.tf
│
├── nginx/                                  # Nginx configuration files
│   └── skyy-command.conf
│
│
└── README.md                               # Project documentation
