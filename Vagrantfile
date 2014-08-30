# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  # config.vm.box = "hashicorp/precise32"
  config.vm.box = 'discourse-0.9.9.13'
  config.vm.box_url = "https://d3fvb7b7auiut8.cloudfront.net/discourse-0.9.9.13.box"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.50.10"

  # If hostmanager is installed, use it to create an alias that can be browsed to
  if Vagrant.has_plugin?("vagrant-hostmanager")
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.aliases = [ "www.ispcu.local" ]
  end

  # Enable agent forwarding through SSH
  config.ssh.forward_agent = true

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", 1024]

    cpu_count = 2

    if RUBY_PLATFORM =~ /linux/
        cpu_count = `nproc`.to_i
    elsif RUBY_PLATFORM =~ /darwin/
        cpu_count = `sysctl -n hw.ncpu`.to_i
    end

    # Assign additional cores to guest os
    vb.customize ["modifyvm", :id, "--cpus", cpu_count]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  
    # Guest os resolves DNS using host VPN connection
    # vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
  end

  nfs_setting = RUBY_PLATFORM =~ /darwin/ || RUBY_PLATFORM =~ /linux/
  config.vm.synced_folder ".", "/vagrant", id: "vagrant-root", :nfs => nfs_setting

  # Make http protocol on guest available from a port on host
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # config.vm.provision :shell, :inline => 'apt-get -qq update && apt-get -qq -y install ruby1.9.3 build-essential'
  config.vm.provision :shell, :inline => 'apt-get -qq update && apt-get -qq -y install build-essential'

  # Make sure chef is a recent version
  # if Vagrant.has_plugin?("vagrant-omnibus")
  #   config.omnibus.chef_version = :latest
  # else
    config.vm.provision :shell, :inline => 'gem install chef --no-rdoc --no-ri'
  # end

  # Install necessary gems
  config.vm.provision :shell, :inline => 'gem install compass breakpoint --no-rdoc --no-ri'
  
  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.
  config.vm.provision :chef_solo do |chef|
    # chef.binary_env = "GEM_HOME=/opt/chef/embedded/lib/ruby/gems/1.9.3/ GEM_PATH= "
    # chef.binary_path = "/opt/chef/bin/"
    chef.cookbooks_path = ["chef/cookbooks"]

    chef.add_recipe "apt"
    chef.add_recipe "build-essential"
    chef.add_recipe "vim"
    chef.add_recipe "mongodb::10gen_repo"
    chef.add_recipe "nodejs"
    chef.add_recipe "git"
    chef.add_recipe "redis"
    # chef.add_recipe "nginx"

    # chef.roles_path = "../my-recipes/roles"
    # chef.data_bags_path = "../my-recipes/data_bags"
    # chef.add_recipe "mysql"
    # chef.add_role "web"
  
    # You may also specify custom JSON attributes:
    chef.json = { 
      :mongodb => {
        :dbpath          => "/var/lib/mongodb",
        :logpath         => "/var/log/mongodb",
        :port            => "27017",
      },
      :git     => {
        :prefix => "/usr/local",
      },
      :redis   => {
        :bind               => "127.0.0.1",
        :port               => "6379",
        :config_path        => "/etc/redis/redis.conf",
        :daemonize          => "yes",
        :timeout            => "300",
        :loglevel           => "notice",
      },

      # :nginx   => {
      #   :user               => "www-data",
      #   :init_style         => "runit",
      #   :pid                => "/var/run/nginx.pid",
      #   :worker_connections => "1024",
      # },
    }

  end

  # config.vm.provision "shell",
  #   inline: "echo -e $1 > /etc/nginx/conf.d/nginx.conf",
  #   args: [<<-EOS
  #     server {
  #         listen *:80;

  #         location ~ ^/ {
  #             proxy_pass http://localhost:8080;
  #         }
  #     }
  #   EOS
  #   ]
  
  config.vm.provision "shell", path: "bootstrap.sh"

end
