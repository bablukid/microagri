ROPTS=-zav --no-p --chmod=u=rwX,g=rX,o= --delete --exclude=html/.htaccess --exclude=.svn --exclude=.git --exclude=*.mtt --exclude=html/file --exclude=*node_modules* --exclude=*.php
LANG=master

compile:
	haxe build.hxml

templates:
	(cd lang/$(LANG)/tpl; temploc2 -macros macros.mtt -output ../tmp/ *.mtt */*.mtt)

deploy: 
	#compile
	#css
	@make LANG=$(LANG) templates
	@make LANG=$(LANG) deploy_site deploy_tpl

deploy_site:
	rsync $(ROPTS) www www-data@bdd.microagri.org:/data/microagri/

deploy_tpl:
	rsync $(ROPTS) lang/$(LANG) www-data@bdd.microagri.org:/data/microagri/lang/
