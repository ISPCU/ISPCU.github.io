## Getting Started

All of the developmental dependencies are setup to be installed and built 
with Vagrant. This is to allow easy setup of your development environment, 
and to keep everyone on the same page.

Dependencies that you actually need to download:

* [Virtual Box](https://www.virtualbox.org/wiki/Downloads)
* [Vagrant](http://www.vagrantup.com/downloads.html)
* Ruby Gem: `librarian-chef`

Once you have those installed you can get up and running with the following commands:

```
librarian-chef install
vagrant up
```

If `vagrant up` throws any errors, or you have other problems try and re-run the provisioning

```
vagrant provision
```

Once that's all setup, you should have vagrant running and you'll be able to 
access the server running on your local machine at either `192.168.50.10` or 
at `www.ispcu.local` (www required).

Right off the bat sails won't be running so browsing to those addresses won't
get you far, to actually start running sails you'll have to ssh into the
running vagrant instance and start sails.

```
vagrant ssh
cd /vagrant
sails lift
```
