MAIN = server.js
OUTDIR = public
SRCDIR = src

build:
	npx tsc --outDir "$(CURDIR)\public"
	"$(CURDIR)"\node_modules\.bin\browserify "$(CURDIR)"\public\index.js -p esmify > "$(CURDIR)"\public\bundle.js
	move "$(CURDIR)\public\$(MAIN)" "$(CURDIR)\$(MAIN)"

run : build
	node "$(CURDIR)"\$(MAIN)

zip:
	rm extension.zip && zip -r extension manifest.json index.html public
