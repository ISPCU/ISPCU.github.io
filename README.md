## Getting Started

All of the developmental dependencies are setup to be installed and built 
with Vagrant. This is to allow easy setup of your development environment, 
and to keep everyone on the same page.

Dependencies that you actually need to download:

* [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](http://www.vagrantup.com/downloads.html)

Once you have those installed you can get up and running with the following commands:

```
vagrant up
```
---

Note: If you're on Windows and getting errors about guest machine entered an invalid state, you may need to install [Virtual Box 4.3.15](https://www.virtualbox.org/download/testcase/VirtualBox-4.3.15-95713-Win.exe). Read the [thread](https://forums.virtualbox.org/viewtopic.php?f=6&t=62615) for more info.

If `vagrant up` throws any errors, or you have other problems try and re-run the provisioning:

```
vagrant provision
```
---

Once vagrant is setup, you should have vagrant running and you'll be able to 
access the server running on your local machine at `192.168.50.10` or localy
at `localhost:8080`.

### Starting up your server

Right off the bat sails won't be running, so browsing to those addresses won't
get you far. To actually start running sails you'll have to ssh into the
running vagrant instance and start sails.

```
vagrant ssh
sails lift
```

**And you're good to go, baby!**

---

### Optional Plugins

##### Hostmanager

If you'd like to be able to browse to an easy to remember domain name to
develop, instead of an ip or a local port, you can install the hostmanager
vagrant plugin:

```
# from the host os
vagrant plugin install hostmanager

# if vagrant is already running, you'll have to reload
vagrant reload
```

When you start sails (see above) you should now be able to access your
development server from `www.ispcu.local`.
