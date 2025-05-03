Role Description
================

This role comments out the paid subscription pop up/error message when conditions are met
This modifies the javascript for the front end, and its sensative to errors. If for some reaosn you get a blank screen this is easily recoverable!

```bash
apt-get install --reinstall proxmox-widget-toolkit
systemctl restart pveproxy
```


Requirements
------------

this should only be run if the host is not on a paid subscription.


