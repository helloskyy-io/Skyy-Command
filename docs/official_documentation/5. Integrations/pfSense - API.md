
### local firewall integration:

To utilize pfsense API calls for remote management without the UI, this package can be installed and configured:
https://pfrest.org/INSTALL_AND_CONFIG/

git repo:
https://github.com/jaredhendrickson13/pfsense-api
#### Installation:

install using the official documentation:
https://pfrest.org/INSTALL_AND_CONFIG/

once installed, refresh the UI, then configure API settings under:
System > REST API

Go to Keys to create a new API key.

1. Retrieve the API key from pfSense and place it into the .env file at project root

2. Edit the path in the .env file for the correct Ip address or domain name of your firewall

Test initial functionality with:
```bash
python3 /components/firewall/pfsense/test_connection.py
```

